import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { Types as SignInTypes, failureSignIn } from '../ducks/signIn';


import api from '../../services/api';

export function* requestSignIn(action) {
  try {
    const response = yield call(api.post, '/app/sessions', { ...action.payload.form });

    localStorage.setItem('@STMusic:token', response.data.jwt);
    yield put(push('/'));
  } catch (err) {
    if (err.response.status === 401) {
      yield put(failureSignIn('Email ou senha incorretos'));
    }

    if (err.response.status === 500) {
      yield put(failureSignIn('Erro interno no servidor'));
    }
  }
}

export default function* artistSaga() {
  yield all([takeLatest(SignInTypes.REQUEST_SIGN_IN, requestSignIn)]);
}
