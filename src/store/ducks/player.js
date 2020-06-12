import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    fetchPlaylist: ['playlistId', 'playlistType'],
    successPlaylist: ['playlist'],
    play: ['track'],
    pause: [],
    resume: [],
    stop: [],
    prev: [],
    next: [],
  },
  {
    prefix: 'player/',
  }
);

const initialState = {
  showPlayer: false,
  isPlaying: 'STOPPED',
  active: false,
  playlist: false,
};

const successPlaylist = (state = initialState, action) => ({
  ...state,
  isPlaying: 'PLAYING',
  active: action.playlist.tracks[0],
  playlist: action.playlist,
});

const play = (state = initialState, action) => ({
  ...state,
  showPlayer: true,
  isPlaying: 'PLAYING',
  playlist: false,
  active: action.track,
});

const pause = (state = initialState) => ({
  ...state,
  isPlaying: 'PAUSED',
});

const resume = (state = initialState) => ({
  ...state,
  isPlaying: 'PLAYING',
});

const stop = (state = initialState) => ({
  ...state,
  isPlaying: 'STOPPED',
});

const prev = (state = initialState) => {
  if (state.playlist) {
    const activeTrackIndex = state.playlist.tracks.findIndex(
      i => i.id === state.active.id
    );
    if (activeTrackIndex >= 1) {
      return {
        ...state,
        isPlaying: 'PLAYING',
        active:
          state.playlist.tracks[
            state.playlist.tracks.findIndex(
              i => parseInt(i.id) === parseInt(state.active.id)
            ) - 1
          ],
      };
    }
  }
  return state;
};

const next = (state = initialState) => {
  if (state.playlist) {
    const activeTrackIndex = state.playlist.tracks.findIndex(
      i => i.id === state.active.id
    );

    if (activeTrackIndex < state.playlist.tracks.length - 1) {
      return {
        ...state,
        isPlaying: 'PLAYING',
        active:
          state.playlist.tracks[
            state.playlist.tracks.findIndex(
              i => parseInt(i.id) === parseInt(state.active.id)
            ) + 1
          ],
      };
    }
  }
  return state;
};

export default createReducer(initialState, {
  [Types.SUCCESS_PLAYLIST]: successPlaylist,
  [Types.PLAY]: play,
  [Types.PAUSE]: pause,
  [Types.RESUME]: resume,
  [Types.STOP]: stop,
  [Types.PREV]: prev,
  [Types.NEXT]: next,
});
