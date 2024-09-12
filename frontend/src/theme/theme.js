import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#447C5A', // Eco-friendly green color for primary actions.
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f2f2f2',
      contrastText: '#000000',
    },
    background: {
      default: '#ffff', // Light background to give a clean look.
      paper: '#ffffff', // White for cards, modals, etc.
    },
    text: {
      primary: '#333333', // Dark gray for primary text.
      secondary: '#5C5F6A', // Light gray for secondary text.
      custom: '#D3D3D3', // Green for custom text.
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#333333', // Dark gray for headings.
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#333333',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#333333',
    },
    h6: { fontSize: '18px' },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#666666', // For body text and secondary content.
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      color: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          boxShadow: 'none',
          textTransform: 'none', // No uppercase for button text.
        },
        containedPrimary: {
          backgroundColor: '#2e7d32',
          '&:hover': {
            backgroundColor: '#25672c', // Darker green on hover.
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '16px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // White app bar for a clean look.
          color: '#333333',
          boxShadow: 'none',
          borderRadius: 0,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#666666',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#333333',
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 600,
          color: '#333333',
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 500,
          color: '#333333',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        regular: {
          minHeight: '50px',
          minWidth: '100%',

          padding: '0px',
          width: '100%',
          '@media (min-width: 600px)': {
            minHeight: '50px',
            padding: '0px',
            alignItems: 'center',
          },
        },
        dense: {
          height: '57px',
          minHeight: '57px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderRadius: 6,
          fontSize: '12px',
          padding: 0,
          margin: 0,
          height: '25px',
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {},
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          margin: '0px',
          fontSize: '12px',
          color: '#666666',
        },
        separator: {
          color: '#666666',
          marginLeft: '10px',
          marginRight: '10px',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#666666',
          '&.Mui-checked': {
            backgroundColor: 'transparent',
            color: '#447C5A',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        standard: {
          background: 'transparent',
          textDecoration: 'none',
        },
      },
    },
  },
});

export default theme;
