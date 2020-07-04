// @Vendors
import axios from 'axios'
import { BASE_API } from "constants/index"

export function getFasesService() {
	return axios.post(`${BASE_API}/fases`, { params: {} })
}