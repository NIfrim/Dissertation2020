import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import fs from 'fs';
import path from 'path';

// Resolvers
import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
// import Subscription from './resolvers/Subscription'

const typeDefs = fs
  .readFileSync(path.join(__dirname, 'schema.graphql'))
  .toString('utf-8');

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Mutation,
  Query
  // Subscription
};

export { typeDefs, resolvers };
