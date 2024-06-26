import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DataContext, SERVERURL } from '../client/data-context';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { green } from '@mui/material/colors';
import { useFormik } from 'formik';
import * as yup from 'yup';
// TODO remove, this demo shouldn't need to reset the theme.
export default function SignIn() {

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
  const navigate = useNavigate()
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
          context.setAdmin(ans.data.user)
        }
        else {
          context.setUser(ans.data.user);
          context.setCart(ans.data.cart)
          context.setCartProducts(ans.data.cartProducts)
        }
        context.saveToken(ans.data.token)
        context.saveCache(ans.data)
        console.log(context.cart)
        console.log(context.cartProducts)
        if (ans.data && ans.data.user.type === 1) {
          context.setRole("secretary")
          navigate('/')
        } else if (ans.status > 201) {
          window.confirm('Incorrect user or password')
        }
        else {
          context.setRole("client")
          navigate('/')
        }

      }).catch(err => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          let res = window.confirm('משתמש לא נמצא, עבור להרשמה')
          if (res)
            navigate('/signUp')
        }
        else if (err.response && err.response.status === 500)
          alert("שגיאה בהתחברות");
        else {
          let res = window.confirm('משתמש לא נמצא, עבור להרשמה')
          if (res)
            navigate('/signUp')
        }
      })
  }
  const context = useContext(DataContext)
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  //   const validate = (field) => {
  //     if (field.length === 0) {
  //       alert(`please enter all fields`);
  //       return false;
  //     }
  //     return true;
  //   }

  //   if (validate(email) === false) return;
  //   if (validate(password) === false) return;
  //   axios.post(`${SERVERURL}/api/User/Signin`, { email: email, password: password })
  //     .then(ans => {
  //       console.log(ans.data)
  //       if (ans.data) {
  //         alert("משתמש קיים")
  //         context.setUser(ans.data.user);
  //         context.setCart(ans.data.cart)
  //         context.setCartProducts(ans.data.cartProducts)
  //         console.log(context.cart)
  //         console.log(context.cartProducts)
  //         if (ans.data.user.type == 1)
  //           navigate('/HomeAd')
  //         else {
  //           navigate('/')
  //         }
  //       }
  //       else {
  //         alert("לא קיים משתמש כזה")
  //         navigate('/signup')
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);

  //       if (err.response) {
  //         // Server responded with a status code
  //         if (err.response.status === 401) {
  //           // Unauthorized error
  //           alert("Invalid username or password");
  //         } else if (err.response.status === 404) {
  //           // Not found error
  //           alert("Cart not found");
  //         } else {
  //           // Other status code errors
  //           alert("An error occurred");
  //         }
  //       } else if (err.request) {
  //         // Request was made but no response was received
  //         console.log(err.request);
  //         alert("No response received");
  //       } else {
  //         // Other errors
  //         console.log(err);
  //         alert("An error occurred");
  //       }
  //     });

  //   setEmail("")
  //   setPassword("")
  // };

  return (
    <Container direction='rtl' component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: green[700] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          התחברות
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
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
            label="מייל"
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
            sx={{ mt: 3, mb: 2 }}
          >
            התחבר
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                שכחתי סיסמה
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"אין לך עדיין חשבון?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}