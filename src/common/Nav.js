import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, Link, MenuList } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from "react";
import { DataContext, SERVERURL } from '../client/data-context';
import { green, red } from '@mui/material/colors';
export default function Nav() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigation = useNavigate()
    const cotx = useContext(DataContext)
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" style={{backgroundColor:green[100]}} >
            <Toolbar sx={{height:70}}>
                <Link href="./">
            <img alt='logo'  src={`${SERVERURL}/Static/logo.png`} width={120} style={{paddingTop:2}}/>
            </Link> 
            <Button variant="text" sx={{fontSize:"large", }} disableElevation onClick={() => { navigation('/album') }}>
                    קטלוג
                </Button>
                <Button variant="text" sx={{fontSize:"large", }} disableElevation onClick={() => navigation('/contact')}>
                    צור קשר</Button>
                <IconButton onClick={() => {if(cotx.cart!=null) navigation(`/cart/${cotx.cart.id}`); else alert('עליך להתחבר קודם') }} >
                    <ShoppingCartIcon fontSize="large"/>
                </IconButton>
                <div>
                    {cotx.user != null ? (
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color={red[500]}
                            onClick={handleMenu}
                        >
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <AccountCircle />
                                <Typography sx={{fontSize:"large", marginLeft: 1}}>{cotx.user.name}</Typography>
                            </Box>
                        </IconButton>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{fontSize:"large", backgroundColor: red[500]}}
                            onClick={() => navigation('/signin')}
                        >
                            התחבר
                        </Button>
                    )}
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {cotx.user != null && (
                            <MenuList>
                                <MenuItem onClick={()=>{handleClose(); cotx.logOut(); navigation('/')}}>התנתק</MenuItem>
                                <MenuItem onClick={() =>{handleClose(); navigation('/updateuser')}}>עריכת פרופיל</MenuItem>
                                <MenuItem onClick={() =>{handleClose(); navigation(`../allorders/${cotx.user.id}`)}}>ההזמנות שלי</MenuItem>
                            </MenuList>
                        )}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}