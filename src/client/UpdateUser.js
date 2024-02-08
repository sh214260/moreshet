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
import { useState, useContext } from "react";
import { DataContext } from './data-context';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
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

export default function UpdateUser() {
  const context = useContext(DataContext)
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber1, setPhoneNumber1] = useState('')
  const [phoneNumber2, setPhoneNumber2] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });


    const validate = (field) => {
      if (field.length === 0) {
        alert(`please enter all fields`);
        return false;
      }
      return true;
    }

    if (validate(name) === false) return;
    if (validate(phoneNumber1) === false) return;
    if (validate(phoneNumber2) === false) return;
    if (validate(email) === false) return;
    if (validate(address) === false) return;
    if (phoneNumber1.length > 10 || phoneNumber2.length > 10) {
      alert("phone number too long");
      return;
    }
    const user = {id, name, email, address, phoneNumber1, phoneNumber2 }
    axios.post('https://localhost:7128/api/User/updateuser', user)
      .then(ans => {
        if (ans) {
          alert("הפרטים נשמרו בהצלחה!")
          console.log(ans);
          //to do: השינויים לא עודכנו בצד לקוח
        }
      })

  };
  useEffect(() => {
    setId(context.user.id)
    setName(context.user.name)
    setEmail(context.user.email)
    setAddress(context.user.address)
    setPhoneNumber1(context.user.phoneNumber1)
    setPhoneNumber2(context.user.phoneNumber2)
  }, [])
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
        <Typography component="h1" variant="h5">
          <EditIcon size="large" />
          עריכת פרופיל
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                value={name}
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
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={phoneNumber1}
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
                value={phoneNumber2}
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
              <TextField
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
                required
                fullWidth
                name="address"
                label="Address"
                type="address"
                id="address"
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
            שמור
          </Button>
        </Box>
      </Box>
    </Container>
  );
}