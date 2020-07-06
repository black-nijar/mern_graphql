const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const { MONGODB } = require('./config/config');

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;
const resolvers = {
  Query: {
    sayHi: () => 'Hello World!'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Connect DB
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log('Server is running at', res.url);
  });
