import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField } from "@mui/material";
import RoutesEnum from "../../routes/RoutesEnum";
import { login, register } from '../../services/authServices';
import { AppContext } from "../../context/AppContext";
import { loginAction } from "../../context/reducer/AppReducer";
import { MuiTelInput } from 'mui-tel-input'
import { isUnder18 } from '../../utils/utils'

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthday: '',
    });
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    const loginUserInAppContext = (data) => {
        dispatch(loginAction(data));
        navigate("/");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isUnder18(formData.birthday)) {
            setErrorMessage('You need to be adult! 18+ only');
            return;
        }

        setIsSendingRequest(true);

        try {
            const response = await register(formData);

            if (response.status === 'ok') {
                console.log('User registered!');
                loginUserInAppContext(formData);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred, please try again later.');
        }

        setIsSendingRequest(false);
    };

    return (
        <div className="loginWrapper">
            <form className="loginBlock" onSubmit={handleSubmit}>
                <p className="title">Time to trade!</p>
                {Object.entries(formData).map(([key, value]) => (
                    key === 'phoneNumber' ? (
                        <MuiTelInput
                            key={key}
                            value={value}
                            onChange={(val) => handleChange({ target: { name: key, value: val } })}
                        />
                    ) : (
                        <TextField
                            key={key}
                            className='input'
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            type={key === 'password' ? 'password' : (key === 'birthday' ? 'date' : 'text')}
                            variant="standard"
                            required
                            name={key}
                            value={value}
                            onChange={handleChange}
                        />
                    )
                ))}
                <Button
                    variant="contained"
                    className='button'
                    type='submit'
                    disabled={isSendingRequest}
                >
                    Sign up!
                </Button>
                {errorMessage && <span className="errorMessage">{errorMessage}</span>}
                <div className="additionalLinks">
                    <span className="forget">Have an account <Link to={RoutesEnum.LOGIN}>SIGN IN?</Link></span>
                    <span className="forget"><Link to={RoutesEnum.REGISTER}>Forget password?</Link></span>
                </div>
            </form>
        </div>
    );
}

export default RegisterComponent;
