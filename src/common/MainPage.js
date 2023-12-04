import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from "react";
import { DataContext } from '../client/data-context'

export default function MainPage() {
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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button variant="contained" disableElevation onClick={() => { navigation('/album') }}>
                        קטלוג
                    </Button>
                    <IconButton>
                        <ShoppingCartIcon fontSize="large"
                            onClick={() => { navigation(`/cart/${cotx.cart.id}`) }} />
                    </IconButton>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Box display="flex" flexDirection="row">
    <AccountCircle />
    {cotx.user!=null?<Typography>{cotx.user.name}</Typography>:<Typography>אורח</Typography>}
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
                            {cotx.user != null ? <>
                                <MenuItem onClick={() => navigation('/updateuser')}>עריכת פרופיל</MenuItem>
                                <MenuItem onClick={handleClose}>התנתק</MenuItem></> :
                                <>
                                    <MenuItem onClick={() => {
                                        setAnchorEl(null);
                                        navigation('/signin')
                                    }}>התחבר</MenuItem>
                                </>}


                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


