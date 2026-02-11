import { Link, Typography, Box, useTheme } from '@mui/material';
import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Copyright() {
    const theme = useTheme();
    return (
      <Box 
        sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto',
          backgroundColor: theme.palette.background.light,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}
        >
          <span>{'כל הזכויות שמורות © '}</span>
          {new Date().getFullYear()}
          {' '}
          <Link 
            color="inherit" 
            href="/"
            sx={{ 
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': {
                color: theme.palette.primary.main,
                textDecoration: 'underline',
              }
            }}
          >
            למורשת – החוויה המושלמת
          </Link>
          {' • '}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {'נבנה עם'}
            <FavoriteIcon sx={{ fontSize: 16, color: theme.palette.error.main }} />
          </span>
        </Typography>
      </Box>
    );
  }