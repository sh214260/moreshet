import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { SERVERURL } from "./data-context";

export default function SignUp() {
  const navigate = useNavigate();
  const theme = useTheme();

  const validationSchema = yup.object({
    name: yup.string("הקלד שם").max(20, "השם ארוך מידי").required("שדה חובה"),
    email: yup.string("הקלד מייל").email("מייל לא תקין").required("שדה חובה"),
    phonenumber1: yup
      .string("הקלד פלאפון")
      .min(10, "מספר לא תקין")
      .max(10, "מספר לא תקין")
      .required("שדה חובה"),
    phonenumber2: yup
      .string("הקלד פלאפון")
      .min(10, "מספר לא תקין")
      .max(10, "מספר לא תקין"),
    password: yup
      .string("הקלד סיסמה")
      .min(8, "סיסמה לפחות 8 תווין")
      .max(10, "סיסמה עד 10 תווים")
      .required("שדה חובה"),
    address: yup
      .string("הכנס כתובת")
      .min(8, "כתובת תכיל לפחות 8 תווים")
      .max(25, "כתובת ארוכה מידי")
      .required("שדה חובה"),
    institutionalName: yup.string("הקלד שם").max(20, "השם ארוך מידי"),
    receiptName: yup.string("הקלד שם").max(20, "השם ארוך מידי"),
    checked: yup.boolean(),
  });
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phonenumber1: "",
      phonenumber2: "",
      address: "",
      institutionalName: "",
      receiptName: "",
      checked: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = (values) => {
    const newUser = {
      name: values.name,
      email: values.email,
      address: values.address,
      phonenumber1: values.phonenumber1,
      phonenumber2: values.phonenumber2,
    };
    axios
      .post(`${SERVERURL}/api/User/Signup/${values.password}`, newUser)
      .then((ans) => {
        if (ans.data) {
          alert("נרשמת בהצלחה!");
          navigate("/signin");
        } else {
          alert("איימיל זה כבר קיים במערכת");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("שגיאה בהרשמה, אנא נסה שוב");
      });
  };

  return (
    <Container component="main" maxWidth="md" sx={{ py: 8 }}>
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              width: 56,
              height: 56,
              background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              boxShadow: `0px 4px 12px ${theme.palette.secondary.main}40`,
            }}
          >
            <PersonAddIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mt: 2,
              mb: 1,
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            הרשמה
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
              color: theme.palette.text.secondary,
              textAlign: 'center',
            }}
          >
            הצטרף למורשת והתחל להזמין ציוד לאירועים שלך
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ width: '100%' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="שם מלא"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  fullWidth
                  id="email"
                  label="כתובת אימייל"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={
                    formik.touched.phonenumber1 &&
                    Boolean(formik.errors.phonenumber1)
                  }
                  helperText={
                    formik.touched.phonenumber1 && formik.errors.phonenumber1
                  }
                  value={formik.values.phonenumber1}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  fullWidth
                  name="phonenumber1"
                  label="מספר פלאפון"
                  type="tel"
                  id="phonenumber1"
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={
                    formik.touched.phonenumber2 &&
                    Boolean(formik.errors.phonenumber2)
                  }
                  helperText={
                    formik.touched.phonenumber2 && formik.errors.phonenumber2
                  }
                  value={formik.values.phonenumber2}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth
                  name="phonenumber2"
                  label="מספר פלאפון נוסף (אופציונלי)"
                  type="tel"
                  id="phonenumber2"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  fullWidth
                  name="address"
                  label="כתובת מדויקת"
                  type="text"
                  id="address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  fullWidth
                  name="password"
                  label="בחר סיסמה"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={
                    formik.touched.institutionalName &&
                    Boolean(formik.errors.institutionalName)
                  }
                  helperText={
                    formik.touched.institutionalName &&
                    formik.errors.institutionalName
                  }
                  value={formik.values.institutionalName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="institutionalName"
                  fullWidth
                  id="institutionalName"
                  label="שם המוסד (אופציונלי)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.receiptName &&
                    Boolean(formik.errors.receiptName)
                  }
                  helperText={
                    formik.touched.receiptName && formik.errors.receiptName
                  }
                  value={formik.values.receiptName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="receiptName"
                  fullWidth
                  id="receiptName"
                  label="על שם מי להוציא קבלה (אופציונלי)"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
                },
              }}
            >
              הרשם עכשיו
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="/signin"
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  כבר יש לך חשבון? התחבר כאן
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
