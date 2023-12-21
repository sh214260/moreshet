import React from "react";
import Hour from "./Hour";

const orders = [
    {
      "id": 3013,
      "userId": 1,
      "deliveryPrice": 0,
      "dateOrder": "2023-11-29T16:05:59.952",
      "fromDate": "2023-11-30T09:00:00",
      "toDate": "2023-11-30T12:00:00",
      "paidUp": false,
      "receipt": false,
      "totalPrice": 205,
      "cartId": 1018
    },
    {
      "id": 3014,
      "userId": 1,
      "deliveryPrice": 0,
      "dateOrder": "2023-11-29T19:34:56.977",
      "fromDate": "2023-11-30T10:00:00",
      "toDate": "2023-11-30T13:00:00",
      "paidUp": true,
      "receipt": true,
      "totalPrice": 205,
      "cartId": 1019
    },
    {
      "id": 3015,
      "userId": 1,
      "deliveryPrice": 0,
      "dateOrder": "2023-11-30T18:45:02.193",
      "fromDate": "2023-01-01T00:00:00",
      "toDate": "2023-01-01T00:00:00",
      "paidUp": true,
      "receipt": true,
      "totalPrice": 185,
      "cartId": 1020
    },
    {
      "id": 3016,
      "userId": 1,
      "deliveryPrice": 35,
      "dateOrder": "2023-12-07T23:25:00.29",
      "fromDate": "2023-12-02T00:00:00",
      "toDate": "2023-12-02T04:00:00",
      "paidUp": true,
      "receipt": true,
      "totalPrice": 430,
      "cartId": 1023
    }
  ];

export default function Day(){

    const hours=[
        {hour:8, vacant:true},
        {hour:9, vacant:true},
        {hour:10, vacant:true},
        {hour:11, vacant:true},
        {hour:12, vacant:true},
        {hour:13, vacant:true},
    ]
    const checkIsVacant = (hour) =>{
        hour.count = 0;
          for(const order of orders){
            const from = new Date(order.fromDate);  // 08:00
            const to = new Date(order.toDate);      // 10:00
            if(from.getHours() <= hour.hour && to.getHours() > hour.hour){
                hour.vacant = false
                hour.count++;
            }
          }
          return hour
    }
    for(const order of orders)console.log(order);
    return(
        <div>
            {hours.map(hour=>{
                return(
               <Hour key={hour.hour} row={checkIsVacant(hour)}/>
            )})}
        </div>
    )
}