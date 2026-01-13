import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { useContext } from "react";
import { DataContext, SERVERURL, IMAGE_BASE_URL } from '../client/data-context';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import moment from 'moment';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, Link } from "@mui/material";
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 13,
        padding: '0 4px',
    },
}));
const Cart = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [flag, setFlag] = useState(0)
    const ctx = useContext(DataContext)
    const [openQuoteDialog, setOpenQuoteDialog] = useState(false)
    const [quoteFormData, setQuoteFormData] = useState({
        fullName: '',
        email: '',
        phonenumber1: '',
        address: ''
    })
    const [isCreatingQuote, setIsCreatingQuote] = useState(false)
    const [quotePdfLink, setQuotePdfLink] = useState(null)
    function DeleteProduct(productId) {
        axios.post(`${SERVERURL}/api/CartProduct/delete/${ctx.cart.id}/${productId}`
            , {}, { headers: { Authorization: `Bearer ${ctx.token}` } }
        )
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    setFlag(flag + 1)
                }
                else {
                    alert("המחיקה לא התבצעה כראוי")
                }
            })
    }
    useEffect(() => {
        axios.get(`${SERVERURL}/api/CartProduct/getproducts/${ctx.cart.id}`
            , { headers: { Authorization: `Bearer ${ctx.token}` } }
        )
            .then(ans => {
                console.log(ans);
                console.log(ans.data)
                ctx.setCartProducts(ans.data)
            }).catch(err => {
                alert('please login');
                navigate("/signin");
            })
        axios.get(`${SERVERURL}/api/Cart/getbyid/${ctx.cart.id}`
            , { headers: { Authorization: `Bearer ${ctx.token}` } })
            .then(res => {
                console.log(res.data)
                ctx.setCart(res.data)
                params.id = ctx.cart.id
            })
        const addHours = moment(ctx.cart.toDate).diff(ctx.cart.fromDate, 'hours') + (moment(ctx.cart.toDate).diff(ctx.cart.fromDate, 'minutes') % 60) / 60
        console.log(addHours);
        if ((addHours) > 4) {
            ctx.setAdditionHour(addHours - 4)
        }
    }, [flag])

    // בדיקת שדות חסרים ופתיחת הדיאלוג
    const handleCreateQuote = () => {
        const missingFields = {}
        
        if (!ctx.user?.name) missingFields.fullName = true
        if (!ctx.user?.email) missingFields.email = true
        if (!ctx.user?.phonenumber1) missingFields.phonenumber1 = true
        if (!ctx.user?.address) missingFields.address = true

        // אם יש שדות חסרים, פתח את הדיאלוג
        if (Object.keys(missingFields).length > 0) {
            setQuoteFormData({
                fullName: ctx.user?.name || '',
                email: ctx.user?.email || '',
                phonenumber1: ctx.user?.phonenumber1 || '',
                address: ctx.user?.address || ''
            })
            setOpenQuoteDialog(true)
        } else {
            // אם כל השדות קיימים, צור הצעת מחיר ישירות
            createQuoteDocument({
                fullName: ctx.user.name,
                email: ctx.user.email,
                phonenumber1: ctx.user.phonenumber1,
                address: ctx.user.address
            })
        }
    }

    // יצירת הצעת מחיר דרך השרת שלנו
    const createQuoteDocument = async (userData) => {
        setIsCreatingQuote(true)
        try {
            // הכנת נתוני העגלה לשליחה לשרת
            const quoteData = {
                cartId: ctx.cart.id,
                clientInfo: {
                    fullName: userData.fullName,
                    email: userData.email,
                    phone: userData.phonenumber1,  // שינוי ל-phone עבור Invoice Maven
                    address: userData.address
                },
                products: ctx.cartProducts.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: ctx.useSpecialPrice && product.specialPrice > 0 
                        ? product.specialPrice 
                        : product.price,
                    specialPrice: product.specialPrice,
                    quantity: 1
                })),
                totalPrice: ctx.cart.totalPrice,
                additionHours: ctx.additionHours,
                useSpecialPrice: ctx.useSpecialPrice,
                fromDate: ctx.cart.fromDate,
                toDate: ctx.cart.toDate,
                deliveryPrice: ctx.deliveryPrice
            }

            console.log('נתוני הצעת המחיר שנשלחים:', quoteData)
            console.log('פרטי לקוח:', quoteData.clientInfo)
            console.log('פרטי USER', ctx.user.phonenumber1)

            // שליחה לשרת שלנו (לא ישירות ל-Invoice4u)
            const response = await axios.post(
                `${SERVERURL}/api/quotes/create`,
                quoteData,
                { headers: { Authorization: `Bearer ${ctx.token}` } }
            )

            if (response.data && response.data.pdf_original) {
                setQuotePdfLink(response.data.pdf_original)
                setOpenQuoteDialog(false)
                alert('הצעת המחיר נוצרה בהצלחה!')
            } else {
                alert('אירעה שגיאה ביצירת הצעת המחיר')
            }
        } catch (error) {
            console.error('Error creating quote:', error)
            alert('אירעה שגיאה ביצירת הצעת המחיר: ' + (error.response?.data?.message || error.message))
        } finally {
            setIsCreatingQuote(false)
        }
    }

    // שמירת השדות מהטופס
    const handleQuoteFormChange = (field, value) => {
        setQuoteFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    // שליחת הטופס
    const handleQuoteFormSubmit = () => {
        // בדיקת ולידציה
        if (!quoteFormData.fullName || !quoteFormData.email || 
            !quoteFormData.phonenumber1 || !quoteFormData.address) {
            alert('אנא מלא את כל השדות החובה')
            return
        }

        createQuoteDocument(quoteFormData)
    }

    return (
        <div>
            {ctx.cartProducts ? 
                <Paper sx={{ margin: 4, backgroundColor: "transparent" }}>
                    <Grid style={{ width: 1000, margin: 10 }}>
                        <Box sx={{ margin: 2 }} >
                            <AppBar sx={{ width: '50%', marginTop: 1, marginBottom: 1 }} position="sticky">
                                <Toolbar sx={{ width: 550, display: 'flex', flexDirection: 'row' }}>
                                    <Typography variant="h5" marginLeft={2}>המוצרים בהזמנה</Typography>
                                    <IconButton aria-label="cart" >
                                        <StyledBadge badgeContent={ctx.cartProducts.length} color="secondary">
                                            <ShoppingCartIcon fontSize="large" />
                                        </StyledBadge>
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%" }}>
                                    {ctx.cartProducts.length > 0 ? (
                                        ctx.cartProducts.map(product => (
                                            <Card key={product.id} sx={{ marginTop: 2, marginBottom: 2 }} variant="outlined">
                                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 70, height: 70 }}
                                                        image={`${IMAGE_BASE_URL}/Static/${product.image}`}
                                                        alt="Live from space album cover"
                                                    />
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="h6">
                                                            {product.name}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                                            {product.name}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardContent sx={{ flex: '1 0 ', justifyItems: 'flex-end' }}>
                                                        <Typography component="div" variant="h6">
                                                            {ctx.useSpecialPrice && product.specialPrice > 0 
                                                              ? product.specialPrice 
                                                              : product.price} ₪
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                                            {ctx.useSpecialPrice && product.specialPrice > 0 
                                                              ? (product.specialPrice / 8) 
                                                              : (product.price / 8)} * {ctx.additionHours} =
                                                            {ctx.useSpecialPrice && product.specialPrice > 0 
                                                              ? (product.specialPrice / 8 * ctx.additionHours) 
                                                              : (product.price / 8 * ctx.additionHours)}₪
                                                        </Typography>
                                                    </CardContent>
                                                    <CardContent sx={{ flex: '1 0 ', justifyItems: 'left' }}>
                                                        <IconButton onClick={() => DeleteProduct(product.id)}>
                                                            <CloseIcon fontSize="large" />
                                                        </IconButton>
                                                    </CardContent>
                                                </Box>
                                            </Card>))) : (

                                        <Grid item xs={12} sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                                            <Typography variant="h5">עדיין לא הוספת מוצרים</Typography>
                                        </Grid>
                                    )}
                                </Box>

                                <Box sx={{ display: 'flex', marginRight: 10 }}>
                                    <Card variant="outlined" sx={{ height: 'auto', width: 300 }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                <Typography variant="h5">סה"כ לתשלום: {ctx.cart.totalPrice}</Typography>
                                                <Typography variant="h6"></Typography>
                                            </Box>
                                            
                                            {quotePdfLink && (
                                                <Box sx={{ marginTop: 2, marginBottom: 2, padding: 1, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                                                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                                        הצעת המחיר נוצרה בהצלחה!
                                                    </Typography>
                                                    <Link href={quotePdfLink} target="_blank" rel="noopener">
                                                        <Button variant="outlined" size="small" fullWidth>
                                                            צפייה בהצעת מחיר
                                                        </Button>
                                                    </Link>
                                                </Box>
                                            )}

                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Button
                                                    variant="outlined"
                                                    size="large"
                                                    disabled={ctx.cart.totalPrice === 0}
                                                    sx={{ width: '100%', marginTop: 2 }}
                                                    onClick={handleCreateQuote}
                                                >
                                                    צור הצעת מחיר
                                                </Button>
                                                
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    disabled={ctx.cart.totalPrice === 0}
                                                    sx={{ width: '100%', marginTop: 2 }}
                                                    onClick={() => {
                                                        if (ctx.cart.totalPrice == 0) {
                                                            return;
                                                        }
                                                        navigate('../checkout')
                                                    }}
                                                >
                                                    מעבר לתשלום
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="large"
                                                    disabled={false}
                                                    sx={{ width: '100%', marginTop: 2 }}
                                                    onClick={() => navigate('../album')}
                                                >
                                                    המשך קנייה
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box></Grid>
                        </Box></Grid>
                </Paper>:<Typography>עליך להתחבר קודם</Typography>}
            
            {/* Dialog למילוי פרטים חסרים */}
            <Dialog 
                open={openQuoteDialog} 
                onClose={() => !isCreatingQuote && setOpenQuoteDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>השלמת פרטים להצעת מחיר</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        אנא השלם את הפרטים הבאים ליצירת הצעת מחיר:
                    </Typography>
                    
                    <TextField
                        fullWidth
                        margin="normal"
                        label="שם מלא *"
                        value={quoteFormData.fullName}
                        onChange={(e) => handleQuoteFormChange('fullName', e.target.value)}
                        disabled={isCreatingQuote}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        margin="normal"
                        label="אימייל *"
                        type="email"
                        value={quoteFormData.email}
                        onChange={(e) => handleQuoteFormChange('email', e.target.value)}
                        disabled={isCreatingQuote}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        margin="normal"
                        label="טלפון *"
                        value={quoteFormData.phonenumber1}
                        onChange={(e) => handleQuoteFormChange('phonenumber1', e.target.value)}
                        disabled={isCreatingQuote}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        margin="normal"
                        label="כתובת *"
                        value={quoteFormData.address}
                        onChange={(e) => handleQuoteFormChange('address', e.target.value)}
                        disabled={isCreatingQuote}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => setOpenQuoteDialog(false)}
                        disabled={isCreatingQuote}
                    >
                        ביטול
                    </Button>
                    <Button 
                        onClick={handleQuoteFormSubmit}
                        variant="contained"
                        disabled={isCreatingQuote}
                    >
                        {isCreatingQuote ? <CircularProgress size={24} /> : 'צור הצעת מחיר'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>)
    ;
};

export default Cart;




