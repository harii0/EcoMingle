import React from 'react';
import { Typography, List, ListItem, ListItemText, Grid } from '@mui/material';

const Review = ({ shippingData, paymentData }) => {
  console.log(shippingData, paymentData);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {/* This is where you'd map through the cart items */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Product 1" secondary="Brief description" />
          <Typography variant="body2">$19.99</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $19.99
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{shippingData?.name}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
