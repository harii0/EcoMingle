import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/appRoutes';
import Layout from './layout/layout';
function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
