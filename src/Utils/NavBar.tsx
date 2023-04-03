import { Button, Drawer, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavButton } from './NavButton';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { ColorModeContext } from '../context';

const pages = ['Start', 'Game', 'Generator'];

export function NavBar() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [isOpen, setIsOpen] = useState(false)

    const onMenuClick = () => {
        setIsOpen(!isOpen)
    }

    const onButtonClick = (page: string) => {
        onMenuClick()
        return page === 'Start' ? '/#' : `/#/${page.toLowerCase()}`
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
                            <Button sx={{display: 'flex'}} href={page === 'Start' ? '/#' : `/#/${page.toLowerCase()}`}>
                                {page}
                            </Button>
                        ))}
                        <IconButton key={"mode"} sx={{ display: 'flex', right: 0, left: 0, mr: 'auto', ml: 'auto' }} onClick={colorMode.toggleColorMode} color="primary">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
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
                            <NavButton key={index} page={page} />
                        ))}
                        <IconButton key={"mode"} sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="primary">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
