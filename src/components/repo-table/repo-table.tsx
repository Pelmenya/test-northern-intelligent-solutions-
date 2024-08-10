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
    Box,
} from '@mui/material';
import { useAppSelector } from '../../hooks/use-app-selector';

import styles from './repo-table.module.scss';
import { selectRowsPerPage, selectSearchResults } from '../../store/selectors/github-selectors';
import { formatDate } from '../../utils/functions/formatDate';
import { SelectRows } from '../select-rows/select-rows';

export const RepoTable: React.FC = () => {
    const searchResults = useAppSelector(selectSearchResults);
    const rowPerPage = useAppSelector(selectRowsPerPage);

    return (
        <aside className={styles.main}>
            <Typography variant="h3">Результаты поиска</Typography>
            <TableContainer
                sx={{ boxShadow: 'none', marginTop: '24px' }}
                component={Paper}
            >
                <Table
                    sx={{ width: 912, maxWidth: 912 }}
                    aria-label="simple table"
                >
                    <TableHead
                        sx={[
                            {
                                th: {
                                    fontWeight: 500,
                                    lineHeight: '24px',
                                    padding: ' 0px 10px 0px 10px',
                                    opacity: 1,
                                    color: 'text.secondary',
                                    height: '56px',
                                    width: '183px',
                                    maxWidth: '183px'
                                },
                            },
                        ]}
                    >
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align="left">Язык</TableCell>
                            <TableCell align="left">Число форков</TableCell>
                            <TableCell align="left">Число звезд</TableCell>
                            <TableCell align="left">Дата обновления</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            th: {
                                lineHeight: '24px',
                                padding: ' 0px 10px 0px 10px',
                                height: '52px',
                                width: '183px',
                                maxWidth: '183px',
                                whiteSpace: 'wrap'
                        },
                        }}
                    >
                        {searchResults.map((repo) => (
                            <TableRow
                                key={repo.id}
                                sx={[
                                    {
                                        td: {
                                            lineHeight: '24px',
                                            padding: ' 0px 10px 0px 10px',
                                            height: '52px',
                                            width: '183px',
                                            maxWidth: '183px'
                                        },
                                    },
                                ]}
                            >
                                <TableCell component="th" scope="row">{repo.name}</TableCell>
                                <TableCell align="left">{repo.primaryLanguage?.name ? repo.primaryLanguage.name : ''}</TableCell>
                                <TableCell align="left">{repo?.forkCount}</TableCell>
                                <TableCell align="left">{repo.stargazers?.totalCount}</TableCell>
                                <TableCell align="left">{formatDate(repo.updatedAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{
                display: 'flex',
                position: 'absolute',
                bottom:0,
                right: 0,
                gap: '8px',
                alignItems: 'center'
            }}>
                <Typography variant='caption'>Rows per page:</Typography>
                <SelectRows value={5} handleSelect={() => {}}/>
            </Box>
            
        </aside>
    );
};
