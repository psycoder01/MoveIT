import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));
