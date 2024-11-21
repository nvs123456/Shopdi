import OrderItem from "../../components/Buyer/Order/OrderItem.jsx";
import Pagination from "../../components/Navigation/Pagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchOrders} from "../../redux/orderSlice.js";
import data from "../../data/orderData.json";
import axios from "axios";

function OrderHistory() {
    const dispatch = useDispatch();
    const {orders} = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);
    if (!orders) {
        console.log('No items')
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
    };
    console.log(orders);
    const items = axios.get('http://localhost:8080/orders/history', config);
    console.log(items);
//     INSERT INTO orders (
//         created_at,
//         updated_at,
//         delivery_date,
//         discount,
//         order_id,
//         order_status,
//         total_discounted_price,
//         total_item,
//         total_price,
//         shipping_address_id,
//         user_id,
//         discount_percent
//     ) VALUES (
//         NOW(),                        -- created_at
//     NOW(),                        -- updated_at
//     '2024-11-30',                 -- delivery_date
//     10,                           -- discount
//     'ORD12345',                   -- order_id
//     'PENDING',                    -- order_status
//     90.00,                        -- total_discounted_price
//     2,                            -- total_item
//     100.00,                       -- total_price
//     11,                            -- shipping_address_id (giả sử địa chỉ đã tồn tại)
//     2,                            -- user_id
//     10.00                         -- discount_percent
// );
//     INSERT INTO address(id, first_name, last_name, address, city, state, zip_code)
//     VALUES (11, 'Thinh', 'Nguyen', 'Nghia Hung', 'Vinh Tuong', 'Vinh Phuc', '90001');

    return (
        <div className='flex justify-center bg-[#F7FBFF] h-min-screen w-max-screen'>
            <div className='bg-white mt-10 mb-10'>
                <div className='pl-1 font-bold text-[12px] md:text-[14px] lg:text-lg pb-1 '>
                    ORDER HISTORY
                </div>

                <div
                    className='grid grid-cols-11 text-left text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] w-full h-[30px] md:h-[40px] border-4 border-[#E4E7E9] bg-[#F2F4F5] font-sans'>
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