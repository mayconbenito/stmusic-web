import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setQuery: ['query'],
    fetchSearch: ['query'],
    successSearch: ['data'],
    failureSearch: ['error'],
    clearSearch: [],
  },
  {
    prefix: 'search/',
  }
);

const initialState = {
  data: {
    artists: [],
    albums: [],
    tracks: [],
  },
  query: '',
  loading: false,
};

const setQuery = (state = initialState, action) => ({ ...state, query: action.query })

const fetchSearch = (state = initialState) => ({ ...state, loading: true });

const successSearch = (state = initialState, action) => ({
  ...state,
  data: action.data,
  loading: false,
});

const failureSearch = (state = initialState) => ({ ...state, loading: false });

const clearSearch = () => initialState;

export default createReducer(initialState, {
  [Types.SET_QUERY]: setQuery,
  [Types.FETCH_SEARCH]: fetchSearch,
  [Types.SUCCESS_SEARCH]: successSearch,
  [Types.FAILURE_SEARCH]: failureSearch,
  [Types.CLEAR_SEARCH]: clearSearch,
});
