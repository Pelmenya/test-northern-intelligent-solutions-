import { Typography, Box } from "@mui/material";

export type TIntroProps = {
    text: string;
};

export const Intro = ({ text }: TIntroProps) => {
    return (
        <Box sx={{
            display: 'flex',
            height: '100%',
            width:'100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant="caption" sx={{ fontSize: '46px' }}>
                Добро пожаловать
            </Typography>
        </Box>
    );
};
