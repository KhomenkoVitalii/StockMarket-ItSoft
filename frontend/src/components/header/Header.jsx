import React, { useContext } from 'react'
import './Header.scss'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { AppContext } from '../../context/AppContext';
import { logoutAction } from '../../context/reducer/AppReducer';
import UserMenu from '../usermenu/UserMenu';
import AuthMenu from '../authmenu/AuthMenu';

const Header = () => {
    const { state, dispatch } = useContext(AppContext);

    const onLogoutButtHandler = () => {
        dispatch(logoutAction());
    }

    return (
        <header className='header'>
            <div className='header_logo'>
                <a href="/">
                    <LocalFireDepartmentIcon className='header_logo_icon' />
                </a>
                <p className='header_logo_text'>StockMarket</p>
            </div>
            <div className='header_links'>
                {state?.user?.is_login ?
                    <UserMenu state={state} onLogoutButtHandler={onLogoutButtHandler} />
                    :
                    <AuthMenu />
                }
            </div>
        </header>
    )
}

export default Header;