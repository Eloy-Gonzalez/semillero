import request from 'utils/request'
import { BASE_API } from "constants/index"

export function getVideosService(payload) {
	return request.post(`${BASE_API}/proyectos`, { params: payload })
}