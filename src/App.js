import React from "react";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./compoments/Header";
import Footer from "./compoments/Footer";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register ";
import AdminProductsList from "./pages/admin/AdminProductsList";
import AdminCategoryList from "./pages/admin/AdminCategoryList";
function App() {
  return (
    <>
      <Header />
      <Outlet /> {/* Renders child routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AdminProductsList" element={<AdminProductsList />} />
        <Route path="/AdminCategoryList" element={<AdminCategoryList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
