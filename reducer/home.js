import {
    FETCH_CRYPTO_ACTION_TYPES,
    FETCH_MORE_CRYPTO_ACTION_TYPES
} from '../actions/actionTypes'

const {
    FETCH_CRYPTO_REQUEST,
    FETCH_CRYPTO_FULFILLED,
    FETCH_CRYPTO_REJECTED
} = FETCH_CRYPTO_ACTION_TYPES;
const {
    FETCH_MORE_CRYPTO_REQUEST,
    FETCH_MORE_CRYPTO_FULFILLED,
    FETCH_MORE_CRYPTO_REJECTED
} = FETCH_MORE_CRYPTO_ACTION_TYPES;
const initialState = {
    data: null,
    dataMore: null,
    error: false
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_CRYPTO_REQUEST:
            return {
                ...state
            }

        case FETCH_CRYPTO_FULFILLED:
            return {
                ...state,
                data: action.payload
            }

        case FETCH_CRYPTO_REJECTED:
            return {
                ...state,
                data: ['There was an error loading your request'],
                error: true
            }

        case FETCH_MORE_CRYPTO_REQUEST:
            return {
                ...state
            }

        case FETCH_MORE_CRYPTO_FULFILLED:
            return {
                ...state,
                dataMore: action.payload
            }

        case FETCH_MORE_CRYPTO_REJECTED:
            return {
                ...state,
            }

        default:
            return state;
    }
};

export default homeReducer;
