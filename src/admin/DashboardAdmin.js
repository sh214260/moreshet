import { AppBar, Avatar, Box, Grid, IconButton, Link, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { DataContext, SERVERURL } from '../client/data-context'
import { Add, ChatBubble } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export default function DashboardAdmin() {
    const navigate = useNavigate()
    return (
        <Grid  container>
            <AppBar position="static" style={{ display: "flex", flexDirection: "row" }} >
                <Link href="./">
                    <img alt='logo' src={`${SERVERURL}/Static/logo.png`} width={80} style={{ paddingTop: 2 }} />
                </Link>
                <Avatar alt="hi" style={{ paddingRight: 2 }} />
                <Box display="flex" flexDirection="column" paddingRight={1}>
                    <Typography style={{ color: "black" }}>שם</Typography>
                    <Typography style={{ color: "gray" }}>@gmail.com</Typography>
                </Box>
                <IconButton>
                    <ChatBubble fontSize="large" />
                </IconButton>
            </AppBar>
            <Toolbar style={{ display: "flex", flexDirection: "column", backgroundColor: "white" }}>
                <IconButton onClick={() => navigate('addProducts')}>
                    <Add />
                </IconButton>
                <IconButton onClick={() => navigate('addProducts')}>
                    <Add />
                </IconButton>
            </Toolbar>
        </Grid>);
}