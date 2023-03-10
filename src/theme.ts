import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto';

// A custom theme for this app
const theme = createTheme({
    typography: {
        allVariants: {
            color: 'white',
        },
        fontFamily: ['Roboto'].join(','),
    },
    palette: {
        primary: {
            main: '#33415c',
        },
        secondary: {
            main: '#343FFC',
        },
        background: {
            default: '#212529',
        },
        error: {
            main: '#0466c8',
        },
    },
});

export default theme;