const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  Query: {
    me: async (parent, args, { user }) => {
      console.log(user);
      if (!user) {
        throw new Error('You are not authenticated!');
      }

      console.log(user);

      // user is authenticated
      return await User.findById(user.id);
    },
    user: async (parent, { id }, { user }) => {
      if (!user.id === id && !user.admin) {
        throw new Error('Not authorized');
      }
      return await User.findById(id);
    },
    users: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      return await User.find({});
    }
  },

  Mutation: {
    signup: async (parent, { username, password }) => {
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPass });
      return await newUser.save();
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('No user with that username');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }

      return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
    },
    updateUser: async (parent, args, { user }) => {
      const { id, admin, ...updatedProperties } = args;

      if (!user.id === id && !user.admin) {
        throw new Error('Not authorized');
      }

      if (user.admin) {
        updatedProperties.admin = admin;
      }

      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: { ...updatedProperties }
      });

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    },
    removeUser: async (parent, { id }, { user }) => {
      if (!user.id === id && !user.admin) {
        throw new Error('Not authorized');
      }
      const removedUser = await User.findByIdAndRemove(id);

      if (!removedUser) {
        throw new Error('User not found');
      }

      return removedUser._id;
    }
  }
};
