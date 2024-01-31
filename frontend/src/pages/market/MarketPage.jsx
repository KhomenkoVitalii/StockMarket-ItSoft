import React, { useEffect, useState } from "react";
import { createOrder, getAllOrders } from "../../services/orderServices";

const MarketPage = () => {
    const handle1 = async () => {
        console.log(await getAllOrders());
    }

    useEffect(() => {
        handle1();
    }, [])

    return (
        <div>
            <h1>Market Orders</h1>

        </div>
    );
};

export default MarketPage;
