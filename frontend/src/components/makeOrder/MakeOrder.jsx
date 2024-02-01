import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import './MakeOrder.scss';

const MakeOrder = () => {
    const [searchParams] = useSearchParams();
    const [isBuyOrderType, setIsBuyOrderType] = useState(true);
    const [formData, setFormData] = useState({
        stock: '',
        orderType: 'Buy',
        price: '',
        quantity: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (searchParams.has('symbol')) {
            setFormData({ ...formData, stock: searchParams.get('symbol') });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage('');
    };

    const onChangeOrderTypeButtonHandler = () => {
        if (isBuyOrderType) {
            setIsBuyOrderType(false);
            setFormData({ ...formData, orderType: 'Sell' });
        } else {
            setIsBuyOrderType(true);
            setFormData({ ...formData, orderType: 'Buy' });
        }
    }

    const onConfirmButtHandler = (e) => {
        e.preventDefault();
        // TODO: Implement!
    }

    return (
        <div className="makeOrderWrapper">
            <form className="makeOrderBlock">
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
            </form>
        </div>
    )
}

export default MakeOrder;