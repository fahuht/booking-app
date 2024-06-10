const categoryReducer = (
    state = {
      listUser: {},
      isUpdatePermissionSuccess: false,
      isDeleteUserSuccess: false,
      loading: false,
      error: false,      
    },
    action,
  ) => {
    switch (action.type) {
      case 'ADD_PERMISSION_START':
        return { ...state, loading: true, error: false }
      case 'ADD_PERMISSION_SUCCESS':
        return {
          ...state,
          loading: false,
          isUpdatePermissionSuccess: true,
          error: false,
        }
      case 'ADD_PERMISSION_FAIL':
        return { ...state, loading: false, error: true }
  
      // Delete User
      case 'DELETE_USER_START':
        return { ...state, loading: true, error: false }
      case 'DELETE_USER_SUCCESS':
        return {
          ...state,
          loading: false,
          isDeleteUserSuccess: true,
          error: false,
        }
      case 'DELETE_USER_FAIL':
        return { ...state, loading: false, error: true }
  
      // Get User
      case 'GET_USER_START':
        return { ...state, loading: true, error: false }
      case 'GET_USER_SUCCESS':
        return {
          ...state,
          listUser: action.data,
          loading: false,
          error: false,
        }
      case 'GET_USER_FAIL':
        return { ...state, loading: false, error: true }
  
      // Clear
      case 'CLEAR_STATE_USER':
        return {
          isDeleteUserSuccess: false,
          isUpdatePermissionSuccess: false,
        }
  
      default:
        return state
    }
  }
  
  export default categoryReducer
  