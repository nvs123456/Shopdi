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
import Navigation from '../components/Navigation/Navigation.jsx';
import Footer from '../components/Footer/Footer.jsx';
const AppRouter = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes basename="/">
                <Route path="review" exact element={<Review />} />
                <Route path="orderlist" exact element={<OrderItemList List={orderItemList} />} />
                <Route path="orderdetail" exact element={<OrderDetails />} />
                <Route path="cart" exact element={<CartPage />} />
                <Route path="buyer/checkout" element={<Checkout />} />
                <Route path="" exact element={<HomePage />} />
                {/* <Route path="*"  element={<><h1 className='text-4xl h-screen flex justify-center items-center'>Page not found!!!</h1></>} /> */}
            </Routes>
            <div>
                <Footer />
            </div>
        </div>
    );
}
export default AppRouter