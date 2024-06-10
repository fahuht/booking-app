import axios from 'axios'

import { URL_SERVER } from '../constants/constants'

const API = axios.create({ baseURL: URL_SERVER })

export const createProduct = (data) => API.post('/product/create-product', data)
export const updateProduct = (data) => API.post('/product/update-product', data)
export const deleteProduct = (data) => API.post('/product/delete-product', data)
export const getProduct = (data) =>
  API.post(`/product/search?${data.page && `page=${data.page}`  || ""}&&${data.size && `size=${data.size}`  || ""}`, data)
export const addProductToCart = (data) => API.post(`/product/add-to-cart`, data)
export const deleteProductOnCart = (data) =>
  API.post(`/product/delete-on-cart`, data)
export const getCartByUser = (id) => API.get(`/user/get-cart/${id}`)
// export const orderProduct = (data) => API.post(`/product/order`, data)
export const orderProduct = (data) => API.post(`/order/create`, data)
export const getListOrder = (data) =>
  API.post(`/order/get-list-order?${data.page && `page=${data.page}`  || ""}&&${data.size && `size=${data.size}`  || ""}`, data)
export const getListOrderById = (data) =>
  API.post(
    `/order/get-list-order/${data.userId}?${data.page && `page=${data.page}`  || ""}&&${data.size && `size=${data.size}`  || ""}`,
    data,
  )
export const approveOrder = (data) => API.post(`/order/approve-order`, data)
export const createPayment = (data) => API.post(`/payment/create`, data)
export const aggregateOrders = (data) => API.get(`/order/aggregate-order?type=${data?.type || "day"}`)
