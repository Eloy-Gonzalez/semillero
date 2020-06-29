// @Vendors
import { get } from 'lodash'
import axios from 'axios'
import {BASE_API} from 'constants/index'

import {AUTH_TOKEN} from 'state/auth/auth.actionsTypes'

// Operaciones para el Toke de Autenticación
export function getToken(key = AUTH_TOKEN) {
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
  let serverErrors = get(err, 'message', '') || get(err, 'statusText', '') || '¡Ocurrió un error al conectar con el servidor!';

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

export function getCategories() {
  return axios.post(`${BASE_API}/categorias`, { params: {} }) 
}