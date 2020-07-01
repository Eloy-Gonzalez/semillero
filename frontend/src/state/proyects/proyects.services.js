import request from 'utils/request'
import { BASE_API } from "constants/index"

export function getProyectsService(payload) {
	return request.post(`${BASE_API}/proyectos`, { params: payload })
}

export function getCategoriesService(){
	return request.post(`${BASE_API}/categorias`, {params: {}})
}