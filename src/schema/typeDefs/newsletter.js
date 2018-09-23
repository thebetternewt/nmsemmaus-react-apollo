const { gql } = require('apollo-server');

module.exports = gql`
  type Newsletter {
    id: ID!
    title: String!
    body: String!
    publishedOn: String!
    documentLink: String
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
      document: Upload
    ): Newsletter!

    updateNewsletter(
      id: ID!
      title: String
      body: String
      publishedOn: String
      document: Upload
    ): Newsletter

    removeNewsletter(id: ID!): Newsletter
  }
`;
