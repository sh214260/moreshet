import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useContext } from "react";
import { DataContext, SERVERURL } from '../client/data-context';
import Box from '@mui/material/Box';
import { InputLabel, MenuItem, Select, Paper, Divider, Grid, Alert } from "@mui/material";
import axios from "axios";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import StairsIcon from '@mui/icons-material/Stairs';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

  const totalDeliveryPrice = stairs ? 30 + deliveryOption1 + deliveryOption2 : deliveryOption1 + deliveryOption2;

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LocalShippingIcon sx={{ color: '#1976d2', ml: 1, fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            אופן המשלוח
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {/* הלוך */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArrowForwardIcon sx={{ color: '#4caf50', ml: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  הלוך
                </Typography>
              </Box>
              <Select
                fullWidth
                value={deliveryOption1}
                onChange={(event) => { setDeliveryOption1(event.target.value) }}
                sx={{ backgroundColor: 'white' }}
              >
                <MenuItem value={0}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <HomeIcon sx={{ ml: 1, color: '#757575' }} />
                      <span>איסוף עצמי</span>
                    </Box>
                    <Typography sx={{ color: '#4caf50', fontWeight: 'bold' }}>חינם</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value={delPrice}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalShippingIcon sx={{ ml: 1, color: '#ff9800' }} />
                      <span>משלוח</span>
                    </Box>
                    <Typography sx={{ color: '#ff9800', fontWeight: 'bold' }}>{delPrice} ₪</Typography>
                  </Box>
                </MenuItem>
              </Select>
            </Paper>
          </Grid>

          {/* חזור */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArrowBackIcon sx={{ color: '#2196f3', ml: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  חזור
                </Typography>
              </Box>
              <Select
                fullWidth
                value={deliveryOption2}
                onChange={(event) => { setDeliveryOption2(event.target.value) }}
                sx={{ backgroundColor: 'white' }}
              >
                <MenuItem value={0}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <HomeIcon sx={{ ml: 1, color: '#757575' }} />
                      <span>החזרה עצמית</span>
                    </Box>
                    <Typography sx={{ color: '#4caf50', fontWeight: 'bold' }}>חינם</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value={delPrice}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalShippingIcon sx={{ ml: 1, color: '#ff9800' }} />
                      <span>משלוח</span>
                    </Box>
                    <Typography sx={{ color: '#ff9800', fontWeight: 'bold' }}>{delPrice} ₪</Typography>
                  </Box>
                </MenuItem>
              </Select>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* אופציה מדרגות */}
        <Paper 
          elevation={stairs ? 4 : 1} 
          sx={{ 
            p: 2, 
            backgroundColor: stairs ? '#fff3e0' : 'white',
            border: stairs ? '2px solid #ff9800' : '1px solid #e0e0e0',
            transition: 'all 0.3s'
          }}
        >
          <FormControlLabel 
            control={
              <Checkbox 
                checked={stairs} 
                onChange={(event) => setStairs(event.target.checked)}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
            } 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StairsIcon sx={{ ml: 1, mr: 1, color: '#ff9800' }} />
                <Typography sx={{ fontWeight: 500 }}>
                  כולל מדרגות - תוספת <strong>30 ₪</strong>
                </Typography>
              </Box>
            }
          />
        </Paper>

        {/* תצוגת סיכום מחיר */}
        {totalDeliveryPrice > 0 && (
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="h6">
              עלות משלוח כוללת: <strong>{totalDeliveryPrice} ₪</strong>
            </Typography>
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
