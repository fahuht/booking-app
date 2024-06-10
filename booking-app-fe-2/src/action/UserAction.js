import axios from 'axios'
import * as UserApi from '../api/UserRequest'


  
  export const addPermission = (dataRequest) => async (dispatch) => {
    dispatch({ type: 'ADD_PERMISSION_START' })
    try {
      const { data } = await UserApi.addPermission(dataRequest)
      dispatch({ type: 'ADD_PERMISSION_SUCCESS', data: data })
    } catch (error) {
      dispatch({ type: 'ADD_PERMISSION_FAIL' })
      console.log(error)
    }
  }
  
  //delete product
  export const deleteUser = (dataRequest) => async (dispatch) => {
    dispatch({ type: 'DELETE_USER_START' })
    try {
      const { data } = await UserApi.deleteUser(dataRequest)
      dispatch({ type: 'DELETE_USER_SUCCESS', data: data })
    } catch (error) {
      dispatch({ type: 'DELETE_USER_FAIL' })
      console.log(error)
    }
  }
  
  // get product
  export const getListUser = (dataRequest) => async (dispatch) => {
    dispatch({ type: 'GET_USER_START' })
    try {
      const { data } = await UserApi.getListUser(dataRequest)
      dispatch({ type: 'GET_USER_SUCCESS', data: data })
    } catch (error) {
      dispatch({ type: 'GET_USER_FAIL' })
      console.log(error)
    }
  }

  //clear state
export const clearStateUser = () => (dispatch) =>
    dispatch({ type: 'CLEAR_STATE_USER' })