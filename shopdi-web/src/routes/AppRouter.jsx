import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CartPage from '../pages/buyer/CartPage.jsx';
import HomePage from "../pages/buyer/HomePage.jsx";
import OrderDetails from "../components/Buyer/Order/OrderDetails.jsx";
import Checkout from "../pages/buyer/Checkout.jsx";
import OrderHistory from "../pages/buyer/OrderHistory.jsx";
import Review from "../pages/buyer/Review.jsx";
import Navigation from '../components/Navigation/Navigation.jsx';
import Footer from '../components/Footer/Footer.jsx';
import EditProfile from "../pages/buyer/EditProfile.jsx";
import ShopView from "../pages/buyer/ShopView.jsx";
import SellerList from "../pages/admin/SellerList.jsx";
import Profile from "../pages/buyer/Profile.jsx";
import ProductDetail from "../pages/buyer/ProductDetail.jsx";
const AppRouter = () => {
    const [category, setCategory] = React.useState("");
    return (
        <div className={'min-w-full'}>

            <div>
                <Navigation />
            </div>
            <Routes basename="/">
                <Route path={"/profile"} exact element={<Profile />} />
                <Route path={"/editprofile"} exact element={<EditProfile />} />
                <Route path="review" exact element={<Review />} />
                <Route path="/orderhistory" exact element={<OrderHistory/>} />
                <Route path="orders/:id" exact element={<OrderDetails  />} />
                <Route path="cart" exact element={<CartPage />} />
                <Route path="buyer/checkout" exact element={<Checkout />} />
                <Route path='product/:id' element={<ProductDetail />} />

                <Route path='shop/:id' element={<ShopView />} />
                <Route path="/*" element={<HomePage />} />
                {/* <Route path="*"  element={<><h1 className='text-4xl h-screen flex justify-center items-center'>Page not found!!!</h1></>} /> */}
            </Routes>
            <div>
                <Footer />
            </div>
        </div>
    );
}
export default AppRouter