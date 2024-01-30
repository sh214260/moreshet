import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = React.useState('cash');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
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
        <FormControlLabel value="cash" control={<Radio />} label="תשלום במקום" />
        <FormControlLabel value="creditCard" control={<Radio />} label="מספר כרטיס אשראי" />
      </RadioGroup>

      {paymentMethod === 'creditCard' && (
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
