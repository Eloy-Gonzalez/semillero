// @Vendors
import request from 'utils/request'
import { BASE_API } from "constants/index"

export function getUsuariosServices(params) {
	return request.post(`${BASE_API}/usuarios`, { params })
}

export function updateUsuariosServices(params) {
	return request.post(`${BASE_API}/usuarios/update`, {  params })
}

export function deleteUsuariosServices(params) {
	return request.post(`${BASE_API}/usuarios/delete`, {  params })
}

export function restoreUsuariosServices(params) {
	return request.post(`${BASE_API}/usuarios/restore`, {  params })
}