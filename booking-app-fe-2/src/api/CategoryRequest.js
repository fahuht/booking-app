import axios from 'axios'
import { URL_SERVER } from '../constants/constants'

const API = axios.create({ baseURL: URL_SERVER })


export const createCategory = (data) => API.post('/category/create', data)
export const updateCategory = (data) => API.post('/category/update', data)
export const deleteCategory = (data) => API.post('/category/delete', data)
export const getCategory = (data) =>
  API.post(`/category/search?${data.page && `page=${data.page}`  || ""}&&${data.size && `size=${data.size}`  || ""}`, data)