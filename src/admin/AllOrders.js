import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';
import { Checkbox, createTheme, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { DateCalendar, DatePicker, DateTimeField, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataContext } from "../client/data-context";

const AllOrders = () => {
  const ctx=useContext(DataContext)
  const theme = createTheme({
    palette: {
      customColor: 'rgba(242, 247, 255, 1)',
      blueColor: 'rgba(0, 84, 238, 1)'
    }
  })
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState({
    orderId: null, userId: null, deliveryPrice: null,
    dateOrder: null, fromDate: null, toDate: null,
    paidUp: null, receipt: null, totalPrice: null, userName: null, paymentWay: null
  });
  const params = useParams()
  const onFilterChange = (filterKey, filterValue) => {
    console.log(filterValue, filterKey);
    filterValue = filterValue && filterValue.length === 0 ? null : filterValue;
    setOrderFilter({ ...orderFilter, [filterKey]: filterValue })
  }

  const onFilter = () => {
    let filterResult = [...orders];
    filterResult = filterResult
      .filter(o => orderFilter.userName ? (o.userName && o.userName.includes(orderFilter.userName)) : true)
      .filter(o => orderFilter.orderId ? o.orderId == orderFilter.orderId : true)
    return filterResult;
  }
  const PreventKeyLetters = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9]|\./;  // Only allow numbers and decimals
    if (!regex.test(keyValue)) {
      onFilterChange(event.target.id, '');
      event.preventDefault();
    } else {
      onFilterChange(event.target.id, keyValue);
    }
  };
  useEffect(() => {
    let start = async () => {
      const response = await axios.get(`https://localhost:7128/api/Order`
      , { headers: { Authorization: `Bearer ${ctx.token}` } }
      );
      const ord = await response.data
      console.log(ord);
      const sortedOrders = ord.sort((a, b) => new Date(a.dateOrder) - new Date(b.dateOrder));
      console.log(sortedOrders);
      setOrders([...sortedOrders]);
    }
    start();
  }, []);

  return (
    <Paper sx={{ margin: 10 }}>
      {orders.length > 0 ? <>
        <Typography component="h1" variant="h8">כל ההזמנות</Typography>
        <TableContainer sx={{}} >
          <Table>
            <TableHead >
              <TableRow >
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>מספר הזמנה</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>תאריך הזמנה</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>שם לקוח</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>מתאריך</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>עד תאריך</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>מחיר משלוח</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>מחיר סופי</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>תשלום</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>קבלה</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>פעולות</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><TextField id="orderId" onKeyPress={PreventKeyLetters} /></TableCell>
                <TableCell><LocalizationProvider dateAdapter={AdapterDayjs}
                ><DatePicker /></LocalizationProvider>
                </TableCell>
                <TableCell><TextField onChange={(ev) => onFilterChange('userName', ev.target.value)} /></TableCell>
                <TableCell >
                  <LocalizationProvider dateAdapter={AdapterDayjs}  >
                    <DateTimePicker ampm={false} />
                  </LocalizationProvider>
                </TableCell>
                <TableCell><LocalizationProvider dateAdapter={AdapterDayjs}  >
                  <DateTimePicker ampm={false} />
                </LocalizationProvider></TableCell>
                <TableCell><TextField onKeyPress={PreventKeyLetters} /></TableCell>
                <TableCell><TextField onKeyPress={PreventKeyLetters} /></TableCell>
                <TableCell><Checkbox /></TableCell>
                <TableCell><Checkbox /></TableCell>
                <TableCell><Button variant="contained" disableElevation>חפש</Button></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {onFilter().map((order) => (
                <TableRow key={order.id} sx={{ backgroundColor: theme.palette.customColor }}>
                  <TableCell style={{ textAlign: "right" }}>{order.id}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{moment(order.dateOrder).format("DD/MM")}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{order.userName}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{moment(order.fromDate).format("DD/MM HH:mm")}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{moment(order.toDate).format("DD/MM HH:mm")}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{order.deliveryPrice}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{order.totalPrice}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>{order.paidUp ? <CheckIcon /> : <CloseIcon />}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>{order.receipt ? <CheckIcon /> :
                    <>
                      <Link href="https://app.invoice-maven.co.il/home.jsf" target="_blank">ליצירת קבלה</Link>
                    </>}</TableCell>
                  <TableCell />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </> : <Typography>לא נמצאו הזמנות ללקוח זה</Typography>}</Paper>
  );
}

export default AllOrders;

