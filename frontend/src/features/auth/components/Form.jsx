/* eslint-disable react/prop-types */
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import GoogleIcon from '@mui/icons-material/Google';
import PrimaryButton from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';

const Form = ({
  fields,
  handleSubmit,
  handleChange,
  variant,
  error,
  helperText,
  loading,
}) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        padding: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        component={'form'}
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 350,
          padding: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          textAlign: 'center',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <IconButton
          sx={{
            backgroundColor: 'primary.main',
            color: '#fff',
            marginBottom: 1.5,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          <LockOutlinedIcon fontSize="medium" />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          {variant}
        </Typography>
        <Grid container spacing={1.5}>
          {fields.map((field, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                onChange={handleChange}
                name={field.label.toLowerCase()}
                error={error}
                helperText={helperText}
                fullWidth
                margin="dense"
                size="small"
                label={field.label}
                variant="standard"
                type={field.type}
                placeholder={field.placeholder}
                InputLabelProps={{ sx: { fontSize: '14px' } }}
                InputProps={{
                  sx: { fontSize: '14px', py: 0.5 },
                }}
              />
            </Grid>
          ))}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 2,
            }}
          >
            {variant === 'Login' ? (
              <PrimaryButton
                size="small"
                variant="text"
                fontWeight={500}
                fontSize={'13px'}
                hovercolor={'transparent'}
                onClick={() => navigate('/forgetpassword')}
              >
                Forgot Password?
              </PrimaryButton>
            ) : null}
          </Box>
          <Grid item xs={12}>
            <Button
              type="submit"
              sx={{
                width: '100%',
                padding: 1,
                marginBottom: 1.5,
                backgroundColor: 'primary.main',
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
              variant="contained"
              size="medium"
              disableRipple
              disableElevation
            >
              {loading ? (
                <CircularProgress size={25} color="secondary" />
              ) : (
                variant
              )}
            </Button>
            {variant === 'Login' ? (
              <Divider
                textAlign="center"
                sx={{ marginTop: 1, marginBottom: 1 }}
              >
                <Chip label="or" size="small" />
              </Divider>
            ) : null}
          </Grid>
          {variant === 'Login' ? (
            <Grid item xs={12}>
              <Button
                startIcon={<GoogleIcon />}
                sx={{
                  width: '100%',
                  padding: 1,
                  marginBottom: 2,
                  borderRadius: 1.5,
                  textTransform: 'none',
                  backgroundColor: '#4285F4',
                  '&:hover': {
                    backgroundColor: '#357AE8',
                  },
                  color: '#fff',
                }}
                variant="contained"
                size="medium"
                disableRipple
                disableElevation
              >
                Sign in with Google
              </Button>
            </Grid>
          ) : null}
        </Grid>
        <Typography variant="body2" textAlign={'center'}>
          <PrimaryButton
            fontWeight={500}
            size="small"
            variant="text"
            hovercolor={'transparent'}
            width={'100%'}
            fontSize={'13px'}
            onClick={() => {
              variant === 'Login' ? navigate('/register') : navigate('/login');
            }}
          >
            {variant === 'Login'
              ? `Don't have an account? Sign Up`
              : 'Already have an account? Sign In'}
          </PrimaryButton>
        </Typography>
      </Box>
    </Box>
  );
};

export default Form;
