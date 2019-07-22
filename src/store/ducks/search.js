import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchSearch: ['query'],
  successSearch: ['data'],
  failureSearch: ['error'],
  clearSearch: [],
}, {
  prefix: 'search/',
});

const initialState = {
  data: {
    artists: [],
    tracks: [],
  },
  loading: false,
};

const fetchSearch = (state = initialState) => ({ ...state, loading: true });

const successSearch = (state = initialState, action) => ({
  ...state,
  data: action.data,
  loading: false,
});

const failureSearch = (state = initialState) => ({ ...state, loading: false });

const clearSearch = (state = initialState) => ({
  ...state,
  data: { artists: [], tracks: [] },
  loading: true,
});

export default createReducer(initialState, {
  [Types.FETCH_SEARCH]: fetchSearch,
  [Types.SUCCESS_SEARCH]: successSearch,
  [Types.FAILURE_SEARCH]: failureSearch,
  [Types.CLEAR_SEARCH]: clearSearch,
});
