const { gql } = require('apollo-server');

module.exports = gql`
  type Pilgrim {
    id: ID!
    firstName: String!
    lastName: String!
    hometown: String
    sponsor: String
    walkNumber: Int!
    walk: Walk
  }

  extend type Query {
    pilgrim(id: ID!): Pilgrim
    pilgrims: [Pilgrim!]!
  }

  extend type Mutation {
    addPilgrim(
      firstName: String!
      lastName: String!
      hometown: String
      sponsor: String
      walkNumber: Int!
    ): Pilgrim
    removePilgrim(id: ID!): Pilgrim
  }
`;
