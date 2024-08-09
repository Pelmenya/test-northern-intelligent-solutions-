import { alpha, createTheme } from '@mui/material';

const greyBase = '#000000';
const greyMain = alpha(greyBase, 0.92);

export const theme = createTheme({
    palette: {
        text: {
            primary: '#4F4F4F',
            secondary: '#00000',
            disabled: '#ffffff',
        },
        background: {
            default: '#4F4F4F',
            paper: '#F2F2F2',
        },
        primary: {
            main: '#2196F3',
            light: '#ffffff',
            dark: greyMain,
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#00838F',
            dark: greyMain
        },
    },
});