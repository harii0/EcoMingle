/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, IconButton, Button } from '@mui/material';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  getFromCart,
  updateQuantity,
  setCheckoutItems,
  clearCart,
} from '../cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { FiInbox } from 'react-icons/fi';
import { useEffect } from 'react';

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: '100%',
        p: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <FiInbox size={80} strokeWidth={1.5} color="#9e9e9e" />
      <Typography
        variant="h5"
        sx={{ mt: 3, fontWeight: 'medium', color: 'text.secondary' }}
      >
        Your Cart is Empty!
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 1, mb: 4, color: 'text.secondary' }}
      >
        Looks like you haven&apos;t added anything to your cart yet.
      </Typography>
      <Button
        variant="contained"
        sx={{
          px: 2,
          py: 1,
        }}
        onClick={() => navigate('/')}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

const CartItem = ({
  item,
  handleRemoveItem,
  handleIncrementQuantity,
  handleDecrementQuantity,
}) => {
  const product = item;

  if (!product) return null;

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
          src={product.productImage}
          alt={product.productName}
          style={{ width: 80, height: 80, objectFit: 'cover' }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="medium">
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Seller: {product.seller}
          </Typography>
        </Box>
      </Box>
      <Typography variant="subtitle1">${product.price}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          size="small"
          onClick={() => handleDecrementQuantity(product.productItem)}
          disabled={product.quantity <= 1}
        >
          <RemoveIcon />
        </IconButton>
        <Typography>{product.quantity}</Typography>
        <IconButton
          size="small"
          onClick={() => handleIncrementQuantity(product.productItem)}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <IconButton onClick={() => handleRemoveItem(product.productItem)}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

const OrderSummary = ({ subtotal, shipping, tax, total, onCheckout }) => {
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
        disableElevation
        disableRipple
        fullWidth
        sx={{
          mt: 2,
          bgcolor: 'primary.main',
          '&:hover': { bgcolor: '#45a049' },
        }}
        onClick={onCheckout}
      >
        Checkout
      </Button>
      <Button
        disableElevation
        disableRipple
        variant="text"
        fullWidth
        sx={{
          mt: 1,
          '&:hover': {
            bgcolor: 'transparent',
          },
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { user } = useSelector((state) => state.auth);
  const role = user?.data?.user?.role || user?.user.role;
  const cartTotal = useSelector(selectCartTotal);
  useEffect(() => {
    if (role === 'admin') {
      dispatch(clearCart());
    } else if (cartItems?.length == 0) dispatch(getFromCart());
  }, [dispatch, cartItems?.length, role]);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncrementQuantity = (productId) => {
    const item = cartItems.find((item) => item.productItem === productId);
    if (item) {
      dispatch(updateQuantity({ productId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrementQuantity = (productId) => {
    const item = cartItems.find((item) => item.productItem === productId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ productId, quantity: item.quantity - 1 }));
    }
  };
  const handleCheckout = () => {
    dispatch(setCheckoutItems(cartItems));
    navigate('/cart/checkout');
  };

  const shipping = 0; // Free shipping
  const tax = cartTotal * 0.1; // Assume 10% tax
  const total = cartTotal + shipping + tax;

  return cartItems?.length > 0 ? (
    <Grid container spacing={4} sx={{ p: 2 }} mt={1}>
      <Grid item xs={12} md={7}>
        <Typography variant="h5" gutterBottom>
          Your cart
        </Typography>
        {cartItems.map((item) => (
          <CartItem
            key={item.productItem}
            item={item}
            handleRemoveItem={() => handleRemoveItem(item.productItem)}
            handleIncrementQuantity={handleIncrementQuantity}
            handleDecrementQuantity={handleDecrementQuantity}
          />
        ))}
      </Grid>
      <Grid item xs={12} md={5}>
        <OrderSummary
          subtotal={cartTotal}
          shipping={shipping}
          tax={tax}
          total={total}
          onCheckout={handleCheckout}
        />
      </Grid>
    </Grid>
  ) : (
    <EmptyCart />
  );
};

export default Cart;
