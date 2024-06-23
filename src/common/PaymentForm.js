import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useContext } from "react";
import { DataContext } from '../client/data-context';

export default function PaymentForm() {
  const ctx = useContext(DataContext)
  const [paymentMethod, setPaymentMethod] = React.useState('מזומן');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    ctx.setPaymentWay(event.target.value)
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        אופן התשלום
      </Typography>
      <RadioGroup
        aria-label="paymentMethod"
        name="paymentMethod"
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      >
        <FormControlLabel value="מזומן" control={<Radio />} label="תשלום במזומן למשלוחן במקום" />
        <FormControlLabel value="ביט" control={<Radio />} label="תשלום בביט למספר-0587614964" />
        <FormControlLabel value="העברה בנקאית" control={<Radio />} label={<Typography>העברה בנקאית
          ע"ש מורשת החויה המושלמת
          בנק הפועלים-12
          סניף 446
          מספר חשבון- 215929
          נא לשלוח אסמכתא</Typography>} ></FormControlLabel>
        <FormControlLabel value="כרטיס אשראי" control={<Radio />} label="מספר כרטיס אשראי" />
      </RadioGroup>

      {paymentMethod === 'כרטיס אשראי' && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="שם על הכרטיס"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="מספר כרטיס"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              label="תאריך תפוגה"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="שלושה ספרות אחרונות בחתימה"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="זכור פרטי כרטיס אשראי לפעם הבאה"
            />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
