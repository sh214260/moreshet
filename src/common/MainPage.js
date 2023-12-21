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
import ImageSlider from '../client/SliderImgs';
import Contact from '../client/Contact';
import Nav from './Nav';
export default function MainPage() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigation = useNavigate()
    const cotx = useContext(DataContext)
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        cotx.logOut()
        setAnchorEl(null);
    };
const img=["https://source.unsplash.com/random?wallpapers","https://source.unsplash.com/random?wallpapers",
"https://source.unsplash.com/random?wallpapers","https://source.unsplash.com/random?wallpapers"]
    return (
        <Box sx={{ flexGrow: 1 }}>
            <ImageSlider images={img}/>
            <Contact/>
        </Box>
    );
}


