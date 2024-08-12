import React, { FocusEvent, MouseEvent } from 'react';
import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';
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
    selectPaginationBatch,
    selectCurrentRepo,
} from '../../store/selectors/github-selectors';
import { useAppSelector } from '../../hooks/use-app-selector';

import styles from './main.module.scss';
import { Pagination } from '../../components/pagination/pagination';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
    searchRepositories,
    searchRepositoriesAfter,
    searchRepositoriesBefore,
    setCurrentRepo,
    setPaginationBatch,
    setRowsPerPage,
    setSorts,
} from '../../store/slices/github-slice';
import { getNotNullValueFromObject } from '../../utils/functions/get-not-null-value-from-object';
import { wrap } from 'module';

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
    const repoName = useAppSelector(selectSearchRepoName);
    const paginationBatch = useAppSelector(selectPaginationBatch);
    const sorts = useAppSelector(selectSorts);
    const currentRepo = useAppSelector(selectCurrentRepo);
    const topics = currentRepo?.repositoryTopics?.nodes?.map(
        (node) => node.topic.name
    );

    const currentSort = getNotNullValueFromObject(sorts);
    const searchString = repoName + ' ' + currentSort;

    const handlerSelect = (e: SelectChangeEvent<number>) => {
        dispatch(setRowsPerPage(e.target.value));
        dispatch(
            searchRepositories({
                name: searchString,
                first: Number(e.target.value),
            })
        );
        dispatch(setPaginationBatch(Number(e.target.value)));
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
                        })
                    );
                }
                break;
        }
    };

    const handlerNextPage = () => {
        if (endCursor) {
            dispatch(
                searchRepositoriesAfter({
                    name: searchString,
                    first: rowsPerPage,
                    after: endCursor,
                })
            );
            dispatch(setPaginationBatch(paginationBatch + rowsPerPage));
        }
    };

    const handlerPreviousPage = () => {
        if (startCursor) {
            dispatch(
                searchRepositoriesBefore({
                    name: searchString,
                    last: rowsPerPage,
                    before: startCursor,
                })
            );
            dispatch(setPaginationBatch(paginationBatch - rowsPerPage));
        }
    };

    const handlerOnFocusTableRow = (e: FocusEvent<HTMLTableRowElement>) => {
        dispatch(
            setCurrentRepo(
                searchResults.find((item) => item.id === e.currentTarget.id) ||
                    null
            )
        );
    };

    const handlerOnBlurTableRow = (e: FocusEvent<HTMLTableRowElement>) => {
        dispatch(setCurrentRepo(null));
    };

    return (
        <main className={styles.main}>
            {searchError && <Alert severity="error">{searchError}</Alert>}
            {searchLoading && (
                <Intro>
                    <CircularProgress />
                </Intro>
            )}
            {repositoryCount === null && !searchLoading && !searchError && (
                <Intro text="Добро пожаловать" />
            )}
            {repositoryCount === 0 && !searchLoading && !searchError && (
                <Intro text="Ничего не найдено" />
            )}
            {repositoryCount && (
                <>
                    <aside className={styles.leftSideBar}>
                        <RepoTable
                            data={searchResults}
                            sorts={sorts}
                            handlerOnClickSort={handlerOnClickSort}
                            handlerOnFocusTableRow={handlerOnFocusTableRow}
                            handlerOnBlurTableRow={handlerOnBlurTableRow}
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
                                paginationBatch={paginationBatch}
                                repositoryCount={repositoryCount}
                                hasNextPage={hasNextPage}
                                hasPreviousPage={hasPreviousPage}
                                handlerSelect={handlerSelect}
                                handlerNextPage={handlerNextPage}
                                handlerPreviousPage={handlerPreviousPage}
                            />
                        </Box>
                    </aside>
                    <aside className={styles.rightSideBar}>
                        {currentRepo ? (
                            <>
                                {' '}
                                <Typography
                                    variant="h4"
                                    sx={{ fontSize: '32px' }}
                                >
                                    {currentRepo.name}
                                </Typography>
                                <Stack
                                    direction="row"
                                    sx={{ flexWrap: 'wrap' }}
                                >
                                    {topics &&
                                        topics.map((topic) => (
                                            <Chip
                                                label={topic}
                                                sx={{
                                                    marginBottom: '8px',
                                                    marginRight: '8px',
                                                }}
                                            />
                                        ))}
                                </Stack>
                            </>
                        ) : (
                            <Intro>
                                <Typography variant="body2">
                                    Выберите репозиторий
                                </Typography>
                            </Intro>
                        )}
                    </aside>
                </>
            )}
        </main>
    );
};
