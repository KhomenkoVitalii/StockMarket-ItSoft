import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import RoutesEnum from "../../routes/RoutesEnum";
import { Link, useNavigate } from 'react-router-dom';
import './LoginComponent.scss';
import { login } from '../../services/authServices'
import { AppContext } from "../../context/AppContext";
import { loginAction } from "../../context/reducer/AppReducer";

const LoginComponent = () => {
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { state, dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    const loginUserInAppContext = (data) => {
        dispatch(loginAction(data));
        // then redirect user
        navigate("/");
    }

    const onConfirmButtHandler = async () => {
        if (!email || !password) {
            setErrorMessage('Fill all necessary fields to continue!');
            return;
        }

        setIsSendingRequest(true);

        const response = await login(email, password);

        if (response.status == 'ok') {
            console.log('User authorized!');
            const userData = {
                ...response.body.user,
                token: response.body.token
            }
            loginUserInAppContext(userData)
        } else {
            setErrorMessage(response.message);
        }

        setIsSendingRequest(false);
    }

    const onFieldChangeHandler = (e, fieldName) => {
        setErrorMessage('');
        if (fieldName === 'email') {
            setEmail(e.target.value);
        } else if (fieldName === 'password') {
            setPassword(e.target.value);
        }
    }

    return (
        <div className="loginWrapper">
            <form className="loginBlock">
                <p className="title">Time to trade!</p>
                <TextField className='input'
                    label="Email"
                    type='email'
                    variant="standard"
                    required
                    value={email}
                    onChange={e => onFieldChangeHandler(e, 'email')} />
                <TextField className='input'
                    label="Password"
                    type='password'
                    variant="standard"
                    required
                    value={password}
                    onChange={e => onFieldChangeHandler(e, 'password')} />
                <Button variant="contained"
                    className='button'
                    type='submit'
                    onClick={onConfirmButtHandler}
                    disabled={isSendingRequest}>Sing in!</Button>
                {errorMessage ? (<span className="errorMessage">{errorMessage}</span>) : (null)}
                <div className="additionalLinks">
                    <span className="forget">Need to <Link to={RoutesEnum.REGISTER}>SIGN UP?</Link></span>
                    <span className="forget"><Link to={RoutesEnum.REGISTER}>Forget password?</Link></span>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;