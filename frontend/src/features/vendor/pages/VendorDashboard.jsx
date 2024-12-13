import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
  const navigate = useNavigate();
  return (
    <Box>
      {/* Top App Bar */}

      {/* Dashboard Content */}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Welcome Back, Vendor!
        </Typography>

        <Grid container spacing={3}>
          {/* Sales Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
              <ShoppingCartIcon sx={{ fontSize: 50, color: 'success.main' }} />
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                $15,230
              </Typography>
            </Paper>
          </Grid>

          {/* Revenue Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 50, color: 'info.main' }} />
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                $7,980
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 2, textAlign: 'center' }}
              onClick={() => navigate('/products')}
            >
              <TrendingUpIcon sx={{ fontSize: 50, color: 'info.main' }} />
              <Typography variant="h6">Products</Typography>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                10
              </Typography>
            </Paper>
          </Grid>

          {/* Customers Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
              <GroupIcon sx={{ fontSize: 50, color: 'warning.main' }} />
              <Typography variant="h6">Customers</Typography>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                1,245
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: 'secondary.main', color: 'white' }}
              >
                Add Product
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: 'primary.main', color: 'white' }}
              >
                Manage Orders
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default VendorDashboard;
