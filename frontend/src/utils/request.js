import axios from 'axios';

function setHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Request-Origin': '*',
    'Access-Control-Request-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
  };
}

class Request {
  constructor() {
    const request = axios.create({
      baseURL: 'http://10.11.11.34:1337/',
    });
    request.interceptors.request.use(this.authorizationInterceptor);
    request.interceptors.response.use(this.handleSuccess, this.handleError);
    this.request = request;
  }

  authorizationInterceptor = (config) => {
    const newConfig = config;
    const token = localStorage.getItem('token');

    if (token) {
      newConfig.headers.Authorization = 'Bearer ' + token;
    }
    return newConfig;
  };

  handleSuccess = (response) => response;

  handleError = (error) => {
    throw error.response;
  };

  get(path, payload) {
    return this.request.get(path, {
      params: payload,
    });
  }

  delete(path, payload) {
    return this.request.delete(path, payload);
  }

  post(path, payload) {
    return this.request.request({
      method: 'POST',
      url: path,
      // headers: setHeaders(),
      cache: 'default',
      responseType: 'json',
      data: payload,
    });
  }

  put(path, payload) {
    const resp = this.request.request({
      method: 'PUT',
      url: path,
      headers: setHeaders(),
      responseType: 'json',
      data: payload,
    });
    return resp;
  }
}

export default new Request();
