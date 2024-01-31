const default_path = 'http://127.0.0.1:8000/';

const BackendUrls = Object.freeze({
    LOGIN: default_path + 'auth/login/',
    REGISTER: default_path + 'auth/register/',
    LOGOUT: default_path + 'auth/logout/',
    PLACE_ORDER: default_path + 'api/orders/',
    GET_ORDERS: default_path + 'api/orders/',
    GET_ORDER: default_path + 'api/orders',
    TEST_TOKEN: default_path + 'api/token/'
});

export default BackendUrls;