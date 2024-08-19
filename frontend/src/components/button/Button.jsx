/* eslint-disable react/prop-types */
import { Button } from '@mui/material';

const PrimaryButton = ({
  children,
  props,
  variant = 'outlined',
  fontWeight,
  fontSize,
  onClick,
  hovercolor,
  width,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        fontSize: fontSize,
        borderRadius: '50px',
        textTransform: 'none',
        fontWeight: fontWeight,
        fontStyle: 'normal',
        color: 'text.primary',
        borderColor: 'text.primary',
        display: 'flex',
        width: width,
        gap: 1,
        padding: '8px 14px',
        '&:hover': {
          backgroundColor: hovercolor,
        },
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
