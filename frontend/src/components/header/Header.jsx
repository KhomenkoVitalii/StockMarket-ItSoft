import React, { useContext } from 'react'
import './Header.scss'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import RoutesEnum from '../../routes/RoutesEnum';
import { AppContext } from '../../context/AppContext';
import { logoutAction } from '../../context/reducer/AppReducer';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StoreIcon from '@mui/icons-material/Store';

const Header = () => {
    const { state, dispatch } = useContext(AppContext);

    const onLogoutButtHandler = () => {
        dispatch(logoutAction());
    }

    return (
        <header className='header'>
            <div className='logoWrapper'>
                <a href="/">
                    <LocalFireDepartmentIcon className='logoIcon' />
                </a>
                <p className='logoText'>StockMarket</p>
            </div>
            <div className='links'>

            </div>
            <div className='userWrapper'>
                {state?.user?.is_login ? (
                    <>
                        {state.user.image ? (<img href={state.user.image} alt="user's avatar" />) : (<AccountCircleIcon className='profileIcon' />)}
                        <span className='profileName'>{`${state.user.firstName} ${state.user.lastName}`}</span>
                        <Link className='marketWrapper' to={RoutesEnum.MARKET}><StoreIcon className='icon' /></Link>
                        <ExitToAppIcon className='exitIcon' onClick={onLogoutButtHandler} />
                    </>
                ) : (
                    <>
                        <AccountCircleIcon className='profileIcon' />
                        <div className='linksWrapper'>
                            <Link to={RoutesEnum.LOGIN} className='links'>Sign-in</Link>
                            <span className='links'>/</span>
                            <Link to={RoutesEnum.REGISTER} className='links'>Sign-up</Link>
                        </div>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header;