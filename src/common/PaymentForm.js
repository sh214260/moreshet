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
import { Paper, Box, Divider } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function PaymentForm() {
  const ctx = useContext(DataContext)
  const [paymentMethod, setPaymentMethod] = React.useState('מזומן');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    ctx.setPaymentWay(event.target.value)
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PaymentIcon sx={{ color: '#1976d2', ml: 1, fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            בחר אופן תשלום
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <RadioGroup
          aria-label="paymentMethod"
          name="paymentMethod"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <Paper 
            elevation={paymentMethod === 'מזומן' ? 8 : 1}
            sx={{ 
              p: 2, 
              mb: 2, 
              backgroundColor: paymentMethod === 'מזומן' ? '#e3f2fd' : 'white',
              border: paymentMethod === 'מזומן' ? '2px solid #1976d2' : '1px solid #e0e0e0',
              transition: 'all 0.3s'
            }}
          >
            <FormControlLabel 
              value="מזומן" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalAtmIcon sx={{ ml: 1, color: '#4caf50' }} />
                  <Typography>תשלום במזומן למשלוחן במקום</Typography>
                </Box>
              } 
            />
          </Paper>

          <Paper 
            elevation={paymentMethod === 'ביט' ? 8 : 1}
            sx={{ 
              p: 2, 
              mb: 2, 
              backgroundColor: paymentMethod === 'ביט' ? '#e3f2fd' : 'white',
              border: paymentMethod === 'ביט' ? '2px solid #1976d2' : '1px solid #e0e0e0',
              transition: 'all 0.3s'
            }}
          >
            <FormControlLabel 
              value="ביט" 
              control={<Radio />} 
              label={
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneAndroidIcon sx={{ ml: 1, color: '#ff9800' }} />
                    <Typography sx={{ fontWeight: 500 }}>תשלום בביט</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666', mr: 4 }}>
                    העבר תשלום למספר: <strong>0587614964</strong>
                  </Typography>
                </Box>
              } 
            />
          </Paper>

          <Paper 
            elevation={paymentMethod === 'העברה בנקאית' ? 8 : 1}
            sx={{ 
              p: 2, 
              mb: 2, 
              backgroundColor: paymentMethod === 'העברה בנקאית' ? '#e3f2fd' : 'white',
              border: paymentMethod === 'העברה בנקאית' ? '2px solid #1976d2' : '1px solid #e0e0e0',
              transition: 'all 0.3s'
            }}
          >
            <FormControlLabel 
              value="העברה בנקאית" 
              control={<Radio />} 
              label={
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccountBalanceIcon sx={{ ml: 1, color: '#2196f3' }} />
                    <Typography sx={{ fontWeight: 500 }}>העברה בנקאית</Typography>
                  </Box>
                  <Box sx={{ mr: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>ע"ש: <strong>מורשת החויה המושלמת</strong></Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>בנק הפועלים (12)</Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>סניף: <strong>446</strong></Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>מספר חשבון: <strong>215929</strong></Typography>
                    <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 500, display: 'block', mt: 1 }}>
                      ⚠️ נא לשלוח אסמכתא לאחר ההעברה
                    </Typography>
                  </Box>
                </Box>
              } 
            />
          </Paper>

          <Paper 
            elevation={paymentMethod === 'כרטיס אשראי' ? 8 : 1}
            sx={{ 
              p: 2, 
              mb: 2, 
              backgroundColor: paymentMethod === 'כרטיס אשראי' ? '#e3f2fd' : 'white',
              border: paymentMethod === 'כרטיס אשראי' ? '2px solid #1976d2' : '1px solid #e0e0e0',
              transition: 'all 0.3s'
            }}
          >
            <FormControlLabel 
              value="כרטיס אשראי" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardIcon sx={{ ml: 1, color: '#9c27b0' }} />
                  <Typography>כרטיס אשראי</Typography>
                </Box>
              } 
            />
          </Paper>
        </RadioGroup>

        {paymentMethod === 'כרטיס אשראי' && (
          <Box sx={{ mt: 3, p: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              הזן פרטי כרטיס אשראי
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardName"
                  label="שם על הכרטיס"
                  fullWidth
                  autoComplete="cc-name"
                  variant="outlined"
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="מספר כרטיס"
                  fullWidth
                  autoComplete="cc-number"
                  variant="outlined"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  label="תאריך תפוגה"
                  fullWidth
                  autoComplete="cc-exp"
                  variant="outlined"
                  placeholder="MM/YY"
                  sx={{ backgroundColor: 'white' }}
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
                  variant="outlined"
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" name="saveCard" value="yes" />}
                  label="זכור פרטי כרטיס אשראי לפעם הבאה"
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
