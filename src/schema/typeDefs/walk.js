const { gql } = require('apollo-server');

module.exports = gql`
  type Walk {
    id: ID!
    walkNumber: Int!
    gender: String!
    startDate: String
    endDate: String
    pilgrims: [Pilgrim!]!
  }

  extend type Query {
    walk(walkNumber: Int!): Walk
    walks(limit: Int, afterDate: String): [Walk]
  }

  extend type Mutation {
    addWalk(
      walkNumber: Int!
      gender: String!
      startDate: String
      endDate: String
    ): Walk!
    updateWalk(
      id: ID!
      walkNumber: Int
      gender: String
      startDate: String
      endDate: String
    ): Walk
    removeWalk(id: ID!): Walk
  }
`;
