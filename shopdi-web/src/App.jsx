import Footer from './components/Footer/Footer'
import AppRouter from './routes/AppRouter'
import Navigation from './components/Navigation/Navigation'
import { Route, Routes } from 'react-router-dom'
import LoginForm from '@/pages/Auth/LoginForm'
import ForgetPassword from "@/pages/buyer/Forget";
import SellerHome from "@/pages/seller/HomePage";
import AddProduct from "@/pages/seller/product/AddProduct";
import SideBar from './components/Seller/SideBar'
import SellerFooter from "./components/Seller/Footer/SellerFooter.jsx";
import AuthProvider from './routes/AuthProvider.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import SignUpForm from './pages/buyer/SignUp.jsx'
import SellerSignUp from './pages/seller/SignUp.jsx'
function App() {

    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/login" exact element={<LoginForm />} />
                    <Route path="/forget" exact element={<ForgetPassword />} />
                    <Route path='buyer/signup' exact element={< SignUpForm />} />
                    <Route path='seller/signup' exact element={< SellerSignUp />} />
                    <Route element={<PrivateRoute />}>
                        {localStorage.getItem("role") === "BUYER" && <Route path="/*" element={
                            <div className='flex flex-col min-h-screen'>
                                <div>
                                    <AppRouter />
                                </div>
                            </div>
                        } />}
                        {localStorage.getItem("role") === "SELLER" && <Route path="seller/*" element={
                            <div className="flex min-h-screen min-w-screen">
                                <SideBar />
                                <div className={'w-full'}>
                                    <SellerHome />
                                    <SellerFooter />
                                </div>
                            </div>
                        } />}


                    </Route>
                </Routes>
            </AuthProvider>
        </div>

    )
}

export default App
