// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects';
import jsonwebtoken from 'jsonwebtoken'

// @Helpers
import { getToken, setToken, removeToken } from 'utils/helpers';

// @services
import { postLogin } from './auth.services';

// @ActionsTypes
import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH
} from './auth.actionsTypes';
import {
  REQUEST_STARTED,
  REQUEST_FINISHED
} from 'state/app/app.actionTypes'
import { SET_ONE_USER } from 'state/users/users.actionsTypes'

function* login({ payload }) {
  try {
    yield put({ type: REQUEST_STARTED });
    
    const response = yield call(postLogin, payload);
    const _TOKEN_ = response.data.token
    if(_TOKEN_){
      const {username} = _TOKEN_
      const payload = { isAuthenticated: true, username }
      yield put({ type: SET_ONE_USER, payload });
      yield call(setToken, _TOKEN_)
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
      yield put({ type: SET_ONE_USER, payload });
    }
  }
}

function* logoutWorker() {
  yield call(removeToken)
}

// @Whatcher
function* requestWatcher() {
  yield takeLatest(LOGIN, login)
  yield takeLatest(CHECK_AUTH, checkAuthentication)
  yield takeLatest(LOGOUT, logoutWorker)
}

export default {requestWatcher}