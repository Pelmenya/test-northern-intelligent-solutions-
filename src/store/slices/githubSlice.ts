import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { gql, GraphQLClient } from 'graphql-request';
import type { RootState } from '../store';

interface GithubState {
  data: any;
  loading: boolean;
  error: string | null;
  searchResults: any[];
  searchLoading: boolean;
  searchError: string | null;
  searchTerm: string;
  endCursor: string | null;
  hasNextPage: boolean;
  startCursor: string | null;
  hasPreviousPage: boolean;
}

const initialState: GithubState = {
  data: null,
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  searchError: null,
  searchTerm: '',
  endCursor: null,
  hasNextPage: false,
  startCursor: null,
  hasPreviousPage: false,
};

const endpoint = '/graphql';

const token = process.env.REACT_APP_GITHUB_TOKEN;
const client = new GraphQLClient(endpoint, {
  headers: {

    Authorization: `Bearer ${token}`,

  },
  credentials: 'include'
});


const fetchGithubData = async ({ searchTerm, after, before }: { searchTerm: string; after?: string; before?: string }) => {
  const query = gql`
    query($searchTerm: String!, $after: String, $before: String) {
      search(query: $searchTerm, type: REPOSITORY, first: 10, after: $after, before: $before) {
        edges {
          node {
            ... on Repository {
              name
              owner {
                login
              }
              stargazerCount
              url
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
          hasPreviousPage
        }
      }
    }
  `;
  const variables: { searchTerm: string; after?: string; before?: string } = { searchTerm, after, before };
  const response = await client.request(endpoint, query, variables);
  return { results: response.search.edges.map((edge: any) => edge.node), pageInfo: response.search.pageInfo };
}
const search = async (repoName: string, first = 10, after = null) => {
  const query = gql`
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

  const variables = {
    name: repoName,
    first,
    after,
  };

  try {
    const data = await client.request(query, variables);
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error(error);
  }
};

// Пример вызова функции для поиска репозиториев с названием 'graphql-request'
search('graphql-request');




// Асинхронный thunk для поиска репозиториев с пагинацией
export const searchRepositories = createAsyncThunk(
  'github/searchRepositories',
  async ({ searchTerm, after, before }: { searchTerm: string; after?: string; before?: string }) => {
    const query = gql`
      query($searchTerm: String!, $after: String, $before: String) {
        search(query: $searchTerm, type: REPOSITORY, first: 10, after: $after, before: $before) {
          edges {
            node {
              ... on Repository {
                name
                owner {
                  login
                }
                stargazerCount
                url
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            startCursor
            hasPreviousPage
          }
        }
      }
    `;
    const variables: { searchTerm: string; after?: string; before?: string } = { searchTerm, after, before };
    const response = await client.request(endpoint, query, variables);
    return { results: response.search.edges.map((edge: any) => edge.node), pageInfo: response.search.pageInfo };
  }
);

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRepositories.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchRepositories.fulfilled, (state, action: PayloadAction<{ results: any[]; pageInfo: any }>) => {
        state.searchLoading = false;
        state.searchResults = action.payload.results;
        state.endCursor = action.payload.pageInfo.endCursor;
        state.hasNextPage = action.payload.pageInfo.hasNextPage;
        state.startCursor = action.payload.pageInfo.startCursor;
        state.hasPreviousPage = action.payload.pageInfo.hasPreviousPage;
      })
      .addCase(searchRepositories.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error.message || 'Failed to search repositories';
      });
  },
});

export const { setSearchTerm } = githubSlice.actions;

export const selectGithubData = (state: RootState) => state.github.data;
export const selectGithubLoading = (state: RootState) => state.github.loading;
export const selectGithubError = (state: RootState) => state.github.error;
export const selectSearchResults = (state: RootState) => state.github.searchResults;
export const selectSearchLoading = (state: RootState) => state.github.searchLoading;
export const selectSearchError = (state: RootState) => state.github.searchError;
export const selectSearchTerm = (state: RootState) => state.github.searchTerm;
export const selectEndCursor = (state: RootState) => state.github.endCursor;
export const selectHasNextPage = (state: RootState) => state.github.hasNextPage;
export const selectStartCursor = (state: RootState) => state.github.startCursor;
export const selectHasPreviousPage = (state: RootState) => state.github.hasPreviousPage;

export default githubSlice.reducer;
