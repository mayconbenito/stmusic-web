import { put, all, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
import session from '../../services/session';
import {
  Types as BrowseTypes,
  Creators as BrowseActions,
} from '../ducks/browse';

const { failure, setList } = BrowseActions;

function* fetchBrowse() {
  function fetchRecentlyPlayed() {
    if (session()) {
      return api.get('/app/me/recently-played', {
        params: {
          page: 1,
          limit: 100,
        },
      });
    }

    return Promise.resolve();
  }

  try {
    const [
      recentlyPlayed,
      trending,
      genres,
      mostPlayed,
      mostFollowed,
    ] = yield Promise.all([
      fetchRecentlyPlayed(),
      api.get('/app/browse/tracks/trending', {
        params: {
          page: 1,
          limit: 100,
        },
      }),
      api.get('/app/genres'),
      api.get('/app/browse/tracks/most-played', {
        params: {
          page: 1,
          limit: 100,
        },
      }),
      api.get('/app/browse/artists/most-followed', {
        params: {
          page: 1,
          limit: 60,
        },
      }),
    ]);

    if (recentlyPlayed) {
      yield put(setList(recentlyPlayed.data.tracks, 'recentlyPlayed'));
    }

    yield put(setList(trending.data.tracks, 'trending'));
    yield put(setList(genres.data.genres, 'genres'));
    yield put(setList(mostPlayed.data.tracks, 'mostPlayed'));
    yield put(setList(mostFollowed.data.artists, 'mostFollowed'));
  } catch (err) {
    yield put(failure(err));
  }
}

export default function* browseSaga() {
  yield all([takeLatest(BrowseTypes.FETCH_BROWSE, fetchBrowse)]);
}
