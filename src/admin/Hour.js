import React from "react";
export default function Hour(props) {
    const row = props.row
    return (<div style={{ backgroundColor: "#66ff66", display: 'flex' }}>
        {row.hour < 10 ? "0" + row.hour + ":00" : `${row.hour}:00`}
        {
            getRange(row.count).map(item => <OrderBlock key={item} />)
        }
    </div>)
}

const OrderBlock = () => {
    return (
        <div style={{ backgroundColor: "#ff3300", margin: '0 0.5rem', width: '2rem', color: '#ff3300' }}>_</div>
    )
}

const getRange = (count) => {
    const arr = [];
    for (let i = 0; i < count; i++)arr.push(i);
    return arr;
}