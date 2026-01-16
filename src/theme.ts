import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f766e',
      light: '#10b981',
      dark: '#0b4f49',
      contrastText: '#f8fafc',
    },
    secondary: {
      main: '#f97316',
      light: '#fb923c',
      dark: '#c2410c',
      contrastText: '#0b0b0b',
    },
    background: {
      default: '#f6f1e8',
      paper: '#fffaf2',
    },
    text: {
      primary: '#1f2933',
      secondary: '#4b5563',
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontFamily: '"Dotum", "돋움", Arial, sans-serif',
    h1: {
      fontFamily: '"Dotum", "돋움", Arial, sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Dotum", "돋움", Arial, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Dotum", "돋움", Arial, sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 2,
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
})

export default theme
