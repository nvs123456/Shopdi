import { Link } from "react-router-dom";
import shopdiLogo from "@/assets/images/Shopdi.png";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function SideBar() {
    return (
        <div className="w-[15%] h-full-screen bg-yaleBlue gap-4 font-sans flex flex-col">


            <div className="w-full flex flex-col items-center">
                <img src={shopdiLogo} className="w-1/2" alt="" />
            </div>
            <Link to="">
                <div className="text-gray-400 hover:text-white text-sm ml-1">
                    <DashboardIcon className="mr-1" />
                    Trang chủ
                </div>
            </Link>
            <Link to="products">
                <div className="text-gray-400 hover:text-white  text-sm ml-1">
                    <CategoryIcon className="mr-1" />
                    Quản lý sản phẩm
                </div>
            </Link>
            <Link to="orders">
                <div className="text-gray-400 hover:text-white  text-sm ml-1">
                    <LocalMallIcon className="mr-1" />
                    Orders
                </div>
            </Link>
            <Link to="profile">
                <div className="text-gray-400 hover:text-white text-sm ml-1">
                    <AccountCircleIcon className="mr-1" />
                    Profile
                </div>
            </Link>

        </div>
    )
}