import { MouseEvent, useState } from 'react';
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

import {} from '../../store/selectors/github-selectors';
import { formatDate } from '../../utils/functions/formatDate';
import { TRepoNode } from '../../types/t-seach-repositories-response';
import { TSortFieldDirection } from '../../types/t-sort-field-direction';
import { TableSortCell } from './components/table-sort-cell/table-sort-cell';

export type TRepoTableProps = {
    data: TRepoNode[];
};

export const RepoTable = ({ data }: TRepoTableProps) => {
    const [sortForks, setForksSort] = useState<TSortFieldDirection>(null);
    const [sortStars, setStarsSort] = useState<TSortFieldDirection>(null);
    const [sortUpatedAt, setUpatedAtSort] =
        useState<TSortFieldDirection>('sort:updated-asc');

    const handleOnClickSort = (e: MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.id) {
            case 'forks':
                sortForks
                    ? sortForks === 'sort:forks-asc'
                        ? setForksSort('sort:forks-desc')
                        : setForksSort('sort:forks-asc')
                    : setForksSort('sort:forks-desc');
                setStarsSort(null);
                setUpatedAtSort(null);
                break;
            case 'stars':
                sortStars
                    ? sortStars === 'sort:stars-asc'
                        ? setStarsSort('sort:stars-desc')
                        : setStarsSort('sort:stars-asc')
                    : setStarsSort('sort:stars-desc');
                setForksSort(null);
                setUpatedAtSort(null);
                break;
            case 'updatedAt':
                sortUpatedAt
                    ? sortUpatedAt === 'sort:updated-asc'
                        ? setUpatedAtSort('sort:updated-desc')
                        : setUpatedAtSort('sort:updated-asc')
                    : setUpatedAtSort('sort:updated-desc');
                setStarsSort(null);
                setForksSort(null);
                break;
        }
    };

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
                            <TableCell align="left">
                                <TableSortCell
                                    id="forks"
                                    fieldName="Число форков"
                                    direction={sortForks}
                                    handleOnClick={handleOnClickSort}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <TableSortCell
                                    id="stars"
                                    fieldName="Число звезд"
                                    direction={sortStars}
                                    handleOnClick={handleOnClickSort}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <TableSortCell
                                    id="updatedAt"
                                    fieldName="Дата обновления"
                                    direction={sortUpatedAt}
                                    handleOnClick={handleOnClickSort}
                                />
                            </TableCell>
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
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            },
                        }}
                    >
                        {data.map((repo) => (
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
                                            whiteSpace: 'wrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
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
