import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Grid, Paper,createTheme } from "@mui/material";
import imageBa from '../pictures/background-admin.png'
function HomeAd() {
  const navigate = useNavigate();
  let navi = (name) => {
    navigate(`/${name}`)
  }
  
  const theme = createTheme({
    palette: {
      customColor: 'rgba(242, 247, 255, 1)',
      blueColor: 'rgba(0, 84, 238, 1)'
    },
  });
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", backgroundColor: theme.palette.customColor }}>
        <Paper sx={{ marginTop: 4, marginBottom: 2, marginRight: 4, marginLeft: 4 }}>
          <Grid style={{ width: 800, marginTop: 10, marginBottom: 50, marginRight: 170, marginLeft: 170 }}>
        <img src={imageBa} />
        </Grid>
        </Paper>
        {/* <h1>פעולות למנהל</h1>
        <ButtonGroup margin="0 px" size="large" variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => navi(`loginforuser`)}>ביצוע הזמנה ללקוח</Button>
          <Button onClick={() => navi(`addProducts`)}>הוספת מוצר</Button>
          <Button onClick={() => navi(`myclients`)}>הלקוחות שלי</Button>
          <Button onClick={() => navi(`allorders/-1`)}>צפייה בהזמנות</Button>
        </ButtonGroup> */}
      </div>
    </>);
}

export default HomeAd;