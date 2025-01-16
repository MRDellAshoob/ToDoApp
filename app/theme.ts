import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif', 
  },
  palette: {
    primary: {
      main: '#000', 
    },
    secondary: {
      main: '#9F9F9F', 
      light : '#D9D9D9'
    },
    info: {
      main: '#0760fb', 
    },
  },
});

export default theme;