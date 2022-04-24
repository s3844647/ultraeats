import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";
import authService from "./auth-service";

export const register = (username, email, password, confirmPassword, accountType) => (dispatch) => {
    return authService.register(username, email, password, confirmPassword, accountType).then(
        (response) => {
            dispatch({ type: REGISTER_SUCCESS });
            dispatch({ type: SET_MESSAGE, payload: response.data.message });
            return Promise.resolve();
        }, (error) => {
            dispatch({ type: REGISTER_FAIL });
            dispatch({ type: SET_MESSAGE, payload: error.response.data.message });
            return Promise.reject();
        }
    );
};

export const login = (username, password) => (dispatch) => {
    return authService.login(username, password).then(
        (data) => {
            dispatch({ type: LOGIN_SUCCESS, payload: { user: data } });
            return Promise.resolve();
        }, (error) => {
            dispatch({ type: LOGIN_FAIL });
            dispatch({ type: SET_MESSAGE, payload: error.response.data.message });
            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    authService.logout();
    dispatch({ type: LOGOUT });
};