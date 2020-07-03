// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'

// @services
import {getPeriodosService} from './periodos.services'
import {buildErrorsObj} from 'utils/helpers'

// @ActionsTypes
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS
} from 'state/app/app.actionTypes'
import {
  GET_PERIODOS,
  SET_PERIODOS
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

// @Whatcher
function* requestWatcher() {
  yield takeLatest(GET_PERIODOS, getPeriodosWorker)
}

export default { requestWatcher }