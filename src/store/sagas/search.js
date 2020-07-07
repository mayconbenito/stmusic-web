import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '../../services/api';
import {
  Types as SearchTypes,
  Creators as SearchActions,
} from '../ducks/search';

const { successSearch, failureSearch } = SearchActions;

function* fetchSearch({ query }) {
  try {
    const response = yield call(api.get, `/app/search/${query}`, {
      params: {
        limit: 20,
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
