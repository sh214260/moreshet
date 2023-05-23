import React, {useState} from 'react';
export const DataContext = React.createContext({});

const DataContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);

    // const addUser = (userToAdd) =>{
    //     const tmp = [...user, userToAdd];
    //     console.log(user);
    //     setItems(tmp);
    // }
    // const removeUser=(userToRemove)=>{
    //     let after=[...user]
    //     after.splice(after.indexOf(userToRemove),1)
    //     setItems(after);
    // }
    const addItem = (item) =>{
        const tmp = [...items, item];
        console.log(tmp);
        setItems(tmp);
    }
    const removeItem=(itemToRemove)=>{
        let after=[...items]
        after.splice(after.indexOf(itemToRemove),1)
        setItems(after);
    }
    return (
        <DataContext.Provider value={{user, items, setUser,setItems, addItem,removeItem}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;