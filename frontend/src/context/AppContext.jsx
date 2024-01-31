import { createContext, useReducer } from "react";
import { appActionsReducer } from "./reducer/AppReducer";
import { useAuthEffect } from './utils/appUtils';

export const defaultUserData = {
    email: null,
    username: null,
    firstName: null,
    lastName: null,
    image: null,
    is_login: false,
    token: null
};

export const AppContext = createContext(defaultUserData);

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appActionsReducer, defaultUserData);

    useAuthEffect(dispatch);

    return <AppContext.Provider value={{ state, dispatch }}>
        {children}
    </AppContext.Provider>
};