import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.REACT_APP_GQL_ENDPOINT || '/graphql';

const token = process.env.REACT_APP_GITHUB_TOKEN;

export const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  credentials: 'include'
});
