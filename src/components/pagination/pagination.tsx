import { Box, ButtonBase, SelectChangeEvent, Typography } from '@mui/material';
import { SelectRows } from '../select-rows/select-rows';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export type TPaginationProps = {
    rowsPerPage: number;
    repositoryCount: number;
    handlerSelect: (e: SelectChangeEvent<number>) => void;
};

export const Pagination = ({
    rowsPerPage,
    repositoryCount,
    handlerSelect,
}: TPaginationProps) => {


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
                <SelectRows value={rowsPerPage} handleSelect={handlerSelect} />
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
            <Box sx={{ display: 'flex', gap: '24px' }}>
                <ButtonBase id="back">
                    <ArrowBackIosIcon
                        sx={{ height: '12px', width: '12px', opacity: '.56' }}
                    />{' '}
                </ButtonBase>
                <ButtonBase id="forward">
                    <ArrowForwardIosIcon
                        sx={{ height: '12px', width: '12px', opacity: '.56' }}
                    />
                </ButtonBase>
            </Box>
        </Box>
    );
};
