import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

// Brand colors - colorful, lively, playful yet professional
const brandColors = {
  primary: {
    main: '#FF6B35', // Vibrant coral/orange - energetic and fun
    light: '#FF8F66',
    dark: '#E85A2B',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4ECDC4', // Turquoise - fresh and inviting
    light: '#7ED9D2',
    dark: '#3BA29B',
    contrastText: '#FFFFFF',
  },
  accent: {
    main: '#FFE66D', // Sunny yellow - cheerful
    light: '#FFF199',
    dark: '#E6CF62',
    contrastText: '#2C3E50',
  },
  purple: {
    main: '#A06CD5', // Soft purple - playful
    light: '#B88EDE',
    dark: '#8754BC',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#6BCF7F',
    light: '#8EDD9E',
    dark: '#52B566',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#4A90E2',
    light: '#6FA8E8',
    dark: '#3A73B8',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFB347',
    light: '#FFC670',
    dark: '#E69F3D',
    contrastText: '#2C3E50',
  },
  error: {
    main: '#FF6B9D',
    light: '#FF8FB3',
    dark: '#E65588',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FAFBFC',
    paper: '#FFFFFF',
    light: '#F5F8FA',
  },
  text: {
    primary: '#2C3E50',
    secondary: '#546E7A',
    disabled: '#90A4AE',
  },
  divider: 'rgba(0, 0, 0, 0.08)',
};

const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    ...brandColors,
  },
  typography: {
    fontFamily: [
      'Rubik',
      'Assistant',
      'Heebo',
      '-apple-system',
      'BlinkMacSystemFont',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: brandColors.text.primary,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: brandColors.text.primary,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: brandColors.text.primary,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: brandColors.text.primary,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: brandColors.text.primary,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: brandColors.text.primary,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
      color: brandColors.text.secondary,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
      color: brandColors.text.secondary,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.7,
      color: brandColors.text.primary,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.7,
      color: brandColors.text.secondary,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.6,
      color: brandColors.text.secondary,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 6px 12px rgba(0, 0, 0, 0.1)',
    '0px 8px 16px rgba(0, 0, 0, 0.12)',
    '0px 10px 20px rgba(0, 0, 0, 0.14)',
    '0px 12px 24px rgba(0, 0, 0, 0.16)',
    '0px 16px 32px rgba(0, 0, 0, 0.18)',
    '0px 20px 40px rgba(0, 0, 0, 0.2)',
    '0px 24px 48px rgba(0, 0, 0, 0.22)',
    '0px 2px 4px rgba(255, 107, 53, 0.1)',
    '0px 4px 8px rgba(255, 107, 53, 0.15)',
    '0px 6px 12px rgba(255, 107, 53, 0.2)',
    '0px 8px 16px rgba(255, 107, 53, 0.25)',
    '0px 10px 20px rgba(255, 107, 53, 0.3)',
    '0px 12px 24px rgba(255, 107, 53, 0.35)',
    '0px 16px 32px rgba(78, 205, 196, 0.2)',
    '0px 20px 40px rgba(78, 205, 196, 0.25)',
    '0px 24px 48px rgba(78, 205, 196, 0.3)',
    '0px 2px 8px rgba(0, 0, 0, 0.08)',
    '0px 4px 12px rgba(0, 0, 0, 0.1)',
    '0px 6px 16px rgba(0, 0, 0, 0.12)',
    '0px 8px 20px rgba(0, 0, 0, 0.14)',
    '0px 10px 24px rgba(0, 0, 0, 0.16)',
    '0px 12px 28px rgba(0, 0, 0, 0.18)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          direction: 'rtl',
          scrollBehavior: 'smooth',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1.125rem',
        },
        sizeMedium: {
          padding: '10px 24px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: '16px 16px 0 0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: brandColors.primary.main,
                borderWidth: 2,
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: brandColors.primary.main,
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: brandColors.primary.light + '20',
          },
          '&.Mui-selected': {
            backgroundColor: brandColors.primary.main + '15',
            '&:hover': {
              backgroundColor: brandColors.primary.main + '25',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
}, heIL);

export default theme;
