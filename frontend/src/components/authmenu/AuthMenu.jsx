import { Link } from 'react-router-dom';
import RoutesEnum from '../../routes/RoutesEnum';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AuthMenu = () => {

    return (
        <>
            <AccountCircleIcon className='header_links_picture' />
            <div className='header_links_auth'>
                <Link to={RoutesEnum.LOGIN} className='links'>Sign-in</Link>
                <span className='links'>/</span>
                <Link to={RoutesEnum.REGISTER} className='links'>Sign-up</Link>
            </div>
        </>
    )
}

export default AuthMenu;