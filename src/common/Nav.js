import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, MenuList } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from "react";
import { DataContext } from '../client/data-context'
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
        <AppBar position="sticky">
            <Toolbar>
                <Button variant="contained" disableElevation onClick={() => { navigation('/album') }}>
                    קטלוג
                </Button>
                <Button variant="contained" disableElevation onClick={() => navigation('/contact')}>
                    צור קשר</Button>
                <IconButton onClick={() => { navigation(`/cart/${cotx.cart.id}`) }} >
                    <ShoppingCartIcon fontSize="large"/>
                </IconButton>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleMenu}
                    >
                        <Box display="flex" flexDirection="row">
                            <AccountCircle />
                            {cotx.user != null ? <Typography>{cotx.user.name}</Typography> : <Typography>אורח</Typography>}

                        </Box>
                    </IconButton>
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
                        {cotx.user != null ? <MenuList>
                            <MenuItem onClick={()=>{handleClose(); cotx.logOut(); navigation('/')}}>התנתק</MenuItem>
                            <MenuItem onClick={() => navigation('/updateuser')}>עריכת פרופיל</MenuItem>
                            <MenuItem onClick={() => navigation(`../allorders/${cotx.user.id}`)}>ההזמנות שלי</MenuItem>
                        </MenuList>
                            :
                            <MenuList>
                                <MenuItem onClick={() => {
                                    setAnchorEl(null);
                                    navigation('/signin')
                                }}>התחבר</MenuItem>
                            </MenuList>}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}