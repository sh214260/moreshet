import React, { useState } from 'react';
import { Grid, TextField, Button, IconButton } from '@mui/material';
import { Typography, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Nav from '../common/Nav';
const defaultTheme = createTheme();

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
    };

    return (
        <>
        <Grid display="flex" flexDirection="row">
            <Grid maxWidth="sm"
                sx={{
                    pt: 8, pb: 6, pr: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <Typography component="h1" variant="h8">
                    צור קשר
                </Typography>
                <Typography component="h1" variant="h6">
                    ונחזור אליך בהקדם
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container item xs={6}>
                        <Grid item xs={6} sm={12} marginBottom={2} >
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
                        <Grid item xs={6} sm={12} marginBottom={2}>
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
                        <Grid item xs={6} sm={12} marginBottom={2}>
                            <TextField
                                value={phone}
                                onChange={(ev) => setPhone(ev.target.value)}
                                required
                                fullWidth
                                name="phone"
                                label="Phone"
                                type="phone"
                                id="phone"
                                autoComplete="new-phone1"
                            />
                        </Grid>
                        <Grid item xs={6} sm={12}>
                            <TextField
                                label="Message"
                                variant='outlined' fullWidth
                                multiline
                                rows={4}
                                size="small"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            שלח
                        </Button>
                    </Grid>

                </Box>
            </Grid>
            <Grid maxWidth="xs" container spacing={2}
                sx={{
                    pt: 16, pb: 6, pr: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }} >
                <Typography item component="h1" variant="h8">
                    מורשת החוויה המושלמת!      </Typography>
                <Grid item>
                    <PhoneEnabledIcon />
                    <Link href="tel:0527614964" color="inherit">
                        0527614964
                    </Link>
                </Grid><Grid item>
                    <WhatsAppIcon style={{ color: 'green' }} />
                    <Link href="https://wa.me/0587614964" color="inherit" >
                        0587614964
                    </Link>
                </Grid><Grid item>
                    <EmailIcon style={{ color: 'red' }} />
                    <Link href="https://mail.google.com/mail/?view=cm&to=m0527614964@gmail.com" color="inherit" target="_blank">
                        m0527614964@gmail.com
                    </Link>
                </Grid> <Grid item>
                    <LocationOnIcon />
                    <Link href="https://www.google.com/maps/search/?api=1&query=יחזקאל+הנביא+8%2C+בית+שמש">
                        יחזקאל הנביא 8, בית שמש
                    </Link>
                </Grid>
            </Grid>
        </Grid>
        </>);
};

export default Contact