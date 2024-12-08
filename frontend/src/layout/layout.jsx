import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import BreadCrumbs from '../components/BreadCrumb';
const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#ffff',
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          py: 5,
        }}
      >
        <BreadCrumbs />
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
