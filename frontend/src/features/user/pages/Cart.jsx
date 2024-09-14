/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Grid, Typography, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

const CartItem = ({ product, handleRemoveItem }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        p: 2,
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: 80, height: 80, objectFit: 'cover' }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="medium ">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Seller: {product.seller}
          </Typography>
        </Box>
      </Box>
      <Typography variant="subtitle1">${product.price.toFixed(2)}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small">
          <RemoveIcon />
        </IconButton>
        <Typography>{product.quantity}</Typography>
        <IconButton size="small">
          <AddIcon />
        </IconButton>
      </Box>
      <IconButton>
        <CloseIcon onClick={() => handleRemoveItem(product.id)} />
      </IconButton>
    </Box>
  );
};

const OrderSummary = ({ subtotal, shipping, tax, total }) => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Subtotal</Typography>
        <Typography>${subtotal.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Shipping:</Typography>
        <Typography>
          {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Tax:</Typography>
        <Typography>${tax.toFixed(2)}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          fontWeight: 'bold',
        }}
      >
        <Typography>Total</Typography>
        <Typography>${total.toFixed(2)}</Typography>
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, bgcolor: '#4caf50', '&:hover': { bgcolor: '#45a049' } }}
      >
        Checkout
      </Button>
      <Button variant="text" fullWidth sx={{ mt: 1 }}>
        Continue Shopping
      </Button>
    </Box>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Raw Black T-Shirt Lineup',
      price: 75.0,
      image: '/path/to/black-tshirt.jpg',
      seller: 'Seller 1',
      size: 'M',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Essential Neutrals',
      price: 22.0,
      image: '/path/to/white-tshirt.jpg',
      seller: 'Seller 1',
      size: 'M',
      quantity: 1,
    },
  ]);

  const handleRemoveItem = (id) => {
    console.log(id);
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 0; // Free shipping
  const tax = 3.0;
  const total = subtotal + shipping + tax;

  return (
    <Grid container spacing={4} sx={{ p: 2 }} mt={1}>
      <Grid item xs={12} md={7}>
        <Typography variant="h5" gutterBottom>
          Your cart
        </Typography>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            product={item}
            handleRemoveItem={handleRemoveItem}
          />
        ))}
      </Grid>
      <Grid item xs={12} md={5}>
        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </Grid>
    </Grid>
  );
};

export default Cart;
