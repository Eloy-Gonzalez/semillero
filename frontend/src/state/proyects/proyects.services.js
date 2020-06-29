import request from 'utils/request'
import { BASE_API } from "constants/index"

export function getProyectsService(data) {
	console.log(data)
	const datos = {
		id_usuario: data
	}
	return request.post(`${BASE_API}/proyectos`, { params: datos })
}

export function getCategoriesService(){
	return request.post(`${BASE_API}/categorias`, {params: {}})
}