import { RootState } from "../store";

export const selectGithubLoading = (state: RootState) => state.github.loading;
export const selectGithubError = (state: RootState) => state.github.error;
export const selectSearchResults = (state: RootState) => state.github.searchResults;
export const selectSearchLoading = (state: RootState) => state.github.searchLoading;
export const selectSearchError = (state: RootState) => state.github.searchError;
export const selectEndCursor = (state: RootState) => state.github.endCursor;
export const selectHasNextPage = (state: RootState) => state.github.hasNextPage;
export const selectStartCursor = (state: RootState) => state.github.startCursor;
export const selectHasPreviousPage = (state: RootState) => state.github.hasPreviousPage;
