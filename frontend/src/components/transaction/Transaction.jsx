import React from "react";
import { beautyTimeStamp } from "../../utils/utils";
import './Transaction.scss';

const Transaction = ({ data }) => {
    return (
        <div className="transaction">
            <p>{beautyTimeStamp(data.quantity)}</p>
            <p>Quantity: {data.quantity}</p>
            <p>Price: {data.price}</p>
            <p>Total: {data.quantity * data.price}</p>
            <p>Type: {data.transaction_type}</p>
        </div>
    )
}

export default Transaction;