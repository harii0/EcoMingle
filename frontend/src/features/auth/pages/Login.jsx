import { Box } from '@mui/material';
import Form from '../components/Form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const { loading, error, helperText, user } = useSelector(
    (state) => state.auth,
  );
  console.log('user', user);
  // Define form fields
  const fields = [
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
    },
  ];

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      dispatch(loginUser(values));
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
        error={Boolean(error)}
        helperText={helperText}
        variant={'Login'}
        fields={fields}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
    </Box>
  );
};

export default LoginForm;
