import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DataContext, SERVERURL } from '../client/data-context';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function SignIn() {
  const theme = useTheme();
  const navigate = useNavigate();
  const context = useContext(DataContext);

  const validationSchema = yup.object({
    email: yup
      .string('הכנס מייל')
      .email('מייל לא תקין')
      .required('שדה חובה'),
    password: yup
      .string('הכנס סיסמה')
      .min(2, 'סיסמה צריכה להכיל לפחות 8 תויים')
      .max(10, 'סיסמה יכולה להכיל עד 10 תווים')
      .required('שדה חובה'),
    checked: yup
      .boolean(),
  });
  
  const formik = useFormik({
    initialValues: { email: '', password: '', checked: true },
    validationSchema: validationSchema,
    onSubmit: (values) => { handleLogIn(values) },
  });
  
  const handleLogIn = (values) => {
    axios.post(`${SERVERURL}/api/User/Signin`, { by: "client", email: values.email, password: values.password, phonenumber: '' })
      .then(ans => {
        console.log(ans, ans.data);
        if (ans.data.user.type == 1) {
          context.setAdmin(ans.data.user);
        } else {
          context.setUser(ans.data.user);
          context.setCart(ans.data.cart);
          context.setCartProducts(ans.data.cartProducts);
        }
        context.saveToken(ans.data.token);
        context.saveCache(ans.data);
        console.log(context.cart);
        console.log(context.cartProducts);
        if (ans.data && ans.data.user.type === 1) {
          context.setRole("secretary");
          navigate('/');
        } else if (ans.status > 201) {
          window.confirm('Incorrect user or password');
        } else {
          context.setRole("client");
          navigate('/');
        }
      }).catch(err => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          let res = window.confirm('משתמש לא נמצא, עבור להרשמה');
          if (res)
            navigate('/signUp');
        } else if (err.response && err.response.status === 500) {
          alert("שגיאה בהתחברות");
        } else {
          let res = window.confirm('משתמש לא נמצא, עבור להרשמה');
          if (res)
            navigate('/signUp');
        }
      });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
      <CssBaseline />
      <Paper 
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.light} 100%)`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar 
            sx={{ 
              m: 1, 
              width: 56,
              height: 56,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0px 4px 12px ${theme.palette.primary.main}40`,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography 
            component="h1" 
            variant="h4"
            sx={{ 
              mt: 2,
              mb: 1,
              fontWeight: 700,
              color: theme.palette.text.primary
            }}
          >
            התחברות
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 3,
              color: theme.palette.text.secondary
            }}
          >
            ברוכים השבים למורשת!
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="כתובת מייל"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמה"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 4, 
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                }
              }}
            >
              התחבר לחשבון
            </Button>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Link 
                  href="#" 
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  שכחתי סיסמה
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                <Link 
                  href="/signup" 
                  variant="body2"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  אין לך חשבון? הירשם כאן
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}