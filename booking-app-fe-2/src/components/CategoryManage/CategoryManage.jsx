import { Button, Pagination, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import ModalAddCategory from "./ModalAddCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStateCategory,
  deleteCategory,
  getCategory,
} from "../../action/CategoryAction";
import Loading from "../Loading/Loading";
import ModalEditCategory from "./ModalEditCategory";

const CategoryManage = (props) => {
  const dispatch = useDispatch();
  const listCategory = useSelector(
    (state) => state.categoryReducer.listCategory
  );
  const {
    isCreateCategorySucces,
    isUpdateCategorySucces,
    isDeleteCategorySucces,
    loading,
    error,
    message,
  } = useSelector((state) => state.categoryReducer);
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
  const [itemCategory, setItemCategory] = useState({});

  useEffect(() => {
    if (isCreateCategorySucces) {
      openNotificationWithIcon("success", "Thêm mới thành công", "");
      setIsOpenModal(false);
      dispatch(clearStateCategory());
      dispatch(
        getCategory({
          ...baseRequest,
        })
      );
    }
  }, [isCreateCategorySucces]);

  useEffect(() => {
    if (isUpdateCategorySucces) {
      openNotificationWithIcon("success", "Cập nhật thành công", "");
      dispatch(clearStateCategory());
      dispatch(
        getCategory({
          ...baseRequest,
        })
      );
    }
  }, [isUpdateCategorySucces]);

  useEffect(() => {
    if (isDeleteCategorySucces) {
      openNotificationWithIcon("success", "Xoá thành công", "");
      dispatch(clearStateCategory());
      dispatch(
        getCategory({
          ...baseRequest,
        })
      );
    }
  }, [isDeleteCategorySucces]);

  useEffect(() => {
    dispatch(clearStateCategory());
    dispatch(
      getCategory({
        ...dataRequest,
      })
    );
  }, []);

  useEffect(() => {
    if (error) {
      openNotificationWithIcon("error", message || "");
      dispatch(clearStateCategory());
      dispatch(
        getCategory({
          ...dataRequest,
        })
      );
    }
  }, [error]);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const handleOpenModalEdit = (item) => {
    setItemCategory(item);
    setIsOpenModalEdit(true);
  };

  const columns = [
    {
      title: "Tên danh mục",
      align: "",
      dataIndex: "name",
      key: "name",
    },
    {
      align: "center",
      title: "Mã danh mục",
      dataIndex: "code",
      key: "code",
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
                  dispatch(deleteCategory({ categoryId: record._id }))
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
      getCategory({
        ...newDataRequest,
      })
    );
  };

  return (
    <div className="">
      {contextHolder}
      <div>
        <Button type="primary" onClick={() => openModal()}>
          Thêm Danh mục
        </Button>
      </div>
      <div className="mt-3">
        <Table
          dataSource={listCategory && listCategory.data}
          columns={columns}
          pagination={false}
        />
        <div className="d-flex justify-content-center mt-2">
          <Pagination
            current={dataRequest.page}
            pageSize={dataRequest.size}
            total={(listCategory && listCategory.totalElement) || 0}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </div>
      {isOpenModal && (
        <ModalAddCategory
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          openNotificationWithIcon={openNotificationWithIcon}
        />
      )}
      {isOpenModalEdit && (
        <ModalEditCategory
          isOpenModalEdit={isOpenModalEdit}
          setIsOpenModalEdit={setIsOpenModalEdit}
          itemCategory={itemCategory}
          openNotificationWithIcon={openNotificationWithIcon}
        />
      )}
      <Loading isLoading={loading} />
    </div>
  );
};

export default CategoryManage;
