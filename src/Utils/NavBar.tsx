import { Drawer, List, ListItem, ListItemText } from '@mui/material';
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
import { ColorModeContext } from '../color-context';

const pages = ['Start', 'Game', 'Generator'];

export function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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
                <Box sx={{
                    display: { xs: 'flex', md: 'none' },
                }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        href='/'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center" color={'black'}>{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </>
        )
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: 'none',
                background: theme.palette.secondary.main,
                backdropFilter: `blur(5px)`,
            }}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters >
                    <MobileNav />

                    <IconButton
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
                            width={'100%'}
                            height={'100%'} />
                    </IconButton>

                    <Box sx={{
                        flex: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'end',
                    }}>
                        {pages.map((page) => (
                            <NavButton page={page} />
                        ))}
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="primary">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

function DrawerComponent() {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/">Home</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/about">About</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/contact">Contact</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/about">Faq</Link>
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    );
}