import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Facebook, Instagram, YouTube, GitHub } from '@mui/icons-material';
import logo from '../../assets/images/logo.svg'; // Update with your actual path to the logo
import Amex from '../../assets/icons/Amex.png';
import Master from '../../assets/icons/Master.png';
import Visa from '../../assets/icons/Visa.png';
const Footer = () => {
  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: '#f5f5f5',
        borderRadius: '12px',
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* Logo and Description */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <img src={logo} alt="EcoMingle" width="100px" height="40px" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Empowering sustainable choices for a greener tomorrow.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: '10px' }}>
            <IconButton href="#" aria-label="GitHub">
              <GitHub sx={{ color: '#5C5F6A' }} />
            </IconButton>
            <IconButton href="#" aria-label="Instagram">
              <Instagram sx={{ color: '#5C5F6A' }} />
            </IconButton>
            <IconButton href="#" aria-label="YouTube">
              <YouTube sx={{ color: '#5C5F6A' }} />
            </IconButton>
          </Box>
        </Grid>

        {/* Support Links */}
        <Grid item xs={6} md={2} sx={{ p: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            SUPPORT
          </Typography>
          <Typography variant="body2" color="text.secondary">
            FAQ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Terms of use
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Privacy Policy
          </Typography>
        </Grid>

        {/* Company Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            COMPANY
          </Typography>
          <Typography variant="body2" color="text.secondary">
            About us
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Careers
          </Typography>
        </Grid>

        {/* Shop Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            SHOP
          </Typography>
          <Typography variant="body2" color="text.secondary">
            My Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Checkout
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cart
          </Typography>
        </Grid>

        {/* Payment Methods */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            ACCEPTED PAYMENTS
          </Typography>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <img src={Master} alt="MasterCard" width="30px" />
            <img src={Amex} alt="Amex" width="30px" />
            <img src={Visa} alt="Visa" width="30px" />
          </Box>
        </Grid>
      </Grid>

      <Typography
        sx={{ mt: 4, textAlign: 'center' }}
        variant="body2"
        color="text.secondary"
      >
        © {new Date().getFullYear()} EcoMingle. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
