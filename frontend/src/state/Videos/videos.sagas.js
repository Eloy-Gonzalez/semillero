// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'
import jsonwebtoken from 'jsonwebtoken'

// @services
import {
	0
} from './videos.services'
import {buildErrorsObj, getToken} from 'utils/helpers'

// @ActionsTypes
import {
  GET_VIDEOS,
  SET_PROYECTS,
  REGITER_NEW_VIDEO,
  DELETE_VIDEO
} from './proyects.actionsTypes'
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS
} from 'state/app/app.actionTypes'

function* getVideosWorker(){
  try {
    yield put({ type: REQUEST_STARTED })
    
    const {user} = jsonwebtoken.decode(getToken())
    const {Permisos} = user
    const payload = {permiso: Permisos}

    const response = yield call(getVideosService, payload)
    const {data} = response
    const {rows} = data
    console.log(data)
    // yield put({ type: SET_VIDEOS, payload: rows})

    yield put({ type: REQUEST_FINISHED })
  } catch(err) {
    yield put({
      type: REQUEST_FAILURE,
      payload: buildErrorsObj(err)
    })
  }
}

/*
function* deleteVideoWorker({ payload }){
  try {
    yield put({ type: REQUEST_STARTED })

    const {user} = jsonwebtoken.decode(getToken())
    const {id, version, proyects} = payload
    const data = {id, actualizado_por:user.id, version}

    const response = yield call(deleteProyectService, data)
    const {alert} = response.data
    const {message} = alert

    if(alert.type === "success"){
      const newsProyects = proyects.filter( pro => pro.id !== id)
      yield put({ type: REQUEST_SUCCESS, payload: message})
      yield put({ type: SET_PROYECTS, payload: newsProyects})
    } else {
        yield put({
          type: REQUEST_FAILURE,
          payload: {
            serverErrors: message, 
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
}*/

// @Whatcher
function* requestWatcher() {
  yield takeLatest(GET_VIDEOS, getVideosWorker)
  yield takeLatest(DELETE_VIDEO, deleteVideoWorker)
}

export default { requestWatcher }