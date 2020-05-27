import axios from 'axios'
import { 
    BARANG_LOADING,
    ADD_BARANG,
    GET_BARANG,
    DELETE_BARANG,
    UPDATE_BARANG
} from "../actions/types";
import { tokenConfig } from "./authAction";
import { returnError } from "./errorAction";

export const getBarang = () => (dispatch, getState) => {
    dispatch(setBarangLoading())
    axios.get('api/barang', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_BARANG,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnError(err.response.data, err.response.status))
    })
}

export const addBarang = barang => (dispatch, getState) => {
    axios.post('api/barang', barang, tokenConfig(getState)).then(res => {
        dispatch({
            type: ADD_BARANG,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnError(err.response.data, err.response.status, 'ADD_BARANG_FAIL'))
    })
}

export const deleteBarang = id => (dispatch, getState) => {
    axios.delete(`api/barang/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_BARANG,
            payload: id
        })
    }).catch(err => {
        dispatch(returnError(err.response.data, err.response.status, 'DELETE_BARANG_FAIL'))
    })
}

export const updateBarang = (id, barang) => (dispatch, getState) => {
    axios.put(`api/barang/update/${id}`, barang, tokenConfig(getState)).then(res => {
        dispatch(getBarang())
        dispatch({
            type: UPDATE_BARANG,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnError(err.response.data, err.response.status, 'UPDATE_BARANG_FAIL'))
    })
}

export const setBarangLoading = () => {
    return {
        type: BARANG_LOADING
    }
}