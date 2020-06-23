// @Vendors
// import axios from 'axios';
import { BASE_API } from "constants/index";

import request from 'utils/request'

/* export function postLogin(data) {
  return axios.post(`${BASE_API}/login`, { 
  	params: data, 
  	headers: {
  		'Content-Type': 'application/json',
  		'Access-Control-Request-Origin': '*',
  		'Access-Control-Request-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
  	}
  })
} */

export function postLogin(data) {
	const body = { params: data }

	return request.post(BASE_API+"/login", body);
}