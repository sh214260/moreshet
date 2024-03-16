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
import { Card, CardContent, InputLabel, List, ListItemText, MenuItem, Select } from "@mui/material";
import axios from "axios";
export default function AddressForm() {
  const [deliveryOption1, setDeliveryOption1] = useState(0);
  const [deliveryOption2, setDeliveryOption2] = useState(0);
  const [delPrice, setDelPrice] = useState(0)
  const [stairs, setStairs] = useState(false)
  const ctx = useContext(DataContext)


  useEffect(() => {
    console.log(deliveryOption1);
    console.log(deliveryOption2);
    if (stairs)
      ctx.setDeliveryPrice(30 + deliveryOption1 + deliveryOption2)
    else
      ctx.setDeliveryPrice(deliveryOption1 + deliveryOption2)
    if (deliveryOption1 > 0 || deliveryOption2 > 0) {
      if (ctx.user.phonenumber2 == '') {
        alert("בעת שימוש במשלוח נדרש שני מספרי פלאפון")
        navigator('/updateuser')
      }
    }

  }, [deliveryOption1, deliveryOption2, stairs])

  useEffect(() => {
    axios.get(`${SERVERURL}/api/Order/getdeliveryprice/${ctx.cart.id}`
      , { headers: { Authorization: `Bearer ${ctx.token}` } }
    )
      .then(ans => {
        console.log(ans.data);
        setDelPrice(ans.data)
      })
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        אופן המשלוח
      </Typography>
      <Box display="flex" flexDirection="row" >
        <InputLabel >הלוך</InputLabel>
        <Select
          size='small'
          value={deliveryOption1}
          onChange={(event) => { setDeliveryOption1(event.target.value) }}
          displayEmpty
        >
          <MenuItem value={0}>איסוף עצמי, מחיר:0</MenuItem>
          <MenuItem value={delPrice}>משלוח, מחיר: {delPrice}</MenuItem>
        </Select>
      </Box>
      <Box display="flex" flexDirection="row" >
        <InputLabel >חזור</InputLabel>
        <Select
          size='small'
          value={deliveryOption2}
          onChange={(event) => { setDeliveryOption2(event.target.value) }}
          displayEmpty
        >
          <MenuItem value={0}>החזרה עצמית, מחיר:0</MenuItem>
          <MenuItem value={delPrice}>משלוח, מחיר: {delPrice}</MenuItem>
        </Select>
      </Box>
      <FormControlLabel control={
        <Checkbox checked={stairs} onChange={(event) => setStairs(event.target.checked)} />} label='כולל מדרגות- תוספת 30 ש"ח ' />
      {/* <Typography>סה"כ למשלוח: {ctx.setDeliveryPrice}</Typography> */}
    </React.Fragment>
  );
}
