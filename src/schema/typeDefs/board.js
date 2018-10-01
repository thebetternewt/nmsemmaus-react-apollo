const { gql } = require('apollo-server');

module.exports = gql`
  type Board {
    id: ID!
    year: ID!
    chairman: String
    viceChairman: String
    secretary: String
    treasurer: String
    communitySpiritualDirector: String
    exOfficio: String
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    board(year: ID!): Board
    currentBoard: Board
    boards(limit: Int): [Board]!
  }

  extend type Mutation {
    addBoard(
      year: ID!
      chairman: String
      viceChairman: String
      secretary: String
      treasurer: String
      communitySpiritualDirector: String
      exOfficio: String
    ): Board!

    updateBoard(
      id: ID!
      year: ID
      chairman: String
      viceChairman: String
      secretary: String
      treasurer: String
      communitySpiritualDirector: String
      exOfficio: String
    ): Board

    removeBoard(id: ID!): Board
  }
`;
