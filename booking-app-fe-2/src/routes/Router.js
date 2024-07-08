import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "../pages/Admin";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import FoodDetails from "../pages/FoodDetails";
import Foods from "../pages/Foods";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useSelector } from "react-redux";
import OrderPage from "../pages/OrderPage";

const Router = () => {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <Routes>
      <Route
        path="/"
        element={
          user?.user?.admin || user?.user?.staff ? (
            <Admin />
          ) : (
            <Navigate to="/trang-chu" />
          )
        }
      />
      <Route
        path="/trang-chu"
        element={user?.user?.admin || user?.user?.staff ? <Admin /> : <Home />}
      />
      <Route
        path="/foods"
        element={user?.user?.admin || user?.user?.staff ? <Admin /> : <Foods />}
      />
      <Route
        path="/foods/:id"
        element={
          user?.user?.admin || user?.user?.staff ? <Admin /> : <FoodDetails />
        }
      />
      {/* <Route path="/dang-ky" element={<Register />} /> */}
      <Route path="/dang-nhap" element={<Login />} />
      <Route
        path="/thanh-toan"
        element={
          user ? (
            user?.user?.admin || user?.user?.staff ? (
              <Admin />
            ) : (
              <Checkout />
            )
          ) : (
            <Login />
          )
        }
      />
      <Route path="/lien-he" element={<Contact />} />
      <Route
        path="/gio-hang"
        element={
          user ? (
            user?.user?.admin || user?.user?.staff ? (
              <Admin />
            ) : (
              <CartPage />
            )
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/don-hang"
        element={
          user ? (
            user?.user?.admin || user?.user?.staff ? (
              <Admin />
            ) : (
              <OrderPage />
            )
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/admin"
        element={user?.user?.admin || user?.user?.staff ? <Admin /> : <Home />}
      />
    </Routes>
  );
};

export default Router;
