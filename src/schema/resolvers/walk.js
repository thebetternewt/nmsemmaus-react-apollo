const { Walk, Pilgrim } = require('../../models');

module.exports = {
  Walk: {
    pilgrims: async (parent, args) =>
      await Pilgrim.find({ walkNumber: parent.walkNumber })
  },

  Query: {
    walk: async (parent, { walkNumber }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return await Walk.findOne({ walkNumber });
    },
    walks: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return await Walk.find({});
    }
  },

  Mutation: {
    addWalk: async (parent, args, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const walk = new Walk({
        ...args
      });

      return await walk.save();
    },
    updateWalk: async (parent, args, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
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
    removeWalk: async (parent, args, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const removedWalk = await Walk.findByIdAndRemove(args.id);
      if (!removedWalk) {
        throw new Error('Walk not found');
      }
      return removedWalk;
    }
  }
};
