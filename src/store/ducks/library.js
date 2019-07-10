import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchPlaylists: ['page'],
  successPlaylists: ['data', 'total'],
  failurePlaylists: ['error'],
  fetchArtists: ['page'],
  successArtists: ['data', 'total'],
  failureArtists: ['error'],
  clearPlaylists: [],
  clearArtists: [],
  removePlaylist: ['id'],
}, {
  prefix: 'library/',
});

const initialState = {
  playlist: {
    data: [],
    total: 0,
    page: 1,
    loading: false,
  },
  artist: {
    data: [],
    total: 0,
    page: 1,
    loading: false,
  },
};

const fetchPlaylists = (state = initialState) => ({
  ...state,
  playlist: {
    ...state.playlist,
    loading: true,
  },
});

const successPlaylists = (state = initialState, action) => ({
  ...state,
  playlist: {
    data: [...state.playlist.data, ...action.data],
    loading: false,
    total: action.total,
    page: state.playlist.page + 1,
  },
});

const failurePlaylists = (state = initialState) => ({
  ...state,
  artist: {
    loading: false,
  },
});

const fetchArtists = (state = initialState) => ({
  ...state,
  artist: {
    ...state.artist,
    loading: true,
  },
});

const successArtists = (state = initialState, action) => ({
  ...state,
  artist: {
    data: [...state.artist.data, ...action.data],
    loading: false,
    total: action.total,
    page: state.artist.page + 1,
  },
});

const failureArtists = (state = initialState) => ({
  ...state,
  artist: {
    loading: false,
  },
});

const removePlaylist = (state = initialState, action) => ({
  ...state,
  playlist: {
    data: state.playlist.data.filter(playlist => playlist.id !== action.id),
  },
});

const clearPlaylists = (state = initialState) => ({
  ...state,
  playlist: {
    data: [],
    total: 0,
    page: 1,
    loading: false,
  },
});

const clearArtists = (state = initialState) => ({
  ...state,
  artist: {
    data: [],
    total: 0,
    page: 1,
    loading: false,
  },
});

export default createReducer(initialState, {
  [Types.FETCH_PLAYLISTS]: fetchPlaylists,
  [Types.SUCCESS_PLAYLISTS]: successPlaylists,
  [Types.FAILURE_PLAYLISTS]: failurePlaylists,
  [Types.FETCH_ARTISTS]: fetchArtists,
  [Types.SUCCESS_ARTISTS]: successArtists,
  [Types.FAILURE_ARTISTS]: failureArtists,
  [Types.CLEAR_PLAYLISTS]: clearPlaylists,
  [Types.CLEAR_ARTISTS]: clearArtists,
  [Types.REMOVE_PLAYLIST]: removePlaylist,
});
