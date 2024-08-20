import { Box } from '@mui/material';
import Form from './components/Form';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { resetPassword } from './api';

const ResetPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  // Define form state
  const [values, setValues] = useState({
    password: '',
    confirmpassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: null,
  });

  // Define form fields
  const fields = [
    {
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your email',
    },
    {
      label: 'ConfirmPassword',
      type: 'password',
      placeholder: 'Enter your password',
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
    if (values.password !== values.confirmpassword) {
      setError({
        error: true,
        message: 'Passwords do not match',
      });
      return;
    } else {
      setError({
        error: false,
        message: null,
      });
    }

    try {
      setLoading(true);
      const response = await resetPassword({ ...values }, token);
      console.log('response', response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError({
        error: true,
        message: err.response?.data?.message,
      });
      console.log('err', err);
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
        error={error.error}
        helperText={error.message}
        variant={'ResetPassword'}
        fields={fields}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
    </Box>
  );
};

export default ResetPassword;
