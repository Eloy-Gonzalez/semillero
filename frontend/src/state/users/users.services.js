// @Vendors
import axios from 'axios'
import { BASE_API } from "constants/index"

export function searchSaimeService(keyword) {
	return axios.post(`${BASE_API}/saime`, { params: keyword })
}

export function registerNewUserService(data) {
	return axios.post(`${BASE_API}/registro`, { params: data })
}

export function checkUserService(data) {
	return axios.post(`${BASE_API}/checkuser`, { params: data })
}