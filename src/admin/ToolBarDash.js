import { Add, CalendarToday, Today } from "@mui/icons-material";
import { IconButton, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
export default function ToolbarDash(){
    const navigate = useNavigate()
    return(
        <div >
        <Toolbar sx={{ display: "flex", flexDirection: "column", backgroundColor: "white", marginTop:4 }}>
                <IconButton onClick={() => navigate('addProduct')}>
                    <Add />
                </IconButton>
                <IconButton onClick={() => navigate('orderByDate')}>
                    <CalendarToday/>
                </IconButton>
            </Toolbar>
            </div>
    )
}