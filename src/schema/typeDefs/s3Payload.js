const { gql } = require('apollo-server');

module.exports = gql`
  type S3Payload {
    signedRequest: String!
    url: String!
  }

  extend type Mutation {
    signS3(filename: String!, filetype: String!, path: String!): S3Payload!
  }
`;
