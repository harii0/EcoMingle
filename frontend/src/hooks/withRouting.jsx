import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function withRouting(Component) {
  return function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  };
}
