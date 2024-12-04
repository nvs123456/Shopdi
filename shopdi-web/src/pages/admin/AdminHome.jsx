import {Routes, Route} from "react-router-dom";
import React from "react";
import BuyerList from "./BuyerList.jsx";

import CategoryManagement from "./CategoryManagement.jsx";
import SellerList from "./SellerList.jsx";

export default function AdminHome() {
    return (
            <Routes>
                {/* <Route path="/" exact element={<DashBoard/>}/> */}
                {/* <Route path="/products" exact element={<ProductManagement/>}/> */}
                <Route path="/categories" exact element={<CategoryManagement/>}/>
                <Route path="/sellers" exact element={<SellerList/>}/>
                <Route path="/buyers" exact element={<BuyerList/>}/>
            </Routes>


    )
}