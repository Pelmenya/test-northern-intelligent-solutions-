import { Box, ButtonBase, SelectChangeEvent, Typography } from '@mui/material';
import { SelectRows } from '../select-rows/select-rows';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export type TPaginationProps = {
    rowsPerPage: number;
    paginationBatch: number;
    repositoryCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    handlerSelect: (e: SelectChangeEvent<number>) => void;
    handlerNextPage: () => void;
    handlerPreviousPage: () => void;
};

export const Pagination = ({
    rowsPerPage,
    paginationBatch,
    repositoryCount,
    hasNextPage,
    hasPreviousPage,
    handlerSelect,
    handlerPreviousPage,
    handlerNextPage,
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
                <span>{paginationBatch - rowsPerPage + 1}</span>-
                <span>{paginationBatch}</span> of <span>{repositoryCount}</span>
            </Typography>
            <Box sx={{ display: 'flex', gap: '24px' }}>
                <ButtonBase
                    id="back"
                    onClick={handlerPreviousPage}
                    disabled={!hasPreviousPage}
                >
                    <ArrowBackIosIcon
                        sx={{ height: '12px', width: '12px', opacity: '.56' }}
                    />
                </ButtonBase>
                <ButtonBase
                    id="forward"
                    onClick={handlerNextPage}
                    disabled={!hasNextPage}
                >
                    <ArrowForwardIosIcon
                        sx={{ height: '12px', width: '12px', opacity: '.56' }}
                    />
                </ButtonBase>
            </Box>
        </Box>
    );
};
