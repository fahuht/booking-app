import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveOrder,
  clearStateProduct,
  createPayment,
  getListOrderById,
} from "../action/ProductAction";
import { Button, Pagination, Table, notification } from "antd";
import Loading from "../components/Loading/Loading";
import { convertSize } from "../constants/constants";

const OrderPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const listOrder = useSelector((state) => state.productReducer.listOrder);
  const { isApproveSuccess, loading } = useSelector(
    (state) => state.productReducer
  );
  const { isOrderSuccess } = useSelector((state) => state.productReducer);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Đặt hàng thành công",
      description: "Kiểm tra trạng thái đơn hàng của bạn tại đây",
    });
  };
  const baseRequest = {
    userId: user.user._id,
    page: 1,
    size: 5,
  };
  const [dataRequest, setDataRquest] = useState(baseRequest);

  useEffect(() => {
    if (isOrderSuccess) {
      openNotificationWithIcon("success");
    }
  }, [isOrderSuccess]);

  useEffect(() => {
    if (isApproveSuccess) dispatch(clearStateProduct());
    dispatch(
      getListOrderById({
        ...dataRequest,
      })
    );
  }, [isApproveSuccess]);

  useEffect(() => {
    dispatch(clearStateProduct());
    dispatch(
      getListOrderById({
        ...dataRequest,
      })
    );
  }, []);

  const columns = [
    {
      title: "Danh sách sản phẩm",
      align: "",
      // dataIndex: 'title',
      key: "listCart",
      render: (record) => {
        return (
          <div className="d-flex flex-column">
            {record &&
              record.listCart.map((item) => (
                <span>
                  {" "}
                  {item.title} - {convertSize(item.size)}  x  {item.quantity}
                </span>
              ))}
          </div>
        );
      },
    },
    {
      align: "",
      title: "Thông tin",
      // dataIndex: 'price',
      key: "price",
      render: (record) => {
        return (
          <div className="d-flex flex-column">
            <span>Tên: {record.info.name}</span>
            <span>Email: {record.info.email}</span>
            <span>SĐT: {record.info.phone}</span>
            <span>Địa chỉ: {record.info.address}</span>
          </div>
        );
      },
    },
    {
      title: "Tổng tiền",
      align: "center",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Trạng thái",
      align: "center",
      key: "status",
      render: (record) => {
        if (record.status === "waiting") {
          return <b className="text-danger">Chưa thanh toán</b>;
        }
        if (record.status === "paid") {
          return <b className="text-primary">Đã thanh toán</b>;
        }
        if (record.status === "processing") {
          return <b className="text-warning">Đang vận chuyển</b>;
        }
        if (record.status === "finish") {
          return <b className="text-success">Đã nhận hàng</b>;
        }
      },
    },
    {
      title: "Thao tác",
      align: "center",
      key: "actions",
      render: (record) => {
        return (
          <div>
            <div className="d-flex justify-content-center gap-1">
              {record.status === "processing" && (
                <Button
                  disabled={record.status === "finish"}
                  onClick={() => {
                    dispatch(
                      approveOrder({ type: "finish", orderId: record._id })
                    );
                  }}
                >
                  Đã nhận hàng
                </Button>
              )}
              {record.status === "waiting" && (
                <Button
                  disabled={record.status !== "waiting"}
                  onClick={() => {
                    dispatch(createPayment({ orderId: record?._id }));
                  }}
                >
                  Thanh toán ngay
                </Button>
              )}
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
      getListOrderById({
        ...newDataRequest,
      })
    );
  };

  return (
    <div className="p-3">
      {contextHolder}
      <h3>Danh sách đơn hàng</h3>
      <div className="mt-3">
        <Table
          dataSource={listOrder && listOrder.data}
          columns={columns}
          pagination={false}
        />
        <div className="d-flex justify-content-center mt-2">
          <Pagination
            current={dataRequest.page}
            pageSize={dataRequest.size}
            total={(listOrder && listOrder.totalElement) || 0}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </div>
      <Loading isLoading={loading} />
    </div>
  );
};

export default OrderPage;
