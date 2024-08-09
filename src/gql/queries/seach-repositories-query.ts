import { gql } from 'graphql-request';

export const searchRepositoriesQuery = gql`
query($name: String!, $first: Int!, $after: String) {
  search(query: $name, type: REPOSITORY, first: $first, after: $after) {
    repositoryCount
    pageInfo {
      endCursor
      hasNextPage
      startCursor
      hasPreviousPage
    }
    edges {
      node {
        ... on Repository {
          name
          owner {
            login
          }
          description
          url
          createdAt
          updatedAt
          stargazerCount
          forkCount
          languages(first: 5) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}
`;
