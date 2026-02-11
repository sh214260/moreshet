import React, { useState } from 'react';
import { Grid, TextField, Button, CssBaseline, Paper, useTheme } from '@mui/material';
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
    const [flag, setFlag] = useState(false);
    const theme = useTheme();

    const validationSchema = yup.object({
        name: yup
            .string('הקלד שם')
            .required('שדה חובה'),
        email: yup
            .string('הקלד מייל')
            .email('מייל לא תקין')
            .required('שדה חובה'),
        phone: yup
            .string('הקלד פלאפון')
            .min(10, 'מספר לא תקין')
            .max(10, 'מספר לא תקין')
            .required('שדה חובה'),
        message: yup
            .string('הקלד הודעה')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '', 
            phone: '',
            message: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let details = { 
                Name: values.name, 
                Email: values.email, 
                Phone: values.phone, 
                Message: values.message 
            };
            axios.post(`${SERVERURL}/api/Email/submitcontactform`, details)
                .then(ans => {
                    console.log(ans.data);
                    if (ans.data) {
                        setFlag(true);
                        formik.resetForm();
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
    });

    const contactInfo = [
        {
            icon: PhoneEnabledIcon,
            label: 'טלפון',
            value: '0527614964',
            link: 'tel:0527614964',
            color: theme.palette.info.main,
        },
        {
            icon: WhatsAppIcon,
            label: 'וואטסאפ',
            value: '0587614964',
            link: 'https://wa.me/0587614964',
            color: theme.palette.success.main,
        },
        {
            icon: EmailIcon,
            label: 'אימייל',
            value: 'm0527614964@gmail.com',
            link: 'mailto:m0527614964@gmail.com',
            color: theme.palette.error.main,
        },
        {
            icon: LocationOnIcon,
            label: 'כתובת',
            value: 'יחזקאל הנביא 8, בית שמש',
            link: 'https://www.google.com/maps/search/?api=1&query=יחזקאל+הנביא+8%2C+בית+שמש',
            color: theme.palette.primary.main,
        },
    ];

    return (
        <Container maxWidth="lg">
            <CssBaseline />
            <Grid container spacing={4} alignItems="stretch">
                {/* Contact Form */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: 3,
                            height: '100%',
                            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 700, 
                                mb: 1,
                                color: theme.palette.primary.main 
                            }}
                        >
                            צור קשר
                        </Typography>
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                mb: 3,
                                color: theme.palette.text.secondary 
                            }}
                        >
                            נשמח לענות על כל שאלה ולעזור לכם לתכנן את האירוע המושלם
                        </Typography>
                        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
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
                                label="שם מלא"
                                autoFocus
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                fullWidth
                                id="email"
                                label="אימייל"
                                name="email"
                                autoComplete="email"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                                value={formik.values.phone}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                fullWidth
                                name="phone"
                                label="טלפון"
                                type="tel"
                                id="phone"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                error={formik.touched.message && Boolean(formik.errors.message)}
                                helperText={formik.touched.message && formik.errors.message}
                                value={formik.values.message}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label="הודעה"
                                name="message"
                                fullWidth
                                multiline
                                rows={4}
                                id="message"
                                sx={{ mb: 3 }}
                            />
                            {flag ? (
                                <Button
                                    disabled
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        backgroundColor: theme.palette.success.main,
                                    }}
                                >
                                    ההודעה נשלחה בהצלחה ✓
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                        }
                                    }}
                                >
                                    שלח הודעה
                                </Button>
                            )}
                        </Box>
                    </Paper>
                </Grid>

                {/* Contact Information */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: 3,
                            height: '100%',
                            background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 100%)`,
                            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 700, 
                                mb: 1,
                                color: theme.palette.text.primary 
                            }}
                        >
                            מורשת – החוויה המושלמת
                        </Typography>
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                mb: 4,
                                color: theme.palette.text.secondary 
                            }}
                        >
                            נשמח לשמוע מכם בכל דרך שנוחה לכם
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {contactInfo.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            p: 2,
                                            borderRadius: 2,
                                            backgroundColor: 'white',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateX(-8px)',
                                                boxShadow: `0px 4px 16px ${item.color}30`,
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: item.color + '20',
                                            }}
                                        >
                                            <Icon sx={{ fontSize: 24, color: item.color }} />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    display: 'block',
                                                    color: theme.palette.text.secondary,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                            <Link 
                                                href={item.link} 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    color: theme.palette.text.primary,
                                                    textDecoration: 'none',
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    '&:hover': {
                                                        color: item.color,
                                                    }
                                                }}
                                            >
                                                {item.value}
                                            </Link>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contact;
