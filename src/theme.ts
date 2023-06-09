import '@fontsource/roboto';
import { alpha, PaletteMode, Theme } from '@mui/material';

// A custom theme for this app
export const theme = (mode: PaletteMode) => ({
    components: {
        MuiLink: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) =>
                    theme.unstable_sx(
                        {
                            display: 'inline-block',
                            textDecoration: 'none',
                            border: 1,
                            color: 'primary.contrastText',
                            borderColor: 'secondary.dark',
                            padding: 1,
                            borderRadius: 2,
                        }
                    )
            }
        },
        MuiCard: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) =>
                    theme.unstable_sx(
                        {
                            key: Math.random(),
                            background: '#fff',
                            backgroundColor: 'secondary.light',
                            border: 1,
                            borderRadius: 2,
                            borderColor: 'secondary.dark',
                        }
                    ),
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) =>
                    theme.unstable_sx({
                        boxShadow: 'none',
                        borderBottom: 1,
                        background: '#fff',
                        borderColor: 'secondary.dark',
                        backgroundColor: 'secondary.main',
                        backdropFilter: `blur(10px)`,
                    })
            }
        },
        MuiButton: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) =>
                    theme.unstable_sx(
                        {
                            key: Math.random(),
                            borderRadius: 25,
                            borderColor: 'primary',
                            m: 1,
                        }
                    ),
            }
        },
        MuiIconButton: {
            defaultProps: {
                color: 'primary' as const,
            },
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) =>
                    theme.unstable_sx(
                        {
                            key: Math.random(),
                        }
                    ),
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) =>
                    theme.unstable_sx(
                        {
                            key: Math.random(),
                            background: 'transparent',
                            backdropFilter: `blur(20px)`,
                            height: '100%',
                            zIndex: 99,
                        }
                    ),
            }
        }
    },
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
                    contrastText: '#000',
                    light: alpha('#6C63FF', .5),
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
                    light: alpha('#6C63FF', .5),
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
    },
});
