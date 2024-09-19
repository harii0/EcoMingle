import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Grid,
  Button,
  Typography,
  Box,
  Paper,
  Container,
} from '@mui/material';

const Checkout = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            {/* Left Column - Shipping Address */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="streetAddress"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Street Address"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="City"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="state"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="State"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="zipCode"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Zip Code"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Country"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Full name"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column - Your Order */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Your Order
              </Typography>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {/* Placeholder for order items */}
                  <Box sx={{ width: 50, height: 50, bgcolor: 'grey.300' }} />
                  <Box sx={{ width: 50, height: 50, bgcolor: 'grey.300' }} />
                  <Box sx={{ width: 50, height: 50, bgcolor: 'grey.300' }} />
                </Box>
                <Button variant="outlined" size="small">
                  Edit Cart
                </Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Subtotal:</Typography>
                  <Typography>Shipping:</Typography>
                  <Typography>Tax:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography>$75.00</Typography>
                  <Typography>Free</Typography>
                  <Typography>$3.00</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography variant="h6">$78.00</Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Place Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Checkout;
