import { Link } from "react-router-dom";
import shopdiLogo from "@/assets/images/Shopdi.png";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
export default function SideBar() {
    return (
        <div className="w-1/6 min-w-44 h-full-screen bg-yaleBlue gap-4 flex flex-col">


            <div className="">
                <img src={shopdiLogo} alt="" />
            </div>
            <Link to="">
                <div className="text-gray-400 hover:text-white text-sm font-bold ml-2 ">
                    <DashboardIcon className="mr-2" />
                    Trang chu
                </div>
            </Link>
            <Link to="products">
                <div className="text-gray-400 hover:text-white  text-sm font-bold ml-2">
                    <CategoryIcon className="mr-2" />
                    Quan ly san pham
                </div>
            </Link>

        </div>
    )
}