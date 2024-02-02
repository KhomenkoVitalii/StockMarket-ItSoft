import React, { useContext, useEffect } from "react";
import Order from "../order/Order";
import { useState } from "react";
import './OrdersList.scss';
import { getAllOrders } from "../../services/orderServices";
import { AppContext } from '../../context/AppContext';

const Orders = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(AppContext)

    const orders = (data && data.length > 0) ? data.map((item, index) => (
        <Order data={item} key={index} />
    )) : (<p>There will be orders</p>)

    useEffect(() => {
        if (state.user?.token) {
            getAllOrders(state.user.token).then((data) => {
                setData(data.body);
            });
        }
    }, [state]);

    return (
        <div className="orders">
            <h1 className="orders_title">Orders</h1>
            {orders}
        </div>
    )
}

export default Orders;