import React, { useState } from 'react';
export const DataContext = React.createContext({});
export const SERVERURL="https://localhost:7128"
const DataContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [cartProducts, setCartProducts] = useState([{}])
    const [deliveryPrice, setDeliveryPrice] = useState(0)
    const updateFrom = (fromValue) => {
        const newCart = { ...cart };
        console.log(fromValue);
        newCart.fromDate = fromValue; // Replace 'propertyName' with the actual property name you want to update and 'newValue' with the new value you want to assign
        setCart(newCart);
    }
    const updateTo = (toValue) => {
        const newCart = { ...cart };
        console.log(toValue);
        newCart.toDate = toValue;
        setCart(newCart);
    }
    const logOut = () => {
        setUser(null)
        setCart(null)
        setCartProducts([{}])
    }
    return (
        <DataContext.Provider
            value={{
                user, setUser, logOut, cart, setCart, updateFrom, updateTo, cartProducts, setCartProducts, deliveryPrice, setDeliveryPrice
            }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;