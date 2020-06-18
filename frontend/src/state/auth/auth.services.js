import request from '../../utils/request';

export function postLogin(data) {
  const datos = {
    identifier: data.identifier,
    password: data.password,
  };
  return request.post('auth/local', datos);
}

export function getUser() {
  return request.get('users/me');
}
