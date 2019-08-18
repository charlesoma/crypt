import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actions from '../actions/home';
import * as types from '../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchCrypto actions', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it('creates FETCH_CRYPTO_FULFILLED after successfuly fetching data', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [],
            });
        });

        const expectedActions = [
            { type: types.FETCH_CRYPTO_ACTION_TYPES.FETCH_CRYPTO_REQUEST },
            { type: types.FETCH_CRYPTO_ACTION_TYPES.FETCH_CRYPTO_FULFILLED, payload: undefined },
        ];

        const store = mockStore({ posts: {} })

        return store.dispatch(actions.fetchCrypto()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates FETCH_MORE_CRYPTO_FULFILLED after successfuly fetching data', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [],
            });
        });

        const expectedActions = [
            { type: types.FETCH_MORE_CRYPTO_ACTION_TYPES.FETCH_MORE_CRYPTO_REQUEST },
            { type: types.FETCH_MORE_CRYPTO_ACTION_TYPES.FETCH_MORE_CRYPTO_FULFILLED, payload: undefined },
        ];

        const store = mockStore({ posts: {} })

        return store.dispatch(actions.fetchMoreCrypto()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
