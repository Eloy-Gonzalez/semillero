// @Vendors
import axios from 'axios';
import { BASE_API } from "constants/index";


export function postLogin(data) {
  return axios.post(`${BASE_API}/login`, { params: data })
}