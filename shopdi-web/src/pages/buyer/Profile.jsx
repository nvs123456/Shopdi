import React, { useEffect, useState } from "react";
import axios from "axios";
import RocketIcon from '@mui/icons-material/Rocket'
import profileDefault from "../../assets/images/profileDefault.png";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
export default function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [info, setInfo] = useState({});
    const [error, setError] = useState(null);

    const API_CONFIG = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersResponse, infoResponse] = await Promise.all([
                    axios.get("http://localhost:8080/orders/history", API_CONFIG),
                    axios.get("http://localhost:8080/users/my-info", API_CONFIG),
                ]);

                if (ordersResponse.data.code === "OK") {
                    setOrders(ordersResponse.data.result.items);
                }

                if (infoResponse.data.code === "OK") {
                    setInfo(infoResponse.data.result);
                }
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const defaultAddress =
        info.address && Array.isArray(info.address)
            ? info.address.find((ad) => ad.default === true)
            : null;

    if (isLoading) {
        return <div className="loading">Loading...</div>; // Replace with a spinner or skeleton loader.
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="bg-[#EAF6FE] bg-opacity-20 font-sans min-h-screen p-4">
            {/* Header */}
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-xl font-semibold text-gray-800">
                    Hello, {info.username || "User"}
                </h1>
                <p className="text-sm text-gray-500">
                    From your account dashboard, you can easily check & view your{" "}
                    <br />
                    <span className="text-blue-500 cursor-pointer">Recent Orders</span>, manage your{" "}
                    <span className="text-blue-500 cursor-pointer">
            Shipping and Billing Addresses
          </span>
                    , and edit your{" "}
                    <span className="text-blue-500 cursor-pointer">Password</span> and{" "}
                    <span className="text-blue-500 cursor-pointer">Account Details</span>.
                </p>
            </div>

            {/* Dashboard Cards */}
            <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <AccountInfo info={info} />
                <BillingAddress info={info} address={defaultAddress} />
                <OrderSummary orders={orders} />
            </div>

            {/* Recent Orders */}
            <RecentOrders orders={orders} />
        </div>
    );
}

function AccountInfo({ info }) {
    return (
        <div className="relative bg-white border-[#E4E7E9] border-2 rounded-sm p-4">
            <h2 className="text-sm font-medium text-gray-600 border-b-2">ACCOUNT INFO</h2>
            <div className="flex flex-row lg:py-2">
                <img
                    src={info.profileImage || profileDefault}
                    alt="profile"
                    className="lg:w-12 lg:h-12 p-1 mr-2 border-2 border-gray-400 rounded-full"
                />
                <p className="text-gray-800 font-semibold mt-2 mb-4">{info.username}</p>
            </div>
            <p className="text-gray-500 text-sm">{`${info.firstName} ${info.lastName}`}</p>
            <p className="text-gray-500 text-sm">Email: {info.email}</p>
            <p className="text-gray-500 text-sm mb-4">Phone: {info.mobileNo}</p>
            <button
                onClick={() => (window.location.href = "/editprofile")}
                className="xl:absolute xl:bottom-4 px-1 py-0.5 text-[14px] lg:mt-4 text-[#2DA5F3] border-2 border-[#D5EDFD] lg:px-4 lg:py-2 lg:text-sm"
            >
                Edit Account
            </button>
        </div>
    );
}

function BillingAddress({ address }) {
    return (
        <div className="relative bg-white border-[#E4E7E9] border-2 rounded-sm p-4">
            <h2 className="text-sm font-medium text-gray-600 border-b-2">BILLING ADDRESS</h2>
            {address ? (
                <div>
                    <p className="text-gray-800 font-semibold mt-2 mb-4">{address.firstName} {address.lastName}</p>
                    <p className="text-gray-500 text-sm">{address.address}</p>
                    <p className="text-gray-500 text-sm">Phone: {address.phoneNumber}</p>
                    <p className="text-gray-500 text-sm mb-4">Email: {address.email}</p>
                </div>
            ) : (
                <div>
                    <p className="text-gray-500 text-sm">No Address. Please add some.</p>
                </div>
            )}
            <button
                onClick={() => (window.location.href = "/editprofile")}
                className="xl:absolute xl:bottom-4 px-1 py-0.5 text-[14px] lg:mt-4 text-[#2DA5F3] border-2 border-[#D5EDFD] lg:px-4 lg:py-2 lg:text-sm"
            >
                Edit Address
            </button>
        </div>
    );
}

function OrderSummary({ orders }) {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((order) => order.orderStatus === "PENDING").length;
    const completedOrders = orders.filter((order) => order.orderStatus === "DELIVERED").length;

    return (
        <div className="flex flex-col justify-around">
            <DashboardCard
                title="Total Orders"
                count={totalOrders}
                bgColor="#EAF6FE"
                iconColor="#2DA5F3"
            />
            <DashboardCard
                title="Pending Orders"
                count={pendingOrders}
                bgColor="#FFF3EB"
                iconColor="#FA8232"
            />
            <DashboardCard
                title="Completed Orders"
                count={completedOrders}
                bgColor="#EAF7E9"
                iconColor="#2DB324"
            />
        </div>
    );
}

function DashboardCard({ title, count, bgColor, iconColor}) {
    return (
        <div className={`flex mb-3 h-full rounded-sm ${title === 'Total Orders' ? 'bg-[#EAF6FE]' : title === "Pending Orders" ? 'bg-[#FFF3EB]' : 'bg-[#EAF7E9]'}`}>
            <div className={`bg-white p-3 m-2 w-12`}>
                {/* Add SVG or Icon here */}
                {title === "Total Orders" ? <RocketIcon sx={{ color: iconColor, fontSize: '40px' }} /> : title === "Pending Orders" ? <PendingActionsIcon sx={{ color: iconColor, fontSize: '40px' }}/> : <TaskIcon sx={{ color: iconColor, fontSize: '40px' }}/>}
            </div>
            <div>
                <p className="text-gray-800 text-lg font-semibold mt-2">{count}</p>
                <p className="text-gray-500 text-sm">{title}</p>
            </div>
        </div>
    );
}

function RecentOrders({orders}) {
    return (
        <div className="max-w-5xl mx-auto mt-6 p-4 bg-white border-2 border-[#E4E7E9]">
            <div className="relative">
                <h2 className="text-gray-800 font-semibold text-lg">Recent Orders</h2>
                <button
                    onClick={() => (window.location.href = "/orderhistory")}
                    className="absolute right-4 top-0 text-blue-500"
                >
                    View All
                </button>
            </div>
            {orders.length > 0 ? <table className="table-fixed mt-4 w-full text-center text-[10px] lg:text-sm text-black ">
                <thead>
                <tr className={`bg-[#F2F4F5] border-2 border-[#E4E7E9]`}>
                    <th className="xl:w-[10%] pb-2 border-b">ORDER ID</th>
                    <th className="xl:w-[20%] pb-2 border-b">STATUS</th>
                    <th className="xl:w-[20%] pb-2 border-b">DATE</th>
                    <th className="xl:w-[30%] pb-2 border-b">TOTAL</th>
                    <th className="xl:w-[20%] pb-2 border-b">ACTION</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map((orderItem) => (
                        <tr key={orderItem.orderId}>
                            <td className="py-2 xl:pl-4">{orderItem.orderId}</td>
                            {orderItem.orderStatus === 'DELIVERED' ? <td className='text-[#2DB224]'>COMPLETED</td> :
                                orderItem.orderStatus === 'PENDING' ?
                                    <td className='text-[#FA8232]'>IN PROGRESS</td> :
                                    <td className='text-[#EE5858]'>CANCELLED</td>
                            }
                            <td className="py-2">{orderItem.deliveryDate.split(" ")[0]}</td>
                            <td className="py-2">${orderItem.totalPrice}({orderItem.totalItems} Products)</td>
                            <td onClick={() => {window.location.href = `/orders/${orderItem.orderId}`}}
                                className="py-2 text-blue-500 cursor-pointer">View Details<ArrowForwardIcon
                                className={`ml-1`} fontSize={'inherit'}/></td>
                        </tr>
                    ))
                }

                </tbody>
            </table>
                : (
                <p className="text-gray-500">No orders available</p>
            )}
        </div>
    );
}
