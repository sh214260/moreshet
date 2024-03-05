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
import axios from "axios";
import { useState, useContext } from "react";
import { DataContext } from './data-context';
import { useNavigate } from "react-router-dom";
import { green } from '@mui/material/colors';
import { useFormik } from 'formik';
import * as yup from 'yup';
// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  const context = useContext(DataContext)
  const navigate = useNavigate()
  
  const validationSchema = yup.object({
    name: yup
      .string('Enter your firstName')
      .max(20, 'You cannot enter more than 20 letters')
      .required('Name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    phonenumber1: yup
      .string('Enter your phone')
      .min(10, 'Phone should be of minimum 10 characters length')
      .max(10, 'You cannot enter more than 10 letters')
      .required('phone number is required'),
    phonenumber2: yup
      .string('Enter your phone')
      .min(10, 'Phone should be of minimum 10 characters length')
      .max(10, 'You cannot enter more than 10 letters'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .max(10, 'You cannot enter more than 20 letters')
      .required('Password is required'),
    address: yup
      .string('Enter your password')
      .min(8, 'address should be of minimum 8 characters length')
      .max(25, 'You cannot enter more than 20 letters')
      .required('Password is required'),
    checked: yup
      .boolean(),
  });
  const formik = useFormik({
    initialValues: {name:'', email: '', password: '',phonenumber1:'', phonenumber2:'',
    address:'', checked: true },
    validationSchema: validationSchema,
    onSubmit: (values) => { handleSignUp(values) },
  });
  // const [name, setName] = useState('')
  // const [phonenumber1, setPhoneNumber1] = useState('')
  // const [phonenumber2, setPhoneNumber2] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [address, setAddress] = useState('')

  const handleSignUp = (values) => {
    const newUser = { name: values.name, email: values.email, address: values.address, 
      phonenumber1: values.phonenumber1, phonenumber2: values.phonenumber2 }
    axios.post(`https://localhost:7128/api/User/Signup/${values.password}`, newUser)
      .then(ans => {
        if (ans.data) {
          alert("נרשמת בהצלחה!")
          navigate('/signin')
        }
      })
  };

  return (
    <Container component="main" maxWidth="xs">
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
          הרשמה
        </Typography>
        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
               error={formik.touched.name && Boolean(formik.errors.name)}
               helperText={formik.touched.name && formik.errors.name}
               value={formik.values.name}
               onBlur={formik.handleBlur}
               onChange={formik.handleChange}
                // onChange={(ev) => setName(ev.target.value)}
                autoComplete="given-name"
                name="name"
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               error={formik.touched.email && Boolean(formik.errors.email)}
               helperText={formik.touched.email && formik.errors.email}
               value={formik.values.email}
               onBlur={formik.handleBlur}
               onChange={formik.handleChange}
                // onChange={(ev) => setEmail(ev.target.value)}
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
                // onChange={(ev) => setPassword(ev.target.value)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              error={formik.touched.phonenumber1 && Boolean(formik.errors.phonenumber1)}
              helperText={formik.touched.phonenumber1 && formik.errors.phonenumber1}
              value={formik.values.phonenumber1}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
                // onChange={(ev) => setPhoneNumber1(ev.target.value)}
                
                fullWidth
                name="phonenumber1"
                label="Phone1"
                type="phonenumber1"
                id="phonenumber1"
                autoComplete="new-phone1"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              error={formik.touched.phonenumber2 && Boolean(formik.errors.phonenumber2)}
              helperText={formik.touched.phonenumber2 && formik.errors.phonenumber2}
              value={formik.values.phonenumber2}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
                // onChange={(ev) => setPhoneNumber2(ev.target.value)}
                
                fullWidth
                name="phonenumber2"
                label="Phone2"
                type="phonenumber2"
                id="phonenumber2"
                autoComplete="new-phone2"
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
               error={formik.touched.address && Boolean(formik.errors.address)}
               helperText={formik.touched.address && formik.errors.address}
               value={formik.values.address}
               onBlur={formik.handleBlur}
               onChange={formik.handleChange}
                // value={address}
                // onChange={(ev) => setAddress(ev.target.value)}
                required
                fullWidth
                name="address"
                label="Address"
                type="address"
                id="address"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            הרשם
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                כבר יש לך חשבון? התחבר
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}