// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'
import jsonwebtoken from 'jsonwebtoken'

// @services
import {getProyectsService} from './proyects.services'
import {buildErrorsObj, getToken} from 'utils/helpers'

// @ActionsTypes
import {
  GET_PROYECTS,
  SET_PROYECTS,
  REGITER_NEW_PROYECT
} from './proyects.actionsTypes'
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
    yield put({ type: REQUEST_FINISHED })
  } catch(err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

function* getProyectsWorker(){
  try {
    yield put({ type: REQUEST_STARTED })
    // const token = jsonwebtoken.decode(getToken())
    const payload = {id_usuario: 2314}
    const response = yield call(getProyectsService, payload)
    const {data} = response

    yield put({ type: SET_PROYECTS, payload: data})
    
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