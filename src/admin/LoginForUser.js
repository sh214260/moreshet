import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DataContext, SERVERURL } from '../client/data-context';
import {  useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { green } from '@mui/material/colors';
import { useFormik } from 'formik';
// import * as yup from 'yup';
import * as yup from 'yup';
export default function SignIn() {

  const validationSchema = yup.object({
    phonenumber: yup 
    .string('Enter your phone')
    .min(10, 'Phone should be of minimum 10 characters length')
    .max(10, 'You cannot enter more than 10 letters')
    .required('phone number is required'),
  });
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { phonenumber: '' },
    validationSchema: validationSchema,
    onSubmit: (values) => { handleLogIn(values) },
  });
  const handleLogIn = (values) => {
    axios.post(`${SERVERURL}/api/User/Signin`, { by:"secretary", email: "", password:"", phonenumber:values.phonenumber })
      .then(ans => {
        console.log(ans, ans.data);
        context.setUser(ans.data.user);
        context.setCart(ans.data.cart)
        context.setCartProducts(ans.data.cartProducts)
        context.saveToken(ans.data.token)
        console.log(context.cart)
        console.log(context.cartProducts)
        if (ans.data && ans.data.user.type === 1) {
          navigate('/HomeAd')
        }else if(ans.status > 201){
          window.confirm('Incorrect user or password')
        }
        else {
          navigate('/')
        }
       
      }).catch(err => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          let res = window.confirm('User not found!, please proceed to registration')
          if (res)
            navigate('/signUp')
        }
        else if (err.response && err.response.status === 500)
          alert("Server error");
        else
        {
          let res = window.confirm('User not found!, please proceed to registration')
          if (res)
            navigate('/signUp')
        }
      })
  }
  const context = useContext(DataContext)

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
          הכנס מספר טלפון של לקוח
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
            value={formik.values.phonenumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            margin="normal"
            required
            fullWidth
            id="phonenumber"
            label="phone number"
            name="phonenumber"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            הכנס
          </Button>      
        </Box>
      </Box>
    </Container>
  );
}