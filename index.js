const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config/config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const Post = require('./models/Post');

const pubsub = new PubSub();
// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
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
