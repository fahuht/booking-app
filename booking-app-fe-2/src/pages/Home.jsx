import React from "react";
import { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/image/hero.png";
import { Link } from "react-router-dom";

import "../pages/page-style/Home.css";
import "../components/Helmet/Helmet.css";

import Category from "../components/Category/Category.jsx";
// import products from '../assets/data/products.js'
import ProductCard from "../components/product-card/ProductCard.jsx";

import menu_1 from "../assets/image/menu_1.png";
import menu_2 from "../assets/image/menu_2.png";
import menu_3 from "../assets/image/menu_3.png";
import menu_4 from "../assets/image/menu_4.png";
import menu_5 from "../assets/image/menu_5.png";
import menu_6 from "../assets/image/menu_6.png";
import menu_7 from "../assets/image/menu_7.png";
import menu_8 from "../assets/image/menu_8.png";

import { useDispatch, useSelector } from "react-redux";
import { clearStateProduct, getProduct } from "../action/ProductAction.js";
import Loading from "../components/Loading/Loading.js";
import { notification } from "antd";
import { getCategory } from "../action/CategoryAction.js";

const Home = () => {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.productReducer.listProduct);
  const { loading, isAddToCartSuccess } = useSelector(
    (state) => state.productReducer
  );
  const listCategory = useSelector(
    (state) => state.categoryReducer.listCategory
  );

  console.log("listCategory", listCategory);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Thêm vào giỏ hàng thành công!",
      description: "Hãy vào giỏ hàng để thanh toán hoặc tiếp tục mua sắm",
    });
  };

  const baseRequest = {
    category: "",
    page: 1,
    size: 8,
  };
  const [category, setCategory] = useState("Tất cả");

  const [dataRequest, setDataRquest] = useState(baseRequest);

  useEffect(() => {
    if (isAddToCartSuccess) {
      openNotificationWithIcon("success");
      dispatch(
        getProduct({
          ...dataRequest,
        })
      );
      dispatch(clearStateProduct());
    }
  }, [isAddToCartSuccess]);

  useEffect(() => {
    dispatch(
      getProduct({
        ...dataRequest,
      })
    );
    dispatch(getCategory({}));
  }, []);

  const handleChangeCategory = (type) => {
    const newDataRequest = {
      ...dataRequest,
      category: type,
    };
    dispatch(
      getProduct({
        ...newDataRequest,
      })
    );
  };

  return (
    <Helmet title="trang-chu">
      {contextHolder}
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero_content">
                <h5>
                  <span>Deal Ngập Tràn </span>
                </h5>
                <h1>
                  <span>Thỏa sức đặt món</span>
                </h1>
              </div>
              <div className="hero_button d-flex align-items-center gap-3 ">
                <button className="footer_order_btn d-flex align-items-center justify-content-between">
                  Đặt hàng ngay
                </button>

                <button className="all_food_btn">
                  <Link to="/foods">Tất cả món</Link>
                </button>
              </div>

              <div className="hero_service mt-5">
                <p className="d-flex align-items-center gap-2">
                  <span className="shipping_icon">
                    <i class="ri-car-line"></i>Giao hàng nhanh chóng
                  </span>
                </p>
              </div>
              <div className="hero_service mt-2">
                <p className="d-flex align-items-center gap-2">
                  <span className="shipping_icon">
                    <i class="ri-car-line"></i>Thông tin bảo mật
                  </span>
                </p>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero_img">
                <img src={heroImg} alt="hero__image" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section>
        <Category />
      </section> */}

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mt-5">
              <h2>Sản phẩm</h2>
            </Col>

            <div className="explore-menu" id="explore-menu">
              <div className="explore-menu-list">
                {listCategory?.data?.map((itemCategory) => {
                  return (
                    <div
                      className="explore-menu-list-item "
                      onClick={() => {
                        handleChangeCategory(itemCategory.code);
                        setCategory(itemCategory.name);
                      }}
                    >
                      <img
                        className={category === itemCategory.name ? "active" : ""}
                        src={itemCategory?.image?.url || menu_1}
                        alt=""
                      />
                      <p>{itemCategory.name || "-"}</p>
                    </div>
                  );
                })}

                {/* <div
                  className="explore-menu-list-item "
                  onClick={() => {
                    handleChangeCategory("DO_AN");
                    setCategory("Đồ ăn");
                  }}
                >
                  <img
                    className={category === "Đồ ăn" ? "active" : ""}
                    src={menu_1}
                    alt=""
                  />
                  <p>Đồ ăn</p>
                </div>
                <div
                  className="explore-menu-list-item "
                  onClick={() => {
                    handleChangeCategory("HiTea");
                    setCategory("Trà");
                  }}
                >
                  <img
                    className={category === "Trà" ? "active" : ""}
                    src={menu_2}
                    alt=""
                  />
                  <p>Trà</p>
                </div>
                <div
                  className="explore-menu-list-item "
                  onClick={() => {
                    handleChangeCategory("CLOUD");
                    setCategory("Cloud");
                  }}
                >
                  <img
                    className={category === "Cloud" ? "active" : ""}
                    src={menu_3}
                    alt=""
                  />
                  <p>Cloud</p>
                </div>
                <div
                  className="explore-menu-list-item "
                  onClick={() => {
                    handleChangeCategory("CAFE");
                    setCategory("Cafe");
                  }}
                >
                  <img
                    className={category === "Cafe" ? "active" : ""}
                    src={menu_4}
                    alt=""
                  />
                  <p>Cafe</p>
                </div>
                <div
                  className="explore-menu-list-item "
                  onClick={() => {
                    handleChangeCategory("DO_AN");
                    setCategory("Đồ ăn");
                  }}
                >
                  <img
                    className={category === "Đồ ăn" ? "active" : ""}
                    src={menu_1}
                    alt=""
                  />
                  <p>Đồ ăn</p>
                </div> */}
                <hr />
              </div>
            </div>

            {listProduct &&
              listProduct.data &&
              listProduct.data.map((item) => (
                <Col lg="3" md="4" key={item.id} className="mt-5">
                  <ProductCard item={item} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
      <Loading isLoading={loading} />
    </Helmet>
  );
};

export default Home;
