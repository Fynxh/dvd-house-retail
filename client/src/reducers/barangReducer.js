import { 
    BARANG_LOADING,
    ADD_BARANG,
    GET_BARANG,
    DELETE_BARANG,
    UPDATE_BARANG
} from "../actions/types";

const initialState = {
    barang: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case BARANG_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_BARANG:
            return {
                ...state,
                barang: [action.payload, ...state.barang]
            }
        case GET_BARANG:
            return {
                ...state,
                barang: action.payload,
                loading: false
            }
        case DELETE_BARANG:
            return {
                ...state,
                barang: state.barang.filter(barang => barang.id !== action.payload)
            }
        case UPDATE_BARANG:
            return {
                ...state,
                barang: [action.payload, ...state.barang]
            }
        default:
            return state
    }
}