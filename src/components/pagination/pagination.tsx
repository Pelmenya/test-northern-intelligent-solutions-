import { Box, SelectChangeEvent, Typography } from '@mui/material';
import { SelectRows } from '../select-rows/select-rows';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectRepositoryCount, selectRowsPerPage, selectSerchRepoName } from '../../store/selectors/github-selectors';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { searchRepositories, setRowsPerPage } from '../../store/slices/github-slice';

export const Pagination = () => {
    const dispatch = useAppDispatch();
    const rowsPerPage = useAppSelector(selectRowsPerPage);
    const searchRepoName = useAppSelector(selectSerchRepoName);
    const repositoryCount = useAppSelector(selectRepositoryCount);

    const handleSelect = (e: SelectChangeEvent<number>) => {
        dispatch(setRowsPerPage(e.target.value))
        dispatch(searchRepositories({
            name: searchRepoName,
            first: Number(e.target.value),
            after: null,
        }))
    }


    return (
        <Box
            sx={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                }}
            >
                <Typography variant="caption">Rows per page:</Typography>
                <SelectRows value={rowsPerPage} handleSelect={handleSelect} />
            </Box>
            <Typography
                sx={{
                    fontSize: '12px',
                    marginTop: '2px',
                    color: 'text.secondary',
                    opacity: 1,
                    fontWeight: 500,
                }}
                variant="caption"
            >
                1-4 of <span>{repositoryCount}</span>
            </Typography>
            <Box></Box>
        </Box>
    );
};
