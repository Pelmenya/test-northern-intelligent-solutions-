import { gql } from 'graphql-request';

export const searchRepositoriesBeforeQuery = gql`
query($name: String!, $last: Int!, $before: String) {
  search(query: $name, type: REPOSITORY, last: $last, before: $before) {
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
          repositoryTopics(first: 100) {
            nodes {
              topic {
                name
              }
            }
          }
          languages (first: 10) {
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
