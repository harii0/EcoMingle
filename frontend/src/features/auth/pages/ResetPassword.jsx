import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../api';
import Form from '../components/Form';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

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

  const onSubmit = async (data) => {
    dispatch(resetPassword(data, token));
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
        variant={'ResetPassword'}
        error={error}
        fields={fields}
        onSubmit={onSubmit}
        loading={loading}
      />
    </Box>
  );
};

export default ResetPassword;
