import React, { useEffect } from "react";
import Order from "../order/Order";
import { useState } from "react";
import './OrdersList.scss';

const orders = [
    {
        id: '2445',
        user: 'user123',
        stock: 'AAPL',
        order_type: 'BUY',
        price: 150.50,
        quantity: 10,
        status: 'Active',
        created_at: '2024-01-31T08:00:00Z'
    },
    {
        id: '2446',
        user: 'user123',
        stock: 'AAPL',
        order_type: 'SELL',
        price: 130.50,
        quantity: 45,
        status: 'Executed',
        created_at: '2024-01-31T08:00:00Z'
    },
    {
        id: '2445',
        user: 'user123',
        stock: 'AAPL',
        order_type: 'BUY',
        price: 150.50,
        quantity: 10,
        status: 'Active',
        created_at: '2024-01-31T08:00:00Z'
    },
    {
        id: '2446',
        user: 'user123',
        stock: 'AAPL',
        order_type: 'SELL',
        price: 130.50,
        quantity: 45,
        status: 'Executed',
        created_at: '2024-01-31T08:00:00Z'
    },
    {
        id: '2445',
        user: 'user123',
        stock: 'AAPL',
        order_type: 'BUY',
        price: 150.50,
        quantity: 10,
        status: 'Active',
        created_at: '2024-01-31T08:00:00Z'
    },
    {
        id: '2446',
        user: 'user123',
        stock: 'AAPL',
        order_type: 'SELL',
        price: 130.50,
        quantity: 45,
        status: 'Executed',
        created_at: '2024-01-31T08:00:00Z'
    },
];

const Orders = () => {
    const [data, setData] = useState(orders);

    useEffect(() => {
        //TODO: load data
    }, [])

    return (
        <div className="orders">
            <h1 className="orders title">Recent orders</h1>
            {(data && data.length > 0) ? data.map((item, index) => (
                <Order data={item} key={index} />
            )) : (<p>There will be orders</p>)}
        </div>
    )
}

export default Orders;