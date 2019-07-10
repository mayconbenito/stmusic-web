import { all, fork } from 'redux-saga/effects';

import genre from './genre';
import artist from './artist';
import browse from './browse';
import library from './library';
import playlist from './playlist';
import search from './search';
import signIn from './signIn';
import signUp from './signUp';
import playlistModal from './playlistModal';
import player from './player';

export default function* rootSaga() {
  yield all([
    fork(genre),
    fork(artist),
    fork(browse),
    fork(library),
    fork(playlist),
    fork(search),
    fork(signIn),
    fork(signUp),
    fork(playlistModal),
    fork(player),
  ]);
}
