// @Vendors
import request from 'utils/request'
import { BASE_API } from "constants/index"

export function getVideosServices(params) {
	return request.post(`${BASE_API}/proyectos`, { params })
}