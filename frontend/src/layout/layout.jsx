import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#ffff',
        }}
      >
        <Navbar />
        <Box
          sx={{
            py: 7,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {children}
        </Box>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
