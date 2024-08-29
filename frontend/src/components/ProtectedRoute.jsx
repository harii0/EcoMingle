/* eslint-disable react/prop-types */

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Component {...rest} />;
};

export default ProtectedRoute;
