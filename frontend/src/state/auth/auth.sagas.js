// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects';
import jsonwebtoken from 'jsonwebtoken'

// @Helpers
import { getToken, setToken, removeToken } from 'utils/helpers';

// @services
import { postLoginService } from './auth.services';

// @ActionsTypes
import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH
} from './auth.actionsTypes';
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS
} from 'state/app/app.actionTypes'
import { SET_ONE_USER, CLEAR_USER } from 'state/users/users.actionsTypes'

import {buildErrorsObj} from 'utils/helpers'

function* loginWorker({ payload }) {
  try {
    yield put({ type: REQUEST_STARTED })
    
    const response = yield call(postLoginService, payload);
    const _TOKEN_ = response.data.token

    if(_TOKEN_) {
      const {username} = jsonwebtoken.decode(_TOKEN_)
      const rol_id = 2
      const payload = { isAuthenticated: true, username, rol_id}
      
      yield put({ type: REQUEST_SUCCESS, payload: 'Bienvenido '+username })
      yield put({ type: SET_ONE_USER, payload })
      yield call(setToken, _TOKEN_)

    } else {
      yield put({
        type: REQUEST_FAILURE,
        payload: {
          serverErrors: response.data.alert.message, 
          statusError: response.status
        }
      })
    }

    yield put({ type: REQUEST_FINISHED });
  } catch (err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

function* checkAuthenticationWorker() {
  const _TOKEN_ = yield call(getToken)
  const rol_id = 2

  if(_TOKEN_) {
    const {username, exp} = jsonwebtoken.decode(_TOKEN_)
    if(exp < Math.floor(Date.now() / 1000)){
      yield put({ type: LOGOUT })
    } else {
      const payload = { isAuthenticated: true, username, rol_id }
      yield put({ type: SET_ONE_USER, payload });
    }
  }
}

function* logoutWorker() {
  const isRemove = yield call(removeToken)
  if(isRemove) {
    yield put({ type: REQUEST_SUCCESS, payload: "¡Su sesión ha finalizado!"})
    yield put({ type: CLEAR_USER })
  } else {
    yield put({
      type: REQUEST_FAILURE,
      payload: {
        serverErrors: "Ocurrió un error al cerrar sesión", 
        statusError: 502
      }
    })
  }
}

// @Whatcher
function* requestWatcher() {
  yield takeLatest(LOGIN, loginWorker)
  yield takeLatest(CHECK_AUTH, checkAuthenticationWorker)
  yield takeLatest(LOGOUT, logoutWorker)
}

export default {requestWatcher}