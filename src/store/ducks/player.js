import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  play: ['track'],
  fetchPlaylist: ['playlistId'],
  successPlaylist: ['data'],
  ended: [],
}, {
  prefix: 'player/',
});

const exampleState = {
  isPlaying: false,
  active: {
    id: 52,
    name: 'Song name',
    picture: 'https://i.ytimg.com/vi/VY1eFxgRR-k/hqdefault.jpg',
    url: null,
    artist: {
      name: 'Artit name',
      picture: 'https://yt3.ggpht.com/a/AGF-l7_rwqSxaKtyb--b-sr4p_bhHgjEPaxsLVpyvw=s88-mo-c-c0xffffffff-rj-k-no'
    },
  },
  playlist: false,
};

const initialState = {
  isPlaying: false,
  active: false,
  playlist: false,
};

const play = (state = initialState, action) => ({
  ...state,
  isPlaying: true,
  playlist: false,
  active: action.track,
});

const successPlaylist = (state = initialState, action) => ({
  ...state,
  playlist: {
    name: action.data.name,
    data: action.data.tracks,
    total: action.total,
    index: 0,
  },
  active: action.data.tracks[0],
});

const ended = (state = initialState) => {
  if (state.playlist) {
    const index = state.playlist.index + 1;
    return {
      ...state,
      active: state.playlist.data[index],
      playlist: {
        index,
        ...state.playlist,
      },
    };
  }

  return state;
};

export default createReducer(initialState, {
  [Types.PLAY]: play,
  [Types.SUCCESS_PLAYLIST]: successPlaylist,
  [Types.ENDED]: ended,
});
