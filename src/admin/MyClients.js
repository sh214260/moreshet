import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  createTheme,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  TableContainer,
  TextField,
  Stack,
  Pagination,
} from "@mui/material";
import { DataContext, SERVERURL } from "../client/data-context";

const MyClients = () => {
  const ctx = useContext(DataContext);
  const theme = createTheme({
    palette: {
      customColor: "rgba(242, 247, 255, 1)",
      blueColor: "rgba(0, 84, 238, 1)",
    },
  });
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [page, setPage] = useState(1);
  const clientsPerPage = 10;
  const [userCarts, setUserCarts] = useState({}); // Map of userId -> cart status
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    email: "",
    type: "",
    address: "",
    phoneNumber1: "",
    phoneNumber2: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    let start = async () => {
      console.log("fetching users...");
      try {
        const response = await axios.get(
          `${SERVERURL}/api/User`,
          {
            headers: { Authorization: `Bearer ${ctx.token}` },
          }
        );
        console.log("Users fetched:", response.data);
        setClients(response.data);
        setFilteredClients(response.data);
        setPage(1);

        // Fetch cart status for each user to check for incomplete orders
        const cartMap = {};
        for (const user of response.data) {
          try {
            const cartRes = await axios.get(`${SERVERURL}/api/Cart/getcartbyuser/${user.id}`, {
              headers: { Authorization: `Bearer ${ctx.token}` },
            });
            // Mark if user has an incomplete order (totalPrice > 0)
            cartMap[user.id] = {
              hasIncompleteOrder: cartRes.data && cartRes.data.totalPrice && cartRes.data.totalPrice > 0,
              cart: cartRes.data,
            };
          } catch (err) {
            console.warn(`Could not fetch cart for user ${user.id}:`, err);
            cartMap[user.id] = { hasIncompleteOrder: false, cart: null };
          }
        }
        setUserCarts(cartMap);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    start();
  }, []);

  const handleFilterChange = (field, value) => {
    // וולידציה: אם השדה הוא טלפון, אפשר רק מספרים
    if ((field === "phoneNumber1" || field === "phoneNumber2" || field === "id") && value && !/^\d*$/.test(value)) {
      return;
    }

    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    applyFilters(filters);
    setPage(1);
  };

  const applyFilters = (filterObj) => {
    let filtered = clients.filter((user) => {
      return (
        (filterObj.id === "" || user.id.toString().includes(filterObj.id)) &&
        (filterObj.name === "" || user.name.toLowerCase().includes(filterObj.name.toLowerCase())) &&
        (filterObj.email === "" || user.email.toLowerCase().includes(filterObj.email.toLowerCase())) &&
        (filterObj.type === "" || user.type.includes(filterObj.type)) &&
        (filterObj.address === "" || user.address.toLowerCase().includes(filterObj.address.toLowerCase())) &&
        (filterObj.phoneNumber1 === "" || (user.phoneNumber1 && user.phoneNumber1.includes(filterObj.phoneNumber1))) &&
        (filterObj.phoneNumber2 === "" || (user.phoneNumber2 && user.phoneNumber2.includes(filterObj.phoneNumber2)))
      );
    });
    setFilteredClients(filtered);
  };

  const handleClearFilters = () => {
    setFilters({
      id: "",
      name: "",
      email: "",
      type: "",
      address: "",
      phoneNumber1: "",
      phoneNumber2: "",
    });
    setFilteredClients(clients);
    setPage(1);
  };

  return (
    <Paper sx={{ margin: 0, padding: 3, width: '100%', boxSizing: 'border-box' }}>
      
      {clients && clients.length > 0 ? (
        <>
        <Typography  component="h1" variant="h8" >
        הלקוחות שלי
      </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: 50,
            }}
          >
            
            <Button
              onClick={() => navigate(`../signup`)}
              variant="contained"
              sx={{
                borderRadius: 3,
                height: 40,
                width: 100,
                fontSize: 16,
              }}
            >
              + לקוח
            </Button>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>
                    מספר לקוח
                  </TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>
                    שם
                  </TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>
                    מייל
                  </TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>
                    סוג
                  </TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>
                    כתובת
                  </TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>
                    טלפון1
                  </TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>
                    טלפון 2
                  </TableCell>
                  <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>
                    פעולות
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <TextField
                      size="small"
                      value={filters.id}
                      onChange={(e) => handleFilterChange("id", e.target.value)}
                      placeholder="חפש..."
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={filters.name}
                      onChange={(e) => handleFilterChange("name", e.target.value)}
                      placeholder="חפש..."
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={filters.email}
                      onChange={(e) => handleFilterChange("email", e.target.value)}
                      placeholder="חפש..."
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={filters.type}
                      onChange={(e) => handleFilterChange("type", e.target.value)}
                      placeholder="חפש..."
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={filters.address}
                      onChange={(e) => handleFilterChange("address", e.target.value)}
                      placeholder="חפש..."
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={filters.phoneNumber1}
                      onChange={(e) => handleFilterChange("phoneNumber1", e.target.value)}
                      placeholder="חפש..."
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={filters.phoneNumber2}
                      onChange={(e) => handleFilterChange("phoneNumber2", e.target.value)}
                      placeholder="חפש..."
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button variant="contained" size="small" onClick={handleSearch}>
                        חפש
                      </Button>
                      <Button variant="outlined" size="small" onClick={handleClearFilters}>
                        נקה
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClients && filteredClients.length > 0 ? (
                  filteredClients
                    .slice((page - 1) * clientsPerPage, page * clientsPerPage)
                    .map((user) => (
                    <TableRow key={user.id} sx={{ backgroundColor: theme.palette.customColor }}>
                      <TableCell style={{ textAlign: "right" }}>
                        {user.id}
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        {user.name}
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        {user.email}
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        {user.type}
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        {user.address}
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        {user.phoneNumber1}
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        {user.phoneNumber2}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => navigate(`/orderByUser/${user.id}`)}
                          >
                            הזמנות
                          </Button>
                          <Button
                            variant={userCarts[user.id]?.hasIncompleteOrder ? "contained" : "contained"}
                            size="small"
                            onClick={async () => {
                              try {
                                // set the user in context and mark role as secretary
                                ctx.setUser(user);
                                ctx.setRole("secretary");
                                
                                // fetch cart for that user
                                const cartRes = await axios.get(`${SERVERURL}/api/Cart/getcartbyuser/${user.id}`, { headers: { Authorization: `Bearer ${ctx.token}` } });
                                if (cartRes && cartRes.data) {
                                  ctx.setCart(cartRes.data);
                                  // fetch products for that cart
                                  const prods = await axios.get(`${SERVERURL}/api/CartProduct/getproducts/${cartRes.data.id}`, { headers: { Authorization: `Bearer ${ctx.token}` } });
                                  ctx.setCartProducts(prods.data || []);
                                }
                                // navigate to catalog so admin can add products
                                navigate(`/album`);
                              } catch (err) {
                                console.error("Error starting/resuming order for user:", err);
                                alert('שגיאה בטעינת העגלה של הלקוח');
                              }
                            }}
                          >
                            {userCarts[user.id]?.hasIncompleteOrder ? "המשך הזמנה" : "התחל הזמנה"}
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} style={{ textAlign: "center" }}>
                      לא נמצאו לקוחות
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} alignItems="center" sx={{ padding: 2 }}>
            <Pagination
              count={Math.ceil(filteredClients.length / clientsPerPage)}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              dir="ltr"
            />
          </Stack>
        </>
      ) : (
        <Typography>לא נמצאו לקוחות</Typography>
      )}
    </Paper>
  );
};

export default MyClients;
