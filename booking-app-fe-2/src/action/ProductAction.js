import * as ProductApi from '../api/ProductRequest'
import axios from 'axios'
import OrderTemplate from '../template/orderTemplate'
import ReactDOMServer from 'react-dom/server'

//create product
export const createProduct = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'CREATE_PRODUCT_START' })
  try {
    const { data } = await ProductApi.createProduct(dataRequest)
    dispatch({ type: 'CREATE_PRODUCT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'CREATE_PRODUCT_FAIL', message: error?.response.data })
    console.log(error)
  }
}

// update product
export const updateProduct = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_START' })
  try {
    const { data } = await ProductApi.updateProduct(dataRequest)
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'UPDATE_PRODUCT_FAIL', message: error?.response.data })
    console.log(error)
  }
}

//delete product
export const deleteProduct = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_START' })
  try {
    const { data } = await ProductApi.deleteProduct(dataRequest)
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'DELETE_PRODUCT_FAIL' })
    console.log(error)
  }
}

// get product
export const getProduct = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCT_START' })
  try {
    const { data } = await ProductApi.getProduct(dataRequest)
    dispatch({ type: 'GET_PRODUCT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'GET_PRODUCT_FAIL' })
    console.log(error)
  }
}

//add to cart
export const addProductToCart = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_TO_CART_START' })
  try {
    const { data } = await ProductApi.addProductToCart(dataRequest)

    dispatch({ type: 'ADD_PRODUCT_TO_CART_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'ADD_PRODUCT_TO_CART_FAIL' })
    console.log(error)
  }
}

// delete from cart
export const deleteProductOnCart = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_ON_CART_START' })
  try {
    const { data } = await ProductApi.deleteProductOnCart(dataRequest)
    dispatch({ type: 'DELETE_PRODUCT_ON_CART_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'DELETE_PRODUCT_ON_CART_FAIL' })
    console.log(error)
  }
}

// get cart by user
export const getCartByUser = (id) => async (dispatch) => {
  dispatch({ type: 'GET_CART_BY_USER_START' })
  try {
    const { data } = await ProductApi.getCartByUser(id)
    dispatch({ type: 'GET_CART_BY_USER_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'GET_CART_BY_USER_FAIL' })
    console.log(error)
  }
}

// oder sản phẩm
export const orderProduct = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'ORDER_PRODUCT_START' })
  try {
    const { data } = await ProductApi.orderProduct(dataRequest)
    dispatch({ type: 'ORDER_PRODUCT_SUCCESS', data: data })
    if (data) {
      const emailBody = (
        <OrderTemplate
          listCart={dataRequest.listCart}
          totalAmount={dataRequest.totalAmount}
          info={dataRequest.info}
        />
      )
      const postMailData = {
        email: dataRequest.info.email,
        htmlBody: ReactDOMServer.renderToStaticMarkup(emailBody),
      }
      // send mail
      await axios({
        url: 'https://script.google.com/macros/s/AKfycbxzXBW6-hkKoKc9Sia8ObMpxLHymE7WFxdlQa-gQDFxRIZvdSDNM48pseniAKhQoZuR/exec',
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        data: JSON.stringify(postMailData),
      })
        .then(function (response) {
          //success
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    // dispatch({ type: 'ORDER_PRODUCT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'ORDER_PRODUCT_FAIL' })
    console.log(error)
  }
}

// get danh sách order
export const createPayment = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'CREATE_PAYMENT_START' })
  try {
    const { data } = await ProductApi.createPayment(dataRequest)
    if(data.order_url){
      window.location.href = data.order_url
    }
    dispatch({ type: 'CREATE_PAYMENT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'CREATE_PAYMENT_FAIL' })
    console.log(error)
  }
}

// get danh sách order
export const getListOrder = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'GET_LIST_ORDER_START' })
  try {
    const { data } = await ProductApi.getListOrder(dataRequest)
    dispatch({ type: 'GET_LIST_ORDER_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'GET_LIST_ORDER_FAIL' })
    console.log(error)
  }
}

// get order cho by ID
export const getListOrderById = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'GET_LIST_ORDER_BY_ID_START' })
  try {
    const { data } = await ProductApi.getListOrderById(dataRequest)
    dispatch({ type: 'GET_LIST_ORDER_BY_ID_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'GET_LIST_ORDER_BY_ID_FAIL' })
    console.log(error)
  }
}

// xác nhận order
export const approveOrder = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'APPROVE_ORDER_START' })
  try {
    const { data } = await ProductApi.approveOrder(dataRequest)
    dispatch({ type: 'APPROVE_ORDER_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'APPROVE_ORDER_FAIL' })
    console.log(error)
  }
}

// thống kê
export const aggregateOrders = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'AGGREGATE_ORDER_START' })
  try {
    const { data } = await ProductApi.aggregateOrders(dataRequest)
    dispatch({ type: 'AGGREGATE_ORDER_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'AGGREGATE_ORDER_FAIL' })
    console.log(error)
  }
}


//clear state
export const clearStateProduct = () => (dispatch) =>
  dispatch({ type: 'CLEAR_STATE_PRODUCT' })
