import axios from 'axios';
import {
  getToken
} from './helpers';

function setHeaders() {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Request-Origin': '*',
      'Access-Control-Request-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    }; 
}

class Request {
  constructor() {
    const request = axios.create();
    request.interceptors.request.use(this.authorizationInterceptor);
    request.interceptors.response.use(this.handleSuccess, this.handleError);
    this.request = request;
  }

  authorizationInterceptor = config => {
    const newConfig = config;
    const token = getToken();
    if (token)
      newConfig.headers['x-crs-mppct-token'] = getToken();
  
    return newConfig;
  }

  handleSuccess = response => response;

  handleError = error => {
    throw error.response;
  };

  get(path) {
    return this.request.get(path);
  }

  delete(path) {
    return this.request.delete(path);
  }

  post(path, payload) {
    return this.request.request({
      method: 'POST',
      url: path,
      headers: setHeaders(),
      cache: 'default',
      responseType: 'json',
      data: payload
    });
  }

  put(path, payload) {
    const resp = this.request.request({
      method: 'PATCH',
      url: path,
      headers: setHeaders(),
      responseType: 'json',
      data: payload
    });
    return resp;
  }
}

export default new Request();