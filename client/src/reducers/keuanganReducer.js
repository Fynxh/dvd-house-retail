import { 
    KEUANGAN_LOADING,
    ADD_KEUANGAN,
    GET_KEUANGAN,
    DELETE_KEUANGAN,
    UPDATE_KEUANGAN
} from "../actions/types";

const initialState = {
    keuangan: [],
    loading: false,
    msg: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case KEUANGAN_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_KEUANGAN:
            return {
                ...state,
                keuangan: action.payload,
                loading: false
            }
        case ADD_KEUANGAN:
            return {
                ...state,
                keuangan: [action.payload, ...state.keuangan]
            }
        case DELETE_KEUANGAN:
            return {
                ...state,
                keuangan: state.keuangan.filter(keuangan => keuangan.id !== action.payload)
            }
        case UPDATE_KEUANGAN:
            return {
                ...state,
                msg: action.payload
            }
        default:
            return state
    }
}