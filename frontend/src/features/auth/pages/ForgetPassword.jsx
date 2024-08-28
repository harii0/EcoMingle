import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../api';
import Form from '../components/Form';
const ForgetPassword = () => {
  const dispatch = useDispatch();
  const { error, loading, helperText } = useSelector((state) => state.auth);
  // Define form fields
  const fields = [
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
    },
  ];

  const onSubmit = async (data) => {
    dispatch(forgetPassword(data));
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
        helperText={helperText}
        fields={fields}
        error={error}
        loading={loading}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default ForgetPassword;
