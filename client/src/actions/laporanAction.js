import axios from "axios"
import { 
    LAPORAN_LOADING,
    GET_LAPORAN,
    ADD_LAPORAN,
    DELETE_LAPORAN
} from "../actions/types"
import { tokenConfig } from "./authAction";
import { returnError } from "./errorAction";

// get Laporan
export const getLaporan = () => (dispatch, getState) => {
    dispatch(setLaporanLoading())
    axios.get('api/laporan', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_LAPORAN,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnError(err.response.data, err.response.status))
    })
}

// set laporan loading
export const setLaporanLoading = () => {
    return {
        type: LAPORAN_LOADING
    }
}