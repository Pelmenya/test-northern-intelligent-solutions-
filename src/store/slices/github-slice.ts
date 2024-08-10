import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../../gql/client';
import { searchRepositoriesQuery } from '../../gql/queries/seach-repositories-query';
import { TRepoNode, TRepoPageInfo, TSeachRepositoriesResponse } from '../../types/t-seach-repositories-response';
import { initialRowsPerPage } from '../../utils/constants/initilal-rows-per-page';
import { TSeachRepositoriesDTO } from '../../types/t-seach-repositories-dto';

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
  repositoryCount: null
}



// Асинхронный thunk для поиска репозиториев с пагинацией
export const searchRepositories = createAsyncThunk(
  'github/searchRepositories',
  async (dto: TSeachRepositoriesDTO) => {
    const response: TSeachRepositoriesResponse = await client.request(searchRepositoriesQuery, dto);
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
      });
  },
});

export const { setRowsPerPage, setSeachRepoName } = githubSlice.actions;

export const githubReducer = githubSlice.reducer;
