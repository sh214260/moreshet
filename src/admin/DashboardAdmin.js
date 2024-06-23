import { AppBar, Avatar, Box, Grid, IconButton, Link, Typography, createTheme } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { DataContext, SERVERURL } from '../client/data-context';
import { ChatBubble, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export default function DashboardAdmin() {
    const navigate = useNavigate()
    const ctx = useContext(DataContext)
    const theme = createTheme({
        palette: {
            customColor: 'rgba(242, 247, 255, 1)',
            gray: 'rgba(142, 147, 155, 1)'
        }
    })
    return (
        <Grid container>
            <AppBar position="static" style={{
                display: "flex", flexDirection: "row",
                backgroundColor: "white", alignItems: "center", justifyContent: "space-between", boxShadow: "none"
            }} >
                <Link href="./" sx={{ marginRight: 1 }}>
                    <img alt='logo' src={`${SERVERURL}/Static/logo.png`} width={100} style={{ paddingTop: 2 }} />
                </Link>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <IconButton>
                        <ChatBubble fontSize="large" color={theme.palette.gray} />
                    </IconButton>
                    <IconButton onClick={() => { navigate(`/`); ctx.logOut() }}>
                        <Logout />
                    </IconButton>
                    <Avatar alt="hi" sx={{ marginRight: 2 }} />
                    <Box display="flex" flexDirection="column" paddingRight={1} sx={{ marginLeft: 4 }}>
                        <Typography style={{ color: "black" }}>{ctx.admin != null && ctx.admin.name}</Typography>
                        <Typography style={{ color: "gray" }}>{ctx.admin != null && ctx.admin.email}</Typography>
                    </Box>
                </div>
            </AppBar>
        </Grid>);
}