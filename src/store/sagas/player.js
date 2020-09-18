import TrackPlayer from 'react-web-track-player';
import { put, call, all, takeLatest, select } from 'redux-saga/effects';

import api from '../../services/api';
import {
  Types as PlayerTypes,
  Creators as PlayerActions,
} from '../ducks/player';

const { successLoadQueue, successNext, successPrev } = PlayerActions;

function init() {
  try {
    TrackPlayer.setupPlayer({
      capabilities: [
        [
          'play',
          async () => {
            await TrackPlayer.play();
          },
        ],
        [
          'pause',
          () => {
            TrackPlayer.pause();
          },
        ],
        [
          'previoustrack',
          async () => {
            await TrackPlayer.skipToPrevious();
          },
        ],
        [
          'nexttrack',
          async () => {
            await TrackPlayer.skipToNext();
          },
        ],
        [
          'stop',
          () => {
            TrackPlayer.reset();
          },
        ],
      ],
    });

    const volume = localStorage.getItem('@stmusic:playerVolume');
    TrackPlayer.setVolume(volume / 100);
    // eslint-disable-next-line no-empty
  } catch (err) {}
}

function* loadQueue({ queue, predefinedQueue }) {
  try {
    const playerState = yield select((state) => state.player);

    if (!predefinedQueue) {
      if (playerState.active) {
        TrackPlayer.reset();
      }

      yield put(
        successLoadQueue({
          active: true,
          showPlayer: true,
          queue: {
            name: queue.name,
            id: queue.id,
            type: queue.type,
          },
        })
      );

      const queueResponse = yield call(
        api.get,
        `/app/${queue.type}/${queue.id}`
      );

      const queueTracksResponse = yield call(
        api.get,
        `/app/${queue.type}/${queue.id}/tracks`,
        {
          params: {
            limit: 100,
            page: 1,
          },
        }
      );

      const tracks = queueTracksResponse.data.tracks.map((track) => ({
        id: track.id,
        url: `${process.env.REACT_APP_STREAM_URL}/yt?url=${track.youtubeId}`,
        duration: track.duration,
        title: track.name,
        artist: track.artists.map(
          (artist, index) => (index ? ', ' : '') + artist.name
        )[0],
        artwork: [{ src: track.picture, sizes: '512x512' }],
        album: queue.type === 'albums' ? queue.name : track.album.name,
      }));

      let name;
      if (queueResponse.data.playlist) {
        name = queueResponse.data.playlist.name;
      }

      if (queueResponse.data.artist) {
        name = queueResponse.data.artist.name;
      }

      if (queueResponse.data.genre) {
        name = queueResponse.data.genre.name;
      }

      if (queueResponse.data.album) {
        name = queueResponse.data.album.name;
      }

      const tracksQueue = TrackPlayer.getQueue();
      const currentTrack = TrackPlayer.getCurrentTrack();
      const currentTrackIndex = tracksQueue.findIndex(
        (track) => track.id === currentTrack?.id
      );

      TrackPlayer.add(tracks);

      yield call(TrackPlayer.play);

      yield put(
        successLoadQueue({
          active: true,
          showPlayer: true,
          queue: {
            name,
            currentTrackIndex,
            id: queue.id,
            items: queueTracksResponse.data.meta.items,
            total: queueTracksResponse.data.meta.total,
            page: queueTracksResponse.data.meta.page,
            type: queue.type,
          },
        })
      );
    } else {
      if (playerState.active) {
        TrackPlayer.reset();
      }

      yield put(
        successLoadQueue({
          active: true,
          showPlayer: true,
          queue: {
            name: predefinedQueue.name,
          },
        })
      );

      const tracks = predefinedQueue.tracks.map((track) => ({
        id: track.id,
        url: `${process.env.REACT_APP_STREAM_URL}/yt?url=${track.youtubeId}`,
        duration: track.duration,
        title: track.name,
        artist: track.artists.map(
          (artist, index) => (index ? ', ' : '') + artist.name
        )[0],
        artwork: [{ src: track.picture, size: '512x512' }],
        album: track.album?.name,
      }));

      TrackPlayer.add(tracks);

      const tracksQueue = TrackPlayer.getQueue();
      const currentTrack = TrackPlayer.getCurrentTrack();
      const currentTrackIndex = tracksQueue.findIndex(
        (track) => track.id === currentTrack?.id
      );

      yield call(TrackPlayer.play);

      yield put(
        successLoadQueue({
          active: true,
          showPlayer: true,
          queue: {
            name: predefinedQueue.name,
            currentTrackIndex,
            id: predefinedQueue.id,
            items: predefinedQueue.tracks.length,
            total: predefinedQueue.tracks.length,
            page: 1,
            type: 'predefinedQueue',
          },
        })
      );
    }
    // eslint-disable-next-line no-empty
  } catch (err) {}
}

function* play({ track, queueId }) {
  try {
    const playerState = yield select((state) => state.player);

    if (playerState.active && playerState.queue.id === queueId) {
      yield call(TrackPlayer.play);

      const currentTrack = TrackPlayer.getCurrentTrack();

      if (currentTrack) {
        const tracksQueue = TrackPlayer.getQueue();
        const trackIndex = tracksQueue.findIndex(
          (queueTrack) => queueTrack.id === track.id
        );
        yield call(TrackPlayer.skipToIndex, trackIndex);
      }
    }
    // eslint-disable-next-line no-empty
  } catch (err) {}
}

function pause() {
  TrackPlayer.pause();
}

function* next() {
  try {
    const tracksQueue = TrackPlayer.getQueue();
    const currentTrack = TrackPlayer.getCurrentTrack();
    const currentTrackIndex = tracksQueue.findIndex(
      (track) => track.id === currentTrack.id
    );

    if (tracksQueue[currentTrackIndex + 1]) {
      yield call(TrackPlayer.skipToNext);
    }

    yield put(
      successNext({
        currentTrackIndex,
      })
    );
    // eslint-disable-next-line no-empty
  } catch (err) {}
}

function* prev() {
  try {
    const tracksQueue = TrackPlayer.getQueue();
    const currentTrack = TrackPlayer.getCurrentTrack();
    const currentTrackIndex = tracksQueue.findIndex(
      (track) => track.id === currentTrack.id
    );

    if (tracksQueue[currentTrackIndex - 1]) {
      yield call(TrackPlayer.skipToPrevious);
    }

    yield put(
      successPrev({
        currentTrackIndex,
      })
    );
    // eslint-disable-next-line no-empty
  } catch (err) {}
}

function setVolume({ volume }) {
  try {
    TrackPlayer.setVolume(volume);
  } catch (err) {
    // eslint-disable-next-line no-empty
  }
}

export default function* playerSaga() {
  yield all([
    init(),
    takeLatest(PlayerTypes.LOAD_QUEUE, loadQueue),
    takeLatest(PlayerTypes.PLAY, play),
    takeLatest(PlayerTypes.PAUSE, pause),
    takeLatest(PlayerTypes.NEXT, next),
    takeLatest(PlayerTypes.PREV, prev),
    takeLatest(PlayerTypes.SET_VOLUME, setVolume),
  ]);
}
