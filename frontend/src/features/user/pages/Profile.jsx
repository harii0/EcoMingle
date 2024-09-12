import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import {
  LuUserCircle,
  LuMapPin,
  LuShoppingCart,
  LuHeart,
  LuLogOut,
  LuKey,
} from 'react-icons/lu';
import { getProfile } from '../api/profileApi.js';
import EmissionCard from '../../../components/EmissionCard';
// Orders data sample
const orders = [
  {
    id: 1,
    name: 'Raw Black T-Shirt Lineup',
    date: '27 July 2023',
    price: '$70.00',
    status: 'Processing',
    image: 'https://via.placeholder.com/50', // Image URL or local image
  },
  {
    id: 2,
    name: 'Monochromatic Wardrobe',
    date: '9 March 2023',
    price: '$27.00',
    status: 'Completed',
    image: 'https://via.placeholder.com/50',
  },
];

// Custom TabPanel component
const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data.data.profile);
        setAvatar(response.data.data.profile.username[0].toUpperCase());
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={0}
            sx={{
              boxShadow: 'none',
              marginLeft: '-10px',
            }}
          >
            <Tabs
              orientation="vertical"
              variant="standard"
              indicatorColor="transparent"
              value={value}
              onChange={handleTabChange}
              aria-label="profile sidebar"
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                minHeight: '100%',
                padding: '12px',
                color: 'text.secondary',
                '& .Mui-selected': {
                  backgroundColor: '#F6F6F6',
                  color: 'priamry',
                },
              }}
            >
              <Tab
                disableRipple
                label="Orders"
                icon={<LuShoppingCart size={22} />}
                iconPosition="start"
                sx={{
                  justifyContent: 'start',
                  fontWeight: 'medium',
                  gap: '5px',
                }}
              />
              <Tab
                disableRipple
                label="Wishlist"
                icon={<LuHeart size={22} />}
                iconPosition="start"
                sx={{
                  justifyContent: 'start',
                  fontWeight: 'medium',
                  gap: '5px',
                }}
              />
              <Tab
                disableRipple
                label="Address"
                icon={<LuMapPin size={22} />}
                iconPosition="start"
                sx={{
                  justifyContent: 'start',
                  fontWeight: 'medium',
                  gap: '5px',
                }}
              />
              <Tab
                disableRipple
                label="Password"
                icon={<LuKey size={22} />}
                iconPosition="start"
                sx={{
                  justifyContent: 'start',
                  fontWeight: 'medium',
                  gap: '5px',
                }}
              />
              <Tab
                disableRipple
                label="Account"
                icon={<LuUserCircle size={22} />}
                iconPosition="start"
                sx={{
                  justifyContent: 'start',
                  fontWeight: 'medium',
                  gap: '5px',
                }}
              />
              <Tab
                label="Logout"
                icon={<LuLogOut size={22} />}
                iconPosition="start"
                sx={{
                  justifyContent: 'start',
                  fontWeight: 'medium',
                  gap: '5px',
                }}
              />
            </Tabs>
          </Paper>
        </Grid>

        {/* Tab content */}
        <Grid item xs={12} md={9}>
          <TabPanel value={value} index={0}>
            <Typography variant="h6" gutterBottom>
              Orders
            </Typography>

            {/* Orders List */}
            {orders.map((order) => (
              <Paper
                key={order.id}
                elevation={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={order.image}
                    alt={order.name}
                    style={{ width: 50, height: 50, marginRight: 16 }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {order.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ordered On: {order.date}
                    </Typography>
                    <Typography variant="body2">{order.price}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: order.status === 'Completed' ? 'green' : 'orange',
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    {order.status}
                  </Typography>
                  <Button variant="outlined" size="small">
                    View item
                  </Button>
                </Box>
              </Paper>
            ))}
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Typography variant="h6">Wishlist</Typography>
            {/* Wishlist content */}
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Typography variant="h6">Address</Typography>
            {/* Address content */}
          </TabPanel>

          <TabPanel value={value} index={3}>
            <Typography variant="h6">Password</Typography>
            {/* Password content */}
          </TabPanel>

          <TabPanel value={value} index={4}>
            <Typography variant="h6">Account Detail</Typography>
            {profile && (
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      boxShadow: 'none',
                      border: '1px solid #E5E5E5',
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Profile
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Username: {profile.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Email: {profile.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Phone Number: {profile.phone}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <EmissionCard
                    userName={profile?.username || 'User'}
                    totalEmission={profile?.totalEmission || 0}
                    emissionReduction={profile?.emissionReduction || 0}
                  />
                </Grid>
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={value} index={5}>
            <Typography variant="h6">Logout</Typography>
            {/* Logout functionality */}
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
