import { put, call, all, takeLatest } from 'redux-saga/effects';
import {
  Types as SearchTypes,
  Creators as SearchActions,
} from '../ducks/search';

import api from '../../services/api';

const { successSearch, failureSearch } = SearchActions;

function* fetchSearch({ query }) {
  try {
    const token = localStorage.getItem('@STMusic:token');
    const response = yield call(api.get, `/app/search/${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        limit: 50,
        type: 'artist,album,track',
      },
    });

    yield put(successSearch(response.data.results));
  } catch (err) {
    yield put(failureSearch(err));
  }
}

export default function* searchSaga() {
  yield all([takeLatest(SearchTypes.FETCH_SEARCH, fetchSearch)]);
}
