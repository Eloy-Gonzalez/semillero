// @Vendors
import request from 'utils/request'
import { BASE_API } from "constants/index"

export function getCategoriasService(borrado = false) {
	return request.post(`${BASE_API}/categorias`, { params: borrado })
}