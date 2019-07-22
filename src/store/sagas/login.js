import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { Types as LoginTypes, Creators as LoginActions } from '../ducks/login';


import api from '../../services/api';

const {
  failureLogin,
} = LoginActions;

export function* requestLogin({ form }) {
  try {
    const response = yield call(api.post, '/app/sessions', { ...form });

    localStorage.setItem('@STMusic:token', response.data.jwt);
    yield put(push('/'));
  } catch (err) {
    if (err.response.status === 401) {
      yield put(failureLogin('Email ou senha incorretos'));
    }

    if (err.response.status === 500) {
      yield put(failureLogin('Erro interno no servidor'));
    }
  }
}

export default function* loginSaga() {
  yield all([takeLatest(LoginTypes.REQUEST_LOGIN, requestLogin)]);
}
