import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useContext } from "react";
import { DataContext } from '../client/data-context'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
function Product() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate()
  const params = useParams()
  const currentDate = dayjs(); // Get the current date
  const ctx = useContext(DataContext)
  const [item, setItem] = useState({})
  
  const productPossible = {
    UserId: 1,
    ProductType: item.type,
    From: moment(ctx.cart.fromDate).format("YYYY-MM-DDTHH:mm"),
    To: moment(ctx.cart.toDate).format("YYYY-MM-DDTHH:mm")
  };
  async function check() {
    console.log(item)
    console.log(productPossible)
    const res = await axios.get('https://localhost:7128/api/Cart/productisavialible', { params: productPossible });
    console.log(res.data);
    return res.data;
  }

  const add = async () => {
    if (ctx.cart.toDate == null || ctx.cart.fromDate == null) {
      alert("You did not choose a date for the order!");
      return;
    }
    const isAvailable = await check();
    if (isAvailable == 0) {
      alert("The product is occupied");
      return;
    }
    if (isAvailable == -1) {
      alert("The same product cannot be added twice");
      return;
    }
    setOpen(true);
  }
  useEffect(() => {
    console.log(params)
    axios.get(`https://localhost:7128/api/Product/getbyid/${params.id}`)
      .then(res => {
        console.log(res.data)
        setItem(res.data)
      })
  }, [])
return (
  <Grid item xs={12} sm={6} md={4}>
    {ctx.cart?.toDate != "0001-01-01T00:00:00" && ctx.cart?.fromDate != "0001-01-01T00:00:00" ? (
              <Box>
                <Typography>ההזמנה לתאריך</Typography>
                <Typography>מ {moment(ctx.cart.fromDate).format("DD.MM HH:mm")}</Typography>
                <Typography>עד ל {moment(ctx.cart.toDate).format("DD.MM HH:mm")}</Typography>
                <Typography>
            סה"כ מספר שעות בשימוש: {moment(ctx.cart.toDate).diff(ctx.cart.fromDate, 'hours')} שעות
          </Typography>
              </Box>
            ) : <Box>
              <Typography>בחר תאריך להזמנה!</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                  <Typography>מ</Typography>
                  <DateTimePicker ampm={false} minDate={currentDate} onChange={(value) => ctx.updateFrom(value.format("YYYY-MM-DDTHH:mm"))}/>
                  <Typography>עד</Typography>
                  <DateTimePicker ampm={false} minDate={currentDate} onChange={(value)=>ctx.updateTo(value.format("YYYY-MM-DDTHH:mm"))}/>
                </LocalizationProvider>
              </Box>
            </Box>}
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {"המוצר נוסף בהצלחה!"}
      </DialogTitle>
      <DialogActions >
        <Button variant="contained" sx={{ width: '100%', marginTop: 2 }} onClick={() => {
          setOpen(false);
          navigate(`/album`)
        }}>
          חזרה לקטלוג
        </Button>
        <Button variant="outlined" sx={{ width: '100%', marginTop: 2, marginRight: 1 }} onClick={() => {
          setOpen(false);
          navigate(`/cart/${ctx.cartId}`)
        }}>
          לצפייה בעגלה
        </Button>
      </DialogActions>
    </Dialog>
    {item != null ?
      <Grid key={item.id} >
        <Card sx={{ display: 'flex', width: 500 }}>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image="https://source.unsplash.com/random?wallpapers"
            alt="Live from space album cover"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {item.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {item.price}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <Button onClick={add}>הוסף להזמנה</Button>
            </Box>
          </Box>
        </Card>

      </Grid> : <></>}
  </Grid>
)
    }
export default Product;