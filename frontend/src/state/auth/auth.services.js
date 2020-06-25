// @Vendors
import axios from 'axios';
import { BASE_API } from "constants/index";


export function postLoginService(data) {
  return axios.post(`${BASE_API}/login`, { params: data })
}

/* export function postLogin(data) {
	const body = { params: data }

	return request.post(BASE_API+"/login", body);
}*/