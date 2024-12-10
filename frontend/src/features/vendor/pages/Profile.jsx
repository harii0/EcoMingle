import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Link,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Description as DescriptionIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  Category as CategoryIcon,
  AccessTime as TimeIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { getProfile } from '../api/api';
import TokenService from '../../../services/auth.service.js';

const ProfileSection = ({ icon, title, content }) => (
  <Grid item xs={12} container alignItems="center" spacing={2}>
    {icon}
    <Grid item xs>
      <Typography variant="body1">
        <strong>{title}:</strong> {content}
      </Typography>
    </Grid>
  </Grid>
);

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const vendor = TokenService.getUser('vendor');
  const vId = vendor?.data._id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(vId);
        setProfile(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (vId) {
      fetchProfile();
    }
  }, [vId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="textSecondary">
          Loading Profile...
        </Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          Profile Not Found
        </Typography>
      </Box>
    );
  }

  const { vendor: vendorData } = profile;

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'background.default',
        minHeight: '100vh',
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          margin: 'auto',
          boxShadow: 3,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                bgcolor: 'primary.main',
              }}
            >
              {vendorData.username[0].toUpperCase()}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {vendorData.username}
            </Typography>
            <Chip label={vendorData.role} color="secondary" size="small" />
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <ProfileSection
              icon={
                <Grid item>
                  <EmailIcon color="primary" />
                </Grid>
              }
              title="Email"
              content={
                <Link href={`mailto:${vendorData.email}`} color="primary">
                  {vendorData.email}
                </Link>
              }
            />

            <ProfileSection
              icon={
                <Grid item>
                  <DescriptionIcon color="primary" />
                </Grid>
              }
              title="Description"
              content={vendorData.description}
            />

            <ProfileSection
              icon={
                <Grid item>
                  <LocationIcon color="primary" />
                </Grid>
              }
              title="Location"
              content={`${vendorData.location.address}, ${vendorData.location.city}, ${vendorData.location.state}, ${vendorData.location.country} - ${vendorData.location.postalCode}`}
            />

            <ProfileSection
              icon={
                <Grid item>
                  <LanguageIcon color="primary" />
                </Grid>
              }
              title="Website"
              content={
                <Link
                  href={vendorData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  {vendorData.website}
                </Link>
              }
            />

            <ProfileSection
              icon={
                <Grid item>
                  <CategoryIcon color="primary" />
                </Grid>
              }
              title="Categories"
              content={vendorData.categories.join(', ')}
            />

            <ProfileSection
              icon={
                <Grid item>
                  <WorkIcon color="primary" />
                </Grid>
              }
              title="Status"
              content={vendorData.status}
            />

            <ProfileSection
              icon={
                <Grid item>
                  <TimeIcon color="primary" />
                </Grid>
              }
              title="Created At"
              content={new Date(vendorData.createdAt).toLocaleDateString()}
            />

            <ProfileSection
              icon={
                <Grid item>
                  <TimeIcon color="primary" />
                </Grid>
              }
              title="Updated At"
              content={new Date(vendorData.updatedAt).toLocaleDateString()}
            />
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
