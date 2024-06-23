import axios from 'axios';
import React, { useEffect, useState } from 'react';
export const DataContext = React.createContext({});
export const SERVERURL = "https://localhost:7128"

const DataContextProvider = (props) => {
    const [role, setRole] = useState("client")
    const [admin, setAdmin] = useState(null);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [cartProducts, setCartProducts] = useState([{}])
    const [token, setToken] = useState('')
    const [deliveryPrice, setDeliveryPrice] = useState(0)
    const [additionHours, setAdditionHour] = useState(0);
    const [paymentWay, setPaymentWay] = useState('מזומן');
    const [notesForOrder, setNotesForOrder] = useState('');
    const updateDateOrder = (fromValue, toValue) => {
        console.log(fromValue);
        console.log(toValue);
        const newCart = { ...cart };
        newCart.fromDate = fromValue;
        newCart.toDate = toValue;
        setCart(newCart);
    }

    const logOut = () => {
        setRole("client")
        setToken('')
        setAdmin(null);
        setUser(null)
        setCart(null)
        updateDateOrder("0001-01-01T00:00:00", "0001-01-01T00:00:00")
        setCartProducts([{}])
        setDeliveryPrice(0)
        localStorage.setItem('data', JSON.stringify({ admin: null, user: null, cart: null, cartProduct: null }))
        localStorage.setItem('token', '')
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
    const saveCache = (data) => {
        if (data.user.type == 1) {
            localStorage.setItem('data', JSON.stringify({ admin: data.user, user: null, cart: null, cartProduct: null }))
        }
        else {
            localStorage.setItem('data', JSON.stringify({ admin: null, user: data.user, cart: data.cart, cartProduct: data.cartProducts }))
        }
    }
    const loadCache = () => {
        const json = localStorage.getItem('data');
        if (json) {
            const data = JSON.parse(json);
            setAdmin(data.admin)
            setUser(data.user)
            setCart(data.cart)
            setCartProducts(data.cartProducts)
            if (data.admin != null) {
                setRole("secretary")
            }
        }
    }
    useEffect(() => {
        loadCache()
    }, [])
    return (
        <DataContext.Provider
            value={{
                user, setUser, logOut, cart, setCart, updateDateOrder, cartProducts, setCartProducts
                , deliveryPrice, setDeliveryPrice
                , addOrder, token, saveToken, paymentWay, setPaymentWay, role, setRole,
                additionHours, setAdditionHour, notesForOrder, setNotesForOrder, saveCache
                , admin, setAdmin
            }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;