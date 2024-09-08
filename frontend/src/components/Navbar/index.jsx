import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { LuShoppingCart, LuUserCircle, LuSearch } from 'react-icons/lu';
import { Search, StyledInputBase } from './navbar.style';
import logo from '../../assets/images/logo.svg';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/auth/authSlice.js';
import { useDispatch } from 'react-redux';
export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchQuery = search.trim();
    navigate(`/catalog?search=${searchQuery}`);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem disableRipple>
        <IconButton size="medium" aria-label="show 4 new mails" color="inherit">
          <Badge
            badgeContent={4}
            color="error"
            sx={{ '& .MuiBadge-badge': { fontSize: '10px' } }}
          >
            <LuShoppingCart color="secondary" fontSize={24} strokeWidth={1.5} />
          </Badge>
        </IconButton>
        <p>cart</p>
      </MenuItem>
      <MenuItem disableRipple>
        <IconButton
          size="medium"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge
            badgeContent={17}
            color="error"
            sx={{ '& .MuiBadge-badge': { fontSize: '10px' } }}
          >
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} disableRipple>
        <IconButton
          size="medium"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LuUserCircle fontSize={24} strokeWidth={1.5} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid #e0e0e0',
          borderRadius: 0,
          padding: 0,
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '50px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={logo} alt="logo" width={80} height={50} />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Search sx={{ borderRadius: '50px' }}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearch(e.target.value.trim())}
              />
              <Button
                disabled={search === ''}
                disableRipple
                size="small"
                type="submit"
                disableElevation
                variant="contained"
                sx={{
                  minWidth: '40px',
                  minHeight: '35px',
                  fontSize: '12px',

                  fontWeight: 'medium',
                  backgroundColor: 'primary.main',
                  color: 'white',
                  borderRadius: '50px',

                  ':hover': {
                    backgroundColor: '#2E7D32',
                  },
                }}
                onClick={handleSubmit}
              >
                <LuSearch color="white" fontSize={18} strokeWidth={1.5} />
              </Button>
            </Search>
          </Box>

          <Box
            sx={{
              display: {
                xs: 'flex',
                md: 'flex',
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'flex-end',
              },
            }}
          >
            <Box
              sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
            >
              {isAuthenticated ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    disableRipple
                  >
                    <Badge badgeContent={4} color="primary">
                      <LuShoppingCart fontSize={24} strokeWidth={1.5} />
                    </Badge>
                  </IconButton>

                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    disableRipple
                  >
                    <LuUserCircle fontSize={24} strokeWidth={1.5} />
                  </IconButton>
                </>
              ) : (
                <Button
                  sx={{
                    color: 'white',
                    width: '80px',
                    height: '35px',
                    textTransform: 'none',
                    borderRadius: '50px',
                  }}
                  disableElevation
                  variant="contained"
                  disableRipple
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              )}
            </Box>

            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' } }}
              disableRipple
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
