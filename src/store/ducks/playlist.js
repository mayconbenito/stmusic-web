import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchPlaylist: ['playlistId'],
  successPlaylist: ['data'],
  failurePlaylist: ['error'],
  fetchTracks: ['page', 'playlistId'],
  successTracks: ['data', 'total'],
  failureTracks: ['error'],
  clearPlaylist: [],
  requestDeletePlaylist: ['id'],
  successDeletePlaylist: [],
  failureDeletePlaylist: ['error'],
  requestCreatePlaylist: ['name'],
  successCreatePlaylist: [''],
  failureCreatePlaylist: ['error'],
}, {
  prefix: 'playlist/',
});

const initialState = {
  loading: true,
  data: {
    name: 'Playlist Name',
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

const fetchPlaylist = (state = initialState) => ({ ...state, loading: true });

const successPlaylist = (state = initialState, action) => ({
  ...state,
  data: action.data,
  loading: false,
});

const failurePlaylist = (state = initialState) => ({ ...state, loading: false });

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

const clearPlaylist = () => ({
  ...initialState,
});

const requestCreatePlaylist = (state = initialState) => state;

const successCreatePlaylist = (state = initialState) => state;

const failureCreatePlaylist = (state = initialState) => state;

const requestDeletePlaylist = (state = initialState) => state;

const successDeletePlaylist = (state = initialState) => state;

const failureDeletePlaylist = (state = initialState) => state;

export default createReducer(initialState, {
  [Types.FETCH_PLAYLIST]: fetchPlaylist,
  [Types.SUCCESS_PLAYLIST]: successPlaylist,
  [Types.FAILURE_PLAYLIST]: failurePlaylist,
  [Types.FETCH_TRACKS]: fetchTracks,
  [Types.SUCCESS_TRACKS]: successTracks,
  [Types.FAILURE_TRACKS]: failureTracks,
  [Types.CLEAR_PLAYLIST]: clearPlaylist,
  [Types.REQUEST_CREATE_PLAYLIST]: requestCreatePlaylist,
  [Types.SUCCESS_CREATE_PLAYLIST]: successCreatePlaylist,
  [Types.FAILURE_CREATE_PLAYLIST]: failureCreatePlaylist,
  [Types.REQUEST_DELETE_PLAYLIST]: requestDeletePlaylist,
  [Types.SUCCESS_DELETE_PLAYLIST]: successDeletePlaylist,
  [Types.FAILURE_DELETE_PLAYLIST]: failureDeletePlaylist,
});
