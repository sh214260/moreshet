import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from '../client/data-context'
import { useContext } from "react";
import { ListItemSecondaryAction } from '@mui/material';
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
  const ctx = useContext(DataContext)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        סיכום הזמנה      </Typography>
      <Grid container >
        <List sx={{ display: 'flex', flexDirection: 'column', }}>
          {ctx.cartProducts.map((product) => (
            <ListItem key={product.id} >
              <ListItemText primary={product.name} sx={{textAlign:'right', paddingLeft:1}}/>
              <ListItemText >{product.price}</ListItemText>
            </ListItem>
          ))}
          <ListItem >
            <ListItemText primary=" מחיר כולל " sx={{textAlign:'right'}} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {ctx.cart.totalPrice}
            </Typography>
            </ListItem>
            <ListItem>
            <ListItemText primary="מחיר משלוח" sx={{textAlign:'right'}}/>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {ctx.deliveryPrice}
            </Typography>
            </ListItem>
            <ListItem>
            <ListItemText primary='סה"כ לתשלום' sx={{textAlign:'right'}}/>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {ctx.deliveryPrice + ctx.cart.totalPrice}
            </Typography>
            </ListItem>
        </List>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            פרטים אישיים
          </Typography>
          <Typography gutterBottom>{ctx.user.name}</Typography>
          <Typography gutterBottom>{ctx.user.address}</Typography>
          <Typography gutterBottom>{ctx.user.phoneNumber1}</Typography>
          <Typography gutterBottom>{ctx.user.phoneNumber2}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            אופן התשלום
          </Typography>
          <Grid container>
            <Typography>{ctx.paymentWay}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}