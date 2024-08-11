import React, { MouseEvent } from 'react';
import { Alert, Box, CircularProgress, SelectChangeEvent } from '@mui/material';
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
    selectSorts,
    selectSearchRepoName,
} from '../../store/selectors/github-selectors';
import { useAppSelector } from '../../hooks/use-app-selector';

import styles from './main.module.scss';
import { Pagination } from '../../components/pagination/pagination';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
    searchRepositories,
    setRowsPerPage,
    setSorts,
} from '../../store/slices/github-slice';

export const Main: React.FC = () => {
    const dispatch = useAppDispatch();
    const searchResults = useAppSelector(selectSearchResults);
    const searchLoading = useAppSelector(selectSearchLoading);
    const searchError = useAppSelector(selectSearchError);
    const rowsPerPage = useAppSelector(selectRowsPerPage);
    const repositoryCount = useAppSelector(selectRepositoryCount);
    const endCursor = useAppSelector(selectEndCursor);
    const hasNextPage = useAppSelector(selectHasNextPage);
    const startCursor = useAppSelector(selectStartCursor);
    const hasPreviousPage = useAppSelector(selectHasPreviousPage);
    const sorts = useAppSelector(selectSorts);
    const currentSort = Object.values(sorts).filter((item) => item !== null);
    const repoName = useAppSelector(selectSearchRepoName);

    const handlerSelect = (e: SelectChangeEvent<number>) => {
        dispatch(setRowsPerPage(e.target.value));
        dispatch(
            searchRepositories({
                name: repoName + ' ' + currentSort,
                first: Number(e.target.value),
                after: null,
            })
        );
    };

    const handlerOnClickSort = (e: MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.id) {
            case 'forks':
                if (sorts.forks === 'sort:forks-asc') {
                    dispatch(
                        setSorts({
                            forks: 'sort:forks-desc',
                            stars: null,
                            updatedAt: null,
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:forks-desc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                } else {
                    dispatch(
                        setSorts({
                            forks: 'sort:forks-asc',
                            stars: null,
                            updatedAt: null,
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:forks-asc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                }
                break;
            case 'stars':
                if (sorts.stars === 'sort:stars-asc') {
                    dispatch(
                        setSorts({
                            forks: null,
                            stars: 'sort:stars-desc',
                            updatedAt: null,
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:stars-desc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                } else {
                    dispatch(
                        setSorts({
                            forks: null,
                            stars: 'sort:stars-asc',
                            updatedAt: null,
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:stars-asc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                }
                break;
            case 'updatedAt':
                if (sorts.updatedAt === 'sort:updated-asc') {
                    dispatch(
                        setSorts({
                            forks: null,
                            stars: null,
                            updatedAt: 'sort:updated-desc',
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:updated-desc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                } else {
                    dispatch(
                        setSorts({
                            forks: null,
                            stars: null,
                            updatedAt: 'sort:updated-asc',
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:updated-asc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                }
                break;
        }
    };

    return (
        <main className={styles.main}>
            {searchError && <Alert severity="error">{searchError}</Alert>}
            {searchLoading && (
                <Intro>
                    <CircularProgress />
                </Intro>
            )}
            {!repositoryCount && !searchLoading && !searchError && (
                <Intro text="Добро пожаловать" />
            )}
            {repositoryCount && (
                <aside className={styles.leftSideBar}>
                    <RepoTable
                        data={searchResults}
                        sorts={sorts}
                        handlerOnClickSort={handlerOnClickSort}
                    />
                    <Box
                        sx={{
                            height: '52px',
                            minHeight: '52px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: '100%',
                            paddingRight: '16px',
                        }}
                    >
                        <Pagination
                            rowsPerPage={rowsPerPage}
                            repositoryCount={repositoryCount}
                            handlerSelect={handlerSelect}
                        />
                    </Box>
                </aside>
            )}
        </main>
    );
};
