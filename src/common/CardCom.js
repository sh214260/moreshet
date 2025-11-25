import React, { useState } from "react";
import axios from "axios";
import { SERVERURL } from "../client/data-context";
const CardComPayment = () => {
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [error, setError] = useState(null);
    const [lowProfileId, setLowProfileId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [errorCheck, setErrorCheck] = useState(null);

    const createPayment = async () => {
        const paymentData = 
            {
                returnValue: "string",
                amount: 10,
                successRedirectUrl: "https://www.hidabroot.org/",
                failedRedirectUrl: "https://kcm.fm/Programs/3",
                webHookUrl: "string"
              }
        ;

        try {
            const response = await axios.post(`${SERVERURL}/api/Payment/Create`, paymentData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            
            const dataJson=JSON.parse(response.data.paymentUrl)
            console.log(dataJson.Url)
            setPaymentUrl(dataJson.Url);
        } catch (err) {
            setError(err.message);
        }
    };
    
    const checkStatus = async () => {
        try {
            const response = await axios.post(`${SERVERURL}/api/Payment/GetPaymentStatus`, {
                LowProfileId: lowProfileId
            });

            console.log("Payment Status Response:", response.data);
            setPaymentStatus(response.data);

        } catch (err) {
            setErrorCheck("שגיאה בבדיקת סטטוס התשלום");
            console.errorCheck("Error:", err);
        }
    };
    return (
        <div>
            <h1>תשלום עם CardCom</h1>
            <button onClick={createPayment}>צור תשלום</button>
            {error && <p>שגיאה: {error}</p>}
            {paymentUrl && (
                <div>
                    <p>לחץ כאן לביצוע התשלום:</p>
                    <a href={paymentUrl} target="_blank" rel="noopener noreferrer">לתשלום</a>
                </div>
            )}
        </div>
    );
};

export default CardComPayment;
