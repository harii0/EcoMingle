// src/components/Wishlist.jsx

import { useEffect, useState } from 'react';
import { getWishlist } from '../api/wishlistApi'; // Ensure you have a removeFromWishlist function
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      {wishlist.length === 0 ? (
        <Typography variant="h6">Your wishlist is empty.</Typography>
      ) : (
        <Grid container spacing={4}>
          {wishlist.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.ProductImage[0]} // Display the first image
                  alt={product.productName}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    style={{ marginTop: '0.5rem' }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  style={{ margin: '0.5rem' }}
                >
                  Remove
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Wishlist;
