import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    fetchArtist: ['artistId'],
    successArtist: ['data'],
    failureArtist: ['error'],
    fetchTracks: ['page', 'artistId'],
    successTracks: ['data', 'total'],
    failureTracks: ['error'],
    fetchAlbums: ['page', 'artistId'],
    successAlbums: ['data', 'total'],
    failureAlbums: ['error'],
    clearArtist: [],
    followArtist: ['artistId'],
    unfollowArtist: ['artistId'],
    successUnfollowArtist: ['data'],
    successFollowArtist: ['data'],
  },
  {
    prefix: 'artist/',
  }
);

const initialState = {
  loading: true,
  data: {
    name: '',
    followers: 0,
    tracks: 0,
    picture: '',
    followingState: true,
  },
  tracks: {
    loading: true,
    data: [],
    total: 0,
    page: 1,
  },
  albums: {
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
    data: [...state.tracks.data, ...action.data],
    total: action.total,
    page: state.tracks.page + 1,
  },
});

const failureTracks = (state = initialState) => ({ ...state, loading: false });

const fetchAlbums = (state = initialState) => ({
  ...state,
  albums: {
    ...state.albums,
    loading: true,
  },
});

const successAlbums = (state = initialState, action) => ({
  ...state,
  albums: {
    loading: false,
    data: [...state.albums.data, ...action.data],
    total: action.total,
    page: state.albums.page + 1,
  },
});

const failureAlbums = (state = initialState) => ({ ...state, loading: false });

const clearArtist = () => ({
  ...initialState,
});

const followArtist = (state = initialState) => ({
  ...state,
});

const unfollowArtist = (state = initialState) => ({
  ...state,
});

const successFollowArtist = (state = initialState) => ({
  ...state,
  data: {
    ...state.data,
    followingState: true,
  },
});

const successUnfollowArtist = (state = initialState) => ({
  ...state,
  data: {
    ...state.data,
    followingState: false,
  },
});

export default createReducer(initialState, {
  [Types.FETCH_ARTIST]: fetchArtist,
  [Types.SUCCESS_ARTIST]: successArtist,
  [Types.FAILURE_ARTIST]: failureArtist,
  [Types.FETCH_TRACKS]: fetchTracks,
  [Types.SUCCESS_TRACKS]: successTracks,
  [Types.FAILURE_TRACKS]: failureTracks,
  [Types.FETCH_ALBUMS]: fetchAlbums,
  [Types.SUCCESS_ALBUMS]: successAlbums,
  [Types.FAILURE_ALBUMS]: failureAlbums,
  [Types.CLEAR_ARTIST]: clearArtist,
  [Types.FOLLOW_ARTIST]: followArtist,
  [Types.UNFOLLOW_ARTIST]: unfollowArtist,
  [Types.SUCCESS_FOLLOW_ARTIST]: successFollowArtist,
  [Types.SUCCESS_UNFOLLOW_ARTIST]: successUnfollowArtist,
});
