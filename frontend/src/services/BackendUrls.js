const default_path = 'http://0.0.0.0:8000/';

const BackendUrls = Object.freeze({
    LOGIN: default_path + 'auth/login/',
    REGISTER: default_path + 'auth/register/',
    LOGOUT: default_path + 'auth/logout/',
    PLACE_ORDER: default_path + 'api/orders/',
    ORDERS: default_path + 'api/orders/',
    STOCKS: default_path + 'api/stocks/',
    TRANSACTIONS: default_path + 'api/transactions/',
    TEST_TOKEN: default_path + 'api/token/',
});

export default BackendUrls;