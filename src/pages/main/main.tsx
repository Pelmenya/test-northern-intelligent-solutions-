import React from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';
import { Intro } from '../../components/intro/intro';
import { RepoTable } from '../../components/repo-table/repo-table';

import {
    selectSearchResults,
    selectSearchLoading,
    selectSearchError,
    selectEndCursor,
    selectHasNextPage,
    selectStartCursor,
    selectHasPreviousPage,
    selectRowsPerPage,
    selectRepositoryCount,
} from '../../store/selectors/github-selectors';
import { useAppSelector } from '../../hooks/use-app-selector';

import styles from './main.module.scss';
import { Pagination } from '../../components/pagination/pagination';

export const Main: React.FC = () => {
    const searchResults = useAppSelector(selectSearchResults);
    const searchLoading = useAppSelector(selectSearchLoading);
    const searchError = useAppSelector(selectSearchError);
    const rowsPerPage = useAppSelector(selectRowsPerPage);
    const repositoryCount = useAppSelector(selectRepositoryCount);
    const endCursor = useAppSelector(selectEndCursor);
    const hasNextPage = useAppSelector(selectHasNextPage);
    const startCursor = useAppSelector(selectStartCursor);
    const hasPreviousPage = useAppSelector(selectHasPreviousPage);
    console.log(rowsPerPage);

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
            {repositoryCount && (
                <aside className={styles.leftSideBar}>
                    <RepoTable />
                    <Box
                        sx={{
                            height: '52px',
                            minHeight:'52px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: '100%',
                        }}
                    >
                        <Pagination />
                    </Box>
                </aside>
            )}
        </main>
    );
};
