import { Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react';
import { NavButton } from './NavButton';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { userPrefsContext } from '../context';
import { strings } from '../Res/localization';

export function NavBar() {
    const theme = useTheme();
    const userPrefs = React.useContext(userPrefsContext)
    const [isOpen, setIsOpen] = useState(false)
    const [isActive, setActive] = useState(-1)
    const pages = [strings.game, strings.generator]

    const onMenuClick = () => {
        setIsOpen(!isOpen)
    }

    function MobileNav() {
        return (
            <>
                <IconButton
                    disableRipple
                    edge='start'
                    color='inherit'
                    sx={{
                        flex: 1,
                        justifyContent: 'start',
                        display: { xs: 'flex', md: 'none' },
                    }} >
                    <img src={require('../Assets/logo.png')} width={50} height={50} />
                </IconButton>
                <IconButton
                    size="large"
                    onClick={onMenuClick}
                    color="primary"
                    sx={{ display: { sx: 'flex', md: 'none' } }}>
                    <MenuIcon />
                </IconButton>
                {isOpen &&
                    <Paper
                        variant='outlined'
                        sx={{
                            position: 'fixed',
                            top: 60,
                            right: 40,
                            zIndex: 99,
                            background: theme.palette.background.default,
                            display: { sx: 'flex', md: 'none' },
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 2,
                        }}>
                        {pages.map((page) => (
                            <Button sx={{ display: 'flex' }} href={pages.indexOf(page) === 0 ? '/#/game' : `/#/${page.toLowerCase()}`}>
                                {page}
                            </Button>
                        ))}
                        <IconButton key={"mode"} sx={{ display: 'flex', right: 0, left: 0, mr: 'auto', ml: 'auto' }} onClick={userPrefs.toggleColorMode} color="primary">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton key={"mode"} sx={{ display: 'flex', right: 0, left: 0, mr: 'auto', ml: 'auto' }} onClick={userPrefs.toggleLocale} color="primary">
                            <LanguageIcon />
                        </IconButton>
                    </Paper>}
            </>
        )
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: 'none',
                borderBottom: 1,
                borderColor: theme.palette.secondary.dark,
                background: theme.palette.secondary.main,
                backdropFilter: `blur(10px)`,
            }}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters >
                    <MobileNav />

                    <IconButton
                        key={"logo"}
                        disableRipple
                        color='primary'
                        href='/'
                        onClick={() => setActive(-1)}
                        sx={{
                            justifyContent: 'start',
                            display: { xs: 'none', md: 'flex' },
                            height: '64px',
                            filter: `brightness(80%)`,
                            '&:hover': {
                                filter: `brightness(100%)`,
                            }
                        }} >
                        <img
                            src={require('../Assets/logo.png')}
                            width='100%'
                            height='100%' />
                    </IconButton>

                    <Box sx={{
                        flex: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'end',
                    }}>
                        {pages.map((page, index) => (
                            <NavButton key={index} page={page} href={pages.indexOf(page) === 0 ? '/#/game' : `/#/${page.toLowerCase()}`} onClick={() => setActive(index)} isActive={isActive === index} />
                        ))}
                        <IconButton key={"mode"} sx={{ ml: 1 }} onClick={userPrefs.toggleColorMode} color="primary">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton key={'language'} sx={{ ml: 1 }} onClick={userPrefs.toggleLocale} color='primary'>
                            <LanguageIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
