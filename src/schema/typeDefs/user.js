const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    username: String!
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signup(username: String!, password: String!): User!
    login(username: String!, password: String!): String!
    removeUser(id: ID!): User
  }
`;
