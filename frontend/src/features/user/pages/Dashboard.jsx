import { Box } from '@mui/material';
const Dashboard = () => {
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
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
    </Box>
  );
};

export default Dashboard;
