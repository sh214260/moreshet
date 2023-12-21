import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function HomeAd() {
  const navigate = useNavigate();
  let navi = (name) => {
    navigate(`/${name}`)

  }
  return (
    <>
      <div id="home">
        <h1>פעולות למנהל</h1>
        <ButtonGroup margin="0 px" size="large" variant="contained" aria-label="outlined primary button group">
          <Button    onClick={() => navi(`addProducts`)}>הוספת מוצר</Button>
          <Button  onClick={() => navi(`myclients`)}>הלקוחות שלי</Button>
          <Button onClick={() => navi(`allorders/-1`)}>צפייה בהזמנות</Button>
        </ButtonGroup>
      </div>
    </>);
}

export default HomeAd;