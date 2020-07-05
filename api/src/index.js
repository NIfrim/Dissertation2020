import {
  ApolloServer
  // PubSub
} from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import neo4j from 'neo4j-driver';
import { typeDefs, resolvers } from './graphql-schema.js';
import { makeAugmentedSchema } from 'neo4j-graphql-js';
import express from 'express';
import {
  IsAuthenticatedDirective,
  HasScopeDirective
} from 'graphql-auth-directives';
import { shutdown } from '../utils';
// Routes imports
// import {
//   auth,
//   products,
//   promotions,
//   stores,
//   companies,
//   accounts
// } from './routes'

const app = express();
// const pubSub = new PubSub()
const PORT = process.env.GRAPHQL_PORT || 4001;

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://51.141.95.124:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'admin',
    process.env.NEO4J_PASSWORD || 'Dissertation2020!'
  )
);

const schema = makeAugmentedSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
    hasScope: HasScopeDirective
  },
  config: {
    query: {
      exclude: ['PayloadType']
    },
    mutation: false
  }
});

const corsOptions = {
  origin: '*',
  credentials: 'same-origin'
};

const server = new ApolloServer({
  uploads: false,
  context: async ({ req }) => {
    return {
      driver,
      req
      // pubSub
    };
  },
  introspection: true,
  playground: true,
  // subscriptions: {
  //   onConnect: () => console.log('Connected to websocket'),
  //   onDisconnect: () => console.log('Disconnected from websocket')
  // },
  schema,
  cors: corsOptions
});

// Middleware
app.use(cors(corsOptions));
app.use(graphqlUploadExpress({ maxFileSize: 100000, maxFiles: 1 }));
// app.use(express.json({
//   extended: false
// }))

// Routes
// app.use('/api/products', products)
// app.use('/api/promotions', promotions)
// app.use('/api/stores', stores)
// app.use('/api/companies', companies)
// app.use('/api/accounts', accounts)
// app.use('/api/auth', auth)

// File Upload Handlers
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGHUP', shutdown);

// Middleware to run for each request received
app.get('/server_state', (req, res) => {
  res.status(200).json({
    msg: 'Server OK!'
  });
});

server.applyMiddleware({
  app,
  path: '/graphql'
});

const httpServer = http.createServer(app);
// server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`GraphQL API ready at http://localhost:${PORT}/graphql`);
});
