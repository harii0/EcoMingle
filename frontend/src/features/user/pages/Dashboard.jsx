import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Tabs,
} from '@mui/material';
import CustomTab from '../components/CustomTab';
import Brush from '../../../assets/images/brush.svg';
import EmblaCarousel from '../components/carousel';
import eco from '../../../assets/images/eco.mp4';
import ShopCard from '../components/ShopCard';
import EcoFriendlyNavbar from '../../../components/Dropdown';

function TabPanel({ children, value, index }) {
  return (
    <Box sx={{ width: '100%' }} hidden={value !== index}>
      {value === index && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: 2,
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

const Dashboard = () => {
  const natureMeetsCraftItems = [
    {
      name: 'Desk Organiser',
      image:
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$29.99',
      description: 'Sleek wooden desk organizer for a tidy workspace',
    },
    {
      name: 'Woven Baskets',
      image:
        'https://images.unsplash.com/photo-1587304883320-eb9a1a7a4c98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$34.99',
      description: 'Set of 3 handwoven natural fiber baskets',
    },
    {
      name: 'Wooden Chair',
      image:
        'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$149.99',
      description: 'Modern wooden chair with ergonomic design',
    },
    {
      name: 'Wooden Table',
      image:
        'https://images.unsplash.com/photo-1604074131665-7a4b13870ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$299.99',
      description: 'Rustic wooden dining table for 6',
    },
    {
      name: 'Tray & Pots',
      image:
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$45.99',
      description: 'Ceramic tray with matching plant pots',
    },
    {
      name: 'MagSafe Stand',
      image:
        'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$39.99',
      description: 'Wooden MagSafe compatible phone stand',
    },
  ];
  const nature = [
    'https://i.postimg.cc/5NfPvhGL/Baskets.png',
    'https://i.postimg.cc/9F1LBx5S/chair.png ',
    'https://i.postimg.cc/RZFXpcv0/organiser.png ',
    'https://i.postimg.cc/13jMkfzr/Pot.png',
  ];
  const images = [
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80', // Wooden chair
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wooden table
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80', // Wooden shelves
  ];
  const products = [
    {
      id: 1,
      image: Brush,
      title: 'One Good Brush ',
      label: 'special offer',
      price: '$19.99',
      rating: 4.5,
    },
    {
      id: 2,
      image: Brush,
      title: 'One Good Brush',
      price: '$19.99',
      rating: 4.5,
    },
    {
      id: 3,
      image: Brush,
      title: 'One Good Brush',
      price: '$19.99',
      rating: 4.5,
    },
  ];
  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <EcoFriendlyNavbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          mt: 1,
          width: '100%',
        }}
      >
        <Grid
          container
          spacing={2}
          px={{ xs: 2, md: 0 }}
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
                    <Typography
                      variant="subtitle1"
                      fontSize={12}
                      color="primary"
                    >
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
                    style={{
                      width: '100%',
                      height: '10vh',
                      objectFit: 'cover',
                    }}
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
                  <Box sx={{ p: 0, mt: 3, flexGrow: 1, gap: 1 }}>
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
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            display="flex"
            justifyContent={'space-between'}
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" fontSize={20} color="text.primary">
              Shop
            </Typography>

            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="custom tabs"
              TabIndicatorProps={{ style: { backgroundColor: '#2E7D32' } }}
              sx={{
                '& .MuiTabs-indicator': { display: 'none' },
              }}
            >
              <CustomTab disableRipple label="Best Seller" value={1} />
              <CustomTab disableRipple label="New Arrivals" value={2} />
              <CustomTab disableRipple label="Zero Waste" value={3} />
            </Tabs>
            <Button sx={{ display: { xs: 'none', md: 'block' } }}>
              view all
            </Button>
          </Box>
          <Box sx={{ width: '100%' }}>
            <TabPanel value={value} index={1}>
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ShopCard
                      label={product.label}
                      image={product.image}
                      title={product.title}
                      price={product.price}
                    />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Typography>Content for Tab Two</Typography>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Typography>Content for Tab Three</Typography>
            </TabPanel>
          </Box>
        </Box>
        {/* Nature Meets Art */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            px: 2,
            mt: 4,
          }}
        >
          <Typography variant="h5" fontSize={24} color="text.primary" mb={3}>
            Nature Meets Craft
          </Typography>
          <Grid container spacing={3}>
            {natureMeetsCraftItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}
                >
                  <CardContent
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: 200,
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        mb: 2,
                      }}
                    />
                    <Typography variant="subtitle1" align="center">
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
