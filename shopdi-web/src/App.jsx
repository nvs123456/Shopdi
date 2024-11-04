import Footer from './components/Footer/Footer'
import AppRouter from './routes/AppRouter'
import Navigation from './components/Navigation/Navigation'
import { Route, Routes } from 'react-router-dom'
import LoginForm from '@/pages/Auth/LoginForm'
import ForgetPassword from "@/pages/buyer/Forget";
import SellerHome from "@/pages/seller/HomePage";
import AddProduct from "@/pages/seller/product/AddProduct";
import SideBar from './components/Seller/SideBar'
function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" exact element={<LoginForm />} />
        <Route path="/buyer/forget" exact element={<ForgetPassword />} />
        <Route path="/seller/login" exact element={<LoginForm />} />
        <Route path="/seller/*" element={
          <div className="flex flex-row"> 
          <SideBar />
          <SellerHome />
          </div>
          } />
        <Route path="/*" element={
          <div className='flex flex-col min-h-screen'>
            <div>
              <Navigation />
            </div>
            <div>
              <AppRouter />
            </div>
            <div>
              <Footer />
            </div>
          </div>
        } />
      </Routes>

    </div>

  )
}

export default App
