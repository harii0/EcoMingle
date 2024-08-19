import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Search, SearchIconWrapper, StyledInputBase } from './navbar.style';
import logo from '../../assets/images/logo.svg';
import { Button, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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
            <LocalMallOutlinedIcon color="secondary" />
          </Badge>
        </IconButton>
        <p>Messages</p>
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
          <Person2OutlinedIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const user = false;
  return (
    <Box>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ py: '2px', backgroundColor: 'white', color: 'black' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={logo} alt="logo" width={40} height={40} />
            <Typography
              variant="h6"
              fontSize={18}
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              EcoMingle
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {['Home', 'About', 'Contact', 'Blog'].map((item, index) => {
              return (
                <List
                  key={index}
                  sx={{
                    display: 'flex',
                  }}
                >
                  <ListItemButton
                    sx={{
                      '&:hover': {
                        background: 'transparent',
                        color: '#000',
                      },
                      '& .MuiListItemText-primary': {
                        fontSize: '14px',
                      },
                    }}
                    disableRipple
                    disableTouchRipple
                  >
                    <ListItemText secondary={item} />
                  </ListItemButton>
                </List>
              );
            })}
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
            <Search sx={{ borderRadius: '50px' }}>
              <SearchIconWrapper>
                <SearchOutlinedIcon sx={{ color: 'grey' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            <Box
              sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
            >
              {user ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="primary">
                      <LocalMallOutlinedIcon />
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
                  >
                    <Person2OutlinedIcon />
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
                  onClick={() => (window.location.href = '/login')}
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
