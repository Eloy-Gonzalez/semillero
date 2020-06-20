// @Vendors
import axios from 'axios';
import { BASE_API } from "constants/index";


export function registerUser(data) {
  return axios.post(`${BASE_API}/register`, { params: data })
}