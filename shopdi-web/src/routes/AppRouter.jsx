import React from 'react'
import LoginForm from '../pages/Auth/LoginForm'
import { Route, Routes } from 'react-router-dom'
import CartPage from '../pages/buyer/CartPage.jsx';
import HomePage from "../pages/buyer/HomePage.jsx";
import OrderDetails from "../components/Buyer/OrderDetails.jsx";
import orderItemList from '../data/orderData.json';
import SignUpForm from "../pages/buyer/SignUp.jsx";
import Checkout from "../pages/buyer/Checkout.jsx";
import OrderItemList from "../pages/buyer/OrderItemList.jsx";
import Review from "../pages/buyer/Review.jsx";
const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/review" exact element={<Review />} />
                <Route path="/orderlist" exact element={<OrderItemList List={orderItemList} />} />
                <Route path="/orderdetail" exact element={<OrderDetails />} />
                <Route path="/login" exact element={<LoginForm />} />
                <Route path="/cart" exact element={<CartPage />} />
                <Route path="/buyer/checkout" element={<Checkout />} />
                <Route path="/buyer/signup" exact element={<SignUpForm />} />
                <Route path="/*" element={<HomePage />} />
            </Routes>
        </div>
    );
}
export default AppRouter