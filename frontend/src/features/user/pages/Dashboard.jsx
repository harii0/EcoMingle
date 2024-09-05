import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import CustomTab from '../components/CustomTab';

import EmblaCarousel from '../components/carousel';
import eco from '../../../assets/images/eco.mp4';

const Dashboard = () => {
  const images = [
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  ]; // You might want to replace this with actual product data
  const [value, setValue] = useState('one');
  const handleChange = (event, newValue) => {
    setValue(newValue.target.value);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        px={{ xs: 2, md: 0 }}
        mt={0.4}
        sx={{ overflow: 'hidden' }}
      >
        {/* Carousel Section */}
        <Grid item xs={12} md={8}>
          <EmblaCarousel slides={images} />
        </Grid>

        {/* Promotions and About Us Section */}
        <Grid item xs={12} md={4}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Card
                elevation={0}
                sx={{ boxShadow: 'none', p: 2 }}
                variant="outlined"
              >
                <Chip label="Promotions" variant="outlined" />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',

                    flexGrow: 1,
                    flexShrink: 1,
                    p: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontSize={12} color="primary">
                    Electronics
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={24}
                    color={'text.primary'}
                  >
                    15% Discount for all Electronics
                  </Typography>
                </CardContent>
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt="Electronics promotion"
                  style={{ width: '100%', height: '10vh', objectFit: 'cover' }}
                />
              </Card>
            </Grid>
            <Grid item>
              <Card
                elevation={0}
                sx={{ boxShadow: 'none', p: 1.5 }}
                variant="outlined"
              >
                <Chip label={'Who are we ?'} variant="outlined" />

                <Box
                  sx={{
                    p: 0,
                    mt: 3,
                    flexGrow: 1,
                    gap: 1,
                  }}
                >
                  <video
                    src={eco}
                    autoPlay
                    controls
                    style={{
                      width: '100%',
                      height: '160px',
                      backgroundColor: '#000',
                      borderRadius: '10px',
                      objectFit: 'cover',
                    }}
                  >
                    <source src="path-to-your-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Products Section */}
      <Box
        display="flex"
        justifyContent={'space-between'}
        sx={{
          width: '100%',
        }}
        gap={2}
        mt={3}
      >
        <Typography variant="h5" fontSize={24} color="text.primary">
          Products
        </Typography>
        <CustomTab label="Item One" value={value} handleChange={handleChange} />
        <Button>View All</Button>
      </Box>
    </>
  );
};

export default Dashboard;
