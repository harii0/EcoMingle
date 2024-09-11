import {
  Box,
  Typography,
  Rating,
  Chip,
  Button,
  IconButton,
  Grid,
  Paper,
} from '@mui/material';
import { Add, Remove, Favorite, Share } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../product/api.js';

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProduct(id);
      setProduct(response.data.data.product);
      console.log(response.data.data.product);
    };

    fetchProduct();
  }, []);

  if (!product || !product.ProductImage || !product.productItems) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
            <Box
              component="img"
              src={product.ProductImage[0]}
              alt="Raw Black T-Shirt"
              sx={{ width: '100%', height: 'auto' }}
            />
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {product?.ProductImage?.map((item) => (
              <Box
                key={item}
                component="img"
                src={item}
                alt={`Thumbnail ${item}`}
                sx={{ width: 60, height: 60, mx: 1, cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product?.productName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={4.2} readOnly precision={0.1} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              4.2 — 54 Reviews
            </Typography>
            {product.productItems[0].inventoryCount <= 0 ? (
              <Chip
                label="OUT OF STOCK"
                color="error"
                size="small"
                sx={{ ml: 2 }}
              />
            ) : (
              <Chip label="IN STOCK" size="small" sx={{ ml: 2 }} />
            )}
          </Box>
          <Typography variant="h5" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            AVAILABLE COLORS
          </Typography>
          <Box sx={{ mb: 2 }}>
            {['#B8C5F2', '#FFD699', '#A5D6A7'].map((color) => (
              <Box
                key={color}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: color,
                  display: 'inline-block',
                  mr: 1,
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            MATERIAL
          </Typography>
          <Box sx={{ mb: 2 }}>
            {['local_florist', 'pets', 'recycling'].map((icon) => (
              <Box
                key={icon}
                component="span"
                className="material-icons"
                sx={{ mr: 1 }}
              >
                {icon}
              </Box>
            ))}
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            SELECT SIZE
          </Typography>
          <Box sx={{ mb: 2 }}>
            {['S', 'M', 'X', 'XL', 'XXL'].map((size) => (
              <Button
                key={size}
                variant="outlined"
                sx={{ mr: 1, mb: 1, minWidth: 'auto' }}
              >
                {size}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              QUANTITY
            </Typography>
            <IconButton size="small">
              <Remove />
            </IconButton>
            <Typography sx={{ mx: 2 }}>1</Typography>
            <IconButton size="small">
              <Add />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mb: 2,
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#45a049' },
            }}
          >
            Add to cart
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2">
              — FREE SHIPPING ON ORDERS $100+
            </Typography>
            <Box>
              <IconButton>
                <Favorite />
              </IconButton>
              <IconButton>
                <Share />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;
