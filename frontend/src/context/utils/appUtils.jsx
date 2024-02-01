import { useEffect } from 'react';
import { loginAction, logoutAction, initAction } from '../reducer/AppReducer';

export const useAuthEffect = (dispatch) => {
    useEffect(() => {
        const userData = localStorage.getItem('user');

        if (userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                dispatch(loginAction(parsedUserData));
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        } else {
            console.log('User data not found in localStorage.');
        }
    }, []);
};

export const useLogout = (dispatch) => {
    dispatch(logoutAction());
}