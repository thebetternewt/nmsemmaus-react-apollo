const { Newsletter } = require('../../models');

module.exports = {
  Query: {
    newsletter: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return await Newsletter.findOne({ _id: id }).exec();
    },
    newsletters: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return await Newsletter.where({ ...args }).exec();
    }
  },

  Mutation: {
    addNewsletter: async (parent, args, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const newsletter = new Newsletter({
        ...args
      });

      return await newsletter.save();
    },
    updateNewsletter: async (parent, args, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const { id, ...updatedProperties } = args;

      const updatedNewsletter = await Newsletter.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties }
        },
        { new: true }
      ).exec();

      if (!updatedNewsletter) {
        throw new Error('Newsletter not found');
      }

      return updatedNewsletter;
    },
    removeNewsletter: async (parent, { id }, { user }, info) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const removedNewsletter = await Newsletter.findOneAndRemove({
        _id: id
      }).exec();
      if (!removedNewsletter) {
        throw new Error('Newsletter not found');
      }
      return removedNewsletter;
    }
  }
};
