import { put, takeLatest, call } from 'redux-saga/effects';
import { get } from 'lodash';

//Api
import { postLogin, getUser } from './auth.services';

import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  GET_AUTH,
  USER_LOADED,
  LOGIN,
  LOGOUT,
  CLEAR_LOGIN,
} from './auth.actionsTypes';

function* failureWorker({ payload }) {
  yield put({ type: REQUEST_FAILURE });
}

function* login({ payload }) {
  try {
    yield put({ type: REQUEST_STARTED });
    
    const response = yield call(postLogin, payload);
    // console.log(response);
    const token = get(response, 'data.jwt', {});
    localStorage.setItem('token', token);
    const data = {
      isAuthenticated: true,
      username: response.data.user.username,
      email: response.data.user.email,
      role: response.data.user.role.name,
    };
    yield put({
      type: USER_LOADED,
      payload: data,
    });
    yield put({ type: REQUEST_FINISHED });
  } catch (err) {
    console.log(err.data);
  }
}

function* getAuthWorker() {
  try {
    yield put({ type: REQUEST_STARTED });
    const response = yield call(getUser);
    const data = {
      isAuthenticated: true,
      username: response.data.username,
      email: response.data.email,
      role: response.data.role.name,
    };
    yield put({
      type: USER_LOADED,
      payload: data,
    });
  } catch (err) {}
  yield put({ type: REQUEST_FINISHED });
}

function* logoutWorker() {
  localStorage.removeItem('token');
  yield put({
    type: CLEAR_LOGIN,
  });
}

// Whatcher
function* requestWatcher() {
  yield takeLatest(REQUEST_FAILURE, failureWorker);
  yield takeLatest(LOGIN, login);
  yield takeLatest(GET_AUTH, getAuthWorker);
  yield takeLatest(LOGOUT, logoutWorker);
}

export default { requestWatcher };
