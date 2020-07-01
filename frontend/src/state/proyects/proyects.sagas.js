// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'
import jsonwebtoken from 'jsonwebtoken'

// @services
import {getProyectsService, registerNewProyectService, getPeriodosService} from './proyects.services'
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
  REQUEST_SUCCESS,
  MODAL_CLOSE
} from 'state/app/app.actionTypes'


function* registerNewProyectWorker({ payload: Data }){
  try {
    yield put({ type: REQUEST_STARTED })

    try {
      // Obtener id del usuario
      const {id: id_usuario} = jsonwebtoken.decode(getToken())
      
      // Obtener y filtrar el (los) periodo(s) activo(s)
      const periodos = yield call(getPeriodosService)
      const periodoActivo = periodos.data.filter(periodo => periodo.estado === true)
      const id_periodo = periodoActivo[0].id
      
      // Armar objeto con id del usuario e id periodo activo
      const payload = {id_usuario, id_periodo, ...Data }
        
      const response = yield call(registerNewProyectService, payload)
      const {alert} = response.data
      const {message} = alert

      if(alert.type === "success") {
        yield put({ type: REQUEST_SUCCESS, payload: message})
        yield put({ type: GET_PROYECTS})
        yield put({ type: MODAL_CLOSE})
      } else {
        yield put({
          type: REQUEST_FAILURE,
          payload: {
            serverErrors: message, 
            statusError: 502
          }
        })
      }

    } catch(err) {
      yield put({
        type: REQUEST_FAILURE,
        payload: buildErrorsObj(err)
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

function* getProyectsWorker(){
  try {
    yield put({ type: REQUEST_STARTED })
    const {id: id_usuario} = jsonwebtoken.decode(getToken())
    const payload = {id_usuario}
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
  yield takeLatest(REGITER_NEW_PROYECT, registerNewProyectWorker)
}

export default { requestWatcher }