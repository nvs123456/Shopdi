import OrderItem from "./OrderItem.jsx";
import Pagination from "../../Navigation/Pagination.jsx";

function OrderItemList({List}) {
    return (
        <div className='flex justify-center bg-[#F7FBFF] h-full w-full'>
            <div className='bg-white mt-10 mb-10 w-[70%]' >
                <div className='pl-10 font-bold text-xl pb-5 pt-2'>
                    ORDER HISTORY
                </div>
                <table className='w-[92%] border-4 border-[#E4E7E9] bg-[#F2F4F5] font-sans ml-10 mr-10'>
                    <thead>
                        <tr className='h-10'>
                            <th>ID</th>
                            <th>STATUS</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                </table>
                <div>
                    {List.map((orderItem) => (
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

export default OrderItemList;