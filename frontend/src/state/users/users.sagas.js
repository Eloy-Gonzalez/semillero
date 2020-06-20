// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'

// @services
import { registerUser } from './users.services'

// @ActionsTypes
import {
  REGISTER,
  SET_ONE_USER
} from './users.actionsTypes'
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,

  REQUEST_SUCCESS
} from 'state/app/app.actionsTypes'


function* registerUserWorker({ payload }) {
  try {
    yield put({ type: REQUEST_STARTED })
    
    const response = yield call(registerUser, payload)
    console.log(response)
    if(response) {
      yield put({ type: REQUEST_SUCCESS })
    }
    
    yield put({ type: REQUEST_FINISHED })
  } catch (err) {
    alert("Error al registrar")
    throw new console.error(err)
  }
}

// @Whatcher
function* requestWatcher() {
  yield takeLatest(REGISTER, registerUserWorker)
}

export default { requestWatcher }