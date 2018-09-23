const { Walk, Pilgrim } = require('../../models');

module.exports = {
  Walk: {
    pilgrims: async (parent, args) =>
      await Pilgrim.where('walkNumber')
        .equals(parent.walkNumber)
        .exec()
  },

  Query: {
    walk: async (parent, { walkNumber }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return await Walk.findOne({ walkNumber }).exec();
    },
    walks: async (parent, { limit, afterDate }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      const searchParams = {};
      if (afterDate) {
        searchParams.startDate = { $gte: afterDate };
      }

      return await Walk.where({ ...searchParams })
        .sort('-walkNumber')
        .limit(limit)
        .exec();
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

      const updatedWalk = await Walk.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties }
        },
        { new: true }
      ).exec();

      if (!updatedWalk) {
        throw new Error('Walk not found');
      }

      return updatedWalk;
    },
    removeWalk: async (parent, args, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const removedWalk = await Walk.findOneAndRemove({ _id: args.id }).exec();
      if (!removedWalk) {
        throw new Error('Walk not found');
      }
      return removedWalk;
    }
  }
};
