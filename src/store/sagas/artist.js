import {
  put,
  call,
  all,
  takeLatest,
} from 'redux-saga/effects';

import {
  Types as ArtistTypes,
  Creators as ArtistActions,
} from '../ducks/artist';

import api from '../../services/api';

const {
  successArtist,
  failureArtist,
  successTracks,
  failureTracks,
} = ArtistActions;

function* fetchArtist({ artistId }) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, `/app/artists/${artistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(successArtist(response.data.artist));
  } catch (err) {
    yield put(failureArtist(err));
  }
}

function* fetchTracks({ page = 1, artistId }) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, `/app/artists/${artistId}/tracks`, {
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

export default function* artistSaga() {
  yield all([
    takeLatest(ArtistTypes.FETCH_ARTIST, fetchArtist),
    takeLatest(ArtistTypes.FETCH_TRACKS, fetchTracks),
  ]);
}
