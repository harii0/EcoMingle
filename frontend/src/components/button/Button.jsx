/* eslint-disable react/prop-types */
import { Button } from '@mui/material';

const PrimaryButton = ({ children, props, variant = 'outlined', onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: '50px',
        textTransform: 'none',
        color: 'text.primary',
        borderColor: 'text.primary',
        display: 'flex',
        gap: 1,
      }}
      variant={variant}
      disableRipple
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
