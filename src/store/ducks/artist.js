import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchArtist: ['artistId'],
  successArtist: ['data'],
  failureArtist: ['error'],
  fetchTracks: ['page', 'artistId'],
  successTracks: ['data'],
  failureTracks: ['error'],
  clearArtist: [],
}, {
  prefix: 'artist/',
});

const initialState = {
  loading: true,
  data: {
    name: '',
    followers: 0,
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

const fetchArtist = (state = initialState) => ({ ...state, loading: true });

const successArtist = (state = initialState, action) => ({
  ...state,
  data: action.data,
  loading: false,
});

const failureArtist = (state = initialState) => ({ ...state, loading: false });

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

const clearArtist = () => ({
  ...initialState,
});


export default createReducer(initialState, {
  [Types.FETCH_ARTIST]: fetchArtist,
  [Types.SUCCESS_ARTIST]: successArtist,
  [Types.FAILURE_ARTIST]: failureArtist,
  [Types.FETCH_TRACKS]: fetchTracks,
  [Types.SUCCESS_TRACKS]: successTracks,
  [Types.FAILURE_TRACKS]: failureTracks,
  [Types.CLEAR_ARTIST]: clearArtist,
});
