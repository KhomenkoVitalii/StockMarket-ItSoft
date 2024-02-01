import React, { useEffect, useState } from "react";
import Stock from "../stock/Stock";
import './StockList.scss';

// Sample data for Stock
const stocks = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        exchange: 'NASDAQ',
        market_cap: 200000000000,
        industry: { name: 'Technology', description: 'Information technology sector' }
    },
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        exchange: 'NASDAQ',
        market_cap: 200000000000,
        industry: { name: 'Technology', description: 'Information technology sector' }
    },
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        exchange: 'NASDAQ',
        market_cap: 200000000000,
        industry: { name: 'Technology', description: 'Information technology sector' }
    },
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        exchange: 'NASDAQ',
        market_cap: 200000000000,
        industry: { name: 'Technology', description: 'Information technology sector' }
    },
];

const StockList = () => {
    const [data, setData] = useState(stocks);

    useEffect(() => {
        //TODO: load data
    }, [])

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