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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState,useContext } from "react";
import {DataContext} from './data-context';
import {useNavigate } from "react-router-dom";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const context = useContext(DataContext)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [phonenumber1, setPhoneNumber1] = useState('')
    const [phonenumber2, setPhoneNumber2] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    
    
    const validate = (field) =>{
        if(field.length === 0){
            alert(`please enter all fields`);
            return false;
        }
        return true;
    }

        if(validate(name) === false) return;
        if(validate(phonenumber1) === false) return;
        if(validate(phonenumber2) === false) return;
        if(validate(email) === false) return;
        if(validate(password) === false) return;


        if(phonenumber1.length > 10 || phonenumber2.length > 10){
            alert("phone number too long");
            return;
        }

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, password, phonenumber1, phonenumber2
            })
        }
       const singupBody={name, email, password, phonenumber1, phonenumber2}
        axios.post('https://localhost:7128/api/User/Signup', singupBody)
        .then(ans => {
                if (ans !==null) {
                    alert("נרשמת בהצלחה!")
                    context.setUser(ans[0]);
                    navigate('/signin')
                    
                }
            })
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשמה
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                onChange={(ev) => setName(ev.target.value)}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                onChange={(ev) => setEmail(ev.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                onChange={(ev) => setPassword(ev.target.value)}
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
                onChange={(ev) => setPhoneNumber1(ev.target.value)}
                  required
                  fullWidth
                  name="phone1"
                  label="Phone1"
                  type="phone1"
                  id="phone1"
                  autoComplete="new-phone1"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                onChange={(ev) => setPhoneNumber2(ev.target.value)}
                  required
                  fullWidth
                  name="phone2"
                  label="Phone2"
                  type="phone2"
                  id="phone2"
                  autoComplete="new-phone2"
                />
              </Grid>
              <Grid item xs={12}>
                
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}