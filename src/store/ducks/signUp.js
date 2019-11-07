import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    requestSignUp: ['form'],
    successSignUp: [],
    failureSignUp: ['error'],
  },
  {
    prefix: 'signUp/',
  }
);

const initialState = {
  loading: false,
  error: '',
};

const requestSignUp = (state = initialState) => ({
  ...state,
  loading: true,
  error: '',
});

const successSignUp = (state = initialState) => ({
  ...state,
  loading: false,
  error: '',
});

const failureSignUp = (state = initialState, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

export default createReducer(initialState, {
  [Types.REQUEST_SIGN_UP]: requestSignUp,
  [Types.SUCCESS_SIGN_UP]: successSignUp,
  [Types.FAILURE_SIGN_UP]: failureSignUp,
});
