import { push } from 'connected-react-router';
import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
import { Creators as LibraryPlaylistActions } from '../ducks/libraryPlaylist';
import {
  Types as PlaylistTypes,
  Creators as PlaylistActions,
} from '../ducks/playlist';

const {
  successPlaylist,
  failurePlaylist,
  successTracks,
  failureTracks,
  failureDeletePlaylist,
  successCreatePlaylist,
  failureCreatePlaylist,
} = PlaylistActions;

function* fetchPlaylist({ playlistId }) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, `/app/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(successPlaylist(response.data.playlist));
  } catch (err) {
    yield put(failurePlaylist(err));
  }
}

function* fetchTracks({ page = 1, playlistId }) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(
      api.get,
      `/app/playlists/${playlistId}/tracks`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
        },
      }
    );

    yield put(successTracks(response.data.tracks, response.data.meta.total));
  } catch (err) {
    yield put(failureTracks(err));
  }
}

function* requestDeletePlaylist({ id }) {
  try {
    const response = yield call(api.delete, `/app/playlists/${id}`);

    if (response.status === 204) {
      yield all([
        put(LibraryPlaylistActions.clearPlaylists()),
        put(LibraryPlaylistActions.fetchPlaylists(1)),
        put(push('/library/playlists')),
      ]);
    }
  } catch (err) {
    if (err.response.status === 500) {
      yield put(failureDeletePlaylist('Erro interno no servidor'));
    }
  }
}

function* requestCreatePlaylist({ name }) {
  try {
    const response = yield call(api.post, '/app/me/playlists', {
      name,
    });

    if (response.status === 200) {
      yield all([
        put(successCreatePlaylist()),
        put(LibraryPlaylistActions.clearPlaylists()),
        put(LibraryPlaylistActions.fetchPlaylists(1)),
      ]);
    }
  } catch (err) {
    if (err.response.status === 500) {
      yield put(failureCreatePlaylist('Erro interno no servidor'));
    }
  }
}

export default function* artistSaga() {
  yield all([
    takeLatest(PlaylistTypes.FETCH_PLAYLIST, fetchPlaylist),
    takeLatest(PlaylistTypes.FETCH_TRACKS, fetchTracks),
    takeLatest(PlaylistTypes.REQUEST_CREATE_PLAYLIST, requestCreatePlaylist),
    takeLatest(PlaylistTypes.REQUEST_DELETE_PLAYLIST, requestDeletePlaylist),
  ]);
}
