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
import { DataContext, SERVERURL } from '../client/data-context'
import ImageSlider from '../client/SliderImgs';
import Contact from '../client/Contact';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function MainPage() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [pictures, setPictures] = useState([]);
    const navigation = useNavigate();
    const cotx = useContext(DataContext);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        cotx.logOut();
        setAnchorEl(null);
    };

    const MapNames = (data) => {
        return data.map((name) => `${SERVERURL}/Static/${name}.png`);
    };

    useEffect(() => {
        axios.get(`${SERVERURL}/api/Product/getimages`)
            .then((response) => {
                const images = response.data;
                const mappedImages = MapNames(images);
                setPictures(mappedImages);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ImageSlider images={pictures} />
            <Contact />
        </Box>
    );
}
