// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'
import jsonwebtoken from 'jsonwebtoken'

// @services && @Utils
import {getPeriodosService} from './periodos.services'
import {buildErrorsObj, getToken} from 'utils/helpers'

// @ActionsTypes
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS
} from 'state/app/app.actionTypes'
import {
  GET_PERIODOS,
  SET_PERIODOS,
  CREATE_PERIODO,
  DELETE_PERIODO
} from './periodos.actionsTypes'

function* getPeriodosWorker(){
  try {
    yield put({ type: REQUEST_STARTED })
      const response = yield call(getPeriodosService)
      const {data} = response
      yield put({ type: SET_PERIODOS, payload: response.data})
    yield put({ type: REQUEST_FINISHED })
  } catch(err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

function* createPeriodoWorker({ payload }){
  try {
    yield put({ type: REQUEST_STARTED })
      
      console.log(payload)

    yield put({ type: REQUEST_FINISHED })
  } catch(err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

function* deletePeriodoWorker({ payload }){
  try {
    yield put({ type: REQUEST_STARTED })

    const {user} = jsonwebtoken.decode(getToken())
    const {id, version, periodos} = payload
    const newsPeriodos = periodos.filter( pro => pro.id !== id)
    const data = {id, actualizado_por:user.id_usuario, version}

    console.log(payload)
    yield put({ type: SET_PERIODOS, payload: newsPeriodos})
    
    /* const response = yield call(deleteProyectService, data)
    const {alert} = response.data
    const {message} = alert

    if(alert.type === "success"){
      yield put({ type: REQUEST_SUCCESS, payload: message})
    } else {
        yield put({
          type: REQUEST_FAILURE,
          payload: {
            serverErrors: message, 
            statusError: 502
          }
        })
    }
    */
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
  yield takeLatest(CREATE_PERIODO, createPeriodoWorker)
  yield takeLatest(GET_PERIODOS, getPeriodosWorker)
  yield takeLatest(DELETE_PERIODO, deletePeriodoWorker)
}

export default { requestWatcher }