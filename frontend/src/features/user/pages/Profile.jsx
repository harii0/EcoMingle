import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  EmailOutlined,
  LocationOnOutlined,
  EmojiNatureOutlined,
  Co2Outlined,
  RecyclingOutlined,
  ShoppingBagOutlined,
  FavoriteOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';
import { PiLeafLight } from 'react-icons/pi';

import { useEffect, useState } from 'react';

import { getProfile } from '../api/profileApi';
import EmissionCard from '../../../components/EmissionCard';

const Profile = () => {
  const [profile, setProfile] = useState({});
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

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Typography color="error">Something went wrong!</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Summary */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              bgcolor: 'background.paper',
            }}
          >
            {/* Edit Profile Button */}
            <Box sx={{ position: 'absolute', top: 10, right: 20 }}>
              <Tooltip title="Edit Profile" placement="top">
                <IconButton>
                  <MoreHorizOutlined color="text.secondary" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Avatar */}
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                bgcolor: profile?.profileImg ? 'transparent' : 'success.main',
                border: profile?.profileImg ? '2px solid' : 'none',
                borderColor: 'primary.main',
              }}
              alt={profile?.username}
              src={profile?.profileImg || undefined}
            >
              {!profile?.profileImg && avatar}
            </Avatar>

            {/* Username */}
            <Typography variant="h6" gutterBottom>
              {profile?.username}
            </Typography>

            {/* User Role */}
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Eco Enthusiast
            </Typography>

            {/* Eco Points */}
            <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
              <Typography variant="h6" color="text.primary" mr={1}>
                {profile?.ecoPoints || 0}
              </Typography>
              <PiLeafLight size={20} color="#4caf50" />
            </Box>
          </Paper>
        </Grid>

        {/* Emission Card */}
        <Grid item xs={12} md={6} lg={4}>
          <EmissionCard
            userName={profile?.username || 'User'}
            totalEmission={profile?.totalEmission || 0}
            emissionReduction={profile?.emissionReduction || 0}
          />
        </Grid>

        {/* Profile Information */}
        <Grid item xs={12} md={8} lg={5}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Profile Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailOutlined color="primary" />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={profile?.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOnOutlined color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Location"
                  secondary={profile?.location || 'Portland, OR'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmojiNatureOutlined color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Favorite Eco Category"
                  secondary={
                    profile?.favoriteEcoCategory || 'Organic Home & Garden'
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Shopping Habits */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Eco Shopping Habits
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ShoppingBagOutlined color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Total Eco Purchases"
                  secondary={`${profile?.totalEcoPurchases || 0} items`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RecyclingOutlined color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Plastic Saved"
                  secondary={`Equivalent to ${
                    profile?.plasticSaved || 0
                  } plastic bottles`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Co2Outlined color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Carbon Footprint Reduced"
                  secondary={`${profile?.carbonFootprintReduced || 0} kg CO2`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Sustainability Preferences */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Sustainability Preferences
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FavoriteOutlined color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Favorite Eco Brands"
                  secondary={
                    profile?.favoriteEcoBrands ||
                    'EcoWare, GreenLife, NaturalBliss'
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmojiNatureOutlined color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Eco Certifications Preferred"
                  secondary={
                    profile?.ecoCertificationsPreferred ||
                    'Organic, Fair Trade, B Corp'
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RecyclingOutlined color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Recycling Habits"
                  secondary={
                    profile?.recyclingHabits || 'Actively recycles and composts'
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
