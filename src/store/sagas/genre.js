import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
import { Types as GenreTypes, Creators as GenreActions } from '../ducks/genre';

const {
  successGenre,
  failureGenre,
  successTracks,
  failureTracks,
} = GenreActions;

function* fetchGenre({ genreId }) {
  try {
    const response = yield call(api.get, `/app/genres/${genreId}`);

    yield put(successGenre(response.data.genre));
  } catch (err) {
    yield put(failureGenre(err));
  }
}

function* fetchTracks({ page = 1, genreId }) {
  try {
    const response = yield call(api.get, `/app/genres/${genreId}/tracks`, {
      params: {
        page,
        limit: 100,
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
