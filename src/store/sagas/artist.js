import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
import session from '../../services/session';
import {
  Types as ArtistTypes,
  Creators as ArtistActions,
} from '../ducks/artist';
import { Creators as LibraryArtistActions } from '../ducks/libraryArtist';

const {
  successArtist,
  setFollowingState,
  failureArtist,
  successTracks,
  successMostPlayedTracks,
  successAlbums,
  successFollowArtist,
  successUnfollowArtist,
} = ArtistActions;

function* fetchArtist({ artistId }) {
  try {
    const [artist, albums, tracks, mostPlayedTracks] = yield Promise.all([
      api.get(`/app/artists/${artistId}`),
      api.get(`/app/artists/${artistId}/albums`, {
        page: 1,
        limit: 100,
      }),
      api.get(`/app/artists/${artistId}/tracks`, {
        page: 1,
        limit: 15,
      }),
      api.get(`/app/artists/${artistId}/most-played-tracks`, {
        page: 1,
        limit: 15,
      }),
    ]);

    yield all([
      put(successArtist(artist.data.artist)),
      put(successAlbums(albums.data.albums, albums.data.meta.total)),
      put(successTracks(tracks.data.tracks, tracks.data.meta.total)),
      put(
        successMostPlayedTracks(
          mostPlayedTracks.data.tracks,
          mostPlayedTracks.data.meta.total
        )
      ),
    ]);

    let followingState = false;
    if (session()) {
      const followingArtists = yield call(
        api.get,
        `/app/me/following/artists/contains?artists=${artistId}`
      );

      followingState = followingArtists.data.artists.find(
        (itemId) => itemId === parseInt(artistId)
      );
    }

    yield put(setFollowingState(followingState));
  } catch (err) {
    yield put(failureArtist(err));
  }
}

function* followArtist({ artistId }) {
  try {
    const response = yield call(api.put, '/app/me/following/artists', {
      artists: [parseInt(artistId)],
    });

    if (response.status === 204) {
      yield all([
        put(successFollowArtist()),
        put(LibraryArtistActions.clearArtists()),
        put(LibraryArtistActions.fetchArtists(1)),
      ]);
    }
    // eslint-disable-next-line no-empty
  } catch (err) {}
}

function* unfollowArtist({ artistId }) {
  try {
    const response = yield call(api.delete, '/app/me/following/artists', {
      data: {
        artists: [parseInt(artistId)],
      },
    });

    if (response.status === 204) {
      yield all([
        put(successUnfollowArtist()),
        put(LibraryArtistActions.clearArtists()),
        put(LibraryArtistActions.fetchArtists(1)),
      ]);
    }
    // eslint-disable-next-line no-empty
  } catch (err) {}
}

export default function* artistSaga() {
  yield all([
    takeLatest(ArtistTypes.FETCH_ARTIST, fetchArtist),
    takeLatest(ArtistTypes.FOLLOW_ARTIST, followArtist),
    takeLatest(ArtistTypes.UNFOLLOW_ARTIST, unfollowArtist),
  ]);
}
