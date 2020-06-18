import { get } from 'lodash';
// ruta del servidor

/* export const url = axios.create({
  baseURL: 'http://172.17.9.100/wp-json'
}) */
/* export const url = axios.create({
  baseURL: 'http://rest-intranet.test/wp-json',
});
 */

export const serverUrl = 'http://10.11.11.34:1337';

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
};
