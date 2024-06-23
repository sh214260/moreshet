import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext, SERVERURL } from '../client/data-context';
import ImageSlider from '../client/SliderImgs';
import Contact from '../client/Contact';
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
