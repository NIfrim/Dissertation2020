import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import dotenv from 'dotenv';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

dotenv.config();
const GRAPHQL_URI =
  process.env.GRAPHQL_URI || 'http://192.168.1.129:4001/graphql';

const httpLink = createUploadLink({
  uri: GRAPHQL_URI,
  credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});
