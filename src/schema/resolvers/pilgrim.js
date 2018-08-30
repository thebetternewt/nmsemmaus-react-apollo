const { Pilgrim, Walk } = require('../../models');

module.exports = {
  Pilgrim: {
    walk: async (parent, args) =>
      await Walk.findOne({ walkNumber: parent.walkNumber }).exec()
  },

  Query: {
    pilgrim: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return await Pilgrim.findOne({ _id: id }).exec();
    },
    pilgrims: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return await Pilgrim.find().exec();
    }
  },

  Mutation: {
    addPilgrim: async (parent, args, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }

      const pilgrim = new Pilgrim({ ...args });
      return await pilgrim.save();
    },
    updatePilgrim: async (parent, args, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }

      const { id, ...updatedProperties } = args;
      const [err, updatedPilgrim] = await Pilgrim.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties }
        }
      ).exec();
      if (err) {
        throw new Error(err);
      }
      return updatedPilgrim;
    },
    removePilgrim: async (parent, { id }, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }

      const removedPilgrim = await Pilgrim.findOneAndRemove({ _id: id }).exec();
      if (!removedPilgrim) {
        throw new Error('Pilgrim not found');
      }
      return removedPilgrim;
    }
  }
};
