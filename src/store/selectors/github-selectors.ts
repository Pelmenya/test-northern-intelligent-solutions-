import { RootState } from "../store";

export const selectSearchLoading = (state: RootState) => state.github.searchLoading;
export const selectSearchError = (state: RootState) => state.github.searchError;
export const selectSearchResults = (state: RootState) => state.github.searchResults;
export const selectEndCursor = (state: RootState) => state.github.endCursor;
export const selectHasNextPage = (state: RootState) => state.github.hasNextPage;
export const selectStartCursor = (state: RootState) => state.github.startCursor;
export const selectHasPreviousPage = (state: RootState) => state.github.hasPreviousPage;
export const selectRowsPerPage = (state: RootState) => state.github.rowsPerPage;
export const selectRepositoryCount = (state: RootState) => state.github.repositoryCount;
export const selectSearchRepoName = (state: RootState) => state.github.searchRepoName;
export const selectSorts = (state: RootState) => state.github.sorts;
