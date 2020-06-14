import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
import { Types as AlbumTypes, Creators as AlbumActions } from '../ducks/album';

const {
  successAlbum,
  failureAlbum,
  successTracks,
  failureTracks,
} = AlbumActions;

function* fetchAlbum({ albumId }) {
  try {
    const response = yield call(api.get, `/app/albums/${albumId}`);

    yield put(successAlbum(response.data.album));
  } catch (err) {
    yield put(failureAlbum(err));
  }
}

function* fetchTracks({ page = 1, albumId }) {
  try {
    const response = yield call(api.get, `/app/albums/${albumId}/tracks`, {
      params: {
        page,
        limit: 10,
      },
    });

    yield put(successTracks(response.data.tracks, response.data.meta.total));
  } catch (err) {
    yield put(failureTracks(err));
  }
}

export default function* albumSaga() {
  yield all([
    takeLatest(AlbumTypes.FETCH_ALBUM, fetchAlbum),
    takeLatest(AlbumTypes.FETCH_TRACKS, fetchTracks),
  ]);
}
