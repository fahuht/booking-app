const productReducer = (
  state = {
    listProduct: {},
    listOrder: {},
    isCreateProductSucces: false,
    isUpdateProductSucces: false,
    isDeleteProductSucces: false,
    loading: false,
    error: false,
    isAddToCartSuccess: false,
    isDeleteOnCartSuccess: false,
    isApproveSuccess: false,
    isOrderSuccess: false,
    listCart: [],
    dataOrder: {},
    dataStatistic: {},
    message: ""
  },
  action,
) => {
  switch (action.type) {
    // Create Product
    case 'CREATE_PRODUCT_START':
      return { ...state, loading: true, error: false }
    case 'CREATE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        isCreateProductSucces: true,
        error: false,
      }
    case 'CREATE_PRODUCT_FAIL':
      return { ...state, loading: false, error: true, message: action?.message || "" }

    // Update Product
    case 'UPDATE_PRODUCT_START':
      return { ...state, loading: true, error: false }
    case 'UPDATE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        isUpdateProductSucces: true,
        error: false,
      }
    case 'UPDATE_PRODUCT_FAIL':
      return { ...state, loading: false, error: true, message: action?.message || "" }

    // Delete Product
    case 'DELETE_PRODUCT_START':
      return { ...state, loading: true, error: false }
    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        isDeleteProductSucces: true,
        error: false,
      }
    case 'DELETE_PRODUCT_FAIL':
      return { ...state, loading: false, error: true }

    // Get Product
    case 'GET_PRODUCT_START':
      return { ...state, loading: true, error: false }
    case 'GET_PRODUCT_SUCCESS':
      return {
        ...state,
        listProduct: action.data,
        loading: false,
        error: false,
      }
    case 'GET_PRODUCT_FAIL':
      return { ...state, loading: false, error: true }

    // Add product to cart
    case 'ADD_PRODUCT_TO_CART_START':
      return { loading: true, error: false }
    case 'ADD_PRODUCT_TO_CART_SUCCESS':
      return {
        isAddToCartSuccess: true,
        loading: false,
        error: false,
      }
    case 'ADD_PRODUCT_TO_CART_FAIL':
      return { loading: false, error: true }

    // Delete product on cart
    case 'DELETE_PRODUCT_ON_CART_START':
      return { loading: true, error: false }
    case 'DELETE_PRODUCT_ON_CART_SUCCESS':
      return {
        isDeleteOnCartSuccess: true,
        loading: false,
        error: false,
      }
    case 'DELETE_PRODUCT_ON_CART_FAIL':
      return { loading: false, error: true }

    // get cart
    case 'GET_CART_BY_USER_START':
      return { loading: true, error: false }
    case 'GET_CART_BY_USER_SUCCESS':
      return {
        listCart: action.data,
        loading: false,
        error: false,
      }
    case 'GET_CART_BY_USER_FAIL':
      return { loading: false, error: true }

    //  Order
    case 'ORDER_PRODUCT_START':
      return {
        ...state,
        loading: true,
        error: false,
        dataOrder: {},
        isOrderSuccess: false,
      }
    case 'ORDER_PRODUCT_SUCCESS':
      return {
        ...state,
        isOrderSuccess: true,
        dataOrder: action.data,
        loading: false,
        error: false,
      }
    case 'ORDER_PRODUCT_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
        dataOrder: {},
        isOrderSuccess: false,
      }

    // Get Order
    case 'GET_LIST_ORDER_START':
      return { ...state, loading: true, error: false }
    case 'GET_LIST_ORDER_SUCCESS':
      return {
        ...state,
        listOrder: action.data,
        loading: false,
        error: false,
      }
    case 'GET_LIST_ORDER_FAIL':
      return { ...state, loading: false, error: true }

    // Get Order by ID
    case 'GET_LIST_ORDER_BY_ID_START':
      return { ...state, loading: true, error: false }
    case 'GET_LIST_ORDER_BY_ID_SUCCESS':
      return {
        ...state,
        listOrder: action.data,
        loading: false,
        error: false,
      }
    case 'GET_LIST_ORDER_BY_ID_FAIL':
      return { ...state, loading: false, error: true }

    // approve order
    case 'APPROVE_ORDER_START':
      return { loading: true, error: false }
    case 'APPROVE_ORDER_SUCCESS':
      return {
        isApproveSuccess: true,
        loading: false,
        error: false,
      }
    case 'APPROVE_ORDER_FAIL':
      return { loading: false, error: true }

    // Thống kê
    case 'AGGREGATE_ORDER_START':
      return { loading: true, error: false, dataStatistic: {} }
    case 'AGGREGATE_ORDER_SUCCESS':
      return {
        isApproveSuccess: true,
        loading: false,
        error: false,
        dataStatistic: action.data,
      }
    case 'AGGREGATE_ORDER_FAIL':
      return { loading: false, error: true, dataStatistic: {} }

    // Clear
    case 'CLEAR_STATE_PRODUCT':
      return {
        isDeleteOnCartSuccess: false,
        isOrderSuccess: false,
        isDeleteProductSucces: false,
        isCreateProductSucces: false,
        isUpdateProductSucces: false,
        isAddToCartSuccess: false,
        isApproveSuccess: false,
        error: false,
        message: ""
      }

    default:
      return state
  }
}

export default productReducer
