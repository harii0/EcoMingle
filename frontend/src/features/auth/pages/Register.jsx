import { Box } from '@mui/material';
import Form from '../components/Form';
import { registerUser } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const { error, loading, helperText } = useSelector((state) => state.auth);
  // Define form state

  // Define form fields
  const fields = [
    {
      label: 'Username',
      type: 'text',
      placeholder: 'Enter your name',
    },
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

  const onSubmit = async (data) => {
    dispatch(registerUser(data));
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
        variant={'Create Account'}
        error={error}
        helperText={helperText}
        fields={fields}
        onSubmit={onSubmit}
        loading={loading}
      />
    </Box>
  );
};

export default Register;
