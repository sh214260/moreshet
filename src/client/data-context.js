import axios from 'axios';
import React, { useEffect, useState } from 'react';
export const DataContext = React.createContext({});
export const SERVERURL = "https://localhost:7128"

const DataContextProvider = (props) => {
    const [role, setRole] = useState("client")
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [cartProducts, setCartProducts] = useState([{}])
    const [token, setToken] = useState('')
    const [deliveryPrice, setDeliveryPrice] = useState(0)
    const [paymentWay, setPaymentWay] = useState('מזומן')
    const updateDateOrder = (fromValue, toValue) => {
        console.log(fromValue);
        console.log(toValue);
        const newCart = { ...cart };
        newCart.fromDate = fromValue; // Replace 'propertyName' with the actual property name you want to update and 'newValue' with the new value you want to assign
        newCart.toDate = toValue;
        setCart(newCart);
    }

    const logOut = () => {
        setToken('')
        setUser(null)
        setCart(null)
        updateDateOrder("0001-01-01T00:00:00", "0001-01-01T00:00:00")
        setCartProducts([{}])
        setDeliveryPrice(0)
    }
    function addOrder() {
        axios.get(`${SERVERURL}/api/Cart/getcartbyuser/${user.id}`)
            .then(ans => {
                console.log(ans.data);
                setCart(ans.data)
            })
    }
    const saveToken = (newToken) => {
        setToken(newToken)
        localStorage.setItem('token', newToken);
    }

    useEffect(() => {
    }, [])
    return (
        <DataContext.Provider
            value={{
                user, setUser, logOut, cart, setCart, updateDateOrder, cartProducts, setCartProducts
                , deliveryPrice, setDeliveryPrice
                , addOrder, token, saveToken, paymentWay, setPaymentWay,role, setRole
            }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;