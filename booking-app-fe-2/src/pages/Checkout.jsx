import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import AppSection from '../components/app-Section/AppSection'
import Helmet from '../components/Helmet/Helmet'

import '../pages/page-style/Checkout.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPayment, orderProduct } from '../action/ProductAction'
import { notification } from 'antd'
import Loading from '../components/Loading/Loading'

const Checkout = () => {
  const { state } = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.authData)
  const { isOrderSuccess, loading, dataOrder } = useSelector(
    (state) => state.productReducer,
  )
  const navigate = useNavigate()

  console.log('dataOrder', dataOrder)

  const baseRequset = {
    name: '',
    email: '',
    phone: '',
    address: '',
  }
  const [dataRequest, setDataRequest] = useState(baseRequset)

  useEffect(() => {
    if (isOrderSuccess && dataOrder) {
      // navigate('/don-hang')
      dispatch(createPayment({ orderId: dataOrder?.order?._id }))
    }
  }, [isOrderSuccess])

  const handleChange = (e) => {
    setDataRequest({
      ...dataRequest,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newDataRequest = {
      info: { ...dataRequest },
      listCart: state.listProduct,
      totalAmount: state.totalAmount,
      userId: user.user._id,
    }
    dispatch(orderProduct(newDataRequest))
  }

  return (
    <Helmet title="thanh-toan">
      <AppSection title="Thanh toán đơn hàng" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6" className="mt-5">
              <h6 className="mb-4">Địa chỉ nhận hàng</h6>
              <form
                className="checkout__form"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="form__group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nhập tên của bạn"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Địa chỉ email"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Điện thoại"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <button type="submit" className="addtoCart_btn">
                  Đặt hàng
                </button>
              </form>
            </Col>
            <Col lg="4" md="6"></Col>

            <Col lg="4" md="6" className="mt-5">
              <div className="checkout_bill">
                {/* <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${cartTotalAmount}</span>
                </h6> */}
                <div className="checkout_total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Tổng tiền: <span>{state.totalAmount}đ</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Loading isLoading={loading} />
    </Helmet>
  )
}

export default Checkout
