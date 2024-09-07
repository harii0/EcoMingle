import { styled } from '@mui/material/styles';
import MuiTab from '@mui/material/Tab';

const CustomTab = styled(MuiTab)({
  textTransform: 'none',
  fontSize: '12px',
  padding: 0,
  fontWeight: 400,
  color: '#0000003',
  border: '1px solid #00000033',
  borderRadius: '50px',
  marginRight: '10px',
  minHeight: '35px',
});

export default CustomTab;
