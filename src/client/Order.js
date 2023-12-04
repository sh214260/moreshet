import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "./data-context";
// import { useNavigate } from "react-router-dom";
import './styles/orderStyle.css'

function Order() {
  const context = useContext(DataContext)
  const [address, setAdress] = useState('')
  const [delivery, setDelivery] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  function calculateDelivery(){
    
  }

  const calculatePrice=()=>{
    let totalPrice = context.items.reduce((sum, item) => sum += item.price, 0);
    console.log(context.items.length)
    console.log(totalPrice)
    setTotalPrice(totalPrice);
  }
  useEffect(() => {
   calculatePrice()
  }, [context.items])
  useEffect(() => {
   calculatePrice()
  }, [])

  const confirmOrder = (event) => {
    event.preventDefault();
    if (address.length === 0) {
      alert("נא להוסיף כתובת")
      return;
    }
    if (context.user === null) {
      alert("please login to continue")
      return;
    }
    let items = context.items

    let details = items.map(it => ({ product_id: it.item.id, productDate: it.date }))
    let order = {
      user_id: context.user.id,
      address, totalPrice, delivery,
      details
    }
    let option = {
      method: 'POST', headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(order)
    }
    fetch('http://localhost:3500/orders/addorder', option)
      .then(response => response.json()).then(ans => console.log(ans))
    {
      alert("ההזמנה בוצעה בהצלחה!")
    }

  }

  return (
    <>
      <h1>ההזמנות שלי</h1>
      <div id="all">
        <div id="table">
          <table>
            <thead>
              <tr>
                <th>תמונה</th>
                <th>שם</th>
                <th>מחיר</th>
                <th>תאריך</th>
                <th>הסר</th>
                {/* <th>ערוך</th> */}
              </tr>
            </thead>
            <tbody>
              {
                context.items.length > 0 ? context.items.map(item => {
                  console.log(item.item);
                  return (<>
                    <tr key={item.item.id}>
                      <td className="td"><img style={{ width: '8vw' }} src={`http://localhost:3500/image/${item.item.image}`} alt={item.item.productsName} /></td>
                      <td className="td">{item.item.productsName}</td>
                      <td className="td">{item.price}₪</td>
                      <td className="td">{item.date}</td>
                      <td className="td">
                        <input type="button" value="❌" id="remove" onClick={() => {
                          context.removeItem(item)
                          //calculatePrice()
                        }}>
                        </input></td>
                      {/* <td className="td">🔧</td>  */}
                    </tr>
                  </>)
                }) : <tr><span id="empty">לא נוספו מוצרים</span> </tr>
              }
            </tbody>
          </table>
        </div>
        <form id="confirm" action="" onSubmit={confirmOrder}>

          <input type="radio" id="delivery1" name="delivery" onChange={(ev) => { setDelivery(true); setTotalPrice(totalPrice + 25) }}></input>
          <label htmlFor="delivery1">משלוח</label>




          {/* <input type="radio" id="Pickup" name="delivery" onChange={(ev) => { setDelivery(false); { totalPrice !== 0 ? setTotalPrice(totalPrice - 25) : <></> } }}></input> */}
          <label htmlFor="Pickup">איסוף עצמי</label>

          <br></br>
          {
            delivery == true ?
              <>
                <label for="adress">כתובת</label>
                <input value={address} name="adress" id="adress" type="text" onChange={(ev) => setAdress(ev.target.value)}></input>
                <br></br><span id="addDelivery"> תוספת במחיר עבור משלוח: ₪25</span>
              </>
              : <></>}

          <br></br>  <p className="agree">סה"כ לתשלום:  {totalPrice} ₪</p><br></br>
          <input className="agree" type="submit" value="אישור הזמנה"></input>
        </form>
      </div>
    </>
  )
}
export default Order