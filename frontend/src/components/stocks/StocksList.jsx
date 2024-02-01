import React, { useContext, useEffect, useState } from "react";
import Stock from "../stock/Stock";
import './StockList.scss';
import { getAllStocks } from '../../services/stocksServices';
import { AppContext } from "../../context/AppContext";

const StockList = () => {
    const [data, setData] = useState(null);
    const { state, dispatch } = useContext(AppContext)

    useEffect(() => {
        if (state.user?.token) {
            getAllStocks(state.user.token).then((data) => {
                setData(data.body);
            });
        }
    }, [state]);

    return (
        <div className="stocks">
            <h1 className="stocks title">Stocks</h1>
            {(data && data.length > 0) ? data.map((item, index) => (
                <Stock data={item} key={index} />
            )) : (<p>There will be stocks</p>)}
        </div>
    )
}

export default StockList;