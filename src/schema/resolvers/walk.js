const { Walk, Pilgrim } = require('../../models');

module.exports = {
  Walk: {
    pilgrims: async (parent, args) =>
      await Pilgrim.find({ walkNumber: parent.walkNumber })
  },

  Query: {
    walk: async (parent, { walkNumber }) => await Walk.findOne({ walkNumber }),
    walks: async () => await Walk.find({})
  },

  Mutation: {
    addWalk: async (parent, args, context, info) => {
      const walk = new Walk({
        ...args
      });

      return await walk.save();
    },
    updateWalk: async (parent, args, context, info) => {
      const { id, ...updatedProperties } = args;

      console.log(updatedProperties);
      const updatedWalk = await Walk.findByIdAndUpdate(id, {
        $set: { ...updatedProperties }
      });

      if (!updatedWalk) {
        throw new Error('Walk not found');
      }

      return updatedWalk;
    },
    removeWalk: async (parent, args, context, info) => {
      const removedWalk = await Walk.findByIdAndRemove(args.id);
      if (!removedWalk) {
        throw new Error('Walk not found');
      }
      return removedWalk;
    }
  }
};
