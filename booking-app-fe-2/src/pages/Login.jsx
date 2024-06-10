import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import AppSection from "../components/app-Section/AppSection";
import { useNavigate } from "react-router-dom";

import "../pages/page-style/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState, logIn, signUp } from "../action/AuthAction";
import Loading from "../components/Loading/Loading";
import { notification } from "antd";
import { Alert } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);

  const { loading, errMessage } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };
  // State
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);

  // useEffect(() => {
  //   localStorage.clear()
  // }, [])

  useEffect(() => {
    if (user) {
      navigate("/trang-chu");
    }
  }, [user]);

  useEffect(() => {
    if (errMessage) {
      openNotificationWithIcon("error", errMessage, "");
      dispatch(clearAuthState());
    }
  }, [errMessage]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (data.password === data.confirmpass) {
        dispatch(signUp(data));
      } else setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };
  return (
    <Helmet>
      {contextHolder}
      <AppSection />
      <div className="login-popup">
        <form
          action=""
          className="login-popup-container"
          onSubmit={handleSubmit}
        >
          <div className="login-popup-title">
            <h2>{isSignUp ? "Đăng ký" : "Đăng nhập"}</h2>
          </div>

          {/* {alertMessage !== null && <Alert variant="danger">{alert}</Alert>} */}
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="Họ"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
                required
              />
              <input
                type="text"
                placeholder="Tên"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                required
              />
            </div>
          )}
          <div>
            <input
              type={isSignUp ? "email" : "text"}
              className="infoInput"
              placeholder="Email"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Mật khẩu"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                placeholder="Xác nhận mật khẩu"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
                required
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
            }}
          >
            * Xác nhận mật khẩu không chính xác
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp ? (
                <>
                  Đã có tài khoản?{" "}
                  <span style={{ textDecoration: "underline" }}>Đăng nhập</span>
                </>
              ) : (
                <>
                  Chưa có tài khoản?{" "}
                  <span style={{ textDecoration: "underline" }}>Đăng ký</span>
                </>
              )}
            </span>
          </div>
          <button
            className="button infobutton"
            type="submit"
            disabled={loading}
          >
            {loading
              ? isSignUp
                ? "Đăng ký..."
                : "Đăng nhập..."
              : isSignUp
              ? "Đăng ký"
              : "Đăng nhập"}
          </button>
        </form>
      </div>
      <Loading isLoading={loading} />
    </Helmet>
  );
};

export default Login;
