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
import { ClickAwayListener, Paper, Popper, Chip, useTheme } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataContext, SERVERURL, IMAGE_BASE_URL } from '../client/data-context';
import { useContext } from "react";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField, List, ListItem, ListItemText, Box, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Album() {
  const currentDate = dayjs();
  const navigate = useNavigate();
  const ctx = useContext(DataContext);
  const theme = useTheme();
  const [products, setProducts] = useState([{}]);
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadProducts, setLoadProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState('');
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
          setLoadProducts(filtered);
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
      setLoadProducts(filtered);
    }
  }

  const handleSearch = () => {
    setFilteredProducts(searchResults.slice(0, displayedProducts));
    setLoadProducts(searchResults);
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filteredProducts = products.filter((product) =>
      product.name && product.name.includes(value)
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
      product.name && product.name.includes(selectedProduct.name)
    );
    setSearchResults(filteredProducts);
    setAnchorEl(null);
  };

  useEffect(() => {
    axios.get(`${SERVERURL}/api/Category/Get`)
      .then(res => {
        console.log(res.data);
        setCategorys(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  
  useEffect(() => {
    let start = async () => {
      const response = await axios.get(`${SERVERURL}/api/Product/getall`);
      const data = await response.data;
      setProducts(data);
      console.log(data);
      setFilteredProducts(data.slice(0, displayedProducts));
      setLoadProducts(data);
    };
    start().catch(err => console.log(err));
  }, []);

  const hasCart = !!(ctx?.cart && ctx.cart.id);
  const cartItemsCount = Array.isArray(ctx.cartProducts)
    ? ctx.cartProducts.filter(p => p && p.id).length
    : 0;
  const hasCartProducts = hasCart && cartItemsCount > 0;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Container sx={{ py: 4 }} maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          sx={{ 
            mb: 1,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          קטלוג מוצרים
        </Typography>
        <Typography 
          variant="subtitle1" 
          align="center" 
          sx={{ mb: 4, color: theme.palette.text.secondary }}
        >
          גלה את המגוון המלא של המוצרים שלנו
        </Typography>

        {ctx.role === 'secretary' && hasCartProducts && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={() => navigate(`/cart/${ctx.cart.id}`)}
              sx={{
                position: 'sticky',
                top: 8,
                zIndex: 10,
                background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                fontWeight: 700,
                borderRadius: 3,
                px: 3,
                boxShadow: `0px 8px 24px ${theme.palette.success.main}40`,
                '&:hover': { 
                  background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
                  boxShadow: `0px 12px 32px ${theme.palette.success.main}60`,
                }
              }}
            >
              עגלת קניות ({cartItemsCount})
            </Button>
          </Box>
        )}

        {/* Search and Filters */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3,
            backgroundColor: 'white'
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <TextField
                  fullWidth
                  size="medium"
                  label="חיפוש מוצר"
                  placeholder="הקלד לחיפוש..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: <SearchIcon color="action" />,
                  }}
                />
              </ClickAwayListener>
              {searchResults.length > 0 && (
                <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end">
                  <Paper sx={{ mt: 1, maxHeight: 300, overflow: 'auto', borderRadius: 2 }}>
                    <List>
                      {searchResults.map((product) => (
                        <ListItem 
                          key={product.id} 
                          button 
                          onClick={() => handleListItemClick(product)}
                          sx={{ '&:hover': { backgroundColor: theme.palette.primary.light + '20' } }}
                        >
                          <ListItemText primary={product.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Popper>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button 
                fullWidth
                variant="contained" 
                onClick={handleSearch}
                sx={{ 
                  height: 56,
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              >
                חפש
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <InputLabel>קטגוריה</InputLabel>
              <Select
                fullWidth
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">הכל</MenuItem>
                {categorys.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <InputLabel>מיון לפי מחיר</InputLabel>
              <Select
                fullWidth
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                displayEmpty
              >
                <MenuItem value='asc'>נמוך לגבוה</MenuItem>
                <MenuItem value='des'>גבוה לנמוך</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InputLabel>זמינות</InputLabel>
              <Select
                fullWidth
                value={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.value)}
                displayEmpty
              >
                <MenuItem value={false}>כל המוצרים</MenuItem>
                <MenuItem value={true}>רק זמינים</MenuItem>
              </Select>
            </Grid>
            {onlyAvailable && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={12} sm={6} md={3}>
                  <InputLabel>תאריך התחלה</InputLabel>
                  <DateTimePicker 
                    ampm={false} 
                    onChange={(value) => setFrom(value.format("YYYY-MM-DDTHH:mm"))} 
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <InputLabel>תאריך סיום</InputLabel>
                  <DateTimePicker 
                    ampm={false} 
                    onChange={(value) => setTo(value.format("YYYY-MM-DDTHH:mm"))} 
                  />
                </Grid>
              </LocalizationProvider>
            )}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={filter}
                sx={{ 
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 }
                }}
              >
                החל סינון
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <Grid container spacing={3}>
            {filteredProducts.map((card) => (
              <Grid key={card.id} item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0px 12px 32px ${theme.palette.primary.main}30`,
                    }
                  }}
                >
                  <CardMedia component="div" sx={{ position: 'relative' }}>
                    <A to={ctx.user != null ? `/product/${card.id}` : `/signup`}>
                      <img 
                        height={220} 
                        width="100%"
                        src={card.fullImageUrl} 
                        alt={card.name}
                        style={{ 
                          objectFit: 'cover',
                          borderRadius: '12px 12px 0 0'
                        }}
                      />
                    </A>
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="h2"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      {card.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2.5, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        color: theme.palette.primary.main
                      }}
                    >
                      {ctx.useSpecialPrice && card.specialPrice > 0 
                        ? `₪${card.specialPrice}` 
                        : `₪${card.price}`}
                    </Typography>
                    <Button 
                      onClick={() => { 
                        if (ctx.user != null) navigate(`/product/${card.id}`); 
                        else alert("עליך להתחבר תחילה") 
                      }} 
                      variant="contained"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                      }}
                    >
                      פרטים
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper 
            elevation={1} 
            sx={{ 
              p: 6, 
              textAlign: 'center', 
              borderRadius: 3,
              backgroundColor: theme.palette.background.light
            }}
          >
            <Typography variant="h6" color="text.secondary">
              לא נמצאו מוצרים התואמים את החיפוש
            </Typography>
          </Paper>
        )}

        {filteredProducts.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="contained" 
              disabled={displayedProducts >= loadProducts.length}
              size="large"
              onClick={() => {
                const updatedDisplayedProducts = displayedProducts + 8;
                setDisplayedProducts(updatedDisplayedProducts);
                setFilteredProducts(loadProducts.slice(0, updatedDisplayedProducts));
              }}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 700,
                background: displayedProducts >= loadProducts.length 
                  ? undefined 
                  : `linear-gradient(135deg, ${theme.palette.accent.main}, ${theme.palette.accent.dark})`,
              }}
            >
              טען עוד מוצרים
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}