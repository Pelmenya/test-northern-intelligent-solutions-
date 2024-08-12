import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../../gql/client';
import { searchRepositoriesQuery } from '../../gql/queries/seach-repositories-query';
import { TRepoNode, TRepoPageInfo, TSeachRepositoriesResponse } from '../../types/t-seach-repositories-response';
import { initialRowsPerPage } from '../../utils/constants/initilal-rows-per-page';
import { TSeachRepositoriesDTO } from '../../types/t-seach-repositories-dto';

import { TSorts } from '../../types/t-sorts';
import { searchRepositoriesBeforeQuery } from '../../gql/queries/seach-repositories-before-query';
import { TSeachRepositoriesBeforeDTO } from '../../types/t-seach-repositories-before-dto';
import { TSeachRepositoriesAfterDTO } from '../../types/t-seach-repositories-after-dto';
import { searchRepositoriesAfterQuery } from '../../gql/queries/seach-repositories-after-query';

interface GithubState {
  searchLoading: boolean;
  searchError: string | null;
  searchResults: TRepoNode[];
  searchRepoName: string;
  endCursor: string | null;
  hasNextPage: boolean;
  startCursor: string | null;
  hasPreviousPage: boolean;
  rowsPerPage: number;
  repositoryCount: number | null;
  sorts: TSorts;
  paginationBatch: number;
  currentRepo: TRepoNode | null
}

const initialState: GithubState = {
  searchResults: [],
  searchLoading: false,
  searchError: null,
  searchRepoName: '',
  endCursor: null,
  hasNextPage: false,
  startCursor: null,
  hasPreviousPage: false,
  rowsPerPage: initialRowsPerPage,
  repositoryCount: null,
  sorts: {
    forks: null,
    stars: null,
    updatedAt: 'sort:updated-desc'
  },
  paginationBatch: initialRowsPerPage,
  currentRepo: null
}

// Асинхронный thunk для поиска репозиториев
export const searchRepositories = createAsyncThunk(
  'github/searchRepositories',
  async (dto: TSeachRepositoriesDTO) => {
    const response: TSeachRepositoriesResponse = await client.request(searchRepositoriesQuery, dto);
    return { results: response.search.edges.map((edge) => edge.node), pageInfo: response.search.pageInfo, repositoryCount: response.search.repositoryCount };
  }
);

// Асинхронный thunk для поиска репозиториев с пагинацией назад
export const searchRepositoriesBefore = createAsyncThunk(
  'github/searchRepositoriesBefore',
  async (dto: TSeachRepositoriesBeforeDTO) => {
    const response: TSeachRepositoriesResponse = await client.request(searchRepositoriesBeforeQuery, dto);
    return { results: response.search.edges.map((edge) => edge.node), pageInfo: response.search.pageInfo, repositoryCount: response.search.repositoryCount };
  }
);

// Асинхронный thunk для поиска репозиториев с пагинацией назад
export const searchRepositoriesAfter = createAsyncThunk(
  'github/searchRepositoriesAfter',
  async (dto: TSeachRepositoriesAfterDTO) => {
    const response: TSeachRepositoriesResponse = await client.request(searchRepositoriesAfterQuery, dto);
    return { results: response.search.edges.map((edge) => edge.node), pageInfo: response.search.pageInfo, repositoryCount: response.search.repositoryCount };
  }
);

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setRowsPerPage(state, action) {
      state.rowsPerPage = action.payload;
    },
    setSeachRepoName(state, action) {
      state.searchRepoName = action.payload;
    },
    setSorts(state, action: PayloadAction<TSorts>) {
      state.sorts = action.payload;
    },
    setPaginationBatch(state, action: PayloadAction<number>) {
      state.paginationBatch = action.payload;
    },
    setCurrentRepo(state, action: PayloadAction<TRepoNode | null>) {
      state.currentRepo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRepositories.pending, (state) => {
        state.repositoryCount = null;
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchRepositories.fulfilled, (state, action: PayloadAction<{ results: TRepoNode[]; pageInfo: TRepoPageInfo; repositoryCount: number }>) => {
        state.searchLoading = false;
        state.searchResults = action.payload.results;
        state.endCursor = action.payload.pageInfo.endCursor;
        state.hasNextPage = action.payload.pageInfo.hasNextPage;
        state.startCursor = action.payload.pageInfo.startCursor;
        state.hasPreviousPage = action.payload.pageInfo.hasPreviousPage;
        state.repositoryCount = action.payload.repositoryCount;
      })
      .addCase(searchRepositories.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error.message || 'Failed to search repositories';
      })
      .addCase(searchRepositoriesBefore.pending, (state) => {
        state.repositoryCount = null;
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchRepositoriesBefore.fulfilled, (state, action: PayloadAction<{ results: TRepoNode[]; pageInfo: TRepoPageInfo; repositoryCount: number }>) => {
        state.searchLoading = false;
        state.searchResults = action.payload.results;
        state.endCursor = action.payload.pageInfo.endCursor;
        state.hasNextPage = action.payload.pageInfo.hasNextPage;
        state.startCursor = action.payload.pageInfo.startCursor;
        state.hasPreviousPage = action.payload.pageInfo.hasPreviousPage;
        state.repositoryCount = action.payload.repositoryCount;
      })
      .addCase(searchRepositoriesBefore.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error.message || 'Failed to search repositories';
      })
      .addCase(searchRepositoriesAfter.pending, (state) => {
        state.repositoryCount = null;
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchRepositoriesAfter.fulfilled, (state, action: PayloadAction<{ results: TRepoNode[]; pageInfo: TRepoPageInfo; repositoryCount: number }>) => {
        state.searchLoading = false;
        state.searchResults = action.payload.results;
        state.endCursor = action.payload.pageInfo.endCursor;
        state.hasNextPage = action.payload.pageInfo.hasNextPage;
        state.startCursor = action.payload.pageInfo.startCursor;
        state.hasPreviousPage = action.payload.pageInfo.hasPreviousPage;
        state.repositoryCount = action.payload.repositoryCount;
      })
      .addCase(searchRepositoriesAfter.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error.message || 'Failed to search repositories';
      });
  },
});

export const {
  setRowsPerPage,
  setSeachRepoName,
  setSorts, 
  setPaginationBatch,
  setCurrentRepo
} = githubSlice.actions;

export const githubReducer = githubSlice.reducer;
