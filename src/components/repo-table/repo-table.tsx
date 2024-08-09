import React from 'react';
import {
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';
import { useAppSelector } from '../../hooks/use-app-selector';

import styles from './repo-table.module.scss';
import { selectSearchResults } from '../../store/selectors/github-selectors';

export const RepoTable: React.FC = () => {
    const searchResults = useAppSelector(selectSearchResults);
    return (
        <aside className={styles.main}>
            <Typography variant="h3">Результаты поиска</Typography>
            <TableContainer component={Paper}>
                <Table
                    sx={{ width: 912, maxWidth: 912 }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="left">Calories</TableCell>
                            <TableCell align="left">Fat&nbsp;(g)</TableCell>
                            <TableCell align="left">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="left">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((repo) => (
                            <TableRow
                                key={repo.name}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {repo.name}
                                </TableCell>
                                <TableCell align="left">{repo.name}</TableCell>
                                <TableCell align="left">{repo.name}</TableCell>
                                <TableCell align="left">{repo.name}</TableCell>
                                <TableCell align="left">{repo.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </aside>
    );
};
