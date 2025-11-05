import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogTitle, Grid, IconButton, InputLabel, Link, Paper, Typography, createTheme } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext, SERVERURL } from "../client/data-context";
import { Check, Close, Delete } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export default function OrderDetails() {
    const theme = createTheme({
        palette: {
            customColor: 'rgba(242, 247, 255, 1)',
            blueColor: 'rgba(0, 84, 238, 1)',
            pink: 'rgba(117, 37, 222, 0.1)'
        },
    });
    const [orderData, setOrderData] = useState({});
    const [userData, setUserData] = useState({});
    const [productsData, setProductsData] = useState([{}])
    const [flag, setFlag] = useState(0)
    const params = useParams()
    const [open, setOpen] = React.useState(false);
    const ctx = useContext(DataContext)
    const navigate = useNavigate()

    const handleDeleteProduct = (productId) => {
        axios.delete(`${SERVERURL}/api/ItemsForOrder/${orderData.id}/${productId}`
            , { headers: { Authorization: `Bearer ${ctx.token}` } })
            .then(ans => {
                console.log(ans.data);
                if (ans.data) {
                    setOpen(false)
                    alert("המוצר הוסר בהצלחה")
                    setFlag(flag + 1)
                }
                else {
                    alert("שגיאה בהסרת המוצר")
                }
            })
    }
    const handleDeleteOrder = () => {
        console.log(orderData);
        axios.delete(`${SERVERURL}/api/Order/${orderData.id}`
            , { headers: { Authorization: `Bearer ${ctx.token}` } })
            .then(ans => {
                console.log(ans.data);
                if (ans.data) {
                    setOpen(false)
                    alert("ההזמנה בוטלה")
                    navigate(-1)
                }
                else {
                    alert("שגיאה בביטול ההזמנה")
                }
            })
    }

    useEffect(() => {
        axios.get(`${SERVERURL}/api/Order/getAllData/${params.id}`
            , { headers: { Authorization: `Bearer ${ctx.token}` } })
            .then(res => {
                console.log(res.data);
                setOrderData(res.data.order)
                setUserData(res.data.user)
                setProductsData(res.data.products)
            })
    }, [flag])

    return (
        <div style={{ display: "flex", backgroundColor: theme.palette.customColor }}>
            <Paper sx={{ marginTop: 4, marginRight: 4, }}>
                <Grid sx={{ width: 250, marginLeft: 7, marginRight: 7, marginTop: 4 }}>
                    <Grid display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                        <div>
                            <Typography variant="h4">מוצרים בהזמנה</Typography>
                            <Typography variant="h5">{productsData.length} מוצרים</Typography></div>
                        <Button
                            onClick={() => navigate(`album`)}
                            variant="contained" sx={{ borderRadius: 3, height: 40, width: 100, fontSize: 16, backgroundColor: theme.palette.blueColor }}>+ מוצר</Button>
                    </Grid>
                    <Grid>
                        {productsData.map((product) => (
                            <Card key={product.id - 1} sx={{ display: 'flex', marginTop: 3, marginBottom: 3, flexDirection: 'row', backgroundColor: theme.palette.pink, borderRadius: 3 }}>
                                <CardMedia style={{ marginTop: 10 }}>
                                    <img height={70} src={`${SERVERURL}/Static/${product.image}`} alt="image" />
                                </CardMedia>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography fontWeight="bold" fontSize={20}>
                                        {product.name}
                                    </Typography>
                                    <Typography marginTop={1} fontSize={18}>
                                        {product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton onClick={() => handleDeleteProduct(product.id)}>
                                        <Delete fontSize="large" />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{ marginTop: 4, marginRight: 4, marginLeft: 4, }}>
                <Grid sx={{ width: 600, marginRight: 10, marginLeft: 7, marginTop: 4, marginBottom: 4 }}>
                    <Box >
                        <Typography variant="h4">פרטי ההזמנה</Typography>
                        <Grid container spacing={2} paddingTop={1}>
                            <Grid item xs={6}>
                                <InputLabel>מספר הזמנה</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{orderData.id}</Typography>
                                <InputLabel>בתאריך</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{moment(orderData.fromDate).format("DD-MM-YYYY")}</Typography>
                                <InputLabel>זמן ביצוע ההזמנה</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{moment(orderData.dateOrder).format("DD-MM-YYYY")}</Typography>
                                <InputLabel>אופן התשלום</InputLabel>
                                <Grid display="flex" flexDirection="row" width="180">
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{orderData.paymentWay}</Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, marginRight: 1, marginLeft: 1, backgroundColor: theme.palette.customColor
                                    }}>{orderData.paidUp ? <Check /> : <Close />}</Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} ></Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>מחיר משלוח</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{orderData.deliveryPrice}</Typography>
                                <InputLabel>שעות</InputLabel>
                                <Grid display="flex" flexDirection="row" width="180">
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} > {moment(orderData.toDate).diff(orderData.fromDate, 'hours')}
                                        {" "}
                                        {(moment(orderData.toDate).diff(orderData.fromDate, 'minutes') % 60) >= 30 ? <>וחצי</> : <></>}
                                        {" "}</Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, marginRight: 1, marginLeft: 1, backgroundColor: theme.palette.customColor
                                    }}>מ {moment(orderData.fromDate).format("HH:mm")}</Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >עד {moment(orderData.toDate).format("HH:mm")}</Typography>
                                </Grid>
                                <InputLabel>סה"כ לתשלום</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{orderData.totalPrice}</Typography>
                                <InputLabel>קבלה</InputLabel>
                                <Grid display="flex" flexDirection="row" width="180">
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >על שם {userData.receiptName}</Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, marginRight: 1, marginLeft: 1, backgroundColor: theme.palette.customColor
                                    }}>{orderData.receipt ? <Check /> :
                                        <>
                                            <Link href="https://app.invoice-maven.co.il/home.jsf" target="_blank">ליצירת קבלה</Link>
                                        </>}</Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} ></Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>הערות לקוח</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        height: 80, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{orderData.notes}</Typography></Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Typography variant="h4">פרטי לקוח</Typography>
                        <Grid container spacing={2} paddingTop={1}>
                            <Grid item xs={6}>
                                <InputLabel>שם</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{userData.name}</Typography>
                                <InputLabel>פלאפון 1</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{userData.phoneNumber1}</Typography>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{userData.phoneNumber2}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>מייל</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{userData.email}</Typography>
                                <InputLabel>כתובת</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{userData.address}</Typography>
                                <InputLabel>שם המוסד</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >{userData.institutionalName}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <IconButton
                        onClick={() => setOpen(true)}
                        sx={{ marginRight: 55, fontSize: 16, fontWeight: "bold", color: theme.palette.blueColor }}>
                        <Delete fontSize="small" />בטל הזמנה
                    </IconButton>
                    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth={true}>
                        <DialogTitle sx={{ textAlign: 'center' }}>
                            {"האם לבטל את ההזמנה לצמיתות?"}
                        </DialogTitle>
                        <DialogActions >
                            <Button variant="contained" sx={{ width: '100%', marginTop: 2 }} onClick={handleDeleteOrder}>
                                כן, אני בטוח
                            </Button>
                            <Button variant="outlined" sx={{ width: '100%', marginTop: 2, marginRight: 1 }} onClick={() => setOpen(false)}>
                                לא, חזור
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Paper>
        </div>
    )
}