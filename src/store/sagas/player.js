import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';

import { Types as PlayerTypes, Creators as PlayerActions } from '../ducks/player';

import api from '../../services/api';

const {
  successPlaylist,
} = PlayerActions;

function* fetchPlaylist({ playlistId }) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, `/app/playlists/${playlistId}/tracks`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        limit: 100,
        page: 1,
      },
    });

    const playlist = yield call(api.get, `/app/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    

    yield put(successPlaylist({ name: playlist.data.playlist.name, tracks: response.data.tracks }));
  } catch (e) {
    console.log('ERrror olayer', e);
  }
}

export default function* playerSaga() {
  yield all([
    takeLatest(PlayerTypes.FETCH_PLAYLIST, fetchPlaylist),
  ]);
}
