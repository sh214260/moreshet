import { Add, CalendarToday, Edit, Group, Home, Shop, Today } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
export default function ToolbarDash() {
    const navigate = useNavigate()
    return (
        <div style={{padding:0, backgroundColor:"white"}}>
            <Toolbar  sx={{ display: "flex", flexDirection: "column", backgroundColor: "white", marginTop: 4, }}>
                <IconButton sx={{display:"flex", flexDirection:"column"}} 
                onClick={() => navigate('/')} >
                    <Home />
                    <Typography>דאשבורד</Typography>
                </IconButton>    
                <IconButton sx={{display:"flex", flexDirection:"column"}}
                 onClick={() => navigate(`updateProduct/${0}`)}>
                    <Add />
                    <Typography>הוספת מוצר</Typography>
                </IconButton>
                <IconButton sx={{display:"flex", flexDirection:"column"}}
                 onClick={() => navigate('allProducts')}>
                    <Edit/>
                    <Typography>שינוי במוצרים</Typography>
                </IconButton>
                <IconButton sx={{display:"flex", flexDirection:"column"}}
                 onClick={() => navigate('orderByDate')}>
                    <CalendarToday />
                    <Typography>הזמנות לשבוע</Typography>
                </IconButton>
                <IconButton sx={{display:"flex", flexDirection:"column"}}
                 onClick={() => navigate('loginForUser')}>
                    <Shop />
                    <Typography>ביצוע הזמנה</Typography>
                </IconButton>
                <IconButton sx={{display:"flex", flexDirection:"column"}}
                 onClick={() => navigate('myclients')}>
                    <Group/>
                    <Typography>הלקוחות שלי</Typography>
                </IconButton>
            </Toolbar>
        </div>
    )
}