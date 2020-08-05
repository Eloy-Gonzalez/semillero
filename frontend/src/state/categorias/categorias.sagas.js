// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'
import jsonwebtoken from 'jsonwebtoken'

// @services
import {
  getCategoriasService,
  createCategoriaService,
  updateCategoriaService,
  deleteCategoriaService
} from './categorias.services'

// @Utils
import {
  buildErrorsObj,
  getToken
} from 'utils/helpers'

// @ActionsTypes
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS,
  MODAL_CLOSE
} from 'state/app/app.actionTypes'
import {
  GET_CATEGORIAS,
  SET_CATEGORIAS,
  CREATE_CATEGORIA,
  UPDATE_CATEGORIA,
  DELETE_CATEGORIA
} from './categorias.actionsTypes'

function* getCategoriasWorker(){
  try {
    yield put({ type: REQUEST_STARTED })
      const response = yield call(getCategoriasService)
      const {data} = response
      yield put({ type: SET_CATEGORIAS, payload: data})
    yield put({ type: REQUEST_FINISHED })
  } catch(err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

// Create
function* createCategoriaWorker({ payload }){
  try {
    yield put({ type: REQUEST_STARTED })
    const {id: creado_por} = jsonwebtoken.decode(getToken({ recorted: true}))

    const res = yield call(createCategoriaService, {creado_por, ...payload})
    const {alert} = res.data

    if(alert.type === "success") {
      yield put({ type: MODAL_CLOSE})
      yield put({ type: GET_CATEGORIAS})
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

// Delete
function* deleteCategoriaWorker ({ payload }){
  try {
    yield put({ type: REQUEST_STARTED })
    const {id: actualizado_por} = jsonwebtoken.decode(getToken({ recorted: true}))

    const res = yield call(deleteCategoriaService, {actualizado_por, ...payload})
    const {alert} = res.data

    if(alert.type === "success") {
      yield put({ type: GET_CATEGORIAS})
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

// Update
function* updateCategoriaWorker ({ payload }){
  try {
    yield put({ type: REQUEST_STARTED })
    const {id: actualizado_por} = jsonwebtoken.decode(getToken({ recorted: true}))

    const res = yield call(updateCategoriaService, {...payload, actualizado_por})
    const {alert} = res.data

    if(alert.type === "success") {
      yield put({ type: MODAL_CLOSE})
      yield put({ type: GET_CATEGORIAS})
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
  yield takeLatest(GET_CATEGORIAS, getCategoriasWorker)
  yield takeLatest(CREATE_CATEGORIA, createCategoriaWorker)
  yield takeLatest(DELETE_CATEGORIA, deleteCategoriaWorker)
  yield takeLatest(UPDATE_CATEGORIA, updateCategoriaWorker)
}

export default { requestWatcher }