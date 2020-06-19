// @Vendors
import { get } from 'lodash'

import {AUTH_TOKEN} from 'state/auth/auth.actionsTypes'

// Operaciones para el Toke de Autenticación
export function getToken() {
  return JSON.parse(localStorage.getItem(AUTH_TOKEN)) || false
}

export function setToken(jwt = "") {
  localStorage.setItem(AUTH_TOKEN, JSON.stringify(jwt));
}

export function removeToken(){
  localStorage.removeItem(AUTH_TOKEN)
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