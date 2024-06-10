import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveOrder,
  clearStateProduct,
  getListOrder,
} from "../../action/ProductAction";
import { Button, Pagination, Table } from "antd";
import Loading from "../Loading/Loading";
import { convertSize } from "../../constants/constants";

const OrderMage = () => {
  const dispatch = useDispatch();
  const listOrder = useSelector((state) => state.productReducer.listOrder);
  const { isApproveSuccess, loading } = useSelector(
    (state) => state.productReducer
  );

  const baseRequest = {
    page: 1,
    size: 5,
  };
  const [dataRequest, setDataRquest] = useState(baseRequest);

  useEffect(() => {
    if (isApproveSuccess) {
      dispatch(clearStateProduct());
      dispatch(
        getListOrder({
          ...dataRequest,
        })
      );
    }
  }, [isApproveSuccess]);

  useEffect(() => {
    dispatch(clearStateProduct());
    dispatch(
      getListOrder({
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
                  {item.title} - {convertSize(item.size)} x {item.quantity}
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
          return <b className="text-success">Hoàn thành</b>;
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
              <Button
                disabled={
                  record.status === "processing" ||
                  record.status === "finish" ||
                  record.status === "waiting"
                }
                onClick={() => {
                  dispatch(
                    approveOrder({ type: "processing", orderId: record._id })
                  );
                }}
              >
                Chấp nhận
              </Button>
              {/* <Button>Từ chối</Button> */}
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
      getListOrder({
        ...newDataRequest,
      })
    );
  };

  return (
    <div className="">
      <div className="mt-1">
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

export default OrderMage;
