const { ApolloServer } = require('apollo-server');

require('dotenv').config();

// Types (query/mutation/subscription)
const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`;

// Resolvers
const resolvers = {
  Query: {
      totalPosts: () => 42
  }
};

// GraphQL Server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

const port = process.env.PORT || 5000;
apolloServer.listen(port, () => console.log(`GraphQL Server is running port ${port}`));
