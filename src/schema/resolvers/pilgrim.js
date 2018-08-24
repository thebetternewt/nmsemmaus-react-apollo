const { Pilgrim, Walk } = require('../../models');

module.exports = {
  Pilgrim: {
    walk: async (parent, args) =>
      await Walk.findOne({ walkNumber: parent.walkNumber })
  },

  Query: {
    pilgrim: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return await Pilgrim.findById(id);
    },
    pilgrims: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return await Pilgrim.find({});
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
      const [err, updatedPilgrim] = await Pilgrim.findByIdAndUpdate(id, {
        $set: { ...updatedProperties }
      });
      if (err) {
        throw new Error(err);
      }
      return updatedPilgrim;
    },
    removePilgrim: async (parent, { id }, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }

      const removedPilgrim = await Pilgrim.findByIdAndRemove(id);
      if (!removedPilgrim) {
        throw new Error('Pilgrim not found');
      }
      return removedPilgrim;
    }
  }
};
