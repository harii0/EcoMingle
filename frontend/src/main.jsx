import React from 'react';
import ReactDOM from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './utils/interceptors.js';

import store from './redux/store.js';
import App from './App.jsx';
import './index.css';
import theme from './theme/theme.js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const options = {};
ReactDOM.createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise} options={options}>
    <Provider store={store}>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Provider>
  </Elements>,
);
