import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';
import { Types as SearchTypes, successSearch, failureSearch } from '../ducks/search';

import api from '../../services/api';

function* fetchSearch(action) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, `/app/search/${action.payload.query}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        limit: 50,
        type: 'artist,track',
      },
    });

    yield put(successSearch(response.data));
  } catch (err) {
    yield put(failureSearch(err));
  }
}

export default function* artistSaga() {
  yield all([takeLatest(SearchTypes.REQUEST_SEARCH, fetchSearch)]);
}
