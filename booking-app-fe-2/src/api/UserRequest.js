import axios from 'axios'

import { URL_SERVER } from '../constants/constants'

const API = axios.create({ baseURL: URL_SERVER })

export const addPermission = (data) => API.post('/user/add-permission', data)
export const deleteUser = (data) => API.post('/user/delete', data)
export const getListUser = (data) =>
  API.post(`/user/search?${data.page && `page=${data.page}`  || ""}&&${data.size && `size=${data.size}`  || ""}`, data)