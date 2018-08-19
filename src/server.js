const dotenv = require('dotenv');
const mongoose = require('mongoose');
const faker = require('faker');
const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schema');

dotenv.config();
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    const playground = {
      settings: {
        'editor.cursorShape': 'line'
      }
    };

    const mocks = {
      Int: () => faker.random.number(100)
    };

    return new ApolloServer({
      typeDefs,
      resolvers,
      playground
    }).listen();
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch(console.error);
