import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import './MakeOrder.scss';
import { createOrder } from "../../services/orderServices";
import { AppContext } from "../../context/AppContext";

const defaultFormData = {
    stock: '',
    orderType: 'BUY',
    price: '',
    quantity: ''
}
const MakeOrder = () => {
    const [searchParams] = useSearchParams();
    const [isBuyOrderType, setIsBuyOrderType] = useState(true);
    const [formData, setFormData] = useState(defaultFormData);
    const [infoMessage, setInfoMessage] = useState('');
    const { state } = useContext(AppContext);

    useEffect(() => {
        if (searchParams.has('symbol')) {
            setFormData({ ...formData, stock: searchParams.get('symbol') });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setInfoMessage('');
    };

    const onChangeOrderTypeButtonHandler = () => {
        if (isBuyOrderType) {
            setIsBuyOrderType(false);
            setFormData({ ...formData, orderType: 'SELL' });
        } else {
            setIsBuyOrderType(true);
            setFormData({ ...formData, orderType: 'BUY' });
        }
        setInfoMessage('');
    }

    const onConfirmButtHandler = (e) => {
        e.preventDefault();
        if (formData.price && formData.quantity && formData.stock) {
            createOrder(formData, state.user.token).then((data) => {
                console.log(data);
                if (data.status == 'ok') {
                    setInfoMessage('Order placed!');
                } else {
                    setInfoMessage('Failed place order! ' + data.message);
                }
            });
            setFormData(defaultFormData);
        } else {
            setInfoMessage('Please, fill all necessary data!');
        }
    }

    return (
        <div className="makeOrderWrapper">
            <form className="makeOrderBlock">
                <h1 className="title">Make order!</h1>
                <TextField className='input'
                    label="Stock symbol"
                    variant="standard"
                    required
                    name={'stock'}
                    value={formData.stock}
                    onChange={handleChange} />
                <Button variant="contained"
                    className='button'
                    onClick={onChangeOrderTypeButtonHandler}
                >{formData.orderType}</Button>
                <TextField className='input'
                    label="Price"
                    type="number"
                    variant="standard"
                    required
                    name={'price'}
                    value={formData.price}
                    onChange={handleChange} />
                <TextField className='input'
                    label="Quantity"
                    type='number'
                    variant="standard"
                    required
                    name={'quantity'}
                    value={formData.quantity}
                    onChange={handleChange} />
                <Button variant="contained"
                    className='button'
                    type='submit'
                    onClick={onConfirmButtHandler}
                >Make order!</Button>
                <span className="additionalInformation">{infoMessage}</span>
            </form>
        </div>
    )
}

export default MakeOrder;