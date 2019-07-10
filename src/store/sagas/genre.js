import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';

import {
  Types as GenreTypes,
  Creators as GenreActions,
} from '../ducks/genre';

import api from '../../services/api';

const {
  successGenre,
  failureGenre,
  successTracks,
  failureTracks,
} = GenreActions;

function* fetchGenre({ genreId }) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, `/app/genres/${genreId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(successGenre(response.data.genre));
  } catch (err) {
    yield put(failureGenre(err));
  }
}

function* fetchTracks({ page = 1, genreId }) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, `/app/genres/${genreId}/tracks`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
      },
    });

    yield put(successTracks(response.data.tracks, response.data.meta.total));
  } catch (err) {
    yield put(failureTracks(err));
  }
}

export default function* genreSaga() {
  yield all([
    takeLatest(GenreTypes.FETCH_GENRE, fetchGenre),
    takeLatest(GenreTypes.FETCH_TRACKS, fetchTracks),
  ]);
}
