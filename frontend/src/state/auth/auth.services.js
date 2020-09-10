// @Vendors
import axios from 'axios';
import { BASE_API } from "constants/index";

export function postLoginService(data) {
  return axios.post(`${BASE_API}/login`, { params: data })
}

export function activateAccountService(data) {
  return axios.post(`${BASE_API}/activateuser`, { params: data })
}

export function recoverpassword(data) {
	return axios.post(`${BASE_API}/recoverpassword`, { params: data })	
}

export function recoverpassword2(data) {
	return axios.post(`${BASE_API}/recoverpassword2`, { params: data })	
}

export function updatePasswordSerice(data, token) {
	return axios.post(`${BASE_API}/updatepassword`, { params: data }, {
		headers: {
			'x-mppct-token' : token
		}
	})
}
