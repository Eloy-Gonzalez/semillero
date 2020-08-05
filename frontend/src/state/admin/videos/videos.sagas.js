// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'
import { getToken } from 'utils/helpers'
import jsonwebtoken from 'jsonwebtoken'

// @services
import {
  getVideosServices,
  updateVideoServices,
  deleteVideoServices,
  restoreVideoServices
} from './videos.services'
import {buildErrorsObj} from 'utils/helpers'

// @ActionsTypes
import {
  GET_VIDEOS,
  SET_VIDEOS,
  UPDATE_VIDEO,
  DELETE_VIDEO,
  RESTORE_VIDEO
} from './videos.actionsTypes'
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS,
  MODAL_CLOSE
} from 'state/app/app.actionTypes'


function* getVideosWorker({ borrado = false} = {}) {
  try {
    yield put({ type: REQUEST_STARTED })
    // const offset = (page-1) * limit

    const res = yield call(getVideosServices, {borrado})
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

function* updateVideoWorker({ payload }) {
  try {
    yield put({ type: REQUEST_STARTED })

    const TOKEN = jsonwebtoken.decode(getToken({ recorted: true }))
    const {id:actualizado_por} = TOKEN
    const params = {actualizado_por, ...payload}

    const res = yield call(updateVideoServices, params)
    const {data} = res
    console.log(data)
    
    /*
    if(data.rows) {
     
    } else {
      
      yield put({
        type: REQUEST_FAILURE,
        payload: {
          serverErrors: message,
          statusError: status
        }
      })
    }*/

    yield put({ type: REQUEST_FINISHED })
  } catch (err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

// DELETE
function* deleteVideoWorker({ payload }){
  const TOKEN = jsonwebtoken.decode(getToken({ recorted: true }))
  const {id:actualizado_por} = TOKEN
  const params = {actualizado_por, ...payload}
  const res = yield call(deleteVideoServices, params)
  const {data} = res

   if(data.alert.type === "success") {
    yield put({ type: MODAL_CLOSE})
    yield put({ type: GET_VIDEOS })
    yield put({ type: REQUEST_SUCCESS, payload: data.alert.message})
   }else {
      yield put({
        type: REQUEST_FAILURE,
        payload: {
          serverErrors: data.alert.message,
          statusError: data.alert.status
        }
      })
   }
}

function* restoreVideoWorker({ payload }){
  const TOKEN = jsonwebtoken.decode(getToken({ recorted: true }))
  const {id:actualizado_por} = TOKEN
  const params = {actualizado_por, ...payload}
  const res = yield call(restoreVideoServices, params)
  const {data} = res

   if(data.alert.type === "success") {
    yield put({ type: REQUEST_SUCCESS, payload: data.alert.message})
   }else {
      yield put({
        type: REQUEST_FAILURE,
        payload: {
          serverErrors: data.alert.message,
          statusError: data.alert.status
        }
      })
   }
}

// @Whatcher
function* requestWatcher() {
  yield takeLatest(GET_VIDEOS, getVideosWorker)
  yield takeLatest(UPDATE_VIDEO, updateVideoWorker)
  yield takeLatest(DELETE_VIDEO, deleteVideoWorker)
  yield takeLatest(RESTORE_VIDEO, restoreVideoWorker)
}

export default { requestWatcher }