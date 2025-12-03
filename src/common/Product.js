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
    <Box sx={{ p: 3 }}>
      <Paper sx={{ padding: 4, boxShadow: 3 }}>
        {/* Header with user context */}
        {ctx.role == "secretary" && (
          <Typography variant="h6" sx={{ mb: 3, p: 2, backgroundColor: "#e3f2fd", borderRadius: 2, color: "#0054ee", fontWeight: "bold" }}>
            ביצוע הזמנה עבור: <strong>{ctx.user.name}</strong>
          </Typography>
        )}

        {/* Main content grid */}
        <Grid container spacing={4}>
          {/* Left side - Product Image and Details */}
          <Grid item xs={12} md={6}>
            {item && item.id ? (
              <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: "40%",  objectFit: "cover" }}
                  image={`${SERVERURL}/Static/${item.image}`}
                  alt={item.name}
                />
                <Box sx={{ p: 3, backgroundColor: "#fafafa" }}>
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
                    {item.name}
                  </Typography>

                  <Box sx={{ mb: 3, p: 2, backgroundColor: "white", borderRadius: 1, border: "1px solid #e0e0e0" }}>
                    <Typography variant="h6" sx={{ color: "#0054ee", fontWeight: "bold", mb: 1 }}>
                      💰 תמחור
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: "1.1em" }}>
                      <strong>
                        {ctx.useSpecialPrice && item.specialPrice > 0 
                          ? `${item.specialPrice} ₪` 
                          : `${item.price} ₪`}
                      </strong> ל-4 שעות בסיסיות
                    </Typography>
                    <Typography sx={{ color: "#666", fontSize: "0.95em" }}>
                      {ctx.useSpecialPrice && item.specialPrice > 0 
                        ? (item.specialPrice / 8).toFixed(2) 
                        : (item.price / 8).toFixed(2)} ₪ לכל שעה נוספת
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, backgroundColor: "white", borderRadius: 1, border: "1px solid #e0e0e0" }}>
                    <Typography variant="h6" sx={{ color: "#0054ee", fontWeight: "bold", mb: 1 }}>
                      📏 מידות המתקן
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      <strong>רוחב:</strong> {item.width}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      <strong>אורך:</strong> {item.length}
                    </Typography>
                  </Box>

                  {item.comment && (
                    <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1, border: "1px solid #e0e0e0" }}>
                      <Typography variant="h6" sx={{ color: "#0054ee", fontWeight: "bold", mb: 1 }}>
                        📝 הערות
                      </Typography>
                      <Typography sx={{ fontSize: "0.95em", color: "#666" }}>
                        {item.comment}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Card>
            ) : (
              <Typography>טוען מוצר...</Typography>
            )}
          </Grid>

          {/* Right side - Date Selection and Add to Cart */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
                📅 בחר תאריך להזמנה
              </Typography>

              {ctx.cart?.toDate !== "0001-01-01T00:00:00" && ctx.cart?.fromDate !== "0001-01-01T00:00:00" ? (
                <Box>
                  {/* Current booking info */}
                  <Box sx={{ mb: 3, p: 2, backgroundColor: "#f0f7ff", borderRadius: 2, border: "2px solid #0054ee" }}>
                    <Typography variant="h6" sx={{ mb: 2, color: "#0054ee", fontWeight: "bold" }}>
                      ✅ ההזמנה שלך:
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: "1.1em" }}>
                      <strong>מ-</strong> {moment(ctx.cart.fromDate).format("DD.MM.YYYY HH:mm")}
                    </Typography>
                    <Typography sx={{ mb: 2, fontSize: "1.1em" }}>
                      <strong>עד-</strong> {moment(ctx.cart.toDate).format("DD.MM.YYYY HH:mm")}
                    </Typography>
                    <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1, mb: 2 }}>
                      <Typography sx={{ color: "#333" }}>
                        <strong>⏱️ סה"כ שעות:</strong> {moment(ctx.cart.toDate).diff(ctx.cart.fromDate, 'hours')}
                        {(moment(ctx.cart.toDate).diff(ctx.cart.fromDate, 'minutes') % 60) >= 30 ? " וחצי" : ""} שעות
                      </Typography>
                    </Box>
                    <Button
                      startIcon={<EditIcon />}
                      variant="outlined"
                      fullWidth
                      onClick={() => setOpenEdit(true)}
                      sx={{ mt: 2 }}
                    >
                      עדכן תאריך
                    </Button>
                  </Box>

                  {/* Edit date dialog */}
                  <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ textAlign: 'center', backgroundColor: "#fff3cd", color: "#856404", fontWeight: "bold" }}>
                      ⚠️ שים לב! בעת שינוי תאריך כל המוצרים בעגלה ימחקו
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Typography sx={{ mb: 1, fontWeight: "bold" }}>מתאריך:</Typography>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              ampm={false}
                              value={dayjs(from)}
                              onChange={(value) => setFrom(value.format("YYYY-MM-DDTHH:mm"))}
                              minDate={currentDate}
                              timeSteps={{ minutes: 30 }}
                              slotProps={{ textField: { fullWidth: true } }}
                            />
                          </LocalizationProvider>
                        </Box>
                        <Box>
                          <Typography sx={{ mb: 1, fontWeight: "bold" }}>לתאריך:</Typography>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              ampm={false}
                              value={dayjs(to)}
                              onChange={(value) => setTo(value.format("YYYY-MM-DDTHH:mm"))}
                              minDate={currentDate}
                              timeSteps={{ minutes: 30 }}
                              slotProps={{ textField: { fullWidth: true } }}
                            />
                          </LocalizationProvider>
                        </Box>
                      </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, gap: 1 }}>
                      <Button variant="outlined" fullWidth onClick={() => setOpenEdit(false)}>
                        ביטול
                      </Button>
                      <Button variant="contained" fullWidth onClick={editAddress}>
                        שמור
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              ) : (
                <Box>
                  <Typography sx={{ mb: 3, color: "#d32f2f", fontWeight: "bold" }}>
                    ⚠️ בחר תאריך להזמנה
                  </Typography>
                  <Box sx={{ mb: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ mb: 1, fontWeight: "bold" }}>מתאריך:</Typography>
                        <DateTimePicker
                          ampm={false}
                          minDate={currentDate}
                          onChange={(value) => setFrom(value.format("YYYY-MM-DDTHH:mm"))}
                          timeSteps={{ minutes: 30 }}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ mb: 1, fontWeight: "bold" }}>לתאריך:</Typography>
                        <DateTimePicker
                          ampm={false}
                          minDate={currentDate}
                          onChange={(value) => setTo(value.format("YYYY-MM-DDTHH:mm"))}
                          timeSteps={{ minutes: 30 }}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </Box>
                    </LocalizationProvider>
                    <Button variant="contained" fullWidth onClick={editAddress} sx={{ mt: 2 }}>
                      בחר תאריך זה
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Add to cart button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={add}
                sx={{
                  mt: 3,
                  py: 2,
                  backgroundColor: "#0054ee",
                  fontSize: "1.1em",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#0043c4"
                  }
                }}
              >
                ➕ הוסף להזמנה
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Success dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ textAlign: 'center', backgroundColor: "#c8e6c9", color: "#2e7d32", fontWeight: "bold" }}>
            ✅ המוצר נוסף בהצלחה!
          </DialogTitle>
          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button variant="outlined" fullWidth onClick={() => {
              setOpen(false);
              navigate(`/album`)
            }}>
              חזרה לקטלוג
            </Button>
            <Button variant="contained" fullWidth onClick={() => {
              setOpen(false);
              navigate(`/cart/${ctx.cart.id}`)
            }}>
              לצפייה בעגלה
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  )
}
export default Product;