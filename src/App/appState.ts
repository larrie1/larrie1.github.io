import React, { useState } from "react"
import { PaletteMode, useMediaQuery } from "@mui/material"
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { theme as getDesignTokens } from "../theme"
import { localizedStrings } from "../Res"

/** This Method creates the function that control the theme and the Language changes.
 *  It sets the previous or device Language as default and, if the user prefers dark Mode, dark Mode as default.
 * 
 * @returns JSON Object containing the theme and the user Preferences as a state 
 */
export function _appState() {
    // Localization
    const [locale, setLocale] = useState(localStorage.getItem('locale') === null ? (localizedStrings.getInterfaceLanguage() === 'de' ? 'de' : 'en') : localStorage.getItem('locale')!!)
    localizedStrings.setLanguage(locale)
    localStorage.setItem('locale', locale)

    // Theme Mode
    const prefersDarkMode = useMediaQuery('prefers-color-scheme: dark)')
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
                localizedStrings.setLanguage(locale)
            }
        }),
        [],
    )

    let theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
    theme = responsiveFontSizes(theme)

    return {
        userPrefs: userPrefs,
        theme: theme,
    }
}