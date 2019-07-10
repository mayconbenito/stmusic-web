import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchGenre: ['genreId'],
  successGenre: ['data'],
  failureGenre: ['error'],
  fetchTracks: ['page', 'genreId'],
  successTracks: ['data'],
  failureTracks: ['error'],
  clearGenre: [],
}, {
  prefix: 'genre/',
});

const initialState = {
  loading: true,
  data: {
    name: '',
    tracks: 0,
    picture: '',
  },
  tracks: {
    loading: true,
    data: [],
    total: 0,
    page: 1,
  },
};

const fetchGenre = (state = initialState) => ({ ...state, loading: true });

const successGenre = (state = initialState, action) => ({
  ...state,
  data: action.data,
  loading: false,
});

const failureGenre = (state = initialState) => ({ ...state, loading: false });

const fetchTracks = (state = initialState) => ({
  ...state,
  tracks: {
    ...state.tracks,
    loading: true,
  },
});

const successTracks = (state = initialState, action) => ({
  ...state,
  tracks: {
    loading: false,
    data: action.data,
  },
});

const failureTracks = (state = initialState) => ({ ...state, loading: false })

const clearGenre = () => ({
  ...initialState,
});


export default createReducer(initialState, {
  [Types.FETCH_GENRE]: fetchGenre,
  [Types.SUCCESS_GENRE]: successGenre,
  [Types.FAILURE_GENRE]: failureGenre,
  [Types.FETCH_TRACKS]: fetchTracks,
  [Types.SUCCESS_TRACKS]: successTracks,
  [Types.FAILURE_TRACKS]: failureTracks,
  [Types.CLEAR_GENRE]: clearGenre,
});
