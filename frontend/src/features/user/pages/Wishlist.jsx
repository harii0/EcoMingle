// src/components/Wishlist.jsx
import { useEffect, useState } from 'react';
import { getWishlist, addToWishlist } from '../api/wishlistApi'; // Ensure you have a removeFromWishlist function
import { FiInbox } from 'react-icons/fi';

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Box,
} from '@mui/material';
import { IoCloseOutline } from 'react-icons/io5';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]); // Stores the wishlist products
  const [loading, setLoading] = useState(true); // Indicates loading state
  const [error, setError] = useState(null); // Stores any error messages

  // Fetch wishlist data when the component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist(); // Fetch wishlist from API
        setWishlist(response.data.data.wishlist); // Update state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setError('Failed to load wishlist. Please try again later.');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Handler to remove a product from the wishlist

  // Render loading state
  if (loading) {
    return (
      <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
        <CircularProgress />
      </Grid>
    );
  }

  // Render error state
  if (error) {
    return (
      <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
        <Alert severity="error">{error}</Alert>
      </Grid>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <Grid sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography variant="h6">My Wishlist</Typography>
        {wishlist.length > 1 ? (
          <p>{wishlist.length} items</p>
        ) : (
          <p>{wishlist.length} item</p>
        )}
      </Grid>

      {wishlist.length === 0 ? (
        <Card
          elevation={0}
          sx={{ display: 'flex', justifyContent: 'center', boxShadow: 'none' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <FiInbox size={100} strokeWidth={1} color="grey" />
            <Typography>Your Wishlist is Empty!</Typography>
          </Box>
        </Card>
      ) : (
        <Grid container spacing={4}>
          {wishlist.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <Card sx={{ position: 'relative' }}>
                <IconButton
                  onClick={() => addToWishlist(product._id)}
                  sx={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    background: '#fff',
                  }}
                  disableFocusRipple
                  disableRipple
                  aria-label="delete"
                >
                  <IoCloseOutline />
                </IconButton>

                <CardMedia
                  component="img"
                  height="200"
                  image={product.ProductImage[0]} // Display the first image
                  alt={product.productName}
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ mt: '1rem' }}>
                    {product.productName}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    style={{ marginTop: '0.5rem' }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Wishlist;
