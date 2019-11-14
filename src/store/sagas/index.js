import { all, fork } from 'redux-saga/effects';

import album from './album';
import artist from './artist';
import browse from './browse';
import genre from './genre';
import libraryArtist from './libraryArtist';
import libraryPlaylist from './libraryPlaylist';
import login from './login';
import player from './player';
import playlist from './playlist';
import playlistModal from './playlistModal';
import search from './search';
import signUp from './signUp';

export default function* rootSaga() {
  yield all([
    fork(album),
    fork(genre),
    fork(artist),
    fork(browse),
    fork(libraryArtist),
    fork(libraryPlaylist),
    fork(playlist),
    fork(search),
    fork(login),
    fork(signUp),
    fork(playlistModal),
    fork(player),
  ]);
}
