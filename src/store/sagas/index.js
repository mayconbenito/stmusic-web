import { all, fork } from 'redux-saga/effects';

import album from './album';
import genre from './genre';
import artist from './artist';
import browse from './browse';
import libraryArtist from './libraryArtist';
import libraryPlaylist from './libraryPlaylist';
import playlist from './playlist';
import search from './search';
import login from './login';
import signUp from './signUp';
import playlistModal from './playlistModal';
import player from './player';

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
