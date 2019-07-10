export const Types = {
  CHANGE_STATUS: 'player/CHANGE_STATUS',
  PLAY: 'player/PLAY',
  REQUEST_STREAM: 'player/REQUEST_STREAM',
  SUCCESS_STREAM: 'player/SUCCESS_STREAM',
  FAILURE_STREAM: 'player/FAILURE_STREAM',
};

const initialState = {
  isPlaying: false,
  active: {
    id: 52,
    name: "Back To You",
    picture: "https://i.ytimg.com/vi/VY1eFxgRR-k/hqdefault.jpg",
    url: null,
    artist: {
      name: "Selena Gomez",
      picture: "https://yt3.ggpht.com/a/AGF-l7_rwqSxaKtyb--b-sr4p_bhHgjEPaxsLVpyvw=s88-mo-c-c0xffffffff-rj-k-no"
    },
  },
  playlist: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.CHANGE_STATUS:
      return { ...state, isPlaying: !state.isPlaying };
    case Types.PLAY:
      return {
        ...state,
        ...action.payload,
        isPlaying: true,
        playlist: !action.payload.playlist ? false : action.payload.playlist,
      };
    case Types.SUCCESS_STREAM:
      return {
        ...state,
        active: { ...state.active, url: action.payload.stream.url },
      };
    default:
      return state;
  }
}

export function play(data) {
  return {
    type: Types.PLAY,
    payload: {
      active: data,
    },
  };
}

export function fetchStream(trackId) {
  return {
    type: Types.REQUEST_STREAM,
    payload: {
      trackId,
    },
  };
}

export function successStream(stream) {
  return {
    type: Types.SUCCESS_STREAM,
    payload: {
      stream: stream[0],
    },
  };
}

export function failureStream() {
  return {
    type: Types.FAILURE_STREAM,
  };
}
