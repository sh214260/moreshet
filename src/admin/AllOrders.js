import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Checkbox,
  createTheme,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
  Pagination,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  DateCalendar,
  DatePicker,
  DateTimeField,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataContext, SERVERURL } from "../client/data-context";

const AllOrders = () => {
  const ctx = useContext(DataContext);
  const theme = createTheme({
    palette: {
      customColor: "rgba(242, 247, 255, 1)",
      blueColor: "rgba(0, 84, 238, 1)",
    },
  });

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // reusable default filter so we can reset easily
  const defaultFilter = {
    orderId: null,
    userId: null,
    deliveryPrice: null,
    dateOrder: null,
    fromDate: null,
    toDate: null,
    paidUp: null,
    receipt: null,
    totalPrice: null,
    userName: null,
    paymentWay: null,
  };

  const [orderFilter, setOrderFilter] = useState(defaultFilter);
  
  // Pagination states
  const [page, setPage] = useState(1);
  const ordersPerPage = 10;

  const params = useParams();
  const navigate = useNavigate();

  // 1) תיקן: המרה ברורה של "" ל-null
  const onFilterChange = (filterKey, filterValue) => {
    const normalized = filterValue === "" ? null : filterValue;
    setOrderFilter((prev) => ({ ...prev, [filterKey]: normalized }));
  };

  // 2) תיקן: השוואה ל-id ו-convert ל-string כדי למנוע סוגיות טיפוס
  const onFilter = () => {
  let filterResult = [...orders];

  console.log("🔍 orderFilter:", orderFilter);

  filterResult = filterResult
    .filter((o) =>
      orderFilter.userName
        ? o.userName && o.userName.includes(orderFilter.userName)
        : true
    )
    .filter((o) =>
      orderFilter.orderId
        ? String(o.id).includes(orderFilter.orderId)
        : true
    );

  // סינון לפי שולם: אם ה-filter עבור paidUp מוגדר (true) נחזיר רק הזמנות ששולמו
  filterResult = filterResult.filter((o) =>
    orderFilter.paidUp !== null ? o.paidUp === orderFilter.paidUp : true
  );

  setFilteredOrders(filterResult);
};

  // נקה את כל מסנני החיפוש והחזיר את התצוגה למצב ההתחלתי
  const onClearFilters = () => {
    setOrderFilter(defaultFilter);
    setFilteredOrders(orders);
    setPage(1);
  };


  // (אפשרות לשמור PreventKeyLetters לשדות אחרים אם רוצים)
  const PreventKeyLetters = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9]|\./;
    if (!regex.test(keyValue)) {
      onFilterChange(event.target.id, "");
      event.preventDefault();
    } else {
      onFilterChange(event.target.id, keyValue);
    }
  };

  useEffect(() => {
    let start = async () => {
      try {
        const response = await axios.get(`${SERVERURL}/api/Order`, {
          headers: { Authorization: `Bearer ${ctx.token}` },
        });
        const ord = await response.data;
        const sortedOrders = ord.sort(
          (a, b) => new Date(b.dateOrder) - new Date(a.dateOrder)
        );
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } catch (err) {
        console.error("Network or server error:", err);
      }
    };
    start();
  }, []);

  return (
    <Paper sx={{ margin: 10 }}>
      {filteredOrders.length > 0 ? (
        <>
          <Typography component="h1" variant="h8">
            כל ההזמנות
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                {/* כותרות */}
                <TableRow>
                  <TableCell style={{ textAlign: "right", fontWeight: 600 }}>מס' הזמנה</TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: 600 }}>תאריך</TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: 600 }}>שם לקוח</TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: 600 }}>התחלה</TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: 600 }}>סיום</TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: 600 }}>דמי הובלה</TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: 600 }}>סה"כ</TableCell>
                  <TableCell style={{ textAlign: "center", fontWeight: 600 }}>שולם</TableCell>
                  <TableCell style={{ textAlign: "center", fontWeight: 600 }}>קבלה</TableCell>
                  <TableCell style={{ textAlign: "center", fontWeight: 600 }}>פעולות</TableCell>
                </TableRow>

                {/* שורת סינון */}
                <TableRow>
                  <TableCell>
                    {/* 3) תיקן: onChange עם בדיקת ספרות; value נקלט מה־orderFilter */}
                    <TextField
                      id="orderId"
                      value={orderFilter.orderId || ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        // מאפשר רק ספרות (או ריק), אחרת מתעלם מהקלט
                        if (/^\d*$/.test(v)) {
                          onFilterChange("orderId", v === "" ? null : v);
                        }
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker />
                    </LocalizationProvider>
                  </TableCell>

                  <TableCell>
                    <TextField
                      onChange={(ev) => onFilterChange("userName", ev.target.value)}
                    />
                  </TableCell>

                  {/* שאר השדות כמו לפני */}
                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker ampm={false} />
                    </LocalizationProvider>
                  </TableCell>

                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker ampm={false} />
                    </LocalizationProvider>
                  </TableCell>

                  <TableCell>
                    <TextField onKeyPress={PreventKeyLetters} />
                  </TableCell>

                  <TableCell>
                    <TextField onKeyPress={PreventKeyLetters} />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={orderFilter.paidUp === true}
                      onChange={(e) =>
                        onFilterChange("paidUp", e.target.checked ? true : null)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox />
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                      <Button variant="contained" disableElevation onClick={onFilter}>
                        חפש
                      </Button>
                      <Button variant="outlined" onClick={onClearFilters}>
                        נקה
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredOrders
                  .slice((page - 1) * ordersPerPage, page * ordersPerPage)
                  .map((order) => (
                  <TableRow key={order.id} sx={{ backgroundColor: theme.palette.customColor }}>
                    <TableCell style={{ textAlign: "right" }}>{order.id}</TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      {moment(order.dateOrder).format("DD/MM")}
                    </TableCell>
                    <TableCell style={{ textAlign: "right" }}>{order.userName}</TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      {moment(order.fromDate).format("DD/MM HH:mm")}
                    </TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      {moment(order.toDate).format("DD/MM HH:mm")}
                    </TableCell>
                    <TableCell style={{ textAlign: "right" }}>{order.deliveryPrice}</TableCell>
                    <TableCell style={{ textAlign: "right" }}>{order.totalPrice}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {order.paidUp ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {order.receipt ? (
                        <CheckIcon />
                      ) : (
                        <Link href="https://app.invoice-maven.co.il/home.jsf" target="_blank">
                          ליצירת קבלה
                        </Link>
                      )}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/orderdetails/${order.id}`)}
                      >
                        צפה
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} alignItems="center" sx={{ padding: 2 }}>
            <Pagination
              count={Math.ceil(filteredOrders.length / ordersPerPage)}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              dir="ltr"
            />
          </Stack>
        </>
      ) : (
        <Typography>לא נמצאו הזמנות ללקוח זה</Typography>
      )}
    </Paper>
  );
};



export default AllOrders;
