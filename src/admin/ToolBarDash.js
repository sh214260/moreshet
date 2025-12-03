import { Add, CalendarToday, Edit, Group, Home, Shop, Today, Settings } from "@mui/icons-material";
import { IconButton, Toolbar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch, FormControlLabel } from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../client/data-context";

export default function ToolbarDash() {
    const navigate = useNavigate();
    const ctx = useContext(DataContext);
    const [openSettings, setOpenSettings] = useState(false);

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
                <IconButton sx={{display:"flex", flexDirection:"column"}}
                 onClick={() => setOpenSettings(true)}>
                    <Settings/>
                    <Typography>הגדרות</Typography>
                </IconButton>
            </Toolbar>

            <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
                <DialogTitle>הגדרות מחירים</DialogTitle>
                <DialogContent>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={ctx.useSpecialPrice || false}
                                onChange={(e) => ctx.setUseSpecialPrice(e.target.checked)}
                            />
                        }
                        label={ctx.useSpecialPrice ? "מחיר מיוחד פעיל" : "מחיר רגיל פעיל"}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        {ctx.useSpecialPrice 
                            ? "כרגע מוצגים מחירים מיוחדים באתר"
                            : "כרגע מוצגים מחירים רגילים באתר"}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSettings(false)}>סגור</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}