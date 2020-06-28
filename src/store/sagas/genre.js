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
    const [genre, tracks] = yield Promise.all([
      api.get(`/app/genres/${genreId}`),
      api.get(`/app/genres/${genreId}/tracks`, {
        params: {
          page: 1,
          limit: 10,
        },
      })
    ])

    yield all([
      put(successGenre(genre.data.genre)),
      put(successTracks(tracks.data.tracks, tracks.data.meta.total))
    ]);
  } catch (err) {
    yield put(failureGenre(err));
  }
}

function* fetchTracks({ page = 1, genreId }) {
  try {
    const response = yield call(api.get, `/app/genres/${genreId}/tracks`, {
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

export default function* genreSaga() {
  yield all([
    takeLatest(GenreTypes.FETCH_GENRE, fetchGenre),
    takeLatest(GenreTypes.FETCH_TRACKS, fetchTracks),
  ]);
}
