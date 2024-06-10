import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import AppSection from '../components/app-Section/AppSection'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

import '../pages/page-style/Login.css'
import { clearAuthState, signUp } from '../action/AuthAction'
import { notification } from 'antd'
import Loading from '../components/Loading/Loading'
const Register = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.authData)
  const navigate = useNavigate()
  const { loading, errMessage } = useSelector((state) => state.authReducer)

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    })
  }
  const baseRequest = {
    username: '',
    email: '',
    password: '',
  }
  const [dataRequest, setDateRequest] = useState(baseRequest)

  useEffect(() => {
    if (user) {
      navigate('/trang-chu')
    }
  }, [user])

  useEffect(() => {
    if (errMessage) {
      openNotificationWithIcon('error', errMessage, '')
      dispatch(clearAuthState())
    }
  }, [errMessage])

  const handleChange = (e) => {
    setDateRequest({
      ...dataRequest,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    console.log(dataRequest)
    dispatch(signUp(dataRequest))
  }
  return (
    <Helmet>
      {contextHolder}
      <AppSection />
      <section>
        <Container className="login_login">
          <Row>
            <Col lg="6" md="6" sm="12" className=" m-auto text-center">
              <form
                className="login_form mt-5 mb-5 "
                onSubmit={(e) => handleRegister(e)}
              >
                <div className="form__group">
                  <input
                    type="text"
                    name="username"
                    placeholder="Họ tên"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <button type="submit" className="addtoCart_btn mb-4">
                  Đăng ký
                </button>
              </form>

              <Link className="register_button mt-2 " to="/dang-nhap">
                Đã có tài khoản. Đăng nhập ngay
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <Loading isLoading={loading} />
    </Helmet>
  )
}

export default Register
