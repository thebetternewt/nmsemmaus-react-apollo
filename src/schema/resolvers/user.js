const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  Query: {
    me: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }

      // user is authenticated
      return await User.findOne({ _id: user.id }).exec();
    },
    user: async (parent, { id }, { user }) => {
      if (!user.id === id && !user.admin) {
        throw new Error('Not authorized');
      }
      return await User.findOne({ _id: id }).exec();
    },
    users: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      return await User.find().exec();
    }
  },

  Mutation: {
    signup: async (parent, { username, password }) => {
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPass });
      return await newUser.save();
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username }).exec();

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
      const { id, admin, password, ...updatedProperties } = args;

      if (!user.id === id && !user.admin) {
        throw new Error('Not authorized');
      }

      // Only allow update of admin if current user is admin and
      // only update admin if specified args
      if (user.admin && admin !== undefined) {
        updatedProperties.admin = admin;
      }

      if (password) {
        // Hash new password
        const hashedPass = await bcrypt.hash(password, 10);
        updatedProperties.password = hashedPass;
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: { ...updatedProperties } },
        { new: true }
      ).exec();

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    },
    removeUser: async (parent, { id }, { user }) => {
      if (!user.id === id && !user.admin) {
        throw new Error('Not authorized');
      }
      const removedUser = await User.findOneAndRemove({ _id: id }).exec();

      if (!removedUser) {
        throw new Error('User not found');
      }

      return removedUser._id;
    }
  }
};
