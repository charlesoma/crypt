import axios from 'axios'

import {
    FETCH_CRYPTO_ACTION_TYPES,
    FETCH_MORE_CRYPTO_ACTION_TYPES
} from "./actionTypes";

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

const BASE_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

// THUNKS
const fetchCrypto = () => {
    return async (dispatch) => {
        dispatch(fetchCryptoRequest());
        try {
            const response = await axios.get(`${BASE_URL}?limit=10&start=1`, {
                headers: {
                    'X-CMC_PRO_API_KEY': `3f667720-807b-44de-9d83-49f0c5d1e9a4`
                }
            });
            const { data } = response.data;
            dispatch(fetchCryptoFulfilled(data));
        } catch (e) {
            console.log(e);
            dispatch(fetchCryptoRejected());
        }
    };
};

const fetchMoreCrypto = (start) => {
    return async (dispatch) => {
        dispatch(fetchMoreCryptoRequest());
        try {
            const response = await axios.get(`${BASE_URL}?limit=10&start=${start}`, {
                headers: {
                    'X-CMC_PRO_API_KEY': `3f667720-807b-44de-9d83-49f0c5d1e9a4`
                }
            });
            const { data } = response.data;
            dispatch(fetchMoreCryptoFulfilled(data));
        } catch (e) {
            console.log(e);
            dispatch(fetchMoreCryptoRejected());
        }
    };
};

// ACTION CREATORS

const fetchCryptoRequest = () => ({
    type: FETCH_CRYPTO_REQUEST
});

const fetchCryptoFulfilled = data => ({
    type: FETCH_CRYPTO_FULFILLED,
    payload: data
});

const fetchCryptoRejected = () => ({
    type: FETCH_CRYPTO_REJECTED
});

const fetchMoreCryptoRequest = () => ({
    type: FETCH_MORE_CRYPTO_REQUEST
});

const fetchMoreCryptoFulfilled = data => ({
    type: FETCH_MORE_CRYPTO_FULFILLED,
    payload: data
});

const fetchMoreCryptoRejected = () => ({
    type: FETCH_MORE_CRYPTO_REJECTED
});


export { fetchCrypto, fetchMoreCrypto }
