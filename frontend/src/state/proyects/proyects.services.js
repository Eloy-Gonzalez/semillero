import request from 'utils/request'
import { BASE_API } from "constants/index"

export function getProyectsService(payload) {
	return request.post(`${BASE_API}/proyectos`, { params: payload })
}

export function getCategoriesService(){
	return request.post(`${BASE_API}/categorias`, {params: {}})
}

export function getPeriodosService(){
	return request.post(`${BASE_API}/periodos`, {params: {}})
}

export function registerNewProyectService(payload){
	return request.post(`${BASE_API}/proyectos/create`, {params: payload})
}

export function deleteProyectService(payload){
	return request.post(`${BASE_API}/proyectos/delete`, {params: payload})
}