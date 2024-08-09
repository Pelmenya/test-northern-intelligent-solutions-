import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { gql } from 'graphql-request';
import type { RootState } from '../store';
import { client } from '../../gql/client';

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



// Асинхронный thunk для поиска репозиториев с пагинацией
export const searchRepositories = createAsyncThunk(
  'github/searchRepositories',
  async ({ repoName: name , first , after  }: { repoName: string,  first: number| null, after: number | null }) => {
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
    const variables: { name: string,  first: number| null, after: number | null } = { name, first, after };
    const response = await client.request(query, variables);
    console.log(response)
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
