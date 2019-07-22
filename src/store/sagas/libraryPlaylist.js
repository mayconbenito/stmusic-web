import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';

import {
  Types as LibraryPlaylistTypes,
  Creators as LibraryPlaylistActions,
} from '../ducks/libraryPlaylist';

import api from '../../services/api';

const {
  successPlaylists,
  failurePlaylists,
} = LibraryPlaylistActions;

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

export default function* librarySaga() {
  yield all([
    takeLatest(LibraryPlaylistTypes.FETCH_PLAYLISTS, fetchPlaylists),
  ]);
}
