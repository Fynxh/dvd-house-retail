import { combineReducers } from "redux"
import authReducer from "./authReducer"
import barangReducer from "./barangReducer"
import keuanganReducer from "./keuanganReducer"
// import laporanReducer from "./laporanReducer"
import errorReducer from "./errorReducer"

export default combineReducers({
    auth: authReducer,
    barang: barangReducer,
    keuangan: keuanganReducer,
    // laporan: laporanReducer,
    error: errorReducer
})