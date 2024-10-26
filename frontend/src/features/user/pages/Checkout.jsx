import React, { useState, useEffect } from 'react';
import { selectCheckoutItems } from '../cartSlice';
import {
  CssBaseline,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmOrder, createOrder, processOrder } from '../api/orderApi';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function Checkout() {
  const navigate = useNavigate();
  const checkoutItems = useSelector(selectCheckoutItems);

  useEffect(() => {
    if (checkoutItems.length === 0) navigate('/cart');
  }, [checkoutItems.length, navigate]);

  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [confirmed, setConfirmed] = useState(null);

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    handleNext();
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    handleNext();
  };

  const handlePlaceOrder = async () => {
    if (!shippingData || !checkoutItems.length) return; // Check if data is available

    const orderData = {
      pId: checkoutItems[0].productItem,
      quantity: checkoutItems[0].quantity || 1,
      shippingAddress1: shippingData.shippingAddress1,
      city: shippingData.city,
      zip: shippingData.zip,
      country: shippingData.country,
      phone: shippingData.phone,
    };

    try {
      const res = await createOrder(orderData);
      console.log(res);

      //processPayment
      const processData = {
        orderId: res.data._id,
        paymentMethod: 'pm_card_visa',
        currency: 'usd',
      };
      const process = await processOrder(processData);
      console.log(process);
      const confirmData = {
        paymentIntentId: process.data.paymentIntentId,
        orderId: res.data._id,
        paymentMethod: 'pm_card_visa',
      };
      const confirmPayment = await confirmOrder(confirmData);
      if (confirmPayment.status === 200) {
        setConfirmed(confirmPayment);
        handleNext();
      }

      //confirmPayment
    } catch (error) {
      console.error('Error creating order:', error); // Handle error accordingly.
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm onSubmit={handleShippingSubmit} />;
      case 1:
        return <PaymentForm onSubmit={handlePaymentSubmit} />;
      case 2:
        return <Review shippingData={shippingData} paymentData={paymentData} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={7}>
          <main style={{ width: 'auto' }}>
            <Paper sx={{ p: 2 }}>
              <Typography component="h1" variant="h6">
                Checkout
              </Typography>

              {/* Stepper Navigation */}
              <Stepper activeStep={activeStep} sx={{ padding: '24px 0' }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Conditional Rendering based on Active Step */}
              {activeStep === steps.length ? (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '90vh',
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{ padding: 4, textAlign: 'center', maxWidth: 400 }}
                    >
                      <CheckCircleOutline
                        sx={{ fontSize: 80, color: 'green' }}
                      />
                      <Typography variant="h4" sx={{ marginTop: 2 }}>
                        Order Placed Successfully!
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ marginTop: 1, color: 'gray' }}
                      >
                        Thank you for your purchase. Your order is being
                        processed.
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ marginTop: 1, color: 'gray' }}
                      >
                        Order ID: #123456789
                      </Typography>

                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 3 }}
                      >
                        Continue Shopping
                      </Button>
                    </Paper>
                  </Box>
                </>
              ) : (
                <>
                  {getStepContent(activeStep)}
                  {/* Navigation Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    {activeStep === steps.length - 1 && (
                      <Button
                        onClick={handlePlaceOrder}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Place order
                      </Button>
                    )}
                  </div>
                </>
              )}
            </Paper>
          </main>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
