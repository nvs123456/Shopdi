import AppRouter from './routes/AppRouter'
import { Route, Routes } from 'react-router-dom'
import LoginForm from '@/pages/Auth/LoginForm'
import ForgetPassword from "@/pages/buyer/Forget";
import SellerHome from "@/pages/seller/HomePage";
import SideBar from './components/Seller/SideBar'
import SellerFooter from "./components/Seller/Footer/SellerFooter.jsx";
import AuthProvider from './routes/AuthProvider.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import SignUpForm from './pages/buyer/SignUp.jsx'
import { CookiesProvider } from 'react-cookie'
import PrivateSellerRoute from './routes/PrivateSellerRoute.jsx'
import SellerSignUp from './pages/seller/SignUp.jsx'
import PrivateAdminRoute from './routes/PrivateAdminRoute.jsx';
import CategoryManagement from './pages/admin/CategoryManagement.jsx';
import AdminSideBar from './components/Admin/Sidebar';
import AdminHome from './pages/admin/AdminHome.jsx';
import ResetPassword from './pages/buyer/ResetPassWord.jsx';
function App() {

    return (
        <div>
            <CookiesProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" exact element={<LoginForm />} />
                        <Route path="/forget" exact element={<ForgetPassword />} />
                        <Route path='buyer/signup' exact element={< SignUpForm />} />
                        <Route path='api/v1/auth/reset-password' exact element={<ResetPassword />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/*" element={
                                <div className='flex flex-col min-h-screen w-full'>
                                    <div className='flex flex-col min-h-screen w-full'>
                                        <AppRouter />
                                    </div>
                                </div>
                            } />
                            <Route path='seller/signup' element={<SellerSignUp />} />
                            <Route element={<PrivateSellerRoute />}>
                                <Route path="seller/*" element={
                                    <div className="flex flex-row min-h-screen ">
                                        <SideBar />
                                        <div className="w-[85%] flex flex-col">
                                            <SellerHome />
                                            <SellerFooter />
                                        </div>
                                    </div>
                                } />
                            </Route>
                            <Route element={<PrivateAdminRoute />}>
                                <Route path="admin/*" element={
                                    <div className="flex flex-row min-h-screen">
                                        <AdminSideBar />
                                        <div className="w-[85%] flex flex-col w-full">
                                            <AdminHome />
                                        </div>
                                    </div>
                                } />
                            </Route>
                        </Route>
                    </Routes>
                </AuthProvider>
            </CookiesProvider>
        </div>

    )
}

export default App
