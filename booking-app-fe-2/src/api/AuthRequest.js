import axios from 'axios'
import { URL_SERVER } from '../constants/constants'

const API = axios.create({ baseURL: URL_SERVER })

export const logIn = (formData) => API.post('/auth/login', formData)
export const signUp = (formData) => API.post('/auth/register', formData)
export const changePass = (formData) => API.post('/auth/change-pw', formData)
