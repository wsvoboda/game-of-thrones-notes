import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import dragon from '../../assets/dragon.png';
import { Outlet, useNavigate } from 'react-router-dom';

// const loggedInPages = [
//   { label: 'Home', route: '/' },
//   { label: 'Character Search', route: '/search/characters' },
//   { label: 'My Favorites', route: '/favorites' },
//   { label: 'Profile', route: '/profile' },
//   { label: 'Logout', route: '/' },
// ];

const loggedOutPages = [
  { label: 'Character Search', route: '/search/characters' },
  { label: 'Home', route: '/' },
  { label: 'Login', route: '/login' },
];

const ResponsiveAppBar = () => {
  // const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = (route) => {
    if (route) return navigate(route);
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar
        position='static'
        sx={{ backgroundColor: '#7C747C', boxShadow: 'none' }}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <img src={dragon} alt='logo' className='dragon-logo' />
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'flex-end',
              }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'>
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}>
                {loggedOutPages.map((page) => (
                  <MenuItem key={page.label} onClick={() => handleCloseNavMenu(page.route)}>
                    <Typography textAlign='center'>{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
              }}>
              {loggedOutPages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.route)}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
export default ResponsiveAppBar;
