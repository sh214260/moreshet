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
import { DataContext } from '../client/data-context';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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

export default function SignIn() {
    const navigate = useNavigate()
    const context = useContext(DataContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

        const option = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        }
        console.log(option)
        // axios.post(`https://localhost:7128/api/User/GetUser/${email}/${userpassword}`, option)
        axios.post(`https://localhost:7128/api/User/Signin`, {email, password})
        .then(ans => {
                console.log(ans.data)
                if (ans.data) {
                    alert("משתמש קיים")
                    context.setUser(ans.data[0]);
                    if (ans.data.type != 0)
                        navigate('/HomeAd')
                    else {
                        navigate('/Catalog')
                    }
                }
                else {
                    alert("לא קיים משתמש כזה")
                    navigate('/signup')
                }
            })
        setEmail("")
        setPassword("")
  };


  return (
    <ThemeProvider theme={defaultTheme} >
      <Container direction= 'rtl' component="main" maxWidth="xs">
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
            התחברות
          </Typography>
          <Box component="form"   onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField 
            onChange={(ev) => setEmail(ev.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField 
            onChange={(ev) => setPassword(ev.target.value)}
            margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel 
              control={<Checkbox value="remember" color="primary" />}
              label="זכור אותי"
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}