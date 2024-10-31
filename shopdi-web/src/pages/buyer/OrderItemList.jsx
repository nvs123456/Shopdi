import OrderItem from "../../components/Buyer/Order/OrderItem.jsx";
import Pagination from "../../components/Navigation/Pagination.jsx";

function OrderItemList({List}) {
    return (
        <div className='flex justify-center bg-[#F7FBFF] h-full w-full'>
            <div className='bg-white mt-10 mb-10 w-[70%]' >
                <div className='pl-1 font-bold text-lg pb-1 '>
                    ORDER HISTORY
                </div>

                <div className='grid grid-cols-11 text-left text-[16px] sm:text-[10px] md:text-[16px] lg:text-[18px] w-full h-[40px] border-4 border-[#E4E7E9] bg-[#F2F4F5] font-sans'>
                    <div className='col-span-1 pl-0 sm:pl-8'>
                        ID
                    </div>
                    <div className='col-span-3 pl-0 sm:pl-20'>
                        STATUS
                    </div>
                    <div className='col-span-3 pl-0 sm:pl-12'>
                        DATE
                    </div>
                    <div className='col-span-1 pl-0'>
                        TOTAL
                    </div>
                    <div className='col-span-3 pl-0 sm:pl-6 md:pl-24'>
                        ACTION
                    </div>

                </div>
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