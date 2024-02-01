import React from "react";
import { beautyTimeStamp } from '../../utils/utils';
import './Order.scss'
const orders = [
    {
        id: '2445',
        user: 'user123',
        instrument: 'AAPL',
        order_type: 'BUY',
        price: 150.50,
        quantity: 10,
        status: 'Active',
        created_at: '2024-01-31T08:00:00Z'
    },
];

const Order = ({ data }) => {
    if (!data) {
        data = orders[0];
    }

    return (
        <div className="order">
            <h2 className="order title">Order №{data.id}</h2>
            <div className="orderWrapper">
                <p className="orderType">{data.order_type}</p>
                <div className="orderDetailWrapper">
                    <p className="data">Stock: {data.stock}</p>
                    <p className="data">Price: {data.price}</p>
                    <p className="data">Quantity: {data.quantity}</p>
                </div>
            </div>
            <div className="orderAdditionalData">
                <p className="bottom-data">{data.status}</p>
                <p className="bottom-data">{beautyTimeStamp(data.created_at)}</p>
            </div>
        </div>
    );
};

export default Order;
