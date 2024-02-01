import { Link } from 'react-router-dom';
import RoutesEnum from '../../routes/RoutesEnum';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StoreIcon from '@mui/icons-material/Store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserMenu = ({ state, onLogoutButtHandler }) => {
    return (
        <>
            <Link className='header_links_market' to={RoutesEnum.PROFILE}>
                {state.user.image ? (<img className='header_links_picture' href={state.user.image} alt="user's avatar" />) : (<AccountCircleIcon className='header_links_picture' />)}
            </Link>
            <span className='header_links_user'>{`${state.user.firstName} ${state.user.lastName}`}</span>
            <Link className='header_links_market' to={RoutesEnum.MARKET}>
                <StoreIcon className='icon' />
            </Link>
            <ExitToAppIcon className='header_links_exit' onClick={onLogoutButtHandler} />
        </>
    )
}


export default UserMenu;