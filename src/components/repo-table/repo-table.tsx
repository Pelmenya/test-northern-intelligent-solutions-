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
import { formatDate } from '../../utils/functions/format-date';
import { TRepoNode } from '../../types/t-seach-repositories-response';
import { TableSortCell } from './components/table-sort-cell/table-sort-cell';
import { TSorts } from '../../types/t-sorts';
import { FocusEvent, MouseEvent } from 'react';

export type TRepoTableProps = {
    data: TRepoNode[];
    sorts: TSorts;
    handlerOnClickSort: (e: MouseEvent<HTMLButtonElement>) => void;
    handlerOnFocusTableRow: (e: FocusEvent<HTMLTableRowElement>) => void;
    handlerOnBlurTableRow: (e: FocusEvent<HTMLTableRowElement>) => void;
};

export const RepoTable = ({
    data,
    sorts,
    handlerOnClickSort,
    handlerOnFocusTableRow,
    handlerOnBlurTableRow
}: TRepoTableProps) => {
    return (
        <Box>
            <Typography variant="h3">Результаты поиска</Typography>
            <TableContainer
                sx={{
                    boxShadow: 'none',
                    marginTop: '24px',
                    backgroundColor: 'primary.light',
                }}
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
                                    direction={sorts.forks}
                                    handleOnClick={handlerOnClickSort}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <TableSortCell
                                    id="stars"
                                    fieldName="Число звезд"
                                    direction={sorts.stars}
                                    handleOnClick={handlerOnClickSort}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <TableSortCell
                                    id="updatedAt"
                                    fieldName="Дата обновления"
                                    direction={sorts.updatedAt}
                                    handleOnClick={handlerOnClickSort}
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
                                tabIndex={0}
                                id={repo.id}
                                onFocus={handlerOnFocusTableRow}
                                onBlur={handlerOnBlurTableRow}
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
                                    {
                                        '&:focus': {
                                            backgroundColor: 'secondary.dark',
                                        },
                                    },
                                    {
                                        '&:hover': {
                                            backgroundColor: 'secondary.dark',
                                            cursor: 'pointer',
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
