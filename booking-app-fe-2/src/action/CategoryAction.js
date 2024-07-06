import axios from 'axios'
import * as CategoryApi from '../api/CategoryRequest'


export const createCategory = (dataRequest) => async (dispatch) => {
    dispatch({ type: 'CREATE_CATEGORY_START' })
    try {
      const { data } = await CategoryApi.createCategory(dataRequest)
      dispatch({ type: 'CREATE_CATEGORY_SUCCESS', data: data })
    } catch (error) {
      dispatch({ type: 'CREATE_CATEGORY_FAIL', message: error?.response.data })
      console.log(error?.response.data)
    }
  }
  
  export const updateCategory = (dataRequest) => async (dispatch) => {
    dispatch({ type: 'UPDATE_CATEGORY_START' })
    try {
      const { data } = await CategoryApi.updateCategory(dataRequest)
      dispatch({ type: 'UPDATE_CATEGORY_SUCCESS', data: data })
    } catch (error) {
      dispatch({ type: 'UPDATE_CATEGORY_FAIL', message: error?.response.data})
      console.log(error)
    }
  }
  
  export const deleteCategory = (dataRequest) => async (dispatch) => {
    dispatch({ type: 'DELETE_CATEGORY_START' })
    try {
      const { data } = await CategoryApi.deleteCategory(dataRequest)
      dispatch({ type: 'DELETE_CATEGORY_SUCCESS', data: data })
    } catch (error) {
      dispatch({ type: 'DELETE_CATEGORY_FAIL'  })
      console.log(error)
    }
  }
  
  export const getCategory = (dataRequest) => async (dispatch) => {
    dispatch({ type: 'GET_CATEGORY_START' })
    try {
      const { data } = await CategoryApi.getCategory(dataRequest)
      dispatch({ type: 'GET_CATEGORY_SUCCESS', data: data })
    } catch (error) {
      dispatch({ type: 'GET_CATEGORY_FAIL' })
      console.log(error)
    }
  }

  //clear state
export const clearStateCategory = () => (dispatch) =>
    dispatch({ type: 'CLEAR_STATE_CATEGORY' })