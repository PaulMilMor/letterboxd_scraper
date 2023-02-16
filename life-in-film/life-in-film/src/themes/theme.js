import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
        default: "#14181c"
    },
    primary: {
      main: '#f3f5f7',
    },
    secondary: {
      main: '#9dadbe',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
