import React, { useContext, useEffect, useState } from "react";
import { createOrder, getAllOrders } from "../../services/orderServices";
import Order from "../../components/order/Order";
import Orders from "../../components/orders/OrdersList";
import Stock from "../../components/stock/Stock";
import StockList from "../../components/stocks/StocksList";
import { AppContext } from '../../context/AppContext';
import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../routes/RoutesEnum";
import './MarketPage.scss';

const MarketPage = () => {
    const [data, setData] = useState('')
    const { state, dispatch } = useContext(AppContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (state.user?.is_login === false) {
            navigate(RoutesEnum.LOGIN);
        }
    }, [state]);

    return (
        <main className="main">
            <h1 className="mainHeaderText">Market Orders</h1>
            <div className="marketDataBlock">
                <span className="dataWrapper">
                    <StockList />
                </span>
                <span className="dataWrapper">
                    <Orders />
                </span>
            </div>
        </main>
    );
};

export default MarketPage;
