import { alpha, createTheme } from '@mui/material';

const greyBase = '#000000';
const greyMain = alpha(greyBase, 0.87);

export const theme = createTheme({
    palette: {
        text: {
            primary: '#4F4F4F',
            secondary: greyMain,
            disabled: '#FFFFFF',
        },
        background: {
            default: '#4F4F4F',
            paper: '#F2F2F2',
        },
        primary: {
            main: '#2196F3',
            light: '#FFFFFF',
            dark: greyMain,
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#00838F',
            dark: 'rgba(33, 150, 243, 0.04)'
        },
    },
});