const { gql } = require('apollo-server');

module.exports = gql`
  type Newsletter {
    id: ID!
    title: String!
    body: String!
    publishedOn: String!
    documentUrl: String
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    newsletter(id: ID!): Newsletter
    latestNewsletter: Newsletter
    newsletters(limit: Int): [Newsletter]!
  }

  extend type Mutation {
    addNewsletter(
      title: String!
      body: String!
      publishedOn: String!
      documentUrl: String
    ): Newsletter!

    updateNewsletter(
      id: ID!
      title: String
      body: String
      publishedOn: String
      documentUrl: String
    ): Newsletter

    removeNewsletter(id: ID!): Newsletter
  }
`;
