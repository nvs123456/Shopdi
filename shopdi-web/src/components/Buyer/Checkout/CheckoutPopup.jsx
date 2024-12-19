import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
export default function CheckoutPopup({orderId,paymentMethod}) {
    const navigate = useNavigate();
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-white rounded flex gap-4 flex-col items-center justify-center z-50 border-[1px] border-gray-400">
            <div className='text-[24px] font-semibold'>
                {paymentMethod==="COD"?"Your order is successfully placed":"Payment is successfully completed"}
            </div>
            <div>
                <CheckCircleOutlineIcon style={{"fontSize": "100px", "color": "green"}}/>
            </div>
            <div className='flex gap-8 flex-row px-12 w-full mt-2'>
                <button onClick={() => {navigate("/")}} className="bg-white border-[1px] border-pumpkin text-pumpkin rounded px-4 py-2 w-full font-semibold text-xl hover:bg-orangeRed hover:text-white">
                    <HomeIcon /> Home page
                </button>
                <button onClick={() => {navigate(`/orderhistory`)}} className="bg-pumpkin text-white rounded px-4 py-2 w-full font-semibold text-xl hover:bg-orangeRed">
                    View order
                    <ArrowForwardIcon />
                </button>
            </div>
        </div>
    );
}