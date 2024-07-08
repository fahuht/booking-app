import React, { useEffect, useState } from "react";
import { Button, Drawer, Radio, notification } from "antd";
import "./CardModal.css";
import { useSnackbar } from "notistack";
import FoodIcon from "../../assets/image/food-icon.png";

import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../action/ProductAction";
const CardModal = (props) => {
  const { item, openCardModal, setOpenCardModal } = props;
  const user = useSelector((state) => state.authReducer.authData);
  const { enqueueSnackbar } = useSnackbar();
  const handleShowSnackbar = (message, variant = "success") =>
    enqueueSnackbar(message, { variant });
  const { isAddToCartSuccess } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [productSize, setProductSize] = useState("sizeS");
  const handleClose = () => {
    setOpenCardModal(false);
  };

  useEffect(() => {
    if (isAddToCartSuccess) {
      handleShowSnackbar("Thêm vào giỏ hàng thành công", "success");
      setOpenCardModal(false);
    }
  }, [isAddToCartSuccess]);

  const handleChangeNumber = (type) => {
    if (type === "subtraction") {
      if (quantityProduct > 1) {
        return setQuantityProduct((prev) => prev - 1);
      }
      return setQuantityProduct(0);
    }
    if (type === "plus") {
      if (quantityProduct < item.stock) {
        return setQuantityProduct((prev) => prev + 1);
      }
      return setQuantityProduct(item.stock);
    }
  };

  const handleAddtoCart = () => {
    if (quantityProduct > 0) {
      const newDataRequest = {
        // title: item.title,
        productId: item._id,
        userId: user.user._id,
        quantity: quantityProduct,
        // price: item?.priceBySize && item?.priceBySize[productSize] || 0,
        size: productSize,
      };
      dispatch(addProductToCart(newDataRequest));
    } else
      openNotificationWithIcon(
        "error",
        "Vui lòng chọn số lượng sản phẩm trước khi thêm vào giỏ hàng",
        ""
      );
  };

  const onChangeSize = (e) => {
    setProductSize(e.target.value);
  };

  return (
    <Drawer
      title="Thêm vào giỏ hàng"
      width={520}
      onClose={() => handleClose()}
      open={openCardModal}
    >
      {contextHolder}
      <div className="d-flex flex-column h-100">
        <div className="card-icon d-flex flex-column justify-content-center">
          <div className="card-image d-flex justify-content-center">
            <img src={item?.image?.url || FoodIcon} alt="" />
          </div>
          <strong className="d-flex justify-content-center mt-1 ">
            {item.title}
          </strong>
          <div className="d-flex flex-column align-items-center mt-3">
            <b>Chọn kích thước:</b>
            <div className="d-flex justify-content-around mt-2">
              <Radio.Group onChange={onChangeSize} value={productSize}>
                <Radio value={"sizeS"}>S</Radio>
                <Radio value={"sizeM"}>M</Radio>
                <Radio value={"sizeL"}>L</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="d-flex justify-content-around mt-3">
            <span className="fw-600">
              Giá tiền:{" "}
              <b>
                {(item?.priceBySize && item?.priceBySize[productSize]) || 0}đ
              </b>
            </span>
            <span>
              Số lượng trong kho: <b>{item.stock}</b>{" "}
            </span>
          </div>
          <div className="d-flex justify-content-around mt-3">
            <span className="fw-600">
              <b>Mô tả:</b> {item.description}
            </span>
          </div>
          <div className="d-flex justify-content-center">
            {item.stock === 0 && (
              <span className="text-danger fw-bold">Hết hàng</span>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
          <Button onClick={() => handleChangeNumber("subtraction")}>-</Button>
          <strong className="mr-2 ml-2">{quantityProduct}</strong>
          <Button onClick={() => handleChangeNumber("plus")}>+</Button>
        </div>
        <div className="d-flex justify-content-center gap-2 mt-auto">
          <Button onClick={() => handleClose()} type="primary" danger>
            Huỷ
          </Button>
          <Button
            type="primary"
            disabled={item.stock === 0}
            onClick={() => handleAddtoCart()}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default CardModal;
