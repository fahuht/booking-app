import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import AppSection from "../components/app-Section/AppSection";
import Helmet from "../components/Helmet/Helmet";

import "../pages/page-style/Checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment, orderProduct } from "../action/ProductAction";
import { notification } from "antd";
import Loading from "../components/Loading/Loading";

const Checkout = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const { isOrderSuccess, loading, dataOrder } = useSelector(
    (state) => state.productReducer
  );
  const navigate = useNavigate();

  console.log("dataOrder", dataOrder);

  const baseRequset = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };
  const [dataRequest, setDataRequest] = useState(baseRequset);

  useEffect(() => {
    if (isOrderSuccess && dataOrder) {
      // navigate('/don-hang')
      dispatch(createPayment({ orderId: dataOrder?.order?._id }));
    }
  }, [isOrderSuccess]);

  const handleChange = (e) => {
    setDataRequest({
      ...dataRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDataRequest = {
      info: { ...dataRequest },
      listCart: state.listProduct,
      totalAmount: state.totalAmount,
      userId: user.user._id,
    };
    dispatch(orderProduct(newDataRequest));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="place-order">
      <div className="place-order-left">
        <p className="title">Thông tin đặt hàng</p>
        <div className="multi-fields">
          <input
            type="text"
            name="name"
            placeholder="Nhập tên của bạn"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Địa chỉ email"
          required
          onChange={(e) => handleChange(e)}
        />
        <div className="multi-fields">
          <input
            type="text"
            name="phone"
            placeholder="Điện thoại"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Thanh toán đơn hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>
                Tổng tiền: <span>{state.totalAmount} VNĐ</span>
              </p>
            </div>
            <hr />
          </div>
          <button type="submit">Đặt hàng</button>
        </div>
      </div>
      <Loading isLoading={loading} />
    </form>
  );
};

export default Checkout;
