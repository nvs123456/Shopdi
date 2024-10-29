
import React from 'react'
import LoginForm from '@/pages/Auth/LoginForm'
import HomePage from '@/pages/buyer/HomePage'
import CartPage from '@/pages/buyer/CartPage'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <div>
        <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/login" exact element={<LoginForm />} />
            <Route path="/cart" exact element={<CartPage />}/>
        </Routes>
    </div>
  )
}

export default AppRouter