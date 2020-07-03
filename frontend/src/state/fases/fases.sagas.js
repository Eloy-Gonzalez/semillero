// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'

// @services
import {getFasesService} from './fases.services'
import {buildErrorsObj} from 'utils/helpers'

// @ActionsTypes
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS
} from 'state/app/app.actionTypes'
import {
  GET_FASES,
  SET_FASES
} from './fases.actionsTypes'

function* getFasesWorker(){
  try {
    yield put({ type: REQUEST_STARTED })
      const response = yield call(getFasesService)
      const {data} = response
      yield put({ type: SET_FASES, payload: response.data})
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
  yield takeLatest(GET_FASES, getFasesWorker)
}

export default { requestWatcher }