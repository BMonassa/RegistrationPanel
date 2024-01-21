import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#6A6A6A',
      main: '#9747FF',
      dark: '#F6F6F6',
      contrastText: '#515151',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#E0E0E0',
    },
    success: {
      main: '#46855B',
      light: '#DAF4E3',
    },
    warning: {
      main: '#E53E3E',
      light: '#FCECEC',
    },
  },
});
