import { Container, CssBaseline, PaletteMode } from "@mui/material";
import React, { useState } from "react";
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Routes, Route } from "react-router";
import { HashRouter } from "react-router-dom";
import { userPrefsContext } from "../context";
import { Game } from "../Game";
import { Generator } from "../Generator";
import { Start } from "../Start";
import { theme as getDesignTokens } from "../theme";
import { NavBar, Footer } from "../Utils";
import { NotFound } from "../Utils/NotFound";
import { strings } from "../Res/localization";
import { CreateTableDialog } from "../Generator/TableDialog";

export function App() {
    const prefersDarkMode = useMediaQuery('prefers-color-scheme: dark)');
    const [locale, setLocale] = useState(localStorage.getItem('locale') === null ? (strings.getInterfaceLanguage() === 'de' ? 'de' : 'en') : localStorage.getItem('locale')!!)
    strings.setLanguage(locale)
    localStorage.setItem('locale', locale)
    localStorage.setItem(
        'mode',
        localStorage.getItem('mode') === null ?
            prefersDarkMode === true ? 'dark' : 'light' :
            localStorage.getItem('mode') as PaletteMode)
    const [mode, setMode] = useState<PaletteMode>(localStorage.getItem('mode') as PaletteMode)
    const userPrefs = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
                localStorage.setItem('mode', localStorage.getItem('mode') === 'dark' ? 'light' : 'dark')
            },
            toggleLocale: () => {
                setLocale((prevLocale: string) => prevLocale === 'en' ? 'de' : 'en')
                localStorage.setItem('locale', locale)
                strings.setLanguage(locale)
            }
        }),
        [],
    );

    let theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    theme = responsiveFontSizes(theme);

    return (
        <userPrefsContext.Provider value={userPrefs}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HashRouter>
                    <NavBar />
                    <Container maxWidth='xl' sx={{pt: '64px'}}>
                        <Routes>
                            <Route path='/' element={<Start />} />
                            <Route path='/game' element={<Game />} />
                            <Route path='/generator' element={<CreateTableDialog />} />
                            <Route path='/*' element={<NotFound />} />
                        </Routes>
                    </Container>
                    <Footer />
                </HashRouter>
            </ThemeProvider>
        </userPrefsContext.Provider>
    )
}