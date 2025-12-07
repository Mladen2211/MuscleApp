import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#2563eb'
      },
      secondary: {
        main: '#10b981'
      },
      background: {
        default: mode === 'dark' ? '#0f172a' : '#f7f9fb',
        paper: mode === 'dark' ? '#111827' : '#ffffff'
      }
    },
    shape: {
      borderRadius: 18
    },
    typography: {
      fontFamily: 'var(--font-outfit)',
      button: {
        textTransform: 'none'
      }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 24
          }
        }
      }
    }
  });
