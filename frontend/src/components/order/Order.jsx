import React from "react";
import { beautyTimeStamp } from '../../utils/utils';
import './Order.scss'

const Order = ({ data }) => {
    return (
        <div className="order">
            <h2 className="order_title">Order №{data.id}</h2>
            <div className="order_details">
                <p className="order_details_type">{data.order_type}</p>
                <div className="order_details_data">
                    <p className="data">Stock: {data.stock}</p>
                    <p className="data">Price: {data.price}</p>
                    <p className="data">Quantity: {data.quantity}</p>
                </div>
            </div>
            <div className="order_extras">
                <p className="order_extras_data">{data.status}</p>
                <p className="order_extras_data">{beautyTimeStamp(data.created_at)}</p>
            </div>
        </div>
    );
};

export default Order;
