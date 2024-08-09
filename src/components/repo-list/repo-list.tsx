import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Alert,
    Button,
    Typography,
} from '@mui/material';
import {
    selectSearchResults,
    selectSearchLoading,
    selectSearchError,
    selectEndCursor,
    selectHasNextPage,
    selectStartCursor,
    selectHasPreviousPage,
    searchRepositories,
    selectSearchTerm,
} from '../../store/slices/githubSlice';
import styles from './repo-list.module.scss';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

export const RepoList: React.FC = () => {
    const dispatch = useAppDispatch();
    const searchResults = useAppSelector(selectSearchResults);
    const searchLoading = useAppSelector(selectSearchLoading);
    const searchError = useAppSelector(selectSearchError);
    const searchTerm = useAppSelector(selectSearchTerm);
    const endCursor = useAppSelector(selectEndCursor);
    const hasNextPage = useAppSelector(selectHasNextPage);
    const startCursor = useAppSelector(selectStartCursor);
    const hasPreviousPage = useAppSelector(selectHasPreviousPage);

    const handleNextPage = () => {
        if (endCursor) {
            dispatch(
                searchRepositories({
                    repoName: searchTerm,
                    first: 10,
                    after: 10,
                })
            );
        }
    };

    const handlePreviousPage = () => {
        if (startCursor) {
            dispatch(
                searchRepositories({
                    repoName: searchTerm,
                    first: 10,
                    after: 10,
                })
            );
        }
    };

    return (
        <main className={styles.main}>
            {searchResults.length ? (
                <>
                    {searchLoading && <CircularProgress />}
                    {searchError && (
                        <Alert severity="error">{searchError}</Alert>
                    )}
                    <List>
                        {searchResults.map((repo) => (
                            <ListItem
                                key={repo.url}
                                button
                                component="a"
                                href={repo.url}
                            >
                                <ListItemText
                                    primary={repo.name}
                                    secondary={`Owner: ${repo.owner.login} | Stars: ${repo.stargazerCount}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <div className={styles.pagination}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePreviousPage}
                            disabled={!hasPreviousPage || searchLoading}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNextPage}
                            disabled={!hasNextPage || searchLoading}
                        >
                            Next
                        </Button>
                    </div>
                </>
            ) : (
                <div className={styles.promt}>
                    <Typography sx={{ fontSize: '46px' }}>
                        Добро пожаловать
                    </Typography>
                </div>
            )}
        </main>
    );
};
