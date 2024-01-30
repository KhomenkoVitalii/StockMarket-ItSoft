import { defaultUserData } from '../AppContext';

// ACTIONS
const LOGIN_ACTION = "LOGIN";
const LOGOUT_ACTION = "LOGOUT";
const INIT_ACTION = "INIT";

/**
 * Represents a user login. It sets the user data in local storage and returns an action 
 * with the type "LOGIN" and the user data as payload.
 * @param {List<UserData>} userData 
 * @returns {List<type, payload>}
 */
export const loginAction = (userData) => {
    userData.is_login = true;
    localStorage.setItem("user", JSON.stringify(userData));
    return { type: LOGIN_ACTION, payload: userData };
}

/**
 * Represents a user logout. It removes the user data from local storage and returns an action
 * with the type "LOGOUT".
 * @returns {List<type>}
 */
export const logoutAction = () => {
    localStorage.removeItem("user");

    return { type: LOGOUT_ACTION };
}

/**
 * Represents the initialization of application data. It returns an action
 * with the type "INIT" and the initialized application data as payload.
 * @param {List<UserData>} userData 
 * @returns {List<type, payload>}
 */
export const initAction = (initAppData) => {
    return { type: INIT_ACTION, payload: initAppData };
};


/**
 * The reducer function that takes the current state and an action as parameters.
 * It then switches on the action type and returns a new state based on the action type and payload.
 * @param {*} state 
 * @param {*} action 
 * @returns { List<state, payload?> } a new state based on the action type and payload.
 */
export const appActionsReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_ACTION:
            return { user: action.payload };

        case LOGOUT_ACTION:
            return { defaultUserData };

        case INIT_ACTION:
            return { user: action.payload }

        default:
            return state;
    }
}
