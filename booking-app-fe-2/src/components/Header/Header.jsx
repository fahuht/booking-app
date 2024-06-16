import { React, useRef, useEffect } from "react";

import logo from "../../assets/image/res-logo.png";
import { Container } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../Header/Header.css";
import { Button } from "antd";
import { logOut } from "../../action/AuthAction";

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const user = useSelector((state) => state.authReducer.authData);
  const totalQuantity = useSelector(
    (state) => state.cart && state.cart.totalQuantity
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nav_link = [
    {
      path: "/trang-chu",
      display: "Trang chủ",
    },
    {
      path: "/foods",
      display: "Sản phẩm",
    },
    {
      path: "/gio-hang",
      display: "Giỏ hàng",
    },
    {
      path: "/don-hang",
      display: "Đơn hàng",
    },
    {
      path: "/lien-he",
      display: "Liên hệ",
    },
  ];

  const nav_link_admin = [
    {
      path: "/admin",
      display: "",
    },
  ];

  const toggleMenu = () => menuRef.current.classList.toggle("menu-show");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header_shrink");
      } else {
        headerRef.current.classList.remove("header_shrink");
      }
    });
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <header className="header-header w-100" ref={headerRef}>
      <Container className="header-container">
        <div className="header-wrapper d-flex align-items-center justify-content-between">
          <div className="header-logo">
            <img src={logo} alt="header-logo" />
            <h5>Booking Food</h5>
          </div>

          {/* header-menu */}
          <div className="header-navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="header-menu d-flex align-items-center gap-5">
              {user?.user?.admin || user?.user?.staff
                ? nav_link_admin.map((item, index) => (
                    <NavLink
                      onClick={toggleMenu}
                      to={item.path}
                      key={index}
                      className={(navClass) =>
                        navClass.isActive ? "active_menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  ))
                : nav_link.map((item, index) => (
                    <NavLink
                      onClick={toggleMenu}
                      to={item.path}
                      key={index}
                      className={(navClass) =>
                        navClass.isActive ? "active_menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  ))}
            </div>
          </div>

          {/* header-right-icon */}
          <div className="header-right-icon d-flex align-items-center gap-4">
            {user ? (
              <div className="d-flex gap-4 align-items-center">
                <strong>
                  {user?.user?.firstname} {user?.user?.lastname}
                </strong>
                <Button
                  className="addtoCart_btn"
                  onClick={() => handleLogout()}
                >
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <Button
                className="addtoCart_btn"
                onClick={() => navigate("/dang-nhap")}
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
