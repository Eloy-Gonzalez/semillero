// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'

// @services
import {searchSaimeService, registerNewUserService, checkUserService} from './users.services'
import {buildErrorsObj} from 'utils/helpers'

// @ActionsTypes
import {
  SEARCH_SAIME,
  SET_PROFILES,
  SET_FORM_STEP,
  REGISTER_NEW_USER,
  SET_REPRESENTANTE
} from 'state/users/users.actionsTypes'
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS
} from 'state/app/app.actionTypes'


function* searchSaimeWorker({payload}){
  try {
    yield put({ type: REQUEST_STARTED })

    // Consultar datos de Api - Saime
    const existsUser = yield call(checkUserService, payload)
    const res = yield call(searchSaimeService, payload)
    const {data} = res

    if(!payload.isRepre && existsUser.data.alert.type === "success"){
      yield put({
        type: REQUEST_FAILURE,
        payload: {
          serverErrors: existsUser.data.alert.message,
          statusError: 502
        }
      })
    } else if(data.length) {
      const {cedula, primer_nombre, segundo_nombre,primer_apellido,segundo_apellido,fecha_nacimiento,sexo} = data[0]

      if(payload.isRepre) {
        const payload = {
          cedula_representante: cedula,
          primer_nombre_representante: primer_nombre,
          segundo_nombre_representante: segundo_nombre,
          primer_apellido_representante: primer_apellido,
          segundo_apellido_representante: segundo_apellido,
          genero_representante: sexo,
          fecha_nacimiento_representante:fecha_nacimiento 
        }
        yield put({type: SET_REPRESENTANTE, payload})
      } else {
        const payload = {
          cedula,
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          fecha_nacimiento,
          genero: sexo
        }
        yield put({type: SET_PROFILES, payload})
      }
      yield put({ type: REQUEST_SUCCESS, payload: `Usuario encontrado: ${primer_nombre} ${primer_apellido}`})
      yield put({ type: SET_FORM_STEP, payload: {actualVisible: 1} })
    } else {
      yield put({
        type: REQUEST_FAILURE,
        payload: {
          serverErrors: "La cédula indicada es incorrecta o no está registrada en nuestra base de datos", 
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

function* registerNewUserWorker({ payload }){
  try {
    yield put({ type: REQUEST_STARTED })

    const response = yield call(registerNewUserService, payload)
    const {alert} = response.data

    if(alert.type === "success"){
      yield put({type: REQUEST_SUCCESS, payload: alert.message})
      setTimeout(() => window.location = "/acceder", 2000)
    } else {
      yield put({type: REQUEST_FAILURE, payload: {serverErrors: alert.message, statusError: 502}})
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
  yield takeLatest(SEARCH_SAIME, searchSaimeWorker)
  yield takeLatest(REGISTER_NEW_USER, registerNewUserWorker)
}

export default { requestWatcher }