
import React from 'react'
import LoginForm from '../pages/Auth/LoginForm'
import HomePage from '../pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import OrderDetails from '../Buyer/components/buyer/OrderDetails'
import Review from "../Buyer/components/Review/Review.jsx";

const AppRouter = () => {
  return (
    <div>
        <Routes>
            <Route path="/*" element={<Review />} />
            <Route path="/login" exact element={<LoginForm />} />
        </Routes>
    </div>
  )
}

export default AppRouter