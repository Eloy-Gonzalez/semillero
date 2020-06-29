// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'

// @services
import {getProyectsService} from './proyects.services'
import {buildErrorsObj} from 'utils/helpers'

// @ActionsTypes
import {
  GET_PROYECTS,
  REGITER_NEW_PROYECT
} from 'state/users/users.actionsTypes'
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS
} from 'state/app/app.actionTypes'


function* registerNewProyect({ payload }){
  try {
    yield put({ type: REQUEST_STARTED })
    alert("Registrar")
    // yield put({ type: REQUEST_SUCCESS, payload: "¡Datos registrados!"})
    // yield put({ type: REQUEST_FAILURE, payload: { serverErrors: message} })
    yield put({ type: REQUEST_FINISHED })
  } catch(err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

function* getProyectsWorker({ payload }){
  try {
    yield put({ type: REQUEST_STARTED })
    const res = yield call(getProyectsService, payload)
    console.log(res)
    // yield put({ type: REQUEST_SUCCESS, payload: "¡Datos registrados!"})
    // yield put({ type: REQUEST_FAILURE, payload: { serverErrors: message} })
    yield put({ type: REQUEST_FINISHED })
  } catch(err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

// @Whatcher
function* requestWatcher() {
  yield takeLatest(GET_PROYECTS, getProyectsWorker)
  yield takeLatest(REGITER_NEW_PROYECT, registerNewProyect)
}

export default { requestWatcher }