const { Newsletter } = require('../../models');

module.exports = {
  Query: {
    newsletter: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return Newsletter.findOne({ _id: id }).exec();
    },
    newsletters: async (parent, { limit, ...args }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      return Newsletter.where({ ...args })
        .sort('-publishedOn')
        .limit(limit)
        .exec();
    },
    latestNewsletter: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      return Newsletter.findOne({})
        .sort('-publishedOn')
        .exec();
    },
  },

  Mutation: {
    addNewsletter: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const newsletter = new Newsletter({
        ...args,
      });

      return newsletter.save();
    },
    updateNewsletter: async (parent, args, { user }) => {
      console.log('[args]:', args);
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const { id, ...updatedProperties } = args;

      const updatedNewsletter = Newsletter.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties },
        },
        { new: true }
      ).exec();

      if (!updatedNewsletter) {
        throw new Error('Newsletter not found');
      }

      return updatedNewsletter;
    },
    removeNewsletter: async (parent, { id }, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const removedNewsletter = await Newsletter.findOneAndRemove({
        _id: id,
      }).exec();
      if (!removedNewsletter) {
        throw new Error('Newsletter not found');
      }
      return removedNewsletter;
    },
  },
};
