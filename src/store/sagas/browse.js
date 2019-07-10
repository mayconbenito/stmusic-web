import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';

import {
  Types as BrowseTypes,
  Creators as BrowseActions,
} from '../ducks/browse';

import api from '../../services/api';

const {
  successGenres,
  failureGenres,
  successRecentlyPlayed,
  failureRecentlyPlayed,
  successTrending,
  failureTrending,
  successMostPlayed,
  failureMostPlayed,
  successMostFollowed,
  failureMostFollowed,
} = BrowseActions;

function* fetchGenres() {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, '/app/genres', {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(successGenres(response.data.genres));
  } catch (err) {
    yield put(failureGenres(err));
  }
}

function* fetchRecentlyPlayed() {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, '/app/me/recently-played', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: 1,
        limit: 100,
      },
    });

    yield put(successRecentlyPlayed(response.data.tracks));
  } catch (err) {
    yield put(failureRecentlyPlayed(err));
  }
}

function* fetchTrending() {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, '/app/browse/tracks/trending', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: 1,
        limit: 100,
      },
    });

    yield put(successTrending(response.data.tracks));
  } catch (err) {
    yield put(failureTrending(err));
  }
}

function* fetchMostPlayed() {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, '/app/browse/tracks/most-played', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: 1,
        limit: 100,
      },
    });

    yield put(successMostPlayed(response.data.tracks));
  } catch (err) {
    yield put(failureMostPlayed(err));
  }
}

function* fetchMostFollowed() {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, '/app/browse/artists/most-followed', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: 1,
        limit: 15,
      },
    });

    yield put(successMostFollowed(response.data.artists));
  } catch (err) {
    yield put(failureMostFollowed(err));
  }
}

export default function* browseSaga() {
  yield all([
    takeLatest(BrowseTypes.FETCH_GENRES, fetchGenres),
    takeLatest(BrowseTypes.FETCH_RECENTLY_PLAYED, fetchRecentlyPlayed),
    takeLatest(BrowseTypes.FETCH_TRENDING, fetchTrending),
    takeLatest(BrowseTypes.FETCH_MOST_PLAYED, fetchMostPlayed),
    takeLatest(BrowseTypes.FETCH_MOST_FOLLOWED, fetchMostFollowed),
  ]);
}
