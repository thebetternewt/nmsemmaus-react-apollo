const { gql } = require('apollo-server');
const base = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

module.exports = [
  base,
  require('./pilgrim'),
  require('./walk'),
  require('./user'),
  require('./newsletter'),
  require('./s3Payload')
];
