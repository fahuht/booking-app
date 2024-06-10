import { combineReducers } from 'redux'

import authReducer from './AuthReducer'
import productReducer from './ProductReducer'
import categoryReducer from './CategoryReducer'
import userReducer from './UserReducer'

export const reducers = combineReducers({ authReducer, productReducer , categoryReducer, userReducer})
