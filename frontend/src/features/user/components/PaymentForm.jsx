import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#f4f6f8',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
  },
  inputField: {
    marginBottom: '0.8rem',
  },
  cardElementContainer: {
    marginBottom: '1.2rem',
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    backgroundColor: '#fff',
  },
  payButton: {
    backgroundColor: 'green',
    color: '#fff',
  },
}));

export default function PaymentForm({ onSubmit }) {
  const [cardName, setCardName] = useState('');
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: cardName,
      },
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      onSubmit({ paymentMethod: paymentMethod.id });
    }
  };

  const isDisable = cardName == '';
  const cardStyle = {
    style: {
      base: {
        fontSize: '14px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <Paper elevation={3} className={classes.formContainer}>
      <Typography variant="h5" gutterBottom>
        Payment Information
      </Typography>
      <form id="payment_form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name on Card"
              fullWidth
              variant="outlined"
              className={classes.inputField}
              size="small"
              required
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.cardElementContainer}>
              <label htmlFor="card_number_element">Card Number</label>
              <CardNumberElement id="card_number_element" options={cardStyle} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.cardElementContainer}>
              <label htmlFor="card_expiry_element">Expiry Date</label>
              <CardExpiryElement id="card_expiry_element" options={cardStyle} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.cardElementContainer}>
              <label htmlFor="card_cvc_element">CVC</label>
              <CardCvcElement id="card_cvc_element" options={cardStyle} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              className={classes.payButton}
              type="submit"
              size="medium"
              disabled={isDisable}
            >
              submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
