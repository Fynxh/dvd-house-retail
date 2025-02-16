import axios from "axios"
import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from "../actions/types";
import { returnError, clearError } from "./errorAction";


// check token & get user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING })

    axios.get('api/auth', tokenConfig(getState)).then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnError(err.response.data, err.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
}

// Login User
export const login = ({ username, password }) => dispatch => {
    // Header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // request body 
    const body = JSON.stringify({username, password});

    axios.post('api/auth', body, config)
        .then(res => {
            dispatch(clearError())
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// Logout
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// token config
export const tokenConfig = getState => {
    // get token from local storage
    const token = getState().auth.token

    // Header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token
    }

    return config
}