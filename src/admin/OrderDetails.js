import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, InputLabel, Paper, Typography, createTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVERURL } from "../client/data-context";
import { Delete } from "@mui/icons-material";
export default function OrderDetails() {
    const theme = createTheme({
        palette: {
            customColor: 'rgba(242, 247, 255, 1)',
            blueColor: 'rgba(0, 84, 238, 1)',
            pink: 'rgba(117, 37, 222, 0.1)'
        },
    });
    const [orderId, setOrderId] = useState();
    const [order, setOrder] = useState();
    useEffect(() => {
        axios.get(`${SERVERURL}/api/Order/getById/${orderId}`)
    }, [])
    return (
        <div style={{ display: "flex", backgroundColor: theme.palette.customColor }}>
            <Paper sx={{ marginTop: 3, marginRight: 4, width: "38%" }}>
                <Grid sx={{ margin: 4 }}>
                    <Grid display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                        <div >
                            <Typography variant="h4">מוצרים בהזמנה</Typography>
                            <Typography variant="h5">4 מוצרים</Typography></div>
                        <Button variant="contained" sx={{ borderRadius: 3,height:40, width:100,fontSize:16 ,backgroundColor: theme.palette.blueColor }}>+ מוצר</Button>
                    </Grid>
                    <Grid>
                        <Card sx={{ display: 'flex',marginTop:3, marginBottom:3, flexDirection: 'row', backgroundColor: theme.palette.pink, borderRadius: 3 }}>
                            <CardMedia>
                                <img height={100} alt="image" />
                            </CardMedia>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography fontWeight="bold" fontSize={20}>
                                    מכונת סוכר
                                </Typography>
                                <Typography>
                                    102
                                </Typography>
                                <Typography marginTop={1} fontSize={18}> 
                                    170 ש"ח
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton>
                                    <Delete fontSize="large" />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{ marginTop: 3, marginRight: 4, marginLeft: 4, width: "62%" }}>
                <Grid sx={{ marginRight: 10, marginLeft: 7, marginTop: 4, marginBottom:4 }}>
                    <Box >
                        <Typography variant="h4">פרטי ההזמנה</Typography>
                        
                        <Grid container spacing={2} paddingTop={1}>
                            <Grid item xs={6}>
                                <InputLabel>מספר הזמנה</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >1015</Typography>
                                <InputLabel>בתאריך</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >12.02.24</Typography>
                                <InputLabel>זמן ביצוע ההזמנה</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >10.02.24</Typography>
                                <InputLabel>אופן התשלום</InputLabel>
                                <Grid display="flex" flexDirection="row" width="180">
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >אשראי</Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, marginRight: 1, marginLeft: 1, backgroundColor: theme.palette.customColor
                                    }}></Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} ></Typography>

                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>אופן האיסוף</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >משלוח</Typography>
                                <InputLabel>שעות</InputLabel>
                                <Grid display="flex" flexDirection="row" width="180">
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >3</Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, marginRight: 1, marginLeft: 1, backgroundColor: theme.palette.customColor
                                    }}></Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} ></Typography>

                                </Grid>
                                <InputLabel>סה"כ לתשלום</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >1500</Typography>
                                <InputLabel>קבלה</InputLabel>
                                <Grid display="flex" flexDirection="row" width="180">
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >על שם</Typography>
                                    <Typography size="small" sx={{
                                        width: 54, marginBottom: 2, marginRight: 1, marginLeft: 1, backgroundColor: theme.palette.customColor
                                    }}></Typography>
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
                            }} >בלה בלה בלה</Typography></Grid>
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
                                    }} >חנה כהן</Typography>
                                <InputLabel>פלאפון 1</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >000</Typography>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >100024</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>מייל</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >sh@</Typography>
                                <InputLabel>כתובת</InputLabel>
                                <Typography size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                                        width: 180, marginBottom: 2, backgroundColor: theme.palette.customColor
                                    }} >בית שמש</Typography>

                            </Grid>
                        </Grid>
                    </Box>
                    <IconButton sx={{marginRight:55,fontSize:16, fontWeight:"bold", color:theme.palette.blueColor}}>
                            <Delete fontSize="small" />בטל הזמנה
                        </IconButton>
                </Grid>
            </Paper>

        </div>
    )
}