import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import '@fontsource/roboto';
import { alpha, Palette, PaletteMode } from '@mui/material';
import React from 'react';

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
                    main: alpha('#fff', .8),
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
                    main: alpha('#212529', .8),
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
