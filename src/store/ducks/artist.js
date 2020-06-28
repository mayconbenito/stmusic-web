import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    fetchArtist: ['artistId'],
    setFollowingState: ['followingState'],
    successArtist: ['data'],
    failureArtist: ['error'],
    successTracks: ['data', 'total'],
    failureTracks: ['error'],
    successMostPlayedTracks: ['data', 'total'],
    failureMostPlayedTracks: ['error'],
    successAlbums: ['data', 'total'],
    failureAlbums: ['error'],
    followArtist: ['artistId'],
    unfollowArtist: ['artistId'],
    successUnfollowArtist: ['data'],
    successFollowArtist: ['data'],
    clearArtist: [],
  },
  {
    prefix: 'artist/',
  }
);

const initialState = {
  error: false,
  loading: true,
  data: {
    name: '',
    followers: 0,
    tracks: 0,
    picture: '',
    followingState: true,
  },
  tracks: {
    error: false,
    loading: true,
    data: [],
    total: 0,
    page: 1,
  },
  mostPlayedTracks: {
    error: false,
    loading: true,
    data: [],
    total: 0,
    page: 1,
  },
  albums: {
    error: false,
    loading: true,
    data: [],
    total: 0,
    page: 1,
  },
};

const fetchArtist = (state = initialState) => ({ ...state, loading: true });

const setFollowingState = (state = initialState, action) => ({
  ...state,
  data: { ...state.data, followingState: action.followingState },
});

const successArtist = (state = initialState, action) => ({
  ...state,
  data: action.data,
  loading: false,
});

const failureArtist = (state = initialState) => ({ ...state, loading: false, error: true });

const successTracks = (state = initialState, action) => ({
  ...state,
  tracks: {
    loading: false,
    data: [...state.tracks.data, ...action.data],
    total: action.total,
    page: state.tracks.page + 1,
  },
});

const failureTracks = (state = initialState) => ({ ...state, tracks: { loading: false, error: true } });

const successMostPlayedTracks = (state = initialState, action) => ({
  ...state,
  mostPlayedTracks: {
    loading: false,
    data: [...state.mostPlayedTracks.data, ...action.data],
    total: action.total,
    page: state.mostPlayedTracks.page + 1,
  },
});

const failureMostPlayedTracks = (state = initialState) => ({
  ...state,
  tracks: { loading: false, error: true }
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

const failureAlbums = (state = initialState) => ({ ...state, tracks: { loading: false, error: true } });

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

const clearArtist = () => initialState;

export default createReducer(initialState, {
  [Types.FETCH_ARTIST]: fetchArtist,
  [Types.SET_FOLLOWING_STATE]: setFollowingState,
  [Types.SUCCESS_ARTIST]: successArtist,
  [Types.FAILURE_ARTIST]: failureArtist,
  [Types.SUCCESS_TRACKS]: successTracks,
  [Types.FAILURE_TRACKS]: failureTracks,
  [Types.SUCCESS_MOST_PLAYED_TRACKS]: successMostPlayedTracks,
  [Types.FAILURE_MOST_PLAYED_TRACKS]: failureMostPlayedTracks,
  [Types.SUCCESS_ALBUMS]: successAlbums,
  [Types.FAILURE_ALBUMS]: failureAlbums,
  [Types.CLEAR_ARTIST]: clearArtist,
  [Types.FOLLOW_ARTIST]: followArtist,
  [Types.UNFOLLOW_ARTIST]: unfollowArtist,
  [Types.SUCCESS_FOLLOW_ARTIST]: successFollowArtist,
  [Types.SUCCESS_UNFOLLOW_ARTIST]: successUnfollowArtist,
});
