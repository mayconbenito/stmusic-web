import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    loadQueue: ['queue', 'predefinedQueue'],
    successLoadQueue: ['data'],
    play: ['track', 'queueId'],
    pause: [],
    resume: [],
    stop: [],
    prev: [],
    next: [],
    skipToIndex: ['index'],
    successNext: ['data'],
    successPrev: ['data'],
    setVolume: ['volume'],
  },
  {
    prefix: 'player/',
  }
);

const initialState = {
  showPlayer: false,
  active: false,
  queue: false,
};

const loadQueue = (state = initialState) => state;

const successLoadQueue = (state = initialState, action) => ({
  ...state,
  ...action.data,
});

const play = (state = initialState) => state;

const pause = (state = initialState) => state;

const resume = (state = initialState) => state;

const stop = (state = initialState) => state;

const prev = (state = initialState) => state;

const next = (state = initialState) => state;

const skipToIndex = (state = initialState) => state;

const successNext = (state = initialState, action) => ({
  ...state,
  queue: {
    ...state.queue,
    ...action.data,
  },
});

const successPrev = (state = initialState, action) => ({
  ...state,
  queue: {
    ...state.queue,
    ...action.data,
  },
});

const setVolume = (state = initialState) => state;

export default createReducer(initialState, {
  [Types.LOAD_QUEUE]: loadQueue,
  [Types.SUCCESS_LOAD_QUEUE]: successLoadQueue,
  [Types.PLAY]: play,
  [Types.PAUSE]: pause,
  [Types.RESUME]: resume,
  [Types.STOP]: stop,
  [Types.PREV]: prev,
  [Types.NEXT]: next,
  [Types.SKIP_TO_INDEX]: skipToIndex,
  [Types.SUCCESS_NEXT]: successNext,
  [Types.SUCCESS_PREV]: successPrev,
  [Types.SET_VOLUME]: setVolume,
});
