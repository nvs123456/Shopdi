import {Routes, Route} from "react-router-dom";
import React from "react";
import ProductManagement from "./product/ProductManagement";
import AddProduct from "@/pages/seller/product/AddProduct";
import ProductDetail from "@/pages/seller/product/ProductDetail";
import DashBoard from "@/pages/seller/dashboard/DashBoard";
import OrderList from "./order/OrderList.jsx";
import SellerFooter from "../../components/Seller/Footer/SellerFooter.jsx";

export default function HomePage() {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<DashBoard/>}/>
                <Route path="/products/" exact element={<ProductManagement/>}/>
                <Route path="products/add-product" exact element={<AddProduct/>}/>
                <Route path="/products/product-detail" exact element={<ProductDetail/>}/>
                <Route path="/orders" exact element={<OrderList/>}/>
                <Route path="/profile" exact element={<>Profile</>}/>

            </Routes>
        </div>


    )
}