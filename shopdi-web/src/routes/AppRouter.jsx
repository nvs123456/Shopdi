
import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import LoginForm from '../pages/Auth/LoginForm'
import HomePage from '../pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Navigation from '../components/Navigation/Navigation'

const AppRouter = () => {
  return (
    <div>
        <div>
            <Navigation />
        </div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
        </Routes>
        <div>
            <Footer />
        </div>
    </div>
  )
}

export default AppRouter