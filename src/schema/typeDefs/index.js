const { gql } = require('apollo-server');
const pilgrim = require('./pilgrim');
const walk = require('./walk');
const user = require('./user');
const newsletter = require('./newsletter');
const s3payload = require('./s3Payload');

const base = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

module.exports = [base, pilgrim, walk, user, newsletter, s3payload];
