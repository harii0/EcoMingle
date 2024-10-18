import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Card, Chip } from '@mui/material';

const AddressForm = () => {
  const address = [
    {
      type: 'home',
      contact: {
        name: 'hari',
        mobile_no: '222222',
      },
      address: {
        pin: '4444',
        main_address: 'dddddddddd',
        locality: 'rrrrrr',
      },
    },
  ];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
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
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="body1">{data.contact.name}</Typography>
                <Chip variant="outlined" label={data.type} />
              </Box>
              <Typography variant="body2">
                {data.address.main_address},{data.address.locality}-
                {data.address.pin}
              </Typography>
              <Typography variant="body2">
                Mobile: {data.contact.mobile_no}
              </Typography>
            </Card>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
