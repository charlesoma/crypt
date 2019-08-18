import homeReducer from '../reducer/home';
import * as actions from '../actions/home';
import expect from 'expect';

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(homeReducer(undefined, {})).toEqual({data: null, dataMore: null, error: false});
  });

  it('should handle FETCH_CRYPTO_REQUEST', () => {
    const startAction = {
      type: actions.FETCH_CRYPTO_REQUEST
    };
    expect(homeReducer({}, startAction)).toEqual({});
  });

  it('should handle FETCH_CRYPTO_FULFILLED', () => {
    const successAction = {
      type: actions.FETCH_CRYPTO_FULFILLED,
      post: {},
    };
    expect(homeReducer({}, successAction)).toEqual({});
  });

  it('should handle FETCH_CRYPTO_REJECTED', () => {
    const failAction = {
      type: actions.FETCH_CRYPTO_REJECTED,
    };
    expect(homeReducer({}, failAction)).toEqual({});
  });
});
