import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { DataContext } from '../client/data-context';
import { useContext } from "react";
import { TextField, Paper, Box, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';

export default function Review() {
  const ctx = useContext(DataContext)

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', p: 2 }}>
      {/* כותרת ראשית */}
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
        סיכום הזמנה
      </Typography>

      {/* רשימת מוצרים */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
          מוצרים בהזמנה
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {ctx.cartProducts.map((product) => (
            <ListItem 
              key={product.id}
              sx={{ 
                backgroundColor: 'white',
                mb: 1,
                borderRadius: 1,
                boxShadow: 1
              }}
            >
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <ListItemText 
                    primary={product.name} 
                    sx={{ textAlign: 'right' }}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ textAlign: 'left', color: '#2e7d32' }}>
                    {ctx.useSpecialPrice && product.specialPrice > 0 
                      ? product.specialPrice 
                      : product.price} ₪
                    {ctx.additionHours > 0 && (
                      <span style={{ fontSize: '0.9em', color: '#666' }}>
                        {' + '}
                        {ctx.useSpecialPrice && product.specialPrice > 0 
                          ? (product.specialPrice / 8 * ctx.additionHours).toFixed(2)
                          : (product.price / 8 * ctx.additionHours).toFixed(2)} ₪
                      </span>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* סיכום מחירים */}
        <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography sx={{ textAlign: 'right', fontSize: '1.1em' }}>
                מחיר מוצרים:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ textAlign: 'left', fontWeight: 600, color: '#2e7d32' }}>
                {ctx.cart.totalPrice} ₪
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ textAlign: 'right', fontSize: '1.1em' }}>
                משלוח:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ textAlign: 'left', fontWeight: 600, color: '#2e7d32' }}>
                {ctx.deliveryPrice} ₪
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                סה"כ לתשלום:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" sx={{ textAlign: 'left', fontWeight: 'bold', color: '#1976d2' }}>
                {ctx.deliveryPrice + ctx.cart.totalPrice} ₪
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* פרטים אישיים ותשלום */}
      <Grid container spacing={3}>
        {/* פרטים אישיים */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon sx={{ color: '#1976d2', ml: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                פרטים אישיים
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                {ctx.user.name}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <LocationOnIcon sx={{ fontSize: 20, color: '#666', ml: 1, mt: 0.5 }} />
              <Typography variant="body2" sx={{ color: '#666' }}>
                {ctx.user.address}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ fontSize: 20, color: '#666', ml: 1 }} />
              <Typography variant="body2" sx={{ color: '#666' }}>
                {ctx.user.phoneNumber1}
              </Typography>
            </Box>

            {ctx.user.phoneNumber2 && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon sx={{ fontSize: 20, color: '#666', ml: 1 }} />
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {ctx.user.phoneNumber2}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* אופן תשלום */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PaymentIcon sx={{ color: '#1976d2', ml: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                אופן התשלום
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="body1" sx={{ 
              p: 2, 
              backgroundColor: '#e3f2fd', 
              borderRadius: 1,
              textAlign: 'center',
              fontWeight: 500
            }}>
              {ctx.paymentWay}
            </Typography>
          </Paper>
        </Grid>

        {/* הערות */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              הערות להזמנה
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <TextField 
              multiline
              fullWidth
              value={ctx.notesForOrder}
              rows={4}
              placeholder="כאן תוכל לכתוב לנו הערות להזמנה..."
              onChange={(ev) => ctx.setNotesForOrder(ev.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f9f9f9',
                  '&:hover': {
                    backgroundColor: '#fff',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#fff',
                  }
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}