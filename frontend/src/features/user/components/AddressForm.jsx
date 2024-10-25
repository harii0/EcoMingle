import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  Box,
  Card,
  Chip,
  Button,
  Radio,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

// eslint-disable-next-line react/prop-types
const AddressForm = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    zip: '',
    shippingAddress1: '',
    city: '',
    country: '',
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {};
  const address = [
    {
      type: 'home',
      contact: {
        name: 'Hari',
        phone: '222222',
      },
      address: {
        zip: '4444',
        shippingAddress1: 'dddddddddd',
        city: 'Sample City',
        country: 'Sample Country',
      },
    },
  ];

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    setNewAddress({
      name: address.contact.name,
      phone: address.contact.phone,
      zip: address.address.zip,
      shippingAddress1: address.address.shippingAddress1,
      city: address.address.city,
      country: address.address.country,
    });
  };

  const handleNewAddressChange = (event) => {
    setNewAddress({
      ...newAddress,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedAddress || newAddress);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {address.map((data, index) => (
              <Card
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  boxShadow: 'none',
                  border: 'solid 1px',
                  marginBottom: 2,
                  cursor: 'pointer',
                  backgroundColor: selectedAddress === data ? '#fff' : 'white',
                }}
              >
                <Box
                  sx={{
                    display: 'flex ',
                    width: 'full',
                    justifyContent: 'space-between',
                  }}
                >
                  <Chip variant="outlined" label={data.type} />
                  <Radio onChange={() => handleAddressSelection(data)} />
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body1">{data.contact.name}</Typography>
                </Box>
                <Typography variant="body2">
                  {data.address.shippingAddress1}, {data.address.city} -{' '}
                  {data.address.zip}
                </Typography>
                <Typography variant="body2">
                  Mobile: {data.contact.phone}
                </Typography>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" onClick={handleOpen}>
              Add New Address
            </Button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogContent>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Full Name"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  value={newAddress.name}
                  onChange={handleNewAddressChange}
                  margin="normal"
                />
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Mobile Number"
                  fullWidth
                  autoComplete="tel"
                  variant="outlined"
                  value={newAddress.phone}
                  onChange={handleNewAddressChange}
                  margin="normal"
                />
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="ZIP / Postal Code"
                  fullWidth
                  autoComplete="postal-code"
                  variant="outlined"
                  value={newAddress.zip}
                  onChange={handleNewAddressChange}
                  margin="normal"
                />
                <TextField
                  required
                  id="shippingAddress1"
                  name="shippingAddress1"
                  label="Address Line 1"
                  fullWidth
                  autoComplete="street-address"
                  variant="outlined"
                  value={newAddress.shippingAddress1}
                  onChange={handleNewAddressChange}
                  margin="normal"
                />
                <TextField
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="address-level2"
                  variant="outlined"
                  value={newAddress.city}
                  onChange={handleNewAddressChange}
                  margin="normal"
                />
                <TextField
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="country"
                  variant="outlined"
                  value={newAddress.country}
                  onChange={handleNewAddressChange}
                  margin="normal"
                />
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, ml: 1 }}
          >
            Next
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default AddressForm;
