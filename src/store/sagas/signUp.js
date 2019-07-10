import {
  put, call, all, takeLatest,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { Types as SignUpTypes, failureSignUp } from '../ducks/signUp';


import api from '../../services/api';

function* requestSignUp(action) {
  try {
    const response = yield call(api.post, '/app/register', { ...action.payload.form });

    localStorage.setItem('@STMusic:token', response.data.jwt);
    yield put(push('/'));
  } catch (err) {
    if (err.response.data.error.code === 'EmailAlreadyUsed') {
      yield put(failureSignUp('Endereço de email em uso'));
    }

    if (err.response.status === 500) {
      yield put(failureSignUp('Erro interno no servidor'));
    }
  }
}

export default function* artistSaga() {
  yield all([takeLatest(SignUpTypes.REQUEST_SIGN_UP, requestSignUp)]);
}
