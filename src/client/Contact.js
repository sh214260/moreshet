import React, { useState } from 'react';
import { Grid, TextField, Button, CssBaseline } from '@mui/material';
import { Typography, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { SERVERURL } from './data-context';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [flag, setFlag] = useState(false);

    const validationSchema = yup.object({
        name: yup
            .string('הקלד שם'),
        email: yup
            .string('הקלד מייל')
            .email('מייל לא תקין')
            .required('שדה חובה'),
        phonenumber: yup
            .string('הקלד פלאפון')
            .min(10, 'מספר לא תקין')
            .max(10, 'מספר לא תקין')
            .required('שדה חובה')
    })

    const formik = useFormik({
        initialValues: {
            email: '', phonenumber: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => { handleSubmit(values) },
    });

    const handleSubmit = (values) => {
        values.preventDefault();
        let details = { Name: values.name, Email: values.email, Phone: values.phone, Message: values.message }
        axios.post(`${SERVERURL}/api/Email/submitcontactform`, details)
            .then(ans => {
                console.log(ans.data)
                if (ans.data)
                    setFlag(true)
            }
            )

    };

    return (

        <Container>
            <CssBaseline />
            <Grid display="flex" flexDirection="row">
                <Grid maxWidth="sm"
                    sx={{
                        pt: 8, pb: 6, pr: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}>
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
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    value={formik.values.name}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
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
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
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
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                    value={formik.values.phone}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
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
                            {flag ? <Button disabled
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                ההודעה נשלחה למערכת</Button>
                                : <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    שלח
                                </Button>}
                        </Grid>
                    </Box>
                </Grid>
                <Grid maxWidth="xs" container item spacing={2}
                    sx={{
                        pt: 16, pb: 6, pr: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }} >
                    <Typography component="h1" variant="h8">
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
        </Container>);
};

export default Contact
