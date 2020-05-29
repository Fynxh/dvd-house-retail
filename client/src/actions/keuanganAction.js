import axios from "axios"
import { 
    KEUANGAN_LOADING,
    ADD_KEUANGAN,
    GET_KEUANGAN,
    DELETE_KEUANGAN,
    UPDATE_KEUANGAN
} from "../actions/types"
import { tokenConfig } from "../actions/authAction"
import { returnError } from "../actions/errorAction"

// get data keuangan
export const getKeuangan = () => (dispatch, getState) => {
    dispatch(setKeuanganLoading())
    
    axios.get('api/keuangan', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_KEUANGAN,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnError(err.response.data, err.response.status))
    })
}

// set loading
export const setKeuanganLoading = () => {
    return {
        type: KEUANGAN_LOADING
    }
}