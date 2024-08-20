import { Box } from '@mui/material';
import { useState } from 'react';
import { forgetPassword } from './api';
import Form from './components/Form';
const ForgetPassword = () => {
  // Define form state
  const [values, setValues] = useState({
    email: '',
  });
  const [error, setError] = useState({ error: false, message: null });

  // Define form fields
  const fields = [
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
    },
  ];
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (error.error) {
      setError({
        error: false,
        message: null,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgetPassword(values);
      console.log(response);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 350,
        margin: 'auto',
        height: '90vh',
      }}
    >
      <Form
        variant={'Forgot Password'}
        fields={fields}
        error={error.error}
        helperText={error.message}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Box>
  );
};

export default ForgetPassword;
