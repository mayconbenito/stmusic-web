import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  requestLogin: ['form'],
  successLogin: [],
  failureLogin: ['error'],
}, {
  prefix: 'login/',
});

const initialState = {
  loading: false,
  error: '',
};

const requestLogin = (state = initialState) => ({ ...state, loading: true, error: '' });

const successLogin = (state = initialState) => ({
  ...state,
  loading: false,
  error: '',
});

const failureLogin = (state = initialState, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

export default createReducer(initialState, {
  [Types.REQUEST_LOGIN]: requestLogin,
  [Types.SUCCESS_LOGIN]: successLogin,
  [Types.FAILURE_LOGIN]: failureLogin,
});
