
import React from 'react'
import LoginForm from '../pages/Auth/LoginForm'
import HomePage from '../pages/HomePage'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
        </Routes>
    </div>
  )
}

export default AppRouter