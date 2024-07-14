import { Input, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePass, clearAuthState, logOut } from "../../action/AuthAction";
import { useNavigate } from "react-router-dom";

const ChangePassModal = (props) => {
  const { openModal, setOpenModal } = props;
  const navigate = useNavigate()

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    return new Promise((resolve) => {
      api[type]({
        message,
        description,
        onClose: resolve,
      });
    });
  };
  const dispatch = useDispatch()


  const handleCancel = () => {
    setOpenModal(false);
  };
  const user = useSelector((state) => state.authReducer.authData);
  const { loading, errMessage, changePassSuccess } = useSelector((state) => state.authReducer)
  const [dataRequest, setDataRquest] = useState({
    password: "",
    newPassword: "",
    confirmPass: ""
  });

  useEffect(()=>{
    if(errMessage){
        openNotificationWithIcon("error", errMessage || "");
        dispatch(clearAuthState())
    }
  },[errMessage])
  useEffect(()=>{
    if(changePassSuccess){
       (async () => {
           await openNotificationWithIcon("success", "Thành công! Vui lòng đăng nhập lại");
           dispatch(clearAuthState())
           dispatch(logOut())
           navigate('/dang-nhap')
           handleCancel()
       }
       )() 
    }
  },[changePassSuccess])

  const handleChange = (e) => {
    const newDataRequest = {
      ...dataRequest,
      [e.target.name]: e.target.value,
    }
    setDataRquest(newDataRequest)
  }
  const handleChangePass = () => {
    if(dataRequest.newPassword !== dataRequest.confirmPass){
        return openNotificationWithIcon("error", "Xác nhận mật khẩu không chính xác");
    }
    return dispatch(changePass({
        ...dataRequest,
        userId: user?.user?._id
    }))
  }

  return (
    <div>
      {contextHolder}
      <Modal
        open={openModal}
        onCancel={() => handleCancel()}
        title="Đổi mật khẩu"
        okText="Xác nhận"
        cancelText="Hủy"
        onOk={() => handleChangePass()}
      >
        <div className="d-flex flex-column gap-2">
        <Input.Password 
          name="password"
          value={dataRequest.password}
          placeholder="Mật khẩu hiện tại"
          onChange={(e) => handleChange(e)}
        />
        <Input.Password
          name="newPassword"
          value={dataRequest.newPassword}
          placeholder="Mật khẩu mới"
          onChange={(e) => handleChange(e)}
        />
        <Input.Password
          name="confirmPass"
          value={dataRequest.confirmPass}
          placeholder="Xác nhận mật khẩu"
          onChange={(e) => handleChange(e)}
        />
        </div>
      </Modal>
    </div>
  );
};

export default ChangePassModal;
