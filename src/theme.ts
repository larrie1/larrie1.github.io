import '@fontsource/roboto';
import { alpha, PaletteMode } from '@mui/material';

// A custom theme for this app
export const theme = (mode: PaletteMode) => ({
    typography: {
        mode: mode,
        fontFamily: ['Roboto'].join(','),
    },
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#6C63FF',
                    contrastText: '#fff',
                },
                secondary: {
                    light: '#efecf4',
                    dark: '#bdbdbd',
                    main: alpha('#fff', .5),
                },
                background: {
                    default: '#fff',
                },
                error: {
                    main: '#0466c8',
                },
            } : {
                primary: {
                    main: '#6C63FF',
                    contrastText: '#fff',
                },
                secondary: {
                    light: '#19171c',
                    dark: '#424242',
                    main: alpha('#212529', .5),
                },
                background: {
                    default: '#212529',
                },
                error: {
                    main: '#0466c8',
                },
            })
    }
});
