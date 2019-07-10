import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';

import {
  Types as LibraryTypes,
  Creators as LibraryActions,
} from '../ducks/library';

import api from '../../services/api';

const {
  successPlaylists,
  failurePlaylists,
  successArtists,
  failureArtists,
} = LibraryActions;

function* fetchPlaylists({ page = 1 }) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, '/app/me/playlists', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
      },
    });

    yield put(successPlaylists(response.data.playlists, response.data.meta.total));
  } catch (err) {
    yield put(failurePlaylists(err));
  }
}

function* fetchArtists({ page = 1 }) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, '/app/me/following/artists', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
      },
    });

    yield put(successArtists(response.data.artists, response.data.meta.total));
  } catch (err) {
    yield put(failureArtists(err));
  }
}

export default function* librarySaga() {
  yield all([
    takeLatest(LibraryTypes.FETCH_PLAYLISTS, fetchPlaylists),
    takeLatest(LibraryTypes.FETCH_ARTISTS, fetchArtists),
  ]);
}
