import { gql } from 'graphql-request';

export const searchRepositoriesAfterQuery = gql`
query($name: String!, $first: Int!, $after: String) {
  search(query: $name, type: REPOSITORY, first: $first, after: $after) {
    repositoryCount
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        ... on Repository {
          databaseId
          id
          name
          description
          forkCount
          isFork
          issues {
            totalCount
          }
          labels (first: 100) {
            nodes {
              name
            }
          }
          languages (first: 100) {
            nodes {
              name
            }
          }
          licenseInfo {
            name
          }
          nameWithOwner
          primaryLanguage {
            name
          }
          pullRequests {
            totalCount
          }
          watchers {
            totalCount
          }
          stargazers {
            totalCount
          }
          url
          createdAt
          updatedAt
          diskUsage
        }
      }
    }
  }
}
`;
