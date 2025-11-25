import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVERURL } from "../client/data-context";
import moment from 'moment';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, createTheme, Pagination, Stack } from "@mui/material";
const OrderByUser = () => {

    const theme = createTheme({
        palette: {
            customColor: 'rgba(242, 247, 255, 1)',
            blueColor: 'rgba(0, 84, 238, 1)'
        }
    })
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const ordersPerPage = 10;
    const params = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${SERVERURL}/api/Order/getbyuser/${params.id}`)
            .then(ans => {
                console.log(ans.data)
                // Sort by newest first (descending by dateOrder)
                const sorted = ans.data.sort((a, b) => new Date(b.dateOrder) - new Date(a.dateOrder));
                setOrders(sorted);
                setPage(1);
            })
    }, [])
    return (
        <div style={{ backgroundColor: theme.palette.customColor }}>
            <Paper sx={{ margin: 4 }}>
                <Grid style={{ width: 750, margin: 10, marginRight: 170, marginLeft: 170 }}>
                    <Table sx={{ marginTop: 4, marginRight: 6, marginLeft: 6, }}>
                        <TableHead>
                            <TableRow >
                                <TableCell style={{ textAlign: "right" }}>מספר הזמנה</TableCell>
                                <TableCell style={{ textAlign: "right" }}>תאריך ביצוע ההזמנה</TableCell>
                                <TableCell style={{ textAlign: "right" }}>לתאריך</TableCell>
                                <TableCell style={{ textAlign: "right" }}>סה"כ לתשלום</TableCell>
                                <TableCell style={{ textAlign: "right" }}>פעולות</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders && orders.length > 0 ? orders
                              .slice((page - 1) * ordersPerPage, page * ordersPerPage)
                              .map((order) => (
                                <TableRow key={order.id} sx={{ borderBlockColor: theme.palette.blueColor, marginTop: 1, marginBottom: 1 }}>
                                    <TableCell style={{ textAlign: "right" }}>{order.id}</TableCell>
                                    <TableCell style={{ textAlign: "right" }}>{moment(order.dateOrder).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell style={{ textAlign: "right" }}>{moment(order.fromDate).format("DD/MM HH:mm")}</TableCell>
                                    <TableCell style={{ textAlign: "right" }}>{order.totalPrice}</TableCell>
                                    <TableCell style={{ textAlign: "right" }}>
                                      <Button onClick={() => navigate(`/orderdetails/${order.id}`)}>לצפייה בפרטי ההזמנה</Button>
                                    </TableCell>
                                </TableRow>
                            )) : <TableRow><TableCell colSpan={5} style={{ textAlign: "center" }}><Typography>לא נמצאו הזמנות ללקוח המבוקש</Typography></TableCell></TableRow>}
                        </TableBody>
                    </Table>
                    <Stack spacing={2} alignItems="center" sx={{ padding: 2 }}>
                      <Pagination
                        count={Math.ceil(orders.length / ordersPerPage)}
                        page={page}
                        onChange={(event, newPage) => setPage(newPage)}
                        dir="ltr"
                      />
                    </Stack>
                </Grid>
            </Paper>
        </div>
    )
}
export default OrderByUser;