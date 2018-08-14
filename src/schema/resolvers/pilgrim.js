const { Pilgrim, Walk } = require('../../models');

module.exports = {
  Pilgrim: {
    walk: async (parent, args) =>
      await Walk.findOne({ walkNumber: parent.walkNumber })
  },
  Query: {
    pilgrim: async (parent, { id }) => await Pilgrim.findById(id),
    pilgrims: async () => await Pilgrim.find({})
  },

  Mutation: {
    addPilgrim: async (parent, args, context, info) => {
      const pilgrim = new Pilgrim({ ...args });
      return await pilgrim.save();
    },
    removePilgrim: async (parent, { id }, context, info) => {
      const removedPilgrim = await Pilgrim.findByIdAndRemove(id);
      if (!removedPilgrim) {
        throw new Error('Pilgrim not found');
      }
      return removedPilgrim;
    }
  }
};
