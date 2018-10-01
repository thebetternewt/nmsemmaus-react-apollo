const { Board } = require('../../models');

module.exports = {
  Query: {
    board: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return Board.findOne({ _id: id }).exec();
    },
    boards: async (parent, { limit, ...args }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      return Board.where({ ...args })
        .sort('-year')
        .limit(limit)
        .exec();
    },
    currentBoard: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      return Board.findOne({})
        .sort('-year')
        .exec();
    },
  },

  Mutation: {
    addBoard: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const board = new Board({
        ...args,
      });

      return board.save();
    },
    updateBoard: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const { id, ...updatedProperties } = args;

      const updatedBoard = Board.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties },
        },
        { new: true }
      ).exec();

      if (!updatedBoard) {
        throw new Error('Board not found');
      }

      return updatedBoard;
    },
    removeBoard: async (parent, { id }, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }

      const removedBoard = await Board.findOneAndRemove({
        _id: id,
      }).exec();
      if (!removedBoard) {
        throw new Error('Board not found');
      }
      return removedBoard;
    },
  },
};
