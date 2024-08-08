import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';
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

// Асинхронный thunk для загрузки данных из GitHub GraphQL API
export const fetchGithubData = createAsyncThunk('github/fetchData', async () => {
  const endpoint = 'https://api.github.com/graphql';
  const query = gql`
    {
      viewer {
        login
      }
    }
  `;
  const response = await request(endpoint, query);
  return response;
});

// Асинхронный thunk для поиска репозиториев с пагинацией
export const searchRepositories = createAsyncThunk(
  'github/searchRepositories',
  async ({ searchTerm, after, before }: { searchTerm: string; after?: string; before?: string }) => {
    const endpoint = 'https://api.github.com/graphql';
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
    const variables = { searchTerm, after, before };
    const response = await request(endpoint, query, variables);
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
      .addCase(fetchGithubData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGithubData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGithubData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
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
