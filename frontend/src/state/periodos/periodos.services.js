// @Vendors
import request from 'utils/request'
import { BASE_API } from "constants/index"

export function getPeriodosService() {
	return request.post(`${BASE_API}/periodos`, { params: {borrado: false} })
}

export function createPeriodoService(params) {
	return request.post(`${BASE_API}/periodos/create`, { params })
}

export function updateProyectService(params) {
	return request.post(`${BASE_API}/periodos/update`, { params })
}

export function deleteProyectService(params) {
	return request.post(`${BASE_API}/periodos/delete`, { params })
}