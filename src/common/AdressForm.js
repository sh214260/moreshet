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
  const [basicBg, setBasicBg] = useState(35)
  const [smItems, setSmItems] = useState(0)
  const [bgItems, setBgItems] = useState(0)
  const ctx = useContext(DataContext)
  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
    console.log(ctx.cartProducts)
  };

  useEffect(() => {
    axios.get(`${SERVERURL}/api/Order/getdeliveryprice/${ctx.cart.id}`)
    .then(ans=>{
      console.log(ans.data);
      ctx.setDeliveryPrice(ans.data)})
    // setBasicBg(ctx.cartProducts.some(it => it.weight == true) ? 50 : 35)
    // if (basicBg == 50) {
    //   setBgItems(ctx.cartProducts.filter(it => it.weight === true).length - 1)
    //   setSmItems(ctx.cartProducts.filter(it => it.weight === false).length)
    // }
    // else {
    //   setSmItems(ctx.cartProducts.filter(it => it.weight === false).length - 1)
    // }
    // ctx.setDeliveryPrice(basicBg + smItems * 15 + bgItems * 50)
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
            {/* {basicBg == 50 ?
              <Box>
                <Typography>
                  מחיר בסיס-50
                </Typography>
                <Typography >
                  מספר הפריטים הגדולים הנוספים
                  {bgItems}
                </Typography>
                <Typography>
                  מספר הפריטים הקטנים הנוספים
                  {smItems}
                </Typography>
              </Box>
              : <Box>
                <Typography>מחיר בסיס-35</Typography>
                <Typography>
                  מספר הפריטים הקטנים הנוספים
                  {smItems}
                </Typography>
              </Box>} */}
            <Typography>מחיר סופי:
              {ctx.deliveryPrice}
            </Typography>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
