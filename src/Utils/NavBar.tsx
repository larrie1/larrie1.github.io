import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useEffect } from 'react'
import { Button, Card, AppBar, Toolbar, Tooltip, IconButton, Container, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { userPrefsContext } from '../context'
import { localizedStrings, Logo } from '../Res'
import { useLocation } from 'react-router'

const routes = ['/#/game', '/#/generator']

/**
 *  This Method creates the Navigation Bar.
 * 
 *  @returns UI representation of the Navigation Bar
 */
export function NavBar() {
    return (
        <AppBar position="fixed">
            <Container maxWidth='xl'>
                <Toolbar disableGutters >
                    <MobileNav />

                    <IconButton
                        disableRipple
                        href='/'
                        sx={{
                            justifyContent: 'start',
                            display: { xs: 'none', md: 'flex' },
                            height: '64px',
                            width: '64px',
                            filter: `brightness(80%)`,
                            '&:hover': {
                                filter: `brightness(100%)`,
                            }
                        }} >
                        <img
                            alt={''}
                            src={Logo}
                            width='100%'
                            height='100%' />
                    </IconButton>

                    <Box sx={{
                        flex: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'end',
                    }}>
                        <NavButtons />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}


/**
 *  This Method creates the mobile Navigation bar which is visible when the width is under xs.
 *  It removes the Buttons and shows just a Icon with a Menudrawer.
 * 
 *  @returns UI representation of the mobile Navigation Bar
 */
function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const onMenuClick = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname])

    return (
        <>
            <IconButton
                disableRipple
                edge='start'
                color='inherit'
                href='/'
                sx={{
                    flex: 1,
                    justifyContent: 'start',
                    display: { xs: 'flex', md: 'none' },
                }} >
                <img src={Logo} width={50} height={50} alt={''} />
            </IconButton>
            <IconButton
                onClick={onMenuClick}
                sx={{ display: { sx: 'flex', md: 'none' } }}>
                <MenuIcon />
            </IconButton>
            {isOpen &&
                <Card
                    sx={{
                        position: 'fixed',
                        top: 60,
                        right: 40,
                        zIndex: 99,
                        backgroundColor: 'background',
                        display: { sx: 'flex', md: 'none' },
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 2,
                    }}>
                    <NavButtons />
                </Card>}
        </>
    )
}


/**
 *  This Method creates all the Navigation Buttons for the Navbar and the mobile Navbar.
 * 
 *  @returns UI representation of the Navigation Buttons
 */
function NavButtons() {
    const theme = useTheme()
    const userPrefs = React.useContext(userPrefsContext)
    const location = useLocation()
    const pages = [localizedStrings.game, localizedStrings.generator]

    return (
        <>
            {pages.map((page, index) => (
                <Button
                    key={page+index}
                    variant={('/#' + location.pathname) === routes[index] ? 'contained' : 'outlined'}
                    href={routes[index]}
                    sx={{ display: 'flex' }}>
                    {page}
                </Button>
            ))}
            <Tooltip title={localizedStrings.darkmode} >
                <IconButton
                    key={'mode'}
                    sx={{ ml: 1 }}
                    onClick={userPrefs.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Tooltip>
            <Tooltip title={localizedStrings.language} >
                <IconButton
                    key={'lang'}
                    sx={{ ml: 1 }}
                    onClick={userPrefs.toggleLocale}>
                    {
                        localStorage.getItem('locale') === 'de' ?
                        <Typography>DE</Typography> :
                        <Typography>EN</Typography>
                    }
                </IconButton>
            </Tooltip>
        </>
    )
}
