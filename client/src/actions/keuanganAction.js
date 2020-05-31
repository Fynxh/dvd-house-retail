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

// add new data keuangan
export const addKeuangan = keuangan => (dispatch, getState) => {
    axios.post('api/keuangan', keuangan, tokenConfig(getState)).then(res => {
        dispatch({
            type: ADD_KEUANGAN,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnError(err.response.data, err.response.status, 'ADD_KEUANGAN_FAIL'))
    })
}

// delete data keuangan
export const deleteKeuangan = id => (dispatch, getState) => {
    axios.delete(`api/keuangan/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_KEUANGAN,
            payload: id
        })
    }).catch(err => {
        dispatch(returnError(err.response.data, err.response.status))
    })
}

// update data keuangan
export const updateKeuangan = (id, keuangan) => (dispatch, getState) => {
    axios.put(`api/keuangan/update/${id}`, keuangan, tokenConfig(getState)).then(res => {
        dispatch(getKeuangan())
        dispatch({
            type: UPDATE_KEUANGAN,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnError(err.response.data, err.response.status, 'UPDATE_KEUANGAN_FAIL'))
    })
}

// set loading
export const setKeuanganLoading = () => {
    return {
        type: KEUANGAN_LOADING
    }
}