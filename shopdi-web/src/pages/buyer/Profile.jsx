import React, {useEffect, useState} from "react";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import orderItem from "../../components/Buyer/Order/OrderItem.jsx";
import profileDefault from "../../assets/images/profileDefault.png";

export default function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [info, setInfo] = useState({});
    const [address, setAddress] = useState([]);
    const [addressDefault, setAddressDefault] = useState({});
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersResponse, infoResponse] = await Promise.all([
                    axios.get('http://localhost:8080/orders/history', config),
                    axios.get('http://localhost:8080/users/my-info', config),
                ]);

                // Kiểm tra từng response
                if (ordersResponse.data.code === 'OK') {
                    setOrders(ordersResponse.data.result.items);
                }

                if (infoResponse.data.code === 'OK') {
                    setInfo(infoResponse.data.result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Đảm bảo set loading = false sau khi tất cả hoàn tất
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="bg-[#EAF6FE] bg-opacity-20 font-sans min-h-screen p-4">
            {/* Header */}
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-xl font-semibold text-gray-800">Hello, {info.username}</h1>
                <p className="text-sm text-gray-500">
                    From your account dashboard, you can easily check & view your{" "}<br/>
                    <span className="text-blue-500 cursor-pointer">Recent Orders</span>, manage your{" "}
                    <span className="text-blue-500 cursor-pointer">Shipping and Billing Addresses</span>, and
                    <br/> edit your{" "}
                    <span className="text-blue-500 cursor-pointer">Password</span> and{" "}
                    <span className="text-blue-500 cursor-pointer">Account Details</span>.
                </p>
            </div>

            {/* Dashboard Cards */}
            <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="relative bg-white border-[#E4E7E9] border-2 rounded-sm p-4">
                    <h2 className="text-sm font-medium text-gray-600 border-b-2">ACCOUNT INFO</h2>
                    <div className={`flex flex-row lg:py-2`}>
                        <img src={info.profileImage ? info.profileImage : profileDefault} alt="profile"
                             className="lg:w-12 lg:h-12 p-1 mr-2 border-2 border-gray-400 rounded-full"/>
                        <p className="text-gray-800 font-semibold mt-2 mb-4">{info.username}</p>

                    </div>
                    <p className="text-gray-500 text-sm">{info.firstName + " " + info.lastName}</p>
                    <p className="text-gray-500 text-sm">Email: {info.email}</p>
                    <p className="text-gray-500 text-sm mb-4">Phone: {info.mobileNo}</p>
                    <button onClick={() => {
                        window.location.href = '/editprofile'
                    }}
                            className="xl:absolute xl:bottom-4 px-1 py-0.5 text-[14px] lg:mt-4 text-[#2DA5F3] border-2 border-[#D5EDFD] lg:px-4 lg:py-2 lg:text-sm">Edit
                        Account
                    </button>
                </div>

                <div className="bg-white border-[#E4E7E9] border-2 rounded-sm p-4">
                    <h2 className="text-sm font-medium text-gray-600 border-b-2">BILLING ADDRESS</h2>
                    <p className="text-gray-800 font-semibold mt-2 mb-4">{info.username}</p>
                    <p className="text-gray-500 text-sm">{info.address.filter((ad) => ad.default === true)[0].firstName + " " + info.address.filter((ad) => ad.default === true)[0].lastName}</p>
                    <p className="text-gray-500 text-sm">{info.address.filter((ad) => ad.default === true)[0].address}</p>
                    <p className="text-gray-500 text-sm ">Phone: {info.address.filter((ad) => ad.default === true)[0].phoneNumber}</p>
                    <p className="text-gray-500 text-sm mb-4">Email: {info.address.filter((ad) => ad.default === true)[0].email}</p>
                    <button onClick={() => {
                        window.location.href = '/editprofile'
                    }}
                            className="px-1 py-0.5 text-[14px] lg:mt-4 text-[#2DA5F3] border-2 border-[#D5EDFD] lg:px-4 lg:py-2 lg:text-sm">Edit
                        Address
                    </button>
                </div>

                <div className=" flex flex-col justify-around">
                    <div className={`bg-[#EAF6FE] flex mb-3 h-full rounded-sm`}>
                        <div className={`bg-white p-2 m-2 w-12`}>
                            <svg width="50" height="50" viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.2"
                                      d="M9.23744 13.9248L5.31244 18.6248C5.21356 18.7402 5.14379 18.8776 5.10899 19.0255C5.07419 19.1734 5.07538 19.3275 5.11244 19.4748L6.64994 26.4373C6.68704 26.6028 6.76563 26.7561 6.87831 26.8829C6.99099 27.0097 7.13405 27.1057 7.29406 27.162C7.45407 27.2182 7.62575 27.2328 7.79297 27.2045C7.96018 27.1761 8.11744 27.1057 8.24994 26.9998L11.9999 23.9998C9.79994 20.1748 9.08744 16.8123 9.23744 13.9248Z"
                                      fill="#2DA5F3"/>
                                <path opacity="0.2"
                                      d="M22.6875 13.8379L26.6125 18.5504C26.7114 18.6658 26.7812 18.8031 26.816 18.9511C26.8508 19.099 26.8496 19.253 26.8125 19.4004L25.275 26.3504C25.2396 26.5169 25.1622 26.6717 25.0503 26.8C24.9383 26.9282 24.7954 27.0258 24.6351 27.0834C24.4749 27.141 24.3026 27.1567 24.1346 27.129C23.9666 27.1014 23.8084 27.0313 23.675 26.9254L19.925 23.9254C22.125 20.0879 22.8375 16.7254 22.6875 13.8379Z"
                                      fill="#2DA5F3"/>
                                <path d="M18 28H14" stroke="#2DA5F3" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path
                                    d="M15.3749 2.47472C12.9999 4.37472 5.06243 11.9747 11.9999 23.9997H19.9999C26.7999 11.9747 18.9749 4.38722 16.6249 2.47472C16.4496 2.32827 16.2284 2.24805 15.9999 2.24805C15.7715 2.24805 15.5503 2.32827 15.3749 2.47472Z"
                                    stroke="#2DA5F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path
                                    d="M9.23744 13.9248L5.31244 18.6248C5.21356 18.7402 5.14379 18.8776 5.10899 19.0255C5.07419 19.1734 5.07538 19.3275 5.11244 19.4748L6.64994 26.4373C6.68704 26.6028 6.76563 26.7561 6.87831 26.8829C6.99099 27.0097 7.13405 27.1057 7.29406 27.162C7.45407 27.2182 7.62575 27.2328 7.79297 27.2045C7.96018 27.1761 8.11744 27.1057 8.24994 26.9998L11.9999 23.9998"
                                    stroke="#2DA5F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path
                                    d="M22.6875 13.8252L26.6875 18.6252C26.7864 18.7406 26.8561 18.878 26.8909 19.0259C26.9258 19.1738 26.9246 19.3278 26.8875 19.4752L25.35 26.4377C25.3129 26.6032 25.2343 26.7565 25.1216 26.8833C25.009 27.0101 24.8659 27.1061 24.7059 27.1623C24.5459 27.2186 24.3742 27.2332 24.207 27.2049C24.0398 27.1765 23.8825 27.1061 23.75 27.0002L20 24.0002"
                                    stroke="#2DA5F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path
                                    d="M16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1716 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1716 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5Z"
                                    fill="#2DA5F3"/>
                            </svg>

                        </div>
                        <div>
                            <p className="text-gray-800 text-lg font-semibold mt-2">{orders.length}</p>
                            <p className="text-gray-500 text-sm">Total Orders</p>
                        </div>

                    </div>
                    <div className={`bg-[#FFF3EB] flex mb-3 h-full rounded-sm`}>
                        <div className={`bg-white p-2 w-12 m-2`}>
                            <svg width="50" height="50" viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.2"
                                      d="M4 26V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H27C27.2652 6 27.5196 6.10536 27.7071 6.29289C27.8946 6.48043 28 6.73478 28 7V26L24 24L20 26L16 24L12 26L8 24L4 26Z"
                                      fill="#FA8232"/>
                                <path d="M9.5 13H22.5" stroke="#FA8232" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path d="M9.5 17H22.5" stroke="#FA8232" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path
                                    d="M4 26V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H27C27.2652 6 27.5196 6.10536 27.7071 6.29289C27.8946 6.48043 28 6.73478 28 7V26L24 24L20 26L16 24L12 26L8 24L4 26Z"
                                    stroke="#FA8232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </div>
                        <div>
                            <p className="text-orange-500 text-lg font-semibold mt-2">{orders.filter((orderItem) => orderItem.orderStatus === "PENDING").length}</p>
                            <p className="text-gray-500 text-sm">Pending Orders</p>
                        </div>
                    </div>
                    <div className={`bg-[#EAF7E9] flex h-full rounded-sm`}>
                        <div className={`bg-white m-2 p-2 w-12`}>
                            <svg width="50" height="50" viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.2"
                                      d="M4.1375 9.3252C4.04693 9.48077 3.99946 9.65768 4 9.8377V22.1627C4.00096 22.3407 4.04884 22.5154 4.13882 22.669C4.2288 22.8226 4.35769 22.9498 4.5125 23.0377L15.5125 29.2252C15.6608 29.3099 15.8292 29.3531 16 29.3502L16.1125 16.0002L4.1375 9.3252Z"
                                      fill="#2DB324"/>
                                <path
                                    d="M28 22.1627V9.83766C27.999 9.65963 27.9512 9.485 27.8612 9.33137C27.7712 9.17775 27.6423 9.05057 27.4875 8.96266L16.4875 2.77516C16.3393 2.68958 16.1711 2.64453 16 2.64453C15.8289 2.64453 15.6607 2.68958 15.5125 2.77516L4.5125 8.96266C4.35769 9.05057 4.22879 9.17775 4.13882 9.33137C4.04884 9.485 4.00096 9.65963 4 9.83766V22.1627C4.00096 22.3407 4.04884 22.5153 4.13882 22.6689C4.22879 22.8226 4.35769 22.9497 4.5125 23.0377L15.5125 29.2252C15.6607 29.3107 15.8289 29.3558 16 29.3558C16.1711 29.3558 16.3393 29.3107 16.4875 29.2252L27.4875 23.0377C27.6423 22.9497 27.7712 22.8226 27.8612 22.6689C27.9512 22.5153 27.999 22.3407 28 22.1627V22.1627Z"
                                    stroke="#2DB324" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22.125 19.0625V12.5625L10 5.875" stroke="#2DB324" stroke-width="2"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M27.8624 9.3252L16.1125 16.0002L4.13745 9.3252" stroke="#2DB324"
                                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16.1125 16L16 29.35" stroke="#2DB324" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>

                        </div>

                        <div>
                            <p className="text-green-500 text-lg font-semibold mt-2">{orders.filter((orderItem) => orderItem.orderStatus === "DELIVERED").length}</p>
                            <p className="text-gray-500 text-sm">Completed Orders</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="max-w-5xl mx-auto mt-6 p-4 bg-white border-2 border-[#E4E7E9]">
                <div className={`relative`}>
                    <h2 className="text-gray-800 font-semibold text-lg">Recent Orders</h2>
                    <button onClick={() => {
                        window.location.href = '/orderhistory'
                    }}
                            className={`md:absolute md:right-0 md:top-1 lg:absolute lg:right-0 lg:top-0 text-[#FA8232]`}>View
                        all<ArrowForwardIcon className={`ml-1 pb-1`} fontSize={'inherit'}/></button>
                </div>

                <table className="mt-4 w-full text-left text-[10px] lg:text-sm text-black ">
                    <thead>
                    <tr className={`bg-[#F2F4F5] border-2 border-[#E4E7E9] `}>
                        <th className="pb-2 border-b">ORDER ID</th>
                        <th className="pb-2 border-b">STATUS</th>
                        <th className="pb-2 border-b">DATE</th>
                        <th className="pb-2 border-b">TOTAL</th>
                        <th className="pb-2 border-b">ACTION</th>
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
                                <td onClick={() => {
                                    window.location.href = `/orders/${orderItem.orderId}`
                                }}
                                    className="py-2 text-blue-500 cursor-pointer">View Details<ArrowForwardIcon
                                    className={`ml-1`} fontSize={'inherit'}/></td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            </div>
        </div>
    );
}