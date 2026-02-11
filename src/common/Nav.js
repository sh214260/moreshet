import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, Link, MenuList, Badge, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react";
import { DataContext, SERVERURL, IMAGE_BASE_URL } from '../client/data-context';

export default function Nav() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);
    const navigation = useNavigate();
    const cotx = useContext(DataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchor(null);
    };

    const cartItemsCount = Array.isArray(cotx.cartProducts)
        ? cotx.cartProducts.filter(p => p && p.id).length
        : 0;

    return (
        <AppBar 
            position="sticky" 
            sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Toolbar sx={{ height: { xs: 64, md: 80 }, px: { xs: 2, md: 4 } }}>
                <Link href="./" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img 
                        alt='מורשת לוגו'  
                        src={`${IMAGE_BASE_URL}/Static/logo.png`} 
                        style={{
                            height: isMobile ? 50 : 70,
                            filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </Link>

                {!isMobile ? (
                    <>
                        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1, mr: 3 }}>
                            <Button 
                                variant="text" 
                                sx={{
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    px: 3,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    }
                                }} 
                                onClick={() => navigation('/album')}
                            >
                                קטלוג מוצרים
                            </Button>
                            <Button 
                                variant="text" 
                                sx={{
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    px: 3,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    }
                                }} 
                                onClick={() => navigation('/contact')}
                            >
                                צור קשר
                            </Button>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <IconButton 
                                onClick={() => {
                                    if(cotx.cart!=null) navigation(`/cart/${cotx.cart.id}`); 
                                    else alert('עליך להתחבר קודם')
                                }}
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    }
                                }}
                            >
                                <Badge badgeContent={cartItemsCount} color="warning">
                                    <ShoppingCartIcon fontSize="large"/>
                                </Badge>
                            </IconButton>
                            
                            {cotx.user != null ? (
                                <IconButton
                                    size="large"
                                    aria-label="תפריט משתמש"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: 3,
                                        px: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        }
                                    }}
                                >
                                    <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                                        <AccountCircle />
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                            {cotx.user.name}
                                        </Typography>
                                    </Box>
                                </IconButton>
                            ) : (
                                <Button
                                    variant="contained"
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        backgroundColor: 'white',
                                        color: theme.palette.primary.main,
                                        px: 4,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
                                        }
                                    }}
                                    onClick={() => navigation('/signin')}
                                >
                                    התחבר
                                </Button>
                            )}
                        </Box>
                    </>
                ) : (
                    <>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton 
                            onClick={() => {
                                if(cotx.cart!=null) navigation(`/cart/${cotx.cart.id}`); 
                                else alert('עליך להתחבר קודם')
                            }}
                            sx={{ color: 'white' }}
                        >
                            <Badge badgeContent={cartItemsCount} color="warning">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="תפריט"
                            onClick={handleMobileMenuOpen}
                            sx={{ color: 'white' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </>
                )}

                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            mt: 1,
                            borderRadius: 2,
                            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
                        }
                    }}
                >
                    {cotx.user != null && (
                        <MenuList sx={{ py: 1 }}>
                            <MenuItem 
                                onClick={() => {
                                    handleClose(); 
                                    cotx.logOut(); 
                                    navigation('/')
                                }}
                                sx={{ fontWeight: 500 }}
                            >
                                התנתק
                            </MenuItem>
                            <MenuItem 
                                onClick={() => {
                                    handleClose(); 
                                    navigation('/updateuser')
                                }}
                                sx={{ fontWeight: 500 }}
                            >
                                עריכת פרופיל
                            </MenuItem>
                            <MenuItem 
                                onClick={() => {
                                    handleClose(); 
                                    navigation(`../allorders/${cotx.user.id}`)
                                }}
                                sx={{ fontWeight: 500 }}
                            >
                                ההזמנות שלי
                            </MenuItem>
                        </MenuList>
                    )}
                </Menu>

                <Menu
                    anchorEl={mobileMenuAnchor}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(mobileMenuAnchor)}
                    onClose={handleMobileMenuClose}
                    PaperProps={{
                        sx: {
                            mt: 1,
                            borderRadius: 2,
                            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
                        }
                    }}
                >
                    <MenuList sx={{ py: 1 }}>
                        <MenuItem onClick={() => { handleMobileMenuClose(); navigation('/album'); }}>
                            קטלוג מוצרים
                        </MenuItem>
                        <MenuItem onClick={() => { handleMobileMenuClose(); navigation('/contact'); }}>
                            צור קשר
                        </MenuItem>
                        {cotx.user != null ? (
                            <>
                                <MenuItem onClick={() => { handleMobileMenuClose(); navigation('/updateuser'); }}>
                                    עריכת פרופיל
                                </MenuItem>
                                <MenuItem onClick={() => { handleMobileMenuClose(); navigation(`../allorders/${cotx.user.id}`); }}>
                                    ההזמנות שלי
                                </MenuItem>
                                <MenuItem onClick={() => { handleMobileMenuClose(); cotx.logOut(); navigation('/'); }}>
                                    התנתק
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={() => { handleMobileMenuClose(); navigation('/signin'); }}>
                                התחבר
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}