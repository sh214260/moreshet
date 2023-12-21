import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';
import {Checkbox,Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { DateCalendar, DatePicker, DateTimeField, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function OrdersForUser() {

  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState({
    Id:null,userId:null,deliveryPrice:null,
     dateOrder:null,fromDate:null,toDate:null, 
     paidUp:null,receipt:null,totalPrice:null});
  const params = useParams()
  const defaultValue = params?.id || -1;
 
  const onFilterChange = (filterKey, filterValue) => {
    filterValue = filterValue && filterValue.length === 0? null :filterValue;
    setOrderFilter({...orderFilter, [filterKey]:filterValue})
  }

  const onFilter = () => {
    let filterResult = [...orders];
    filterResult = filterResult
    .filter(o => orderFilter.userId ?o.userId === orderFilter.userId : true)
      .filter(o => orderFilter.deliveryPrice ?o.deliveryPrice === orderFilter.deliveryPrice : true)
      .filter(o => orderFilter.dateOrder ?o.dateOrder === orderFilter.dateOrder : true)
      .filter(o => orderFilter.paidUp ?o.paidUp === orderFilter.paidUp : true)
      .filter(o => orderFilter.receipt ?o.receipt === orderFilter.receipt : true)
   
      return filterResult;
  }
  const PreventKeyLetters = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9]|\./;  // Only allow numbers and decimals
  
    if (!regex.test(keyValue)) {
      event.preventDefault();
    }else{
      onFilterChange(event.target.id, event.target.value);
    }
  };
  useEffect(() => {
    let start = async () => {
      console.log(params.id)
      console.log(defaultValue)
      if (defaultValue == -1) {
        const response = await axios.get(`https://localhost:7128/api/Order`);
        const ord = await response.data
        setOrders(ord);
      }
      else {
        const response = await axios.get(`https://localhost:7128/api/Order/getbyuser/${defaultValue}`)
        const ord = await response.data
        console.log(ord)
        setOrders(ord);
      }
      
    }
    start();
  }, []);

  return (
    <Paper sx={{margin:10}}>
      {orders.length>0?<>
      {defaultValue==-1?<Typography component="h1" variant="h8">כל ההזמנות</Typography>
      :<Typography>ההזמנות של לקוח מספר {defaultValue}</Typography>}
      <TableContainer sx={{}} >
        <Table>
          <TableHead >
            <TableRow >
              <TableCell style={{textAlign:"right"}}>מספר הזמנה</TableCell>
              <TableCell style={{textAlign:"right"}}>תאריך הזמנה</TableCell>
              <TableCell style={{textAlign:"right"}}>מספר לקוח</TableCell>
              <TableCell style={{textAlign:"right"}}>מתאריך</TableCell>
              <TableCell style={{textAlign:"right"}}>עד תאריך</TableCell>
              <TableCell style={{textAlign:"right"}}>מחיר משלוח</TableCell>
              <TableCell style={{textAlign:"right"}}>מחיר סופי</TableCell>
              <TableCell style={{textAlign:"right"}}>תשלום</TableCell>
              <TableCell style={{textAlign:"right"}}>קבלה</TableCell>
              <TableCell style={{textAlign:"right"}}>פעולות</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><TextField id="orderId" onKeyPress={PreventKeyLetters}/></TableCell>
              <TableCell><LocalizationProvider dateAdapter={AdapterDayjs} 
              ><DatePicker/></LocalizationProvider>
              </TableCell>
              <TableCell><TextField onKeyPress={PreventKeyLetters} /></TableCell>
              <TableCell > 
                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                  <DateTimePicker  ampm={false} />
               </LocalizationProvider>
               </TableCell>
              <TableCell><LocalizationProvider dateAdapter={AdapterDayjs}  >
                  <DateTimePicker  ampm={false} />
               </LocalizationProvider></TableCell>
              <TableCell><TextField onKeyPress={PreventKeyLetters} /></TableCell>
              <TableCell><TextField onKeyPress={PreventKeyLetters}/></TableCell>
              <TableCell><Checkbox/></TableCell>
              <TableCell><Checkbox/></TableCell>
              <TableCell><Button variant="contained" disableElevation>חפש</Button></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {onFilter().map((order) => (
              <TableRow key={order.id}>
                <TableCell style={{textAlign:"right"}}>{order.id}</TableCell>
                <TableCell style={{textAlign:"right"}}>{moment(order.dateOrder).format("DD.MM")}</TableCell>
                <TableCell style={{textAlign:"right"}}>{order.userId}</TableCell>
                <TableCell style={{textAlign:"right"}}>{moment(order.fromDate).format("DD.MM HH:mm")}</TableCell>
                <TableCell style={{textAlign:"right"}}>{moment(order.toDate).format("DD.MM HH:mm")}</TableCell>
                <TableCell style={{textAlign:"right"}}>{order.deliveryPrice}</TableCell>
                <TableCell style={{textAlign:"right"}}>{order.totalPrice}</TableCell>
                <TableCell style={{textAlign:"center"}}>{order.paidUp ? <CheckIcon/> : <CloseIcon/>}</TableCell>
                <TableCell style={{textAlign:"center"}}>{order.receipt ? <CheckIcon/> :  
                <>
                <Link href="https://app.invoice-maven.co.il/home.jsf" target="_blank">ליצירת קבלה</Link>
                </>}</TableCell>
             <TableCell/>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>  :<Typography>לא נמצאו הזמנות ללקוח זה</Typography>}</Paper>
  );
}

export default OrdersForUser;

