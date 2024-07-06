import { Button, Pagination, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import ModalAddProduct from "./ModalAddProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStateProduct,
  deleteProduct,
  getProduct,
} from "../../action/ProductAction";
import Loading from "../Loading/Loading";
import ModalEditProduct from "./ModalEditProduct";
import { getCategory } from "../../action/CategoryAction";

const ProDuctManage = (props) => {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.productReducer.listProduct);
  const {
    isCreateProductSucces,
    isUpdateProductSucces,
    isDeleteProductSucces,
    loading,
    error,
    message
  } = useSelector((state) => state.productReducer);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  const baseRequest = {
    page: 1,
    size: 5,
  };
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [dataRequest, setDataRquest] = useState(baseRequest);
  const [itemProduct, setItemProduct] = useState({});

  useEffect(()=>{
    if(error){
      openNotificationWithIcon('error', message || "")
      dispatch(clearStateProduct())
      dispatch(
        getProduct({
          ...dataRequest,
        })
      );
    }
  },[error])

  useEffect(() => {
    if (isCreateProductSucces) {
      openNotificationWithIcon("success", "Thêm mới thành công", "");
      setIsOpenModal(false);
      dispatch(clearStateProduct());
      dispatch(
        getProduct({
          ...baseRequest,
        })
      );
    }
  }, [isCreateProductSucces]);

  useEffect(() => {
    if (isUpdateProductSucces) {
      openNotificationWithIcon("success", "Cập nhật thành công", "");
      dispatch(
        getProduct({
          ...baseRequest,
        })
      );
      dispatch(clearStateProduct());
    }
  }, [isUpdateProductSucces]);

  useEffect(() => {
    if (isDeleteProductSucces) {
      openNotificationWithIcon("success", "Xoá thành công", "");
      dispatch(
        getProduct({
          ...baseRequest,
        })
      );
      dispatch(clearStateProduct());
    }
  }, [isDeleteProductSucces]);

  useEffect(() => {
    dispatch(clearStateProduct());
    dispatch(
      getProduct({
        ...dataRequest,
      })
    );
    dispatch(getCategory({}));
  }, []);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const handleOpenModalEdit = (item) => {
    setItemProduct(item);
    setIsOpenModalEdit(true);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      align: "",
      dataIndex: "title",
      key: "title",
    },
    {
      align: "center",
      title: "Giá size S",
      // dataIndex: 'priceBySize.sizeS',
      key: "price_sizeS",
      render: (record) => {
        return <div>{record?.priceBySize?.sizeS}</div>;
      },
    },
    {
      align: "center",
      title: "Giá size M",
      // dataIndex: 'priceBySize.sizeM',
      key: "price_sizeM",
      render: (record) => {
        return <div>{record?.priceBySize?.sizeM}</div>;
      },
    },
    {
      align: "center",
      title: "Giá size L",
      // dataIndex: 'priceBySize.sizeL',
      key: "price_sizeL",
      render: (record) => {
        return <div>{record?.priceBySize?.sizeL}</div>;
      },
    },
    {
      title: "Số lượng",
      align: "center",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Danh mục",
      align: "center",
      dataIndex: "categoryName",
      key: "categoryName",
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
              <Button
                onClick={() => {
                  handleOpenModalEdit(record);
                }}
              >
                Sửa
              </Button>
              <Button
                onClick={() =>
                  dispatch(deleteProduct({ productId: record._id }))
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
    <div className="">
      {contextHolder}
      <div>
        <Button type="primary" onClick={() => openModal()}>
          + Thêm sản phẩm
        </Button>
      </div>
      <div className="mt-3">
        <Table
          dataSource={listProduct && listProduct.data}
          columns={columns}
          pagination={false}
        />
        <div className="d-flex justify-content-center mt-2">
          <Pagination
            current={dataRequest.page}
            pageSize={dataRequest.size}
            total={(listProduct && listProduct.totalElement) || 0}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </div>
      {isOpenModal && (
        <ModalAddProduct
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      )}
      {isOpenModalEdit && (
        <ModalEditProduct
          isOpenModalEdit={isOpenModalEdit}
          setIsOpenModalEdit={setIsOpenModalEdit}
          itemProduct={itemProduct}
        />
      )}
      <Loading isLoading={loading} />
    </div>
  );
};

export default ProDuctManage;
