
import React from 'react'
import LoginForm from '../pages/Auth/LoginForm'
import HomePage from '../pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import OrderDetails from '../components/buyer/OrderDetails'

const AppRouter = () => {
  return (
    <div>
        <Routes>
            <Route path="/*" element={<OrderDetails />} />
            <Route path="/login" exact element={<LoginForm />} />
        </Routes>
    </div>
  )
}

export default AppRouter