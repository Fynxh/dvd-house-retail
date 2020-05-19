import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types"

// return error
export const returnError = (msg, status, id) => {
    return{
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}

// clear error
export const clearError = () => {
    return {
        type: CLEAR_ERRORS
    }
}