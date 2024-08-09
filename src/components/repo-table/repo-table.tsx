import React from 'react';
import {
    CircularProgress,
    Alert,
    Button,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
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
import styles from './repo-table.module.scss';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

export const RepoTable: React.FC = () => {
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
            {searchLoading && <CircularProgress />}
            {searchResults.length ? (
                <>
                    {searchError && (
                        <Alert severity="error">{searchError}</Alert>
                    )}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 912, maxWidth:912}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Dessert (100g serving)
                                    </TableCell>
                                    <TableCell align="left">
                                        Calories
                                    </TableCell>
                                    <TableCell align="left">
                                        Fat&nbsp;(g)
                                    </TableCell>
                                    <TableCell align="left">
                                        Carbs&nbsp;(g)
                                    </TableCell>
                                    <TableCell align="left">
                                        Protein&nbsp;(g)
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map((repo) => (
                                    <TableRow
                                        key={repo.name}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {repo.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {repo.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {repo.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {repo.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {repo.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
