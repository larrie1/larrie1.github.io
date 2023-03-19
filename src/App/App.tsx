import { Container, CssBaseline, PaletteMode } from "@mui/material";
import React, { useState } from "react";
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { ColorModeContext } from "../color-context";
import { Game } from "../Game";
import { Generator } from "../Generator";
import { Start } from "../Start";
import { theme as getDesignTokens } from "../theme";
import { NavBar } from "../Utils";

export function App() {
    const prefersDarkMode = useMediaQuery('prefers-color-scheme: dark)');
    localStorage.setItem(
        'mode',
        localStorage.getItem('mode') === null ?
            prefersDarkMode === true ? 'dark' : 'light' :
            localStorage.getItem('mode') as PaletteMode)
    const [mode, setMode] = useState<PaletteMode>(localStorage.getItem('mode') as PaletteMode)
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
                localStorage.setItem('mode', localStorage.getItem('mode') === 'dark' ? 'light' : 'dark');
            },
        }),
        [],
    );

    let theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    theme = responsiveFontSizes(theme);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HashRouter>
                    <NavBar />
                    <Container maxWidth='xl'>
                        <Routes>
                            <Route path='/' element={<Start />} />
                            <Route path='/game' element={<Game />} />
                            <Route path='/generator' element={<Generator />} />
                        </Routes>
                    </Container>
                </HashRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}