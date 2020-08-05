// @Vendors
import request from 'utils/request'
import { BASE_API } from "constants/index"

export function getVideosServices(params) {
	return request.post(`${BASE_API}/proyectos`, { params })
}

export function updateVideoServices(params) {
	return request.post(`${BASE_API}/proyectos/update`, {  params })
}

export function deleteVideoServices(params) {
	return request.post(`${BASE_API}/proyectos/delete`, {  params })
}

export function restoreVideoServices(params) {
	return request.post(`${BASE_API}/proyectos/restore`, {  params })
}