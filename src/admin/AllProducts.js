import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, createTheme } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext, SERVERURL } from "../client/data-context";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const AllProducts = () => {
  const [products, setProducts] = useState();
  const [flagDelete, setFlagDelete] = useState(0)
  const [openDialig, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const context = useContext(DataContext)
  const theme = createTheme({
    palette: {
      customColor: 'rgba(242, 247, 255, 1)',
      blueColor: 'rgba(0, 84, 238, 1)'
    },
  });
  const navigate = useNavigate();
  const deleteProduct = () => {
    console.log(idToDelete);
    if (idToDelete == 0) {
      alert("error")
      return
    }
    axios.delete(`${SERVERURL}/api/Product/${idToDelete}`
      , { headers: { Authorization: `Bearer ${context.token}` } })
      .then(res => {
        console.log(res.data);
        if (res.data) {
          alert("המוצר נמחק בהצלחה!")
          setFlagDelete(flagDelete + 1)
        }
        else {
          alert("שגיאה במחיקת המוצר")
        }
      })
      .catch(error => console.log(error))
    setOpenDialog(false)
    setIdToDelete(0)

  }
  useEffect(() => {
    let start = async () => {
      const response = await axios.get(`${SERVERURL}/api/Product/getall`
      , { headers: { Authorization: `Bearer ${context.token}` } }
      )
      const data = await response.data
      setProducts(data);
    }
    start()
  }, [flagDelete])
  
  return (
    <div style={{backgroundColor: theme.palette.customColor}}>
      <Paper sx={{ marginTop: 4, marginBottom: 2, marginRight: 4, marginLeft: 4 }}>
        <Grid style={{ width: 750, marginTop: 10, marginBottom: 50, marginRight: 170, marginLeft: 170 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>עריכה</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>מחיקה</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>מספר מוצר</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>שם</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>קטגוריה</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>מחיר</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products && products.map(product => (
                <TableRow key={product.id}>
                  <TableCell style={{ textAlign: "right" }}><IconButton onClick={() => navigate(`/updateProduct/${product.id}`)}><Edit /></IconButton></TableCell>
                  <TableCell style={{ textAlign: "right" }}><IconButton onClick={() => { setOpenDialog(true); setIdToDelete(product.id) }} ><Delete /></IconButton></TableCell>
                  <TableCell style={{ textAlign: "right" }}>{product.id}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{product.name}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{product.categoryId}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={openDialig} onClose={() => { setOpenDialog(false); setIdToDelete(0) }} maxWidth="sm" fullWidth={true}>
            <DialogTitle sx={{ textAlign: 'center' }}>
              {"האם אתה בטוח שברצונך למחוק את המוצר?"}
            </DialogTitle>
            <DialogActions >
              <Button variant="contained" sx={{ width: '100%', marginTop: 2 }} onClick={() => deleteProduct()}>
                כן, אני בטוח {idToDelete}
              </Button>
              <Button variant="outlined" sx={{ width: '100%', marginTop: 2, marginRight: 1 }} onClick={() => setOpenDialog(false)}>
                לא, חזור
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Paper>
    </div>)
}
export default AllProducts;