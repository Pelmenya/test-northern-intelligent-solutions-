import { Box, ButtonBase, SelectChangeEvent, Typography } from '@mui/material';
import { SelectRows } from '../select-rows/select-rows';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
    selectRepositoryCount,
    selectRowsPerPage,
    selectSearchRepoName,
    selectSorts,
} from '../../store/selectors/github-selectors';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
    searchRepositories,
    setRowsPerPage,
} from '../../store/slices/github-slice';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Pagination = () => {
    const dispatch = useAppDispatch();
    const rowsPerPage = useAppSelector(selectRowsPerPage);
    const searchRepoName = useAppSelector(selectSearchRepoName);
    const repositoryCount = useAppSelector(selectRepositoryCount);
    const sorts = useAppSelector(selectSorts);
    const currentSort = Object.values(sorts).filter((item) => item !== null);

    const handleSelect = (e: SelectChangeEvent<number>) => {
        dispatch(setRowsPerPage(e.target.value));
        dispatch(
            searchRepositories({
                name: searchRepoName + ' ' + currentSort,
                first: Number(e.target.value),
                after: null,
            })
        );
    };

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
            <Box sx={{display: 'flex', gap: '24px'}}>
                <ButtonBase><ArrowBackIosIcon sx={{height: '12px', width: '12px', opacity:'.56'}} /> </ButtonBase>
                <ButtonBase><ArrowForwardIosIcon sx={{height: '12px', width: '12px', opacity:'.56'}} /></ButtonBase>
            </Box>
        </Box>
    );
};
