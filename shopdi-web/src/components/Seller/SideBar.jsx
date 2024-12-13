import { Link } from "react-router-dom";
import shopdiLogo from "@/assets/images/Shopdi.png";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function SideBar() {
    return (
        <div className="w-[15%] h-full-screen bg-yaleBlue gap-7 font-sans flex flex-col">


            <div className="w-full flex flex-col items-center mt-6">
                <img src={shopdiLogo} className="w-3/5" alt="" />
            </div>
            <Link to="">
                <div className="text-gray-300 hover:text-white text-[18px] ml-6 font-semibold">
                    <DashboardIcon className=" mr-2 mb-1" />
                    Dashboard
                </div>
            </Link>
            <Link to="products">
                <div className="text-gray-300 hover:text-white text-[18px] ml-6 font-semibold">
                    <CategoryIcon className="mr-2 mb-1" />
                    Products
                </div>
            </Link>
            <Link to="orders">
                <div className="text-gray-300 hover:text-white text-[18px] ml-6 font-semibold">
                    <LocalMallIcon className="mr-2 mb-1" />
                    Orders
                </div>
            </Link>
            <Link to="profile">
                <div className="text-gray-300 hover:text-white text-[18px] ml-6 font-semibold">
                    <AccountCircleIcon className="mr-2 mb-1" />
                    Profile
                </div>
            </Link>

        </div>
    )
}