import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../../components/Navigation/Pagination.jsx";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useNavigate} from "react-router-dom";
import { baseUrl } from "../../api/GET.jsx";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi
    const navigate = useNavigate();

    const fetchOrderHistory = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                "Access-Control-Allow-Origin": "http://localhost:5173",
            },
        };

        try {
            const response = await axios.get(
                baseUrl + "orders/history",
                config
            );
            const data = response.data;
            if (data.code === "OK") {
                setOrders(data.result.items);
                setTotalPages(data.result.totalPages);
            } else {
                setError("Failed to fetch order history."); // Xử lý lỗi từ server
            }
        } catch (err) {
            setError("Error while fetching data. Please try again later.");
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    // Nếu đang loading, hiển thị spinner
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl font-bold">Loading...</div>
            </div>
        );
    }

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-xl font-bold">{error}</div>
            </div>
        );
    }

    return (
        <div className="font-sans flex justify-center bg-[#F7FBFF] min-h-screen">
            <div className="bg-white w-[80%] mt-12 mb-10 border-[1px] relative">
                <div className="absolute left-[5%] top-6 font-bold text-[12px] md:text-[14px] lg:text-2xl font-sans text-yaleBlue">
                    ORDER HISTORY
                </div>

                {/* Header Table */}
                <table className={`absolute left-[5%] top-20 table-fixed w-[90%] text-center  border-collapse`}>
                    <thead className={`text-[12px] sm:text-[14px] md:text-[16px] h-[30px] md:h-[40px] border-2 border-[#E4E7E9] bg-[#F2F4F5]`}>
                    <tr>
                        <th className="w-[10%] font-semibold">ID</th>
                        <th className="w-[20%] font-semibold">STATUS</th>
                        <th className="w-[20%] font-semibold">DATE</th>
                        <th className="w-[30%] font-semibold">TOTAL</th>
                        <th className="w-[20%] font-semibold">ACTION</th>
                    </tr>
                    </thead>
                    <tbody className={`text-[12px] sm:text-[14px] md:text-[16px]`}>
                    {orders.map((orderItem) => (
                        <tr className={"h-12 align-bottom"}>
                            <td className={`text-left pl-12`}>
                                {orderItem.orderId}
                            </td>
                            <td className={`text-left pl-16 font-semibold ${orderItem.orderStatus === 'PENDING' ? 'text-[#FF731D]'
                                : orderItem.orderStatus === 'CONFIRMED' ? 'text-[#4BB543]' : 
                                    orderItem.orderStatus === 'PROCESSING' ?'text-[#4BB543]' :
                                        orderItem.orderStatus === 'DELIVERING' ?'text-[#3A5BFF]]':
                                            orderItem.orderStatus === 'DELIVERED' ?'text-[#3A5BFF]' :'text-[#EE5858]'}`}>
                                {orderItem.orderStatus}
                            </td>
                            <td className={"text-gray-600"}>
                                {orderItem.deliveryDate.split(' ')[0]}
                            </td>
                            <td className={`text-left pl-20 text-gray-600`}>
                                {orderItem.totalPrice.toLocaleString()} đ ({orderItem.totalItems} products)
                            </td>
                            <td onClick={() => {navigate(`/orders/${orderItem.orderId}`)}}
                                className={`font-semibold cursor-pointer text-[#2DA5F3]`}>
                                <button className='pr-1'>View details</button>
                                <ArrowForwardIcon fontSize={'inherit'}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center absolute bottom-0 left-[45%] mb-3">
                    <Pagination totalPage={totalPages}/>
                </div>
            </div>
        </div>
    )
        ;
}

export default OrderHistory;
