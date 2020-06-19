// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects';
import jsonwebtoken from 'jsonwebtoken'

// @services
import { postLogin } from './auth.services';

// @ActionsTypes
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  SET_USER,
  LOGIN,
  LOGOUT,
  CHECK_AUTH
} from './auth.actionsTypes';

// @Helpers
import { getToken, setToken, removeToken } from 'utils/helpers';

function* failureWorker({ payload }) {
  yield put({ type: REQUEST_FAILURE, payload });
}

function* login({ payload }) {
  try {
    yield put({ type: REQUEST_STARTED });
    const response = yield call(postLogin, payload);
    
    if(response.data.token){

      const payload = { isAuthenticated: true, username: "Prueba" }
      const {token} = response.data
      yield put({ type: SET_USER, payload })
      yield call(setToken,token)
    }

    yield put({ type: REQUEST_FINISHED });
  } catch (err) {
    throw new console.error(err);
  }
}

function* checkAuthentication() {
  const _TOKEN_ = yield call(getToken)

  if(_TOKEN_) {
    const {username, exp} = jsonwebtoken.decode(_TOKEN_)
    if(exp < Math.floor(Date.now() / 1000)){
      yield put({ type: LOGOUT })
    } else {
      const payload = { isAuthenticated: true, username }
      yield put({ type: SET_USER, payload });
    }
  }
}

function* logoutWorker() {
  yield call(removeToken)
}

// Whatcher
function* requestWatcher() {
  yield takeLatest(REQUEST_FAILURE, failureWorker)
  yield takeLatest(LOGIN, login)
  yield takeLatest(CHECK_AUTH, checkAuthentication)
  yield takeLatest(LOGOUT, logoutWorker)
}

export default { requestWatcher }