import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import { useFormik } from "formik";
import * as yup from "yup";
import { SERVERURL } from "./data-context";

export default function SignUp() {
  const navigate = useNavigate();

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
      .post(
        `${SERVERURL}/api/User/Signup/${values.password}`,
        newUser
      )
      .then((ans) => {
        if (ans.data) {
          alert("נרשמת בהצלחה!");
          navigate("/signin");
        } else {
          alert("איימיל זה כבר קיים במערכת");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: green[700] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הרשמה
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                autoComplete="given-name"
                name="name"
                fullWidth
                id="name"
                label="שם"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
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
                name="name"
                fullWidth
                id="receiptName"
                label="שם המוסד"
                autoFocus
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
                label="על שם מי להוציא קבלה"
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
                fullWidth
                id="email"
                label="כתובת אימייל"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
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
                type="phonenumber1"
                id="phonenumber1"
                autoComplete="new-phone1"
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
                label="מספר פלאפון נוסף"
                type="phonenumber2"
                id="phonenumber2"
                autoComplete="new-phone2"
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
