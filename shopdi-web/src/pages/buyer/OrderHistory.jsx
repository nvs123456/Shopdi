import OrderItem from "../../components/Buyer/Order/OrderItem.jsx";
import Pagination from "../../components/Navigation/Pagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchOrders} from "../../redux/orderSlice.js";
import data from "../../data/orderData.json";

function OrderHistory() {
    const dispatch = useDispatch();
    const {items} = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);
if(!items) {
    console.log('No items')
}
    return (
        <div className='flex justify-center bg-[#F7FBFF] h-min-screen w-max-screen'>
            <div className='bg-white mt-10 mb-10' >
                <div className='pl-1 font-bold text-[12px] md:text-[14px] lg:text-lg pb-1 '>
                    ORDER HISTORY
                </div>

                <div className='grid grid-cols-11 text-left text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] w-full h-[30px] md:h-[40px] border-4 border-[#E4E7E9] bg-[#F2F4F5] font-sans'>
                    <div className='col-span-1 pl-0 sm:pl-8'>
                        ID
                    </div>
                    <div className='col-span-3 pl-2 sm:pl-20'>
                        STATUS
                    </div>
                    <div className='col-span-3 pl-2 sm:pl-12'>
                        DATE
                    </div>
                    <div className='col-span-1 pl-0'>
                        TOTAL
                    </div>
                    <div className='col-span-3 pl-5 lg:pl-16 xl:pl-20'>
                        ACTION
                    </div>

                </div>
                <div>
                    {data.map((orderItem) => (
                        <OrderItem
                            key={orderItem.id} orderId={orderItem.id} status={orderItem.status}
                            orderDate={orderItem.orderDate} orderTotal={orderItem.orderTotal}
                        />
                    ))}
                </div>
                <div className='flex justify-center mt-5 mb-5'>
                    <Pagination/>
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;