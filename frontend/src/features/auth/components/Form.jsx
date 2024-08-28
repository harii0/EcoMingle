/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PrimaryButton from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';

const Form = ({ fields, onSubmit, variant, error, loading, helperText }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
  } = useForm();

  useEffect(() => {
    if (error) {
      setError('root', { type: 'required', message: helperText });
    }
  }, [error, setError]);

  const onSubmitWithValidation = (data) => {
    onSubmit(data);
  };

  const onError = (errors) => {
    const firstError = Object.keys(errors)[0];
    setFocus(firstError);
  };

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
        onSubmit={handleSubmit(onSubmitWithValidation, onError)}
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
              <Controller
                name={field.label.toLowerCase()}
                control={control}
                defaultValue=""
                rules={{ required: `${field.label} is required` }}
                render={({ field: { onChange, value, ref } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    inputRef={ref}
                    fullWidth
                    margin="dense"
                    size="small"
                    label={field.label}
                    variant="standard"
                    type={field.type}
                    placeholder={field.placeholder}
                    error={!!errors[field.label.toLowerCase()]}
                    helperText={errors[field.label.toLowerCase()]?.message}
                    InputLabelProps={{ sx: { fontSize: '14px' } }}
                    InputProps={{
                      sx: { fontSize: '14px', py: 0.5 },
                    }}
                  />
                )}
              />
            </Grid>
          ))}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: 2,
              paddingLeft: 1.5,
            }}
          >
            {error && (
              <Typography color="error" variant="body2" fontSize={'11px'}>
                {helperText}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 2,
            }}
          >
            {variant === 'Login' && (
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
            )}
          </Box>
          <Grid item xs={12}>
            <Button
              type="submit"
              disabled={loading}
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
                <CircularProgress size={24} color="inherit" />
              ) : (
                variant
              )}
            </Button>
            {variant === 'Login' && (
              <Divider
                textAlign="center"
                sx={{ marginTop: 1, marginBottom: 1 }}
              >
                <Chip label="or" size="small" />
              </Divider>
            )}
          </Grid>
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
