const { Pilgrim, Walk } = require('../../models');

module.exports = {
  Pilgrim: {
    walk: async parent =>
      Walk.findOne({ walkNumber: parent.walkNumber }).exec(),
  },

  Query: {
    pilgrim: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return Pilgrim.findOne({ _id: id }).exec();
    },
    pilgrims: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return Pilgrim.where({ ...args })
        .collation({ locale: 'en', strength: 2 })
        .sort({ lastName: 1, firstName: 1 })
        .exec();
    },
  },

  Mutation: {
    addPilgrim: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }

      const pilgrim = new Pilgrim({ ...args });
      return pilgrim.save();
    },
    updatePilgrim: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }

      const { id, ...updatedProperties } = args;
      const updatedPilgrim = await Pilgrim.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties },
        },
        { new: true }
      ).exec();

      console.log(updatedPilgrim);
      return updatedPilgrim;
    },
    removePilgrim: async (parent, { id }, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }

      const removedPilgrim = await Pilgrim.findOneAndRemove({ _id: id }).exec();
      if (!removedPilgrim) {
        throw new Error('Pilgrim not found');
      }
      return removedPilgrim;
    },
  },
};
