// @Vendors
import request from 'utils/request'
import { BASE_API } from "constants/index"

export function getCategoriasService() {
	return request.post(`${BASE_API}/categorias`, { params: {borrado: false} })
}

export function createCategoriaService(params) {
	return request.post(`${BASE_API}/categorias/create`, { params })
}

export function updateCategoriaService(params) {
	return request.post(`${BASE_API}/categorias/update`, { params })
}

export function deleteCategoriaService(params) {
	return request.post(`${BASE_API}/categorias/delete`, { params })
}