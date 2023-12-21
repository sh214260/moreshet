import { Link, Typography } from '@mui/material';
import * as React from 'react';

export default function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'כל הזכויות שמורות © '}
        {new Date().getFullYear()}
        {' '}
        <Link color="inherit" href="">
          למורשת החויה המושלמת      
          </Link>{' '}
        {'.'}
      </Typography>
    );
  }