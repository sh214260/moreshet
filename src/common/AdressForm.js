import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useContext } from "react";
import { DataContext, SERVERURL } from '../client/data-context'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import { Card, CardContent } from "@mui/material";
import axios from "axios";
export default function AddressForm() {
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [delPrice, setDelPrice] = useState(35)
  const [smItems, setSmItems] = useState(0)
  const [bgItems, setBgItems] = useState(0)
  const ctx = useContext(DataContext)
  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
    console.log(deliveryOption);
    if(event.target.value==='pickup'){
      ctx.setDeliveryPrice(0);
      console.log(ctx.deliveryPrice);
    }
    if(event.target.value==='delivery'){
      ctx.setDeliveryPrice(delPrice)
    }

  };

  useEffect(() => {
    axios.get(`${SERVERURL}/api/Order/getdeliveryprice/${ctx.cart.id}`
    ,{headers: { Authorization: `Bearer ${ctx.token}`}}
    )
    .then(ans=>{
      console.log(ans.data);
      setDelPrice(ans.data)
      })
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        אופן המשלוח
      </Typography>
      <RadioGroup
        aria-label="deliveryOption"
        name="deliveryOption"
        value={deliveryOption}
        onChange={handleDeliveryOptionChange}>
        <FormControlLabel value="pickup" control={<Radio />} label="איסוף עצמי" />
        <FormControlLabel value="delivery" control={<Radio />} label="משלוח" />
      </RadioGroup>

      {deliveryOption === 'delivery' && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography>מחיר משלוח:
              {delPrice} לצד אחד
            </Typography>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
