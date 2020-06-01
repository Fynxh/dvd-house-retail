import { 
    LAPORAN_LOADING,
    GET_LAPORAN,
    ADD_LAPORAN,
    DELETE_LAPORAN
} from "../actions/types";

const initialState = {
    laporan: [],
    loading: false,
    msg: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LAPORAN_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_LAPORAN:
            return {
                ...state,
                laporan: action.payload
            }
        case ADD_LAPORAN:
            return {
                ...state,
                laporan: [action.payload, ...state.laporan]
            }
        case DELETE_LAPORAN:
            return {
                ...state,
                laporan: state.laporan.filter(laporan => laporan.id !== action.payload)
            }
        default:
            return state
    }
}