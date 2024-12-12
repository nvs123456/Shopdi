import React, {useEffect, useState} from 'react';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Pagination from "../../Navigation/Pagination.jsx";
import { baseUrl } from '../../../api/GET.jsx';

const getStatusClass = (status) => {
    switch (status) {
        case 'PENDING':
            return 'bg-[#FFFBAA] bg-opacity-[70%] text-[#FF731D]';
        case 'PROCESSING':
            return 'bg-[#74DD7B] bg-opacity-[30%] text-[#4BB543]';
        case 'CONFIRMED':
            return 'bg-[#74DD7B] bg-opacity-[30%] text-[#4BB543]';
        case 'DELIVERING':
            return 'bg-[#74DD7B] bg-opacity-[30%] text-[#4BB543]';
        case 'CANCELLED':
            return 'bg-[#F57E77] bg-opacity-[12%] text-[#CC5F5F]';
        case 'DELIVERED':
            return 'bg-[#3A5BFF] bg-opacity-[15%] text-[#3A5BFF]';
        default:
            return '';
    }
};
const columnMappings = {
    id: 'orderId',
    customer: (order) => `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    price: 'totalPrice',
    date: 'deliveryDate',
    payment: 'paymentMethod',
    status: 'orderStatus',
};
const tableHeadings = ['id', 'customer', 'price', 'date', 'payment', 'status', 'action'];

function OrderTable({type}) {

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState({pageNo: 0, totalPage: 1});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({key: '', direction: ''});
    const [filter, setFilter] = useState(type);
    const fetchOrders = async () => {
        await axios.get(baseUrl + 'seller/orders', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                "Access-Control-Allow-Origin": "http://localhost:5173",
            },
        }).then(response => {
            const data = response.data;
            if (data.code === "OK") {
                setOrders(data.result.items);
                setPage({pageNo: data.result.pageNo, totalPage: data.result.totalPages});
            } else {
                setError("Failed to fetch order history.");
            }
        }).catch(err => {
            setError("Error while fetching data. Please try again later.");
        }).finally(() => {
            setLoading(false);
        })
    }
    const fetchOrdersByFilter = async (filter) => {
        await axios.get(`${baseUrl}seller/orders/status?orderStatus=${filter}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                "Access-Control-Allow-Origin": "http://localhost:5173",
            },
        }).then(response => {
            const data = response.data;
            if (data.code === "OK") {
                setOrders(data.result.items);
                setPage({pageNo: data.result.pageNo, totalPage: data.result.totalPages});
            } else {
                setError("Failed to fetch order history.");
            }
        }).catch(err => {
            setError("Error while fetching data. Please try again later.");
        }).finally(() => {
            setLoading(false);
        })
    }
    useEffect(() => {
        filter === "All products" ? fetchOrders() : fetchOrdersByFilter(type);
    }, []);
    const handleSort = (key) => {
        console.log('sort thanh cong');
        const mappedKey = columnMappings[key];
        if (!mappedKey) return;
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});

        const sortedOrders = [...orders].sort((a, b) => {
            const aValue = typeof mappedKey === 'function' ? mappedKey(a) : a[mappedKey];
            const bValue = typeof mappedKey === 'function' ? mappedKey(b) : b[mappedKey];

            if (aValue < bValue) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setOrders(sortedOrders);
    };
    const navigate = useNavigate();



    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                <tr className="border-b">
                    {tableHeadings.map((heading, index) => (
                        <th key={index} className="pl-4 py-2 text-left font-semibold cursor-pointer"
                            onClick={() => handleSort(heading)}>
                            <div className={'flex items-center'}>
                                {heading.charAt(0).toUpperCase() + heading.slice(1)}

                                {heading !== 'action' &&
                                    <svg className="w-3 h-3 text-gray-400 ms-1.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg>}
                            </div>


                        </th>))}
                </tr>
                </thead>
                <tbody>
                {orders
                    .map((order, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100"
                            >
                            <td className="pl-4 py-1">{order.orderId}</td>
                            <td className="px-2 py-1">{(order.shippingAddress.firstName + ' ' + order.shippingAddress.lastName) || "None"}</td>
                            <td className="px-2 py-1">${order.totalPrice.toLocaleString()}</td>
                            <td className="px-2 py-1">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                            <td className="pl-5 py-1">{order.paymentMethod || "COD"}</td>
                            <td className="px-2 py-1">
                  <span className={`px-2 py-1 m-0 rounded w-full text-[16px] ${getStatusClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                            </td>
                            <td className="px-4 py-2">
                                     <button   onClick={() => navigate(`/seller/orders/${order.orderId}`)
                                     }className="text-white rounded px-2 py-1 font-medium bg-[#3F81E0]">View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <Pagination pageObject={page}/>
            </div>
        </div>
    );
}

export default OrderTable;