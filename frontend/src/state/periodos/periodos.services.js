// @Vendors
import axios from 'axios'
import { BASE_API } from "constants/index"

export function getPeriodosService(borrado = false) {
	return axios.post(`${BASE_API}/periodos`, { params: borrado })
}