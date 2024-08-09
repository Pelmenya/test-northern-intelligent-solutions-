import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { gql } from 'graphql-request';
import { client } from '../../gql/client';
import { searchRepositoriesQuery } from '../../gql/queries/seach-repositories-query';
import { Node, TSeachRepositoriesResponse } from '../../types/t-seach-repositories-response';

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
  async ({ repoName: name, first, after }: { repoName: string, first: number | null, after: number | null }) => {
    const variables: { name: string, first: number | null, after: number | null } = { name, first, after };
    const response: TSeachRepositoriesResponse = await client.request(searchRepositoriesQuery, variables);
    console.log(response)
    return { results: response.search.edges.map((edge) => edge.node), pageInfo: response.search.pageInfo, repositoryCount: response.search.repositoryCount };
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

export const githubReducer = githubSlice.reducer;
