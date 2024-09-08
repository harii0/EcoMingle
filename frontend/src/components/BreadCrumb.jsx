// components/BreadCrumbs.js
import { Breadcrumbs as MuiBreadCrumbs, Link, Typography } from '@mui/material';
import { withRouting } from '../hooks/withRouting'; // import the HOC

const BreadCrumbs = (props) => {
  const {
    router: { navigate, location }, // access the injected router props
  } = props;

  const pathnames = location.pathname.split('/').filter((x) => x);

  if (
    pathnames.includes('login') ||
    pathnames.includes('register') ||
    pathnames.includes('forgetpassword') ||
    pathnames.includes('reset-password')
  ) {
    pathnames.splice(0, 1);
  }

  return (
    <MuiBreadCrumbs
      aria-label="breadcrumb"
      separator={'/'}
      sx={{
        width: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      {pathnames.length > 0 ? (
        <Link
          color={'text.primary'}
          onClick={() => navigate('/')}
          fontSize={12}
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          Dashboard
        </Link>
      ) : (
        <Link
          fontSize={12}
          color={'text.primary'}
          onClick={() => navigate('/')}
        ></Link>
      )}

      {pathnames.map((value, index) => (
        <Link
          key={index}
          onClick={() => navigate(`/${value}`)}
          color={'text.primary'}
          fontSize={12}
          sx={{ cursor: 'pointer' }}
        >
          {value}
        </Link>
      ))}
    </MuiBreadCrumbs>
  );
};

export default withRouting(BreadCrumbs); // wrap the component with HOC
