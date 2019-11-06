import { put, call, all, takeLatest } from 'redux-saga/effects';

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
  successAlbums,
  failureAlbums,
  successFollowArtist,
  successUnfollowArtist,
} = ArtistActions;

function* fetchArtist({ artistId }) {
  try {
    const response = yield call(api.get, `/app/artists/${artistId}`);

    let followingState;
    if (localStorage.getItem('@STMusic:token')) {
      followingState = yield call(
        api.get,
        `/app/me/following/artists/contains?artists=${artistId}`
      );
    }

    yield put(
      successArtist({
        ...response.data.artist,
        followingState: followingState
          ? followingState.data.artists.find(
              itemId => itemId === parseInt(artistId)
            )
          : false,
      })
    );
  } catch (err) {
    yield put(failureArtist(err));
  }
}

function* fetchTracks({ page = 1, artistId }) {
  try {
    const response = yield call(api.get, `/app/artists/${artistId}/tracks`, {
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

function* fetchAlbums({ page = 1, artistId }) {
  try {
    const response = yield call(api.get, `/app/artists/${artistId}/albums`, {
      params: {
        page,
        limit: 100,
      },
    });

    yield put(successAlbums(response.data.albums, response.data.meta.total));
  } catch (err) {
    yield put(failureAlbums(err));
  }
}

function* followArtist({ artistId }) {
  try {
    const response = yield call(api.put, '/app/me/following/artists', {
      artists: [parseInt(artistId)],
    });

    if (response.status === 204) {
      yield put(successFollowArtist());
    }
  } catch (err) {
    console.log(err);
  }
}

function* unfollowArtist({ artistId }) {
  try {
    const response = yield call(api.delete, '/app/me/following/artists', {
      data: {
        artists: [parseInt(artistId)],
      },
    });

    if (response.status === 204) {
      yield put(successUnfollowArtist());
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* artistSaga() {
  yield all([
    takeLatest(ArtistTypes.FETCH_ARTIST, fetchArtist),
    takeLatest(ArtistTypes.FETCH_TRACKS, fetchTracks),
    takeLatest(ArtistTypes.FETCH_ALBUMS, fetchAlbums),
    takeLatest(ArtistTypes.FOLLOW_ARTIST, followArtist),
    takeLatest(ArtistTypes.UNFOLLOW_ARTIST, unfollowArtist),
  ]);
}
