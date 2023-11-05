import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function Product() {
  const params = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [fromDate, setFromDate] = useState(dayjs('2023-10-17T15:30'));
  const [toDate, setToDate] = useState(dayjs('2022-04-17T15:30'));
  useEffect(() => {
    console.log(params)
    axios.get(`https://localhost:7128/api/Product/getbyid/${params.id}`)
      .then(res => {
        console.log(res.data)
        setItem(res.data)
      })
  }, [])

  function check() {
    axios.get(`https://localhost:7128/api/CartContoller/productisavialible`, { params: { Type: item.type, from: fromDate.format("YYYY-MM-DDTHH:mm"), to: toDate.format("YYYY-MM-DDTHH:mm") } })
      .then(res => {
        console.log(res.data); 
        return res.data
      })
  }
  const add = () => {
    if (check) {
      axios.put(`https://localhost:7128/api/CartContoller/${params.id}`, { Id: 2, Name: "", Email: "", Password: "", Address: "", PhoneNumber1: "", PhoneNumber2: "", Type: 1 })
        .then(res => {
          console.log(res.data)
          navigate(`/cart/${res.data.id}`)
        })
    }
    else{
      return false;
    }
  }

  return (
    <>
      {item != null ?
        <>
          <h1 id="nameP">{item.name}</h1>
          <div id="content">
            <div id="imgDetails">{
              item.id === 1 ? <>
              </> : <></>}<p>מחיר:
                <span> {item.price} ₪ </span></p>
              <p>{item.type}</p>
              <label for="date">בתאריך:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker label={"from date"} value={fromDate} onChange={(ev) => setFromDate(ev)} />
                <DateTimePicker label={"to date"} value={toDate} onChange={(ev) => setToDate(ev)} />
              </LocalizationProvider>
              <br></br>
              <input type="submit" value="הוסף להזמנה" onClick={add}></input>
            </div>
          </div>
        </>
        : <div>Loading... please wait</div>
      }
    </>
  )
}
export default Product;