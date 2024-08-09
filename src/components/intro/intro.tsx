import { Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

export type TIntroProps = {
    text?: string;
    children?: ReactNode;
};

export const Intro = ({ text, children }: TIntroProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="caption" sx={{ fontSize: '46px' }}>
                {text}
            </Typography>
            <div>{children}</div>
        </Box>
    );
};
