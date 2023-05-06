import Game from "../Game";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles'
import { Routes, Route } from "react-router";
import { HashRouter } from "react-router-dom";
import { userPrefsContext } from "../context";
import { Start } from "../Start";
import { NavBar, Footer } from "../Utils";
import { NotFound } from "../Utils/NotFound";
import { Generator } from "../Generator/Generator";
import { _appState } from './appState'

/**
 *  This Method returns the whole app.
 *  It controls the routing and provides the App with the Theme and user Prefernces.
 * 
 * @returns The UI of the Web-App.
 */
export function App() {
    const state = _appState()

    return (
        <userPrefsContext.Provider value={state.userPrefs}>
            <ThemeProvider theme={state.theme}>
                <CssBaseline />
                <HashRouter>
                    <NavBar />
                    <Container maxWidth='xl' sx={{pt: '64px'}}>
                        <Routes>
                            <Route path='/' element={<Start />} />
                            <Route path='/game' element={<Game />} />
                            <Route path='/generator' element={<Generator />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </Container>
                    <Footer />
                </HashRouter>
            </ThemeProvider>
        </userPrefsContext.Provider>
    )
}