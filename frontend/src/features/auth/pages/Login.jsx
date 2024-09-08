import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { loginUser } from '../authSlice';
import { useEffect } from 'react';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, helperText, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

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

  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (error == false && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [error, isAuthenticated]);

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
        variant={'Login'}
        error={error}
        helperText={helperText}
        fields={fields}
        onSubmit={onSubmit}
        loading={loading}
      />
    </Box>
  );
};

export default LoginForm;
