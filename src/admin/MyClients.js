import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { createTheme, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, Paper, Grid } from '@mui/material';
import { DataContext } from "../client/data-context";

const MyClients = () => {
  const ctx = useContext(DataContext)
  const theme = createTheme({
    palette: {
      customColor: 'rgba(242, 247, 255, 1)',
      blueColor: 'rgba(0, 84, 238, 1)',
    }
  })
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let start = async () => {
      console.log("data")
      const response = await axios.get(`https://localhost:7128/api/User`
        , { headers: { Authorization: `Bearer ${ctx.token}` } }
      );
      console.log(response.data);
      setClients(response.data);
    }
    start();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: theme.palette.customColor }}>
      <Paper sx={{ marginTop: 4, marginBottom: 2, marginRight: 4, marginLeft: 4 }}>
        <Grid style={{ width: 750, marginTop: 10, marginBottom: 50, marginRight: 170, marginLeft: 170 }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h3">הלקוחות שלי</Typography>
            <Button
              onClick={() => navigate(`../signup`)}
              variant="contained" sx={{ borderRadius: 3, height: 40, width: 100, fontSize: 16, backgroundColor: theme.palette.blueColor }}>+ לקוח</Button>
          </div>
          <Table component='table' >
            <TableHead >
              <TableRow >
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>מספר לקוח</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>שם</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>מייל</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>סוג</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>כתובת</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>טלפון1</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>טלפון 2</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients && clients.map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{ textAlign: "right" }}>{user.id}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{user.name}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{user.email}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{user.type}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{user.address}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{user.phoneNumber1}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{user.phoneNumber2}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/orderByUser/${user.id}`)}
                    >
                      לצפייה בהזמנות קודמות
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Paper></div>);
}

export default MyClients;
