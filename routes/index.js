import React from "react";
import "./App.css";
import { Outlet } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Header from "./compoments/Header";
import Footer from "./compoments/Footer";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "../src/pages/productDetail";
function App() {
  return (
    <>
      <Header />
      <Outlet/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
