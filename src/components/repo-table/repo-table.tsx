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

import {
} from '../../store/selectors/github-selectors';
import { formatDate } from '../../utils/functions/formatDate';
import { TRepoNode } from '../../types/t-seach-repositories-response';

export type TRepoTableProps = {
    data: TRepoNode[];
    count: number;
}

export const RepoTable = ({ data, count } : TRepoTableProps) => {

    return (
        <Box>
            <Typography variant="h3">Результаты поиска</Typography>
            <TableContainer
                sx={{ boxShadow: 'none', marginTop: '24px' }}
                component={Paper}
            >
                <Table
                    sx={{ width: '100%', maxWidth: 912 }}
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
                                    maxWidth: '183px',
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
                                whiteSpace: 'wrap',
                            },
                        }}
                    >
                        {data.slice(0,count).map((repo) => (
                            <TableRow
                                key={repo.id}
                                sx={[
                                    {
                                        td: {
                                            lineHeight: '24px',
                                            padding: ' 0px 10px 0px 10px',
                                            height: '52px',
                                            width: '183px',
                                            maxWidth: '183px',
                                        },
                                    },
                                ]}
                            >
                                <TableCell component="th" scope="row">
                                    {repo.name}
                                </TableCell>
                                <TableCell align="left">
                                    {repo.primaryLanguage?.name
                                        ? repo.primaryLanguage.name
                                        : ''}
                                </TableCell>
                                <TableCell align="left">
                                    {repo?.forkCount}
                                </TableCell>
                                <TableCell align="left">
                                    {repo.stargazers?.totalCount}
                                </TableCell>
                                <TableCell align="left">
                                    {formatDate(repo.updatedAt)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
