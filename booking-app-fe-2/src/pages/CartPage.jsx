import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import AppSection from "../components/app-Section/AppSection";

import "../pages/page-style/CartPage.css";
import {
  clearStateProduct,
  deleteProductOnCart,
  getCartByUser,
} from "../action/ProductAction";
import { Button, Checkbox, Table, notification } from "antd";
import Loading from "../components/Loading/Loading";

const CartPage = () => {
  const user = useSelector((state) => state.authReducer.authData);
  const { listCart, loading, isDeleteOnCartSuccess } = useSelector(
    (state) => state.productReducer
  );
  const cartItems = useSelector((state) => state.cart && state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  const [orderList, setOrderList] = useState([]);
  const [totalAmount, setToTalAmount] = useState(0);
  useEffect(() => {
    if (user) {
      dispatch(getCartByUser(user.user._id));
    }
  }, [user]);

  useEffect(() => {
    if (isDeleteOnCartSuccess) {
      openNotificationWithIcon("success", "Xoá thành công", "");
      dispatch(getCartByUser(user.user._id));
      dispatch(clearStateProduct());
    }
  }, [isDeleteOnCartSuccess]);

  const handleChecked = (e, record) => {
    let newOrderList = orderList;
    if (e.target.checked) {
      newOrderList.push(record);
      setToTalAmount(
        (prev) => prev + Number(record.price) * Number(record.quantity)
      );
      setOrderList(newOrderList);
    }
    if (!e.target.checked) {
      newOrderList = newOrderList.filter((item) => item.id !== record.id);
      setOrderList(newOrderList);
      setToTalAmount(
        (prev) => prev - Number(record.price) * Number(record.quantity)
      );
    }
  };

  const columns = [
    {
      title: "Lựa chọn",
      align: "center",
      // dataIndex: 'title',
      key: "action",
      render: (record) => {
        return <Checkbox onChange={(e) => handleChecked(e, record)} />;
      },
    },
    {
      title: "Tên sản phẩm",
      align: "center",
      dataIndex: "title",
      key: "title",
    },
    {
      align: "center",
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      align: "center",
      title: "Kích thước",
      // dataIndex: 'price',
      key: "size",
      render: (record) => {
        if (record?.size === "sizeS") return <div>S</div>;
        if (record?.size === "sizeM") return <div>M</div>;
        if (record?.size === "sizeL") return <div>L</div>;
      },
    },
    {
      title: "Số lượng",
      align: "center",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thao tác",
      align: "center",
      // dataIndex: 'address',
      key: "actions",

      render: (record) => {
        return (
          <div>
            <div className="d-flex justify-content-center gap-1">
              {/* <Button
                onClick={() => {
                  console.log('record', record)
                }}
              >
                Sửa
              </Button> */}
              <Button
                className="delete-button"
                onClick={() =>
                  dispatch(
                    deleteProductOnCart({
                      cartId: record.id,
                      productId: record.productId,
                      userId: user.user._id,
                    })
                  )
                }
              >
                Xóa
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const handleCheckout = () => {
    if (orderList.length > 0) {
      navigate("/thanh-toan", {
        state: {
          listProduct: orderList,
          totalAmount: totalAmount,
        },
      });
    } else {
      alert("Vui lòng chọn sản phầm rồi thanh toán");
    }
  };

  return (
    <Helmet title="gio-hang">
      {contextHolder}
      <AppSection title="Giỏ hàng" />
      <section className="mt-5">
        <Container>
          <Row>
            <Col lg="12">
              {listCart && listCart.length === 0 ? (
                <h5 className="mt-5 text-center">
                  Không có sản phẩm trong giỏ hàng
                </h5>
              ) : (
                <Table
                  dataSource={(listCart && listCart.data) || []}
                  columns={columns}
                  pagination={false}
                />
              )}

              <div className="mt-4 mb-5">
                <h6>
                  Tổng cộng:&ensp;
                  <span className="cartpage_subtotal">{totalAmount} VND</span>
                </h6>

                <div className="cartpage_btn mt-5">
                  <button className="addtoCart_btn me-4">
                    <Link to="/foods">Tiếp tục mua hàng</Link>
                  </button>
                  <button
                    className="addtoCart_btn"
                    onClick={() => handleCheckout()}
                  >
                    Thanh toán đơn hàng
                  </button>
                  {/* <Button onClick={() => console.log('orderList', orderList)}>
                    Đặt hàng
                  </Button> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Loading isLoading={loading} />
    </Helmet>
  );
};

export default CartPage;
