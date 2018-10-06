const { Walk, Pilgrim } = require('../../models');

module.exports = {
  Walk: {
    pilgrims: async parent =>
      Pilgrim.where('walkNumber')
        .equals(parent.walkNumber)
        .collation({ locale: 'en', strength: 2 })
        .sort({ lastName: 1, firstName: 1 })
        .exec(),
  },

  Query: {
    walk: async (parent, { walkNumber }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return Walk.findOne({ walkNumber }).exec();
    },
    walks: async (
      parent,
      { offset, limit, afterDate, walkNumber },
      { user }
    ) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      const searchParams = {};
      if (afterDate) {
        searchParams.startDate = { $gte: afterDate };
      }

      if (walkNumber) {
        searchParams.walkNumber = walkNumber;
      }

      return Walk.where({ ...searchParams })
        .sort('-walkNumber')
        .skip(offset)
        .limit(limit)
        .exec();
    },
  },

  Mutation: {
    addWalk: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const walk = new Walk({
        ...args,
      });

      return walk.save();
    },
    updateWalk: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const { id, ...updatedProperties } = args;

      const updatedWalk = await Walk.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties },
        },
        { new: true }
      ).exec();

      if (!updatedWalk) {
        throw new Error('Walk not found');
      }

      return updatedWalk;
    },
    removeWalk: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const removedWalk = await Walk.findOneAndRemove({ _id: args.id }).exec();
      if (!removedWalk) {
        throw new Error('Walk not found');
      }
      return removedWalk;
    },
  },
};
