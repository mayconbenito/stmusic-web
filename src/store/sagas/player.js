import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';

import { Types as PlayerTypes, successStream, failureStream } from '../ducks/player';

import api from '../../services/api';

function* fetchStream(action) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, `/app/stream/${action.payload.trackId}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        type: 'play',
      },
    });

    yield put(successStream(response.data.streamInfo.filter(item => item.audioBitrate === 48)));
  } catch (err) {
    yield put(failureStream(err));
  }
}

export default function* artistSaga() {
  yield all([
    takeLatest(PlayerTypes.REQUEST_STREAM, fetchStream),
  ]);
}
