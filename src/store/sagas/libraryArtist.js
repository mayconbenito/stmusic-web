import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';

import {
  Types as LibraryArtistTypes,
  Creators as LibraryArtistActions,
} from '../ducks/libraryArtist';

import api from '../../services/api';

const {
  successArtists,
  failureArtists,
} = LibraryArtistActions;

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

export default function* libraryArtistSaga() {
  yield all([
    takeLatest(LibraryArtistTypes.FETCH_ARTISTS, fetchArtists),
  ]);
}
