const categoryReducer = (
    state = {
      listCategory: {},
      listOrder: {},
      isCreateCategorySucces: false,
      isUpdateCategorySucces: false,
      isDeleteCategorySucces: false,
      loading: false,
      error: false,  
      message: ""    
    },
    action,
  ) => {
    switch (action.type) {
      // Create Category
      case 'CREATE_CATEGORY_START':
        return { ...state, loading: true, error: false }
      case 'CREATE_CATEGORY_SUCCESS':
        return {
          ...state,
          loading: false,
          isCreateCategorySucces: true,
          error: false,
        }
      case 'CREATE_CATEGORY_FAIL':
        return { ...state, loading: false, error: true, message: action?.message || "" }
  
      // Update Category
      case 'UPDATE_CATEGORY_START':
        return { ...state, loading: true, error: false }
      case 'UPDATE_CATEGORY_SUCCESS':
        return {
          ...state,
          loading: false,
          isUpdateCategorySucces: true,
          error: false,
        }
      case 'UPDATE_CATEGORY_FAIL':
        return { ...state, loading: false, error: true, message: action?.message || "" }
  
      // Delete Category
      case 'DELETE_CATEGORY_START':
        return { ...state, loading: true, error: false }
      case 'DELETE_CATEGORY_SUCCESS':
        return {
          ...state,
          loading: false,
          isDeleteCategorySucces: true,
          error: false,
        }
      case 'DELETE_CATEGORY_FAIL':
        return { ...state, loading: false, error: true }
  
      // Get Category
      case 'GET_CATEGORY_START':
        return { ...state, loading: true, error: false }
      case 'GET_CATEGORY_SUCCESS':
        return {
          ...state,
          listCategory: action.data,
          loading: false,
          error: false,
        }
      case 'GET_CATEGORY_FAIL':
        return { ...state, loading: false, error: true }
  
      // Clear
      case 'CLEAR_STATE_CATEGORY':
        return {
          isDeleteCategorySucces: false,
          isCreateCategorySucces: false,
          isUpdateCategorySucces: false,
          error: false
        }
  
      default:
        return state
    }
  }
  
  export default categoryReducer
  