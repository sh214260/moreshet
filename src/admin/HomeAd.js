import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, IconButton, Paper, Typography, createTheme } from "@mui/material";
import { AccessTime, DescriptionOutlined } from "@mui/icons-material";
import AllOrders from "./AllOrders";
const HomeAd = () => {
  const theme = createTheme({
    palette: {
      customColor: 'rgba(242, 247, 255, 1)',
      blueColor: 'rgba(0, 84, 238, 1)',
      purple: 'rgba(117, 37, 222, 1)',
      gray: 'rgba(32, 34, 36, 0.54)',
      lightPurple: 'RGBA(116, 36, 222, 38)',
      pink: 'rgba(255, 128, 212, 1)'
    },
  });
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", backgroundColor: theme.palette.customColor }}>
        <Paper sx={{ marginTop: 4, marginBottom: 2, marginRight: 4, marginLeft: 4 }}>
          <Grid display="flex" flexDirection="row" style={{ width: 750, marginTop: 10, marginBottom: 50, marginRight: 170, marginLeft: 170 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <div>
                <Typography variant="h5" sx={{ color: theme.palette.gray }}>
                  הזמנות החודש
                </Typography>
                <Typography variant="h4" >
                  0
                </Typography>
              </div>
              <div>
                <IconButton >
                  <DescriptionOutlined sx={{ color: theme.palette.purple }} />
                </IconButton>
              </div>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", marginRight: 5 }}>
              <div>
                <Typography variant="h5" sx={{ color: theme.palette.gray }}>
                  שעות עבודה
                </Typography>
                <Typography variant="h4" >
                  0
                </Typography>
              </div>
              <div>
                <IconButton >
                  <AccessTime sx={{ color: theme.palette.pink }} />
                </IconButton>
              </div>
            </Box>
          </Grid>
          <AllOrders />
        </Paper>
      </div>
    </>);
}

export default HomeAd;