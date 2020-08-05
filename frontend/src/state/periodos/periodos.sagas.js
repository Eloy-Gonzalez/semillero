// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'
import jsonwebtoken from 'jsonwebtoken'

// @services
import {
  getPeriodosService,
  createPeriodoService,
  updateProyectService,
  deleteProyectService
} from './periodos.services'

// @Utils
import {buildErrorsObj, getToken} from 'utils/helpers'

// @ActionsTypes
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS, 
  MODAL_CLOSE
} from 'state/app/app.actionTypes'
import {
  GET_PERIODOS,
  SET_PERIODOS,
  CREATE_PERIODO,
  DELETE_PERIODO,
  UPDATE_PERIODO,
  SHOW_FORM
} from './periodos.actionsTypes'

function* getPeriodosWorker(){
  try {
    yield put({ type: REQUEST_STARTED })
      const response = yield call(getPeriodosService)
      const {data} = response
      yield put({ type: SET_PERIODOS, payload: data})
    yield put({ type: REQUEST_FINISHED })
  } catch(err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

// Create

function* createPeriodoWorker({ payload }){
  try {
    yield put({ type: REQUEST_STARTED }) 
    const TOKEN = jsonwebtoken.decode(getToken({recorted: true}))
    const {id: creado_por} = TOKEN

    const res = yield call(createPeriodoService, {creado_por, ...payload})
    const {data} = res

    if(data.alert.type === "success"){
      yield put({ type: REQUEST_SUCCESS, payload: data.alert.message})
      yield put({ type: SHOW_FORM, payload: false})
      yield put({ type: GET_PERIODOS})
    } else{
        yield put({
          type: REQUEST_FAILURE,
          payload: {
            serverErrors: data.alert.message, 
            statusError: 502
          }
        })
    }
    
    yield put({ type: REQUEST_FINISHED })
  } catch(err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

// Update
function* updatePeriodoWorker({ payload }) {
  try {
    yield put({ type: REQUEST_STARTED })

    const {id: actualizado_por} = jsonwebtoken.decode(getToken({ recorted: true}))
    const params = {...payload, actualizado_por}
    const res = yield call(updateProyectService, params)
    const {alert} = res.data

    if(alert.type === "success") {
      yield put({ type: REQUEST_SUCCESS, payload: alert.message})
      yield put({ type: MODAL_CLOSE})
      yield put({ type: GET_PERIODOS})
    } else {
        yield put({
          type: REQUEST_FAILURE,
          payload: {
            serverErrors: alert.message,
            statusError: 502
          }
        })
    }

    yield put({ type: REQUEST_FINISHED })
  } catch(err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

// Delete
function* deletePeriodoWorker({ payload }){
  try {
    yield put({ type: REQUEST_STARTED })

    const {id: actualizado_por} = jsonwebtoken.decode(getToken({ recorted: true}))
    const params = {actualizado_por, ...payload}
    const res = yield call(deleteProyectService, params)
    const {alert} = res.data

    if(alert.type === "success") {
      const {periodos} = payload
      const newsPeriodos = periodos.filter( pro => pro.id !== payload.id)
      yield put({ type: SET_PERIODOS, payload: newsPeriodos})

      yield put({ type: REQUEST_SUCCESS, payload: alert.message})
    } else {
        yield put({
          type: REQUEST_FAILURE,
          payload: {
            serverErrors: alert.message,
            statusError: 502
          }
        })
    }

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
  yield takeLatest(GET_PERIODOS, getPeriodosWorker)
  yield takeLatest(CREATE_PERIODO, createPeriodoWorker)
  yield takeLatest(DELETE_PERIODO, deletePeriodoWorker)
  yield takeLatest(UPDATE_PERIODO, updatePeriodoWorker)
}

export default { requestWatcher }