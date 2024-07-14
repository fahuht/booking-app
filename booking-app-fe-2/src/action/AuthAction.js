import * as AuthApi from '../api/AuthRequest.js'

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' })
  try {
    const { data } = await AuthApi.logIn(formData)
    dispatch({ type: 'AUTH_SUCCESS', data: data })
  } catch (error) {
    // console.log(error.response.data)
    const data = error.response.data
    dispatch({ type: 'AUTH_FAIL', data: data })
  }
}

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' })
  try {
    // register
    const { data } = await AuthApi.signUp(formData)
    dispatch({ type: 'AUTH_SUCCESS', data: data })
  } catch (error) {
    // console.log(error.response.data)
    const data = error.response.data
    dispatch({ type: 'AUTH_FAIL', data: data })
  }
}

export const changePass = (formData) => async (dispatch) => {
  dispatch({ type: 'CHANGE_PASS_START' })
  try {
    const { data } = await AuthApi.changePass(formData)
    dispatch({ type: 'CHANGE_PASS_SUCCESS', data: data })
  } catch (error) {
    const data = error.response.data
    dispatch({ type: 'CHANGE_PASS_FAIL', data: data })
  }
}

export const clearAuthState = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_AUTH_STATE' })
}

export const logOut = () => async (dispatch) => {
  dispatch({ type: 'LOG_OUT' })
}
