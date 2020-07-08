// @Vendors
import axios from 'axios';
import { BASE_API } from "constants/index";

export function postLoginService(data) {
  return axios.post(`${BASE_API}/login`, { params: data })
}

export function activateAccountService(data) {
  return axios.post(`${BASE_API}/activateuser`, { params: data })
}

export function checkUserService(data) {
	return axios.post(`${BASE_API}/recoverpassword`, { params: data })	
}

export function checkUser2Service(data) {
	return axios.post(`${BASE_API}/recoverpassword2`, { params: data })	
}