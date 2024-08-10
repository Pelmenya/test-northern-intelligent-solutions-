import { Box, Typography } from '@mui/material';
import { SelectRows } from '../select-rows/select-rows';

export const Pagination = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                bottom: 0,
                right: 0,
                gap: '8px',
                alignItems: 'center',
            }}
        >
            <Typography variant="caption">Rows per page:</Typography>
            <SelectRows value={5} handleSelect={() => {}} />
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
                1-4 of 4
            </Typography>
        </Box>
    );
};
