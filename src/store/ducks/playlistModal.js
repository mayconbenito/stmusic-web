import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    openModal: ['trackId'],
    closeModal: [],
    fetchPlaylists: ['page'],
    successPlaylists: ['data', 'total'],
    failurePlaylists: ['error'],
    addTrack: ['playlistId', 'trackId'],
    successAdd: ['data'],
    failureAdd: ['error'],
    clearState: [],
  },
  {
    prefix: 'playlistModal/',
  }
);

const initialState = {
  open: false,
  trackId: 1,
  playlists: {
    loading: true,
    data: [],
    total: 0,
    page: 1,
  },
};

const openModal = (state = initialState, action) => ({
  ...state,
  open: true,
  trackId: action.trackId,
});

const closeModal = (state = initialState) => ({ ...state, open: false });

const fetchPlaylists = (state = initialState) => ({
  ...state,
  playlists: {
    ...state.playlists,
    loading: true,
  },
});

const successPlaylists = (state = initialState, action) => ({
  ...state,
  playlists: {
    loading: false,
    total: action.total,
    data: [...state.playlists.data, ...action.data],
    page: state.playlists.page + 1,
  },
});

const failurePlaylists = (state = initialState) => ({
  ...state,
  playlists: { loading: false },
});

const addTrack = (state = initialState) => ({ ...state, open: false });

const successAdd = (state = initialState) => state;

const failureAdd = (state = initialState) => state;

const clearState = () => initialState;

export default createReducer(initialState, {
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.FETCH_PLAYLISTS]: fetchPlaylists,
  [Types.SUCCESS_PLAYLISTS]: successPlaylists,
  [Types.FAILURE_PLAYLISTS]: failurePlaylists,
  [Types.ADD_TRACK]: addTrack,
  [Types.SUCCESS_ADD]: successAdd,
  [Types.FAILURE_ADD]: failureAdd,
  [Types.CLEAR_STATE]: clearState,
});
