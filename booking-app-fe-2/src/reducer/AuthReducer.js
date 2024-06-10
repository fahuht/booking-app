const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    updateError: false,
    updateLoading: false,
    alert: null,
    notifyLoading: false,
    alertUpdate: null,
    errMessage: '',
  },
  action,
) => {
  switch (action.type) {
    // Auth User
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: false,
        alert: null,
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        authData: action.data,
        loading: false,
        error: false,
        alert: null,
      }
    case 'AUTH_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
        alert: action.data,
        errMessage: action.data,
      }

    // Log Out
    case 'LOG_OUT':
      return { ...state, authData: null, loading: false, error: false }

    //clear
    case 'CLEAR_AUTH_STATE':
      return { ...state, errMessage: '', loading: false, error: false }
    default:
      return state
  }
}

export default authReducer
