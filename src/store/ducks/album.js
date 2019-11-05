import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    fetchAlbum: ['albumId'],
    successAlbum: ['data'],
    failureAlbum: ['error'],
    fetchTracks: ['page', 'albumId'],
    successTracks: ['data', 'total'],
    failureTracks: ['error'],
    clearAlbum: [],
  },
  {
    prefix: 'album/',
  }
);

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

const fetchAlbum = (state = initialState) => ({ ...state, loading: true });

const successAlbum = (state = initialState, action) => ({
  ...state,
  data: action.data,
  loading: false,
});

const failureAlbum = (state = initialState) => ({ ...state, loading: false });

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
    data: [...state.tracks.data, ...action.data],
    total: action.total,
    page: state.tracks.page + 1,
  },
});

const failureTracks = (state = initialState) => ({ ...state, loading: false });

const clearAlbum = () => ({
  ...initialState,
});

export default createReducer(initialState, {
  [Types.FETCH_ALBUM]: fetchAlbum,
  [Types.SUCCESS_ALBUM]: successAlbum,
  [Types.FAILURE_ALBUM]: failureAlbum,
  [Types.FETCH_TRACKS]: fetchTracks,
  [Types.SUCCESS_TRACKS]: successTracks,
  [Types.FAILURE_TRACKS]: failureTracks,
  [Types.CLEAR_ALBUM]: clearAlbum,
});
