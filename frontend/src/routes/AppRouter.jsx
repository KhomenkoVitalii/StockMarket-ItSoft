import App from '../App';
import RoutesEnum from './RoutesEnum';
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import LoginComponent from '../components/login/LoginComponent';
import RegisterComponent from '../components/register/RegisterComponent';
import MarketPage from '../pages/market/MarketPage';

const AppRouter = createBrowserRouter([
    {
        path: RoutesEnum.HOME,
        element: <App />,
        children: [{
            element: <HomePage />,
            index: true
        },
        {
            path: RoutesEnum.LOGIN,
            element: <LoginComponent />
        },
        {
            path: RoutesEnum.REGISTER,
            element: <RegisterComponent />
        },
        {
            path: RoutesEnum.MARKET,
            element: <MarketPage />
        },
        ],
    }
]);

export default AppRouter;