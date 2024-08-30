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
  const [avtar, setAvtar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data.data.profile);
        setAvtar(response.data.data.profile.username[0]);
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
    return <div>Something went wrong!</div>;
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        {/* Profile Summary */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 4.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'background.default',
              position: 'relative',
            }}
          >
            <Box sx={{ position: 'absolute', top: 10, right: 20 }}>
              <Tooltip
                title="Edit Profile"
                placement="top"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  },
                }}
              >
                <IconButton>
                  <MoreHorizOutlined sx={{ color: 'text.custom' }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                bgcolor: 'success.main',
              }}
              alt="Jane Green"
            >
              {profile?.profileImg ? (
                <img src={profile.profileImg} alt="Profile Image" />
              ) : (
                <Avatar
                  sx={{ width: 100, height: 100, bgcolor: 'success.main' }}
                >
                  {avtar}
                </Avatar>
              )}
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {profile?.username}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Eco Enthusiast
            </Typography>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{ width: '100%', pt: 2, textAlign: 'center' }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                gutterBottom
                component={'div'}
              >
                0 <PiLeafLight size={18} />
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg>
          <EmissionCard
            userName="Alex Green"
            totalEmission={1250}
            emissionReduction={15}
          />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8} lg={5}>
          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
            <Typography
              variant="h6"
              fontSize={18}
              gutterBottom
              color="text.primary"
            >
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
                <ListItemText primary="Location" secondary="Portland, OR" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmojiNatureOutlined color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Favorite Eco Category"
                  secondary="Organic Home & Garden"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Shopping Habits */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
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
                  secondary="47 items"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RecyclingOutlined color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Plastic Saved"
                  secondary="Equivalent to 230 plastic bottles"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Co2Outlined color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Carbon Footprint Reduced"
                  secondary="125 kg CO2"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Sustainability Preferences */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              bgcolor: 'background.default',
            }}
          >
            <Typography variant="h6" gutterBottom color="texr.primary">
              Sustainability Preferences
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FavoriteOutlined color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Favorite Eco Brands"
                  secondary="EcoWare, GreenLife, NaturalBliss"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmojiNatureOutlined color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Eco Certifications Preferred"
                  secondary="Organic, Fair Trade, B Corp"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RecyclingOutlined color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Recycling Habits"
                  secondary="Actively recycles and composts"
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
