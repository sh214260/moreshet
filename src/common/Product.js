import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useContext } from "react";
import { DataContext, SERVERURL } from '../client/data-context';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, DialogContent, IconButton, Paper } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
const Product = () => {
  const [item, setItem] = useState({})
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [from, setFrom] = useState(dayjs());
  const [to, setTo] = useState(dayjs());
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate()
  const params = useParams()
  const currentDate = dayjs();
  const ctx = useContext(DataContext)

  useEffect(() => {
    console.log(ctx.token);
    if (ctx) {
      console.log(params)
      axios.get(`${SERVERURL}/api/Product/getbyid/${params.id}`
        , { headers: { Authorization: `Bearer ${ctx.token}` } })
        .then(res => {
          console.log(res.data)
          setItem(res.data)
        })
      console.log(ctx.cart.fromDate)
      console.log(ctx.cart.toDate)
    }
    else {
      return;
    }

  }, [ctx.cart])
  function editAddress() {
    if (from > to) {
      alert("שעות ההזמנה אינן תקינות")
      return
    }
    axios.post(`${SERVERURL}/api/Cart/updatedate/${ctx.cart.id}/${from}/${to}`
      , {}, { headers: { Authorization: `Bearer ${ctx.token}` } })
      .then(ans => {
        console.log(ans.data);
        if (ans.data) {
          ctx.updateDateOrder(from, to)
        }
        else
          alert("השינוי לא התבצע כראוי, נסה שוב")
      }).then(setOpenEdit(false))
  }


  async function check() {
    if (moment(ctx.cart.toDate).diff(ctx.cart.fromDate, 'hours') > 4) {
      alert("שים לב, המחיר הוא ל4 שעות, כל שעה נוספת- תוספת תשלום")
    }
    const productPossible = {
      UserId: ctx.user.id,
      ProductId: item.id,
      ProductType: item.type,
      From: moment(ctx.cart.fromDate).format("YYYY-MM-DDTHH:mm"),
      To: moment(ctx.cart.toDate).format("YYYY-MM-DDTHH:mm"),
    };
    const res = await axios.get(`${SERVERURL}/api/Cart/productisavialible`, { params: productPossible, headers: { Authorization: `Bearer ${ctx.token}` } })
    console.log(res.data);
    return res.data;
  }

  const add = async () => {
    if (ctx.cart.toDate == null || ctx.cart.fromDate == null) {
      alert("לא נבחר תאריך להזמנה!");
      return;
    }
    if (ctx.cart?.toDate == "0001-01-01T00:00:00" && ctx.cart?.fromDate == "0001-01-01T00:00:00") {
      alert("לא נבחר תאריך להזמנה!")
      return
    }
    const isAvailable = await check();
    if (isAvailable === 0) {
      alert("המוצר תפוס");
      return;
    }
    if (isAvailable === -1) {
      alert("לא ניתן להוסיף מוצר פעמיים");
      return;
    }
    setOpen(true);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
      <Paper sx={{ margin: 4 }}>
        <Grid item xs={12} sm={6} md={4} style={{ margin: 10, width: 1000, justifyContent: "center" }}>
          <Box>
            {ctx.role == "secretary" ? <Typography>ביצוע הזמנה ל {ctx.user.name}</Typography> : <Typography></Typography>}

          </Box>
          {ctx.cart?.toDate !== "0001-01-01T00:00:00" && ctx.cart?.fromDate !== "0001-01-01T00:00:00" ? (
            <Box >
              <Typography>ההזמנה לתאריך</Typography>
              <Typography>מ {moment(ctx.cart.fromDate).format("DD.MM HH:mm")}</Typography>
              <Typography>עד ל {moment(ctx.cart.toDate).format("DD.MM HH:mm")}</Typography>
              <Typography >
                סה"כ מספר שעות בשימוש:
                {moment(ctx.cart.toDate).diff(ctx.cart.fromDate, 'hours')}
                {" "}
                {(moment(ctx.cart.toDate).diff(ctx.cart.fromDate, 'minutes') % 60) >= 30 ? <>וחצי</> : <></>}
                {" "}
                שעות
              </Typography>
              <IconButton onClick={() => setOpenEdit(true)}>
                <EditIcon />
              </IconButton>
              <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth={true}>
                <DialogTitle sx={{ textAlign: 'center' }}>
                  {"שים לב! בעת שינוי תאריך כל המוצרים בעגלה ימחקו"}
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}  >
                      <Typography>מ</Typography>
                      <DateTimePicker ampm={false} value={dayjs(from)} onChange={(value) => setFrom(value.format("YYYY-MM-DDTHH:mm"))} minDate={currentDate}
                        timeSteps={{ minutes: 30 }} />
                      <Typography>עד</Typography>
                      <DateTimePicker ampm={false} value={dayjs(to)} onChange={(value) => setTo(value.format("YYYY-MM-DDTHH:mm"))} minDate={currentDate}
                        timeSteps={{ minutes: 30 }} />
                    </LocalizationProvider>
                  </Box>
                </DialogContent>
                <DialogActions >
                  <Button variant="contained" sx={{ width: '100%', marginTop: 2 }} onClick={editAddress}>
                    שמור
                  </Button>
                  <Button variant="outlined" sx={{ width: '100%', marginTop: 2, marginRight: 1 }} onClick={() => setOpenEdit(false)}>
                    ביטול
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          ) : <Box>
            <Typography>בחר תאריך להזמנה!</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '3' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}  >
                <Typography>מ</Typography>
                <DateTimePicker ampm={false} minDate={currentDate} onChange={(value) => setFrom(value.format("YYYY-MM-DDTHH:mm"))}
                  timeSteps={{ minutes: 30 }} />
                <Typography>עד</Typography>
                <DateTimePicker ampm={false} minDate={currentDate} onChange={(value) => setTo(value.format("YYYY-MM-DDTHH:mm"))}
                  timeSteps={{ minutes: 30 }} />
              </LocalizationProvider>
              <Button onClick={editAddress}>בצע</Button>
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
                navigate(`/cart/${ctx.cart.id}`)
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
                  image={`${SERVERURL}/Static/${item.image}`}
                  alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {item.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {item.price} ₪ ל4 שעות
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {item.price / 8}₪ לכל שעה נוספת
                    </Typography>
                    <Typography>מידות המתקן:</Typography>
                    <Typography>{item.width}רוחב: </Typography>
                    <Typography>{item.length}אורך: </Typography>
                    <Typography>הערות: </Typography>
                    <Typography>{item.comment}</Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Button onClick={add}>הוסף להזמנה</Button>
                  </Box>
                </Box>
              </Card>
            </Grid> : <></>}
        </Grid>
      </Paper></div >
  )
}
export default Product;