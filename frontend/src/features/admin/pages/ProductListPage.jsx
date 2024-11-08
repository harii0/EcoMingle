import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/api';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { MdEdit, MdDelete } from 'react-icons/md';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!product)
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        No product data available
      </Typography>
    );

  const handleEdit = () => {
    console.log('Editing product:', product._id);
  };

  const handleDelete = () => {
    console.log('Deleting product:', product._id);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 1000,
        margin: '2rem auto',
        borderRadius: 2,
      }}
    >
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            alignItems="center"
          >
            {product.ProductImage.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                style={{ maxWidth: '100%', borderRadius: 4 }}
              />
            ))}
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h4" fontWeight="bold">
              {product.productName}
            </Typography>
            <Typography variant="h5" color="primary">
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="body2">
              <strong>Vendor:</strong> {product.vendor}
            </Typography>
            <Typography variant="body2">
              <strong>Category:</strong> {product.category}
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong> {product.status}
            </Typography>
            <Typography variant="body2">
              <strong>Created At:</strong>{' '}
              {new Date(product.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              <strong>Updated At:</strong>{' '}
              {new Date(product.updatedAt).toLocaleString()}
            </Typography>
          </Box>
        </Grid>

        {/* Admin Actions */}
        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
          <Tooltip title="Edit Product">
            <IconButton onClick={handleEdit} color="primary">
              <MdEdit size={24} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Product">
            <IconButton onClick={handleDelete} color="error">
              <MdDelete size={24} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductPage;
