import React from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { Intro } from '../intro/intro';
import { RepoTable } from '../repo-table/repo-table';

import {
    selectSearchResults,
    selectSearchLoading,
    selectSearchError,
    selectEndCursor,
    selectHasNextPage,
    selectStartCursor,
    selectHasPreviousPage,
    selectSearchTerm,
} from '../../store/selectors/github-selectors';
import { useAppSelector } from '../../hooks/use-app-selector';

import styles from './main.module.scss';

export const Main: React.FC = () => {
    const searchResults = useAppSelector(selectSearchResults);
    const searchLoading = useAppSelector(selectSearchLoading);
    const searchError = useAppSelector(selectSearchError);
    const searchTerm = useAppSelector(selectSearchTerm);
    const endCursor = useAppSelector(selectEndCursor);
    const hasNextPage = useAppSelector(selectHasNextPage);
    const startCursor = useAppSelector(selectStartCursor);
    const hasPreviousPage = useAppSelector(selectHasPreviousPage);

    return (
        <main className={styles.main}>
            {searchError && <Alert severity="error">{searchError}</Alert>}
            {searchLoading && (
                <Intro>
                    <CircularProgress />
                </Intro>
            )}
            {!searchResults.length && !searchLoading && !searchError && (
                <Intro text="Добро пожаловать" />
            )}
            {searchResults.length ? <RepoTable /> : <></>}
        </main>
    );
};
