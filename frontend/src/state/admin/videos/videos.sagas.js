// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'

// @services
import {getVideosServices} from './videos.services'
import {buildErrorsObj} from 'utils/helpers'

// @ActionsTypes
import {
  GET_VIDEOS,
  SET_VIDEOS
} from './videos.actionsTypes'
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS
} from 'state/app/app.actionTypes'


function* getVideosWorker() {
  try {
    yield put({ type: REQUEST_STARTED })

    const res = yield call(getVideosServices, {borrado: false})
    const {data} = res
    if(data.rows) {
      yield put({ type: SET_VIDEOS, payload: data})
    } else {
      const {message, status} = data.alert
      yield put({
        type: REQUEST_FAILURE,
        payload: {
          serverErrors: message,
          statusError: status
        }
      })
    }

    yield put({ type: REQUEST_FINISHED })
  } catch (err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

// @Whatcher
function* requestWatcher() {
  yield takeLatest(GET_VIDEOS, getVideosWorker)
}

export default { requestWatcher }