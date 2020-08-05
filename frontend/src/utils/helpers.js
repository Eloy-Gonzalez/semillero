// @Vendors
import { get } from 'lodash'
import jsonwebtoken from 'jsonwebtoken'
import axios from 'axios'
import {API_KEY, BASE_API} from 'constants/index'
import moment from 'moment'
import 'moment/locale/es'

import {AUTH_TOKEN} from 'state/auth/auth.actionsTypes'

// Operaciones para el Token de Autenticación
export function getToken({key = AUTH_TOKEN, recorted = false} = {}) {
  
  if(recorted) {
    const TOKEN = JSON.parse(localStorage.getItem(key)) || false
    if(TOKEN) {
      const tokenDecode = jsonwebtoken.decode(TOKEN)
      const {exp} = tokenDecode
      const {username, id, borrado, creado_por, actualizado_por} = tokenDecode.user
      const payload = {id, username, exp, creado_por, actualizado_por, borrado}
      const tokenRecorted = jsonwebtoken.sign(payload, API_KEY)
      return tokenRecorted
    }
  }

  return JSON.parse(localStorage.getItem(key)) || false
}

export function setToken(jwt = "", key=AUTH_TOKEN) {
  localStorage.setItem(key, JSON.stringify(jwt));
}

export function removeToken(key = AUTH_TOKEN) {
  if(getToken(key)) {
    localStorage.removeItem(key)
    return true
  }
  return false
}

// Mapear mensajes de errores del servidor
export const buildErrorsObj = (err) => {
  let serverErrors = get(err, 'message', '') || get(err, 'statusText', '') || '¡Ocurrió un error con el servidor!';

  const errNro = get(err, 'errNro', '');
  if (errNro !== '') {
    serverErrors = `${errNro} - ${serverErrors}`;
  }
  return {
    serverErrors,
    statusError: err ? get(err, 'status', '') : 502
  }
}

// Obtener Estados, Municipios y Parroquias de Venezuela.
export function getEstados(id_estado) {
    return axios.post(`${BASE_API}/estados`, { params: {id_estado} })
}

export function getMunicipios(id_estado) {
  return axios.post(`${BASE_API}/municipios`, { params: {id_estado} }) 
}

export function getParroquias(id_municipio) {
  return axios.post(`${BASE_API}/parroquias`, { params: {id_municipio} }) 
}

export function getQuestions() {
  return axios.post(`${BASE_API}/preguntas`, { params: {} }) 
}

export function compareAge(date, edadCompare){
  let diff = moment(new Date()).diff(date)
  let years = moment.duration(diff).years()
    
  return years <= edadCompare ? years : false
}