// @Vendors
import axios from 'axios';
import { BASE_API } from "constants/index";

export function searchSaimeService(keyword) {
	const cedula = {cedula: keyword}
	return axios.post(`${BASE_API}/saime`, { params: cedula })
}

export function registerNewUserService(data) {
	return axios.post(`${BASE_API}/registro`, { params: data })
}