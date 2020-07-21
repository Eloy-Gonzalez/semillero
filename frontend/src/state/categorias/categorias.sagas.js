// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'

// @services
import {getCategoriasService} from './categorias.services'
import {buildErrorsObj} from 'utils/helpers'

// @ActionsTypes
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE
} from 'state/app/app.actionTypes'
import {
  GET_CATEGORIAS,
  SET_CATEGORIAS
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

// @Whatcher
function* requestWatcher() {
  yield takeLatest(GET_CATEGORIAS, getCategoriasWorker)
}

export default { requestWatcher }