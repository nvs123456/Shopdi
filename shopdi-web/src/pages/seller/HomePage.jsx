import { Routes, Route } from "react-router-dom";
import React from "react";
import ProductManagement from "./product/ProductManagement";
import AddProduct from "@/pages/seller/product/AddProduct";
import ProductDetail from "@/pages/seller/product/ProductDetail";
export default function HomePage() {
    return (

        <Routes>
            <Route path="/" exact element={<>Dashboard </>} />
            <Route path="/products/" exact element={<ProductManagement />} />
            <Route path="products/add-product" exact element={<AddProduct />} />
            <Route path = "/products/product-detail" exact element={<ProductDetail/>} />
            <Route path="/order" exact element={<>Order</>} />
            <Route path="/profile" exact element={<>Profile</>} />
        </Routes>

    )
}