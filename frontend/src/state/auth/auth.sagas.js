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
import {
  CLEAR_USER,
  SET_PROFILES,
  SET_UBICATION,
  SET_REPRESENTANTE,
  // CLEANERS
  SET_ONE_USER,
  CLEAR_PROFILES,
  CLEAR_UBICATION,
  CLEAR_REPRESENTANTE
} from 'state/users/users.actionsTypes'

import {buildErrorsObj} from 'utils/helpers'

function* loginWorker({ payload }) {
  try {
    yield put({ type: REQUEST_STARTED })
    
    const response = yield call(postLoginService, payload);
    const _TOKEN_ = response.data.token

    if(_TOKEN_) {
      yield call(setToken, _TOKEN_)
      const {user} = jsonwebtoken.decode(_TOKEN_)

      // Desglosar informacion del usuario y repartirla
      const {
        Permisos,
        usuarios_domicilio: _UBICATION,
        usuarios_perfil: _PROFILES,
        usuarios_representante: _REPRESENTANT,
        username
      } = user

      const _USER = { isAuthenticated: true, username: username, Permisos}

      yield put({ type: SET_ONE_USER, payload: _USER })
      yield put({ type: SET_PROFILES, payload: _PROFILES })
      yield put({ type: SET_UBICATION, payload: _UBICATION })
      yield put({ type: SET_REPRESENTANTE, payload: _REPRESENTANT })

      yield put({ type: REQUEST_SUCCESS, payload: `Bienvenido ${username}` })
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

  if(_TOKEN_) {
    const {exp} = jsonwebtoken.decode(_TOKEN_)
    if(exp < Math.floor(Date.now() / 1000)){
      yield put({ type: LOGOUT })
    } else {
      const {user} = jsonwebtoken.decode(_TOKEN_)
      // Desglosar informacion del usuario y repartirla
      const {
        Permisos,
        usuarios_domicilio: _UBICATION,
        usuarios_perfil: _PROFILES,
        usuarios_representante: _REPRESENTANT,
        username
      } = user
      // Agregar valores al estado
      const _USER = { isAuthenticated: true, username: username, Permisos}
      yield put({ type: SET_ONE_USER, payload: _USER })
      yield put({ type: SET_PROFILES, payload: _PROFILES })
      yield put({ type: SET_UBICATION, payload: _UBICATION })
      yield put({ type: SET_REPRESENTANTE, payload: _REPRESENTANT })
    }
  }
}

function* logoutWorker() {
  const isRemove = yield call(removeToken)
  if(isRemove) {
    yield put({ type: REQUEST_SUCCESS, payload: "¡Su sesión ha finalizado!"})
    yield put({ type: CLEAR_USER })
    yield put({ type: CLEAR_PROFILES })
    yield put({ type: CLEAR_UBICATION })
    yield put({ type: CLEAR_REPRESENTANTE })
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