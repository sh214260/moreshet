import { Avatar, Box, Button, Grid, Link, Paper, Typography, createTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVERURL } from "../client/data-context";
import dayjs from "dayjs";
import moment from "moment";
export default function OrderByDay() {

    const [orders, setOrders] = useState([{}])
    const [products, setProducts] = useState([{}])
    const [date, setDate] = useState(dayjs());
    const theme = createTheme({
        palette: {
            customColor: 'rgba(242, 247, 255, 1)',
            lightBlue: 'rgba(128, 172, 255, 1)',
            purple: 'rgba(117, 37, 222, 1)',
            gray: 'rgba(32, 34, 36, 0.54)',
            blueDark: 'rgba(0, 84, 238, 1)'

        },
    });
    const getFormattedTime = (fullDate) => {
        const date = new Date(fullDate);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formattedTime;
    };
    const getFormattedDayMonth = (fullDate) => {
        const date = new Date(fullDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        const hebrewDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
        const hebrewDayOfWeek = hebrewDays[date.getDay()];
        const formattedDayMonth = `${hebrewDayOfWeek}, ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
        return formattedDayMonth;
    };

    useEffect(() => {
        const formattedDate = moment(date).format("DD-MM-YYYY")
        axios.get(`${SERVERURL}/api/Order/getByDate`,  formattedDate)
            .then(res => {
                console.log(res.data);
                const sortedOrders = res.data?.sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate));
                setOrders(sortedOrders)
                setProducts(res.data.productsname)
            })

        
    }, [])
    return (
        <div style={{display: "flex", justifyContent: "center",backgroundColor:theme.palette.customColor}}>
            <Paper sx={{marginTop:10}}>
                <Grid sx={{ marginRight: 15, marginLeft:15, marginBottom:3, marginTop:5 }}>
                    <Grid display="flex" flexDirection="row">
                        <Box>
                            <Typography color={theme.palette.gray} variant="h4">{getFormattedDayMonth(date)}</Typography>
                            <Typography color={theme.palette.gray} variant="h5">{orders.length} הזמנות</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" sx={{marginRight:50, marginTop:5}}>
                            <div style={{ backgroundColor: theme.palette.purple, width: 20, height: 20, borderRadius: '50%', marginLeft: 10 }} />
                            <Typography sx={{marginLeft:3}}>משלוח</Typography>
                            <div style={{ backgroundColor: theme.palette.lightBlue, width: 20, height: 20, borderRadius: '50%', marginLeft: 10 }} />
                            <Typography>איסוף</Typography>
                        </Box>
                    </Grid>
                    <Grid sx={{marginTop:5}}>
                        <Box display="flex" flexDirection="row" alignItems="end" sx={{marginBottom:3, paddingRight:3}}>
                            <Typography sx={{ width: 100, fontWeight:"bold" }}>שעה</Typography>
                            <Typography sx={{ width: 100, fontWeight:"bold" }}>שם</Typography>
                            <Typography sx={{ width: 100, fontWeight:"bold" }}>מוצר 1</Typography>
                            <Typography sx={{ width: 100, fontWeight:"bold" }}>מוצר 2</Typography>
                            <Typography sx={{ width: 100, fontWeight:"bold" }}>מוצר 3</Typography>
                            <Typography sx={{ width: 100, fontWeight:"bold" }}>מוצר 4</Typography>
                        </Box>
                        {orders.map((order, index) => (
                            <Link  key={index} href={`/`} underline="none">
                            <Box  display="flex" flexDirection="row" paddingRight={2}
                                sx={{ border: "1px solid", borderRadius: 1, borderColor: theme.palette.lightBlue, borderRight:"5px solid", borderRightColor:theme.palette.lightBlue,borderTopRightRadius:3, borderBottomRightRadius:3 }}>
                                <Typography sx={{ width: 100, color:"black" }}>{getFormattedTime(order.fromDate)} - {getFormattedTime(order.toDate)}</Typography>
                                <Typography sx={{ width: 100,color:"black" }}>{order.id}</Typography>
                                {products.slice(0, 4).map((product, index) => (
                                    <Typography sx={{ width: 100,color:"black" }} key={index}>{product.name}</Typography>
                                ))}
                                {products.length > 4 && (
                                    <Button sx={{ width: 100,fontWeight:"bold", color:theme.palette.blueDark }}>+ {products.length - 4} מוצרים</Button>
                                )}
                            </Box>
                            </Link>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}