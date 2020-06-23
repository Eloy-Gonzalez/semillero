// @Vendors
import { put, takeLatest, call } from 'redux-saga/effects'

// @services
import {searchSaimeService, registerNewUserService} from './users.services'
import {buildErrorsObj} from 'utils/helpers'

// @ActionsTypes
import {
  SEARCH_SAIME,
  SET_PROFILES,
  SET_FORM_STEP,
  REGISTER_NEW_USER
} from 'state/users/users.actionsTypes'
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS
} from 'state/app/app.actionTypes'


function* searchSaimeWorker({ keyword }){
  try {
    yield put({ type: REQUEST_STARTED })
    // Consultar datos de Api - Saime
    const res = yield call(searchSaimeService, keyword)
    const {data} = res
    
    if(data.length) {
      const {cedula, primer_nombre, segundo_nombre,primer_apellido,segundo_apellido,fecha_nacimiento,sexo} = data[0]
      
      const payload = {
        cedula,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        fecha_nacimiento,
        genero: sexo
      }
      
      yield put({ type: SET_PROFILES, payload })
      yield put({ type: REQUEST_SUCCESS, payload: `Usuario encontrado: ${primer_nombre} ${primer_apellido}`})
      yield put({ type: SET_FORM_STEP, payload: {actualVisible: 1} })
    } else {
      yield put({
        type: REQUEST_FAILURE,
        payload: {
          serverErrors: "La cédula indicada es incorrecta", 
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
    
    // Consultar datos de Api - Saime
    const res = yield call(registerNewUserService, payload)
    const {message} = res.data.alert

    if(message !== undefined) {
      if(message.errors !== undefined && message.errors[0].path === "id_periodo") {
        yield put({ type: REQUEST_SUCCESS, payload: `Usuario registrado con éxito`})
        setTimeout(() => {window.location ="/acceder"}, 3000)
      } else {
        yield put({ type: REQUEST_FAILURE, payload: { serverErrors: res.data.alert.message} })
      }
    } else {
      yield put({ type: REQUEST_FAILURE, payload: { serverErrors: "Ocurrió un error al registrar, contacte un administrador"} })
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