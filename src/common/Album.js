import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as A } from 'react-router-dom';
import { ClickAwayListener, Paper, Popper } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataContext, SERVERURL } from '../client/data-context';
import { useContext } from "react";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField, List, ListItem, ListItemText } from '@mui/material';
import { green } from '@mui/material/colors';

export default function Album() {
  const currentDate = dayjs(); // Get the current date
  const navigate = useNavigate()
  const ctx = useContext(DataContext)
  const [products, setProducts] = useState([{}])
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadProducts, setLoadProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [categorys, setCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  async function fetchAvailableProducts() {
    const ans = await axios.get(`${SERVERURL}/api/Product/getavailable/${from}/${to}`);
    const data = await ans.data;
    console.log(data);
    return data;
  }

  function filter() {
    if (onlyAvailable && from !== null && to !== null) {
      fetchAvailableProducts()
        .then(products => {
          let filtered = [...products];
          filtered = filtered
            .filter(product => categoryId ? product.categoryId === categoryId : true)
            .sort((p1, p2) => sortOrder === 'asc' ? p1.price - p2.price : p2.price - p1.price);
          setFilteredProducts(filtered.slice(0, displayedProducts));
          setLoadProducts(filtered)
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      let filtered = [...products];
      filtered = filtered
        .filter(product => categoryId ? product.categoryId === categoryId : true)
        .sort((p1, p2) => sortOrder === 'asc' ? p1.price - p2.price : p2.price - p1.price);
      setFilteredProducts(filtered.slice(0, displayedProducts));
      setLoadProducts(filtered)

    }
  }

  const handleSearch = () => {
    setFilteredProducts(searchResults.slice(0, displayedProducts))
    setLoadProducts(searchResults)
  }
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filteredProducts = products.filter((product) =>
      product.name.includes(value)
    );
    setSearchResults(filteredProducts);
    if (value.length > 1) {
      setAnchorEl(e.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleListItemClick = (selectedProduct) => {
    setSearchTerm(selectedProduct.name);
    const filteredProducts = products.filter((product) =>
      product.name.includes(selectedProduct.name)
    );
    setSearchResults(filteredProducts);
    setAnchorEl(null);
  };

  useEffect(() => {
    axios.get(`${SERVERURL}/api/Category/Get`)
      .then(res => {
        console.log(res.data)
        setCategorys(res.data)
      })
  }, [])
  useEffect(() => {
    let start = async () => {
      const response = await axios.get(`${SERVERURL}/api/Product/getall`)
      const data = await response.data
      setProducts(data)
      console.log(data);
      setFilteredProducts(data.slice(0, displayedProducts))
      setLoadProducts(data)
    }
    start()
    console.log(products);
  }, [])

  return (<>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ margin: 4 , backgroundColor:"transparent"}}>
        <Grid style={{ width: 1000, justifyContent: "center" }}>
          <Container sx={{ py: 2 }} maxWidth="md">
            <Typography padding={0} component="h1" variant="h2" align="center" color={green[700]} gutterBottom>
              קטלוג מוצרים
            </Typography>
            <Grid sx={{ marginTop: 5 }} container spacing={1}>
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <TextField
                  size='small'
                  style={{ width: 150 }}
                  label="חפש מוצר"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </ClickAwayListener>
              {searchResults.length > 0 && (
                <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end">
                  <Paper>
                    <List >
                      {searchResults.map((product) => (
                        <ListItem key={product.id} button onClick={() => handleListItemClick(product)}>
                          <ListItemText style={{ textAlign: 'right', width: 150 }} primary={product.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Popper>
              )}
              <Button variant="contained" onClick={handleSearch}>
                חפש
              </Button>
            </Grid>
            <Grid sx={{ marginBottom: 7 }} display="flex" flexDirection="row" alignItems="center" container spacing={2} >
              <Grid display="flex" flexDirection="column" item lg={2} >
                <InputLabel id="demo-simple-select-filled-label">קטגוריה</InputLabel>
                <Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  displayEmpty
                  size='small'
                >
                  <MenuItem value="" >
                    הכל
                  </MenuItem>
                  {categorys.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid display="flex" flexDirection="column" item lg={2}>
                <InputLabel id="demo-simple-select-filled-label">מחיר</InputLabel>
                <Select
                  size='small'
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value='asc'>מהנמוך לגבוה</MenuItem>
                  <MenuItem value='des'>מהגבוה לנמוך</MenuItem>
                </Select>
              </Grid>
              <Grid display="flex" flexDirection="column" item lg={2}>
                <InputLabel id="demo-simple-select-filled-label">תאריך</InputLabel>
                <Select
                  size='small'
                  value={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value={false} >כל המוצרים</MenuItem>
                  <MenuItem value={true}>הצג רק מוצרים זמינים</MenuItem>
                </Select>
              </Grid>
              {onlyAvailable == true &&
                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                  <Grid display="flex" flexDirection="column" item sm={2}>
                    <InputLabel>מ</InputLabel>
                    <DateTimePicker ampm={false} onChange={(value) => setFrom(value.format("YYYY-MM-DDTHH:mm"))} />
                  </Grid>
                  <Grid display="flex" flexDirection="column" item sm={2}>
                    <InputLabel>עד</InputLabel>
                    <DateTimePicker ampm={false} onChange={(value) => setTo(value.format("YYYY-MM-DDTHH:mm"))} />
                  </Grid>
                </LocalizationProvider>
              }
              <Grid display="flex" flexDirection="column" >
                <Button
                  sx={{ height: '70%', width: '100%', fontSize: '1rem', marginTop: 5 }}
                  onClick={filter} variant="contained">בצע סינון
                </Button>
              </Grid>
            </Grid>
            {filteredProducts.length > 0 ?
              <Grid container spacing={4}>
                {filteredProducts.map((card) => (
                  <Grid key={card.id} item xs={12} sm={6} md={4}>
                    <Card
                      sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <CardMedia
                        component="div">
                        <A to={ctx.user != null ? `/product/${card.id}` : `/signup`}>
                          <img height={200} src={`${SERVERURL}/Static/${card.image}`} />
                        </A>
                      </CardMedia>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.name}
                        </Typography>
                        <Typography>
                          {card.description}
                        </Typography>
                      </CardContent>
                      <CardActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography style={{ order: 1, margin: 14 }}>
                          {card.price} ₪
                        </Typography>
                        <div>
                          <Button onClick={() => { if (ctx.user != null) navigate(`/product/${card.id}`); else alert("התחבר קודם") }} size="medium" style={{ order: 2, margin: 4 }}>הצג</Button>
                        </div>
                      </CardActions>

                    </Card>
                  </Grid>))}
              </Grid> : (<Typography>לא נמצאו מוצרים</Typography>)}
            <Button variant="contained" disabled={displayedProducts != filteredProducts.length}
              style={{ margin: 'auto', marginTop: 30, display: 'block', fontSize: '1.2em' }} onClick={() => {
                const updatedDisplayedProducts = displayedProducts + 3;
                setDisplayedProducts(updatedDisplayedProducts);
                setFilteredProducts(loadProducts.slice(0, updatedDisplayedProducts))
              }}>טען עוד</Button>
          </Container>
        </Grid>
      </Paper>
    </div>
  </>)
}