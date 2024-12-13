import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/appRoutes';
import Layout from './layout/layout';
import { useSelector } from 'react-redux';
import VendorRoutes from './routes/vendorRoute';
import VendorLayout from './layout/vendorLayout';
function App() {
  const { vendor, isAuth } = useSelector((state) => state.vendor);

  const role = vendor?.data?.role;

  return (
    <Router>
      {role === 'vendor' || isAuth ? (
        <VendorLayout>
          <VendorRoutes />
        </VendorLayout>
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </Router>
  );
}

export default App;
