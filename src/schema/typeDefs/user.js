const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    admin: Boolean
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signup(username: String!, password: String!): User!
    login(username: String!, password: String!): String!
    updateUser(
      id: ID!
      username: String
      password: String
      admin: Boolean
    ): User!
    removeUser(id: ID!): String
  }
`;
