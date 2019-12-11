import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
import {
  Types as PlaylistModalTypes,
  Creators as PlaylistModalActions,
} from '../ducks/playlistModal';

const {
  successAdd,
  failureAdd,
  successPlaylists,
  failurePlaylists,
} = PlaylistModalActions;

function* addTrack({ playlistId, trackId }) {
  try {
    const response = yield call(
      api.post,
      `/app/playlists/${playlistId}/tracks`,
      {
        tracks: [trackId],
      }
    );

    if (response.status === 204) {
      yield put(successAdd('ok'));
    }
  } catch (err) {
    yield put(failureAdd(err));
  }
}

function* fetchPlaylists({ page = 1 }) {
  try {
    const response = yield call(api.get, '/app/me/playlists', {
      params: {
        page,
      },
    });

    yield put(
      successPlaylists(response.data.playlists, response.data.meta.total)
    );
  } catch (err) {
    yield put(failurePlaylists(err));
  }
}

export default function* artistSaga() {
  yield all([
    takeLatest(PlaylistModalTypes.ADD_TRACK, addTrack),
    takeLatest(PlaylistModalTypes.FETCH_PLAYLISTS, fetchPlaylists),
  ]);
}
