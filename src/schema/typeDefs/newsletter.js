const { gql } = require('apollo-server');

module.exports = gql`
  type Newsletter {
    id: ID!
    title: String!
    body: String!
    publishedOn: String!
    document: String
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    newsletter(id: ID!): Newsletter
    newsletters: [Newsletter]!
  }

  extend type Mutation {
    addNewsletter(
      title: String!
      body: String!
      publishedOn: String!
      document: String
    ): Newsletter!

    updateNewsletter(
      id: ID!
      title: String
      body: String
      publishedOn: String
      document: String
    ): Newsletter

    removeNewsletter(id: ID!): Newsletter
  }
`;
