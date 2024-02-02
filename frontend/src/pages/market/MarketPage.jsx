import React, { useContext, useEffect, useState } from "react";
import Orders from "../../components/orders/OrdersList";
import StockList from "../../components/stocks/StocksList";
import { AppContext } from '../../context/AppContext';
import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../routes/RoutesEnum";
import './MarketPage.scss';

const MarketPage = () => {
    const { state } = useContext(AppContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.user?.is_login) {
            navigate(RoutesEnum.LOGIN);
        }
    }, [state.user?.is_login]);

    return (
        <main className="main">
            <h1 className="mainHeaderText">Stock market</h1>
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
