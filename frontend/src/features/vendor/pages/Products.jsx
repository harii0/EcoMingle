import { useState, useEffect } from 'react';
import { getProducts } from '../api/api.js';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

const Products = () => {
  const { vendor } = useSelector((state) => state.vendor);
  const vId = vendor?.data?._id;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(vId);
        setProducts(response.data.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (vId) {
      fetchProducts();
    }
  }, [vId]);
  console.log(products);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {products && products.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.productName}
                  height="200"
                  image={product.ProductImage[0]} // Displaying the first image
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ marginTop: 2 }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No products found.
        </Typography>
      )}
    </Box>
  );
};

export default Products;
