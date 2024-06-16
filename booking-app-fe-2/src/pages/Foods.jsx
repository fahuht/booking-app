import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import Helmet from "../components/Helmet/Helmet.js";
import AppSection from "../components/app-Section/AppSection";

import ProductCard from "../components/product-card/ProductCard";

import "../pages/page-style/Foods.css";
import "../pages/page-style/paginate.css";
import { clearStateProduct, getProduct } from "../action/ProductAction.js";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading/Loading.js";
import { Pagination, notification } from "antd";

const Foods = () => {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.productReducer.listProduct);
  const { loading, isAddToCartSuccess } = useSelector(
    (state) => state.productReducer
  );

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Thêm vào giỏ hàng thành công!",
      description: "Hãy vào giỏ hàng để thanh toán hoặc tiếp tục mua sắm",
    });
  };

  const baseRequest = {
    title: "",
    page: 1,
    size: 10,
  };
  const [searchItem, setsearchItem] = useState("");
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
  }, []);

  const handleSearch = () => {
    const newDataRequest = {
      ...dataRequest,
      title: searchItem,
    };
    dispatch(
      getProduct({
        ...newDataRequest,
      })
    );
  };

  const handlePageChange = (page) => {
    const newDataRequest = {
      ...dataRequest,
      page,
    };
    setDataRquest(newDataRequest);
    dispatch(
      getProduct({
        ...newDataRequest,
      })
    );
  };

  return (
    <Helmet title="san-pham">
      {contextHolder}
      <AppSection title="Tất cả sản phẩm" />

      <section className="mt-5">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search_widget d-flex align-items-center justify-content-between w-50">
                <input
                  type="text"
                  placeholder="Nhập món cần tìm"
                  value={searchItem}
                  onChange={(e) => setsearchItem(e.target.value)}
                />

                <span onClick={() => handleSearch()}>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>

            <div className="panigation-icon"></div>
          </Row>
          <div className="row d-flex mt-3">
            {listProduct &&
              listProduct.data.map((item) => (
                <div className="col-md-3 p-2">
                  <ProductCard item={item} />
                </div>
              ))}
          </div>
        </Container>
        <div className="d-flex justify-content-center mt-2">
          <Pagination
            current={dataRequest.page}
            pageSize={dataRequest.size}
            total={(listProduct && listProduct.totalElement) || 0}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </section>
      <Loading isLoading={loading} />
    </Helmet>
  );
};

export default Foods;
