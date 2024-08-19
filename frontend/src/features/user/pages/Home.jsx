import { Box, Typography } from '@mui/material';
import PrimaryButton from '../../../components/button/Button';
import ecomingle from '../../../assets/images/ecomingle.svg';
import btnimg from '../../../assets/images/button.svg';
import CallMadeIcon from '@mui/icons-material/CallMade';
import ReviewCard from '../components/ReviewCard';
import reviewImg1 from '../../../assets/images/reviewimg.png';
import reviewImg2 from '../../../assets/images/reviewimg2.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '30px',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 4,
          px: 4,
          backgroundColor: 'background.paper',
        }}
      >
        {/* Hero Text */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h3"
            color="text.primary"
            sx={{
              fontSize: '40px',
              fontWeight: 500,
              mb: 2,
              lineHeight: 1.4,
            }}
          >
            Your Journey to Sustainability Starts Here
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '500px', lineHeight: 1.6 }}
          >
            Production of packaging that not only{' '}
            <span style={{ textDecoration: 'underline' }}>
              ensures the safety
            </span>{' '}
            of products but also has a{' '}
            <span style={{ textDecoration: 'underline' }}>minimal</span>{' '}
            environmental impact.
          </Typography>

          {/* Hero Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <PrimaryButton
              onClick={() => navigate('/login')}
              variant="outlined"
              fontWeight={500}
              fontSize={'14px'}
              sx={{
                borderRadius: '30px',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:hover': {
                  borderColor: 'primary.dark',
                  color: 'primary.dark',
                },
              }}
            >
              Join EcoMingle{' '}
              <img
                style={{ marginRight: '-10px' }}
                src={btnimg}
                alt="button"
                width={30}
                aria-label="button-icon"
              />
            </PrimaryButton>
            <PrimaryButton
              fontsize={'14px'}
              variant="text"
              fontWeight={500}
              sx={{
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'underline',
              }}
            >
              Learn More
              <CallMadeIcon />
            </PrimaryButton>
          </Box>
        </Box>

        {/* Hero Image */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img
            src={ecomingle}
            alt="EcoMingle"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
            }}
          />
        </Box>
      </Box>

      {/* Review Section */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          mt: 4,
        }}
      >
        <ReviewCard
          title="Eco-Friendly Packaging"
          description="Our packaging reduces waste and minimizes environmental impact, ensuring your purchases are as eco-conscious as possible."
          reviewimg={reviewImg1}
        />
        <ReviewCard
          title="24/7 Customer Support"
          description="Our dedicated support team is always here to help, making sure every customer is 100% satisfied."
          reviewimg={reviewImg2}
        />
      </Box>
    </Box>
  );
};

export default Home;
