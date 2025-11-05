import { Box, Button, Grid, Paper, Tab, Tabs, Typography, createTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVERURL } from "../client/data-context";
import dayjs from "dayjs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Link as A } from 'react-router-dom';
export default function OrderByDay() {

    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([{}])
    const [date, setDate] = useState(() => dayjs().startOf('day').toDate())
    const [dates, setDates] = useState([]);
    const [activeTab, setActiveTab] = useState('day');
    const navigate = useNavigate();
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        if (newValue === 'week') {
            navigate('/')
        }
    };
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
        const formattedDate = moment(date).format("YYYY-MM-DD")
        console.log(formattedDate);
        axios.get(`${SERVERURL}/api/Order/getByDate/${formattedDate}`)
            .then(res => {
                console.log(res.data);
                const sortedOrders = res.data?.sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate));
                setOrders(sortedOrders)
                setProducts(res.data.productsName)
            })
    }, [date])
    useEffect(() => {
        const currentDay = dayjs().startOf('day');
        const nextSevenDays = Array.from({ length: 7 }, (_, index) => currentDay.add(index, 'day').toDate());
        setDates(nextSevenDays);
    }, [])
    return (
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: theme.palette.customColor }}>
            <Paper sx={{ marginTop: 4, marginBottom: 2, marginRight: 4, marginLeft: 4 }}>
                <Grid display="flex" flexDirection="column" sx={{ width: 200, }}>
                    <Box margin={2}>
                        <Tabs value={activeTab} onChange={handleTabChange}>
                            <Tab value="day" label="יום" />
                            <Tab value="week" label="שבוע" />
                        </Tabs>
                    </Box>
                    <Grid sx={{ margin: 4 }}>
                        {dates.map((day, index) => (
                            day == date.toString() ?
                                <Button key={index}
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: theme.palette.blueDark,
                                        '&:hover': {
                                            backgroundColor: theme.palette.blueDark,
                                        }, borderRadius: 2, marginBottom: 2
                                    }}
                                    onClick={() => { setDate(day) }}>
                                    {getFormattedDayMonth(day)}
                                </Button>
                                : <Button key={index}
                                    fullWidth
                                    sx={{ backgroundColor: theme.palette.customColor, borderRadius: 2, marginBottom: 2 }}
                                    onClick={() => { setDate(day) }}>
                                    {getFormattedDayMonth(day)}
                                </Button>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{ marginTop: 4, marginBottom: 2, marginLeft: 4 }}>
                <Grid sx={{ width: 750, marginRight: 10, marginLeft: 10, marginBottom: 3, marginTop: 5 }}>
                    <Grid display="flex" flexDirection="row">
                        <Box>
                            <Typography color={theme.palette.gray} variant="h4">{getFormattedDayMonth(date)}</Typography>
                            <Typography color={theme.palette.gray} variant="h5">{orders.length} הזמנות</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" sx={{ marginRight: 50, marginTop: 5 }}>
                            <div style={{ backgroundColor: theme.palette.purple, width: 20, height: 20, borderRadius: '50%', marginLeft: 10 }} />
                            <Typography sx={{ marginLeft: 3 }}>משלוח</Typography>
                            <div style={{ backgroundColor: theme.palette.lightBlue, width: 20, height: 20, borderRadius: '50%', marginLeft: 10 }} />
                            <Typography>איסוף</Typography>
                        </Box>
                    </Grid>
                    <Grid sx={{ marginTop: 5 }}>
                        <Box display="flex" flexDirection="row" alignItems="end" sx={{ marginBottom: 3, paddingRight: 3 }}>
                            <Typography sx={{ width: 100, fontWeight: "bold" }}>שעה</Typography>
                            <Typography sx={{ width: 100, fontWeight: "bold" }}>שם</Typography>
                            <Typography sx={{ width: 100, fontWeight: "bold" }}>מוצר 1</Typography>
                            <Typography sx={{ width: 100, fontWeight: "bold" }}>מוצר 2</Typography>
                            <Typography sx={{ width: 100, fontWeight: "bold" }}>מוצר 3</Typography>
                            <Typography sx={{ width: 100, fontWeight: "bold" }}>מוצר 4</Typography>
                        </Box>
                        {orders.length > 0 ? orders.map((order, index) => (
                            <A key={index} to={`/orderdetails/${order.orderId}`} style={{ textDecoration: 'none' }} >
                                <Box display="flex" flexDirection="row" paddingRight={2}
                                    sx={{ 
                                        height: 50, 
                                        marginBottom: 2, 
                                        border: "1px solid", 
                                        borderRadius: 1, 
                                        borderColor: order.deliveryPrice < 0 ? theme.palette.lightBlue : theme.palette.purple, 
                                        borderRight: "5px solid", 
                                        borderRightColor: order.deliveryPrice < 0 ? theme.palette.lightBlue : theme.palette.purple, 
                                        borderTopRightRadius: 3, 
                                        borderBottomRightRadius: 3,
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }
                                    }}>
                                    <Typography sx={{ textDecoration: "none", width: 100, color: "black", fontSize: "16px" }}>{getFormattedTime(order.fromDate)} - {getFormattedTime(order.toDate)}</Typography>
                                    <Typography sx={{ width: 100, color: "black" }}>{order.userName}</Typography>
                                    {order.productsName.slice(0, 4).map((product, index) => (
                                        <Typography sx={{ width: 100, color: "black" }} key={index}>{product}</Typography>
                                    ))}
                                    {order.productsName.length > 4 && (
                                        <Button sx={{ width: 100, fontWeight: "bold", color: theme.palette.blueDark }}>+ {order.productsName.length - 4} מוצרים</Button>
                                    )}
                                </Box>
                            </A>
                        )) : <Typography>איו הזמנות ליום זה</Typography>}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}