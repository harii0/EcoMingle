import { Box, Button, Container, Typography } from '@mui/material';
import { Recycling as RecyclingIcon } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '40vh',
          textAlign: 'center',
          py: 1,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            height: 300,
            mb: 3,
          }}
        >
          <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="150" fill="none" />
            <path d="M100 20 L80 50 L120 50 Z" fill="#4caf50" />
            <circle cx="100" cy="85" r="30" fill="#81c784" />
            <path
              d="M70 85 Q100 120 130 85"
              fill="none"
              stroke="#2e7d32"
              strokeWidth="3"
            />
            <text
              x="100"
              y="140"
              fontSize="40"
              fontWeight="bold"
              fill="#1b5e20"
              textAnchor="middle"
            >
              404
            </text>
          </svg>
        </Box>

        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          sx={{
            fontWeight: 500,
            letterSpacing: -1,
            mb: 2,
          }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          paragraph
          color="text.secondary"
          sx={{
            maxWidth: '60ch',
            mb: 3,
            lineHeight: 1.6,
          }}
        >
          We couldn &apos;t find the page you&apos;re looking for. It seems to
          vanished like single-use plastic in our store!
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RecyclingIcon />}
          href="/"
          sx={{
            textTransform: 'none',
          }}
        >
          Recycle This Page
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
