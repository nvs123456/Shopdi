import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function OrderItem({item}) {
    const {orderId, orderStatus, deliveryDate, totalPrice} = item;
    const [date, time] = deliveryDate.split(" ");
    const [year, month, day] = date.split("-");
    const orderDate = `${day}/${month}/${year}`;
    const navigate = useNavigate();
    return (
        <div className="w-full max-w-4xl font-sans mx-auto p-2 hover:bg-gray-100">
            <div className="grid grid-cols-11 text-left text-[10px] md:text-[12px] lg:text-[16px] ">
                <div className=' col-span-1 pl-0 sm:pl-7'>{orderId}</div>
                <div className='m-0 col-span-3 pl-0 sm:pl-14 lg:pl-[100px]'>
                    {orderStatus === 'DELIVERED' ? <div className='text-[#2DB224]'>COMPLETED</div> :
                        orderStatus === 'PENDING' ? <div className='text-[#FA8232]'>IN PROGRESS</div> :
                            <div className='text-[#EE5858]'>CANCELLED</div>
                    }
                </div>
                <div className='col-span-3 pl-0 sm:pl-8'>
                    {orderDate}
                </div>
                <div className='col-span-1 pl-0 sm:pl-1 md:pl-0 lg:pl-2'>
                    {totalPrice}

                </div>
                <div className='text-[#2DA5F3] col-span-3 pl-4 lg:pl-16 xl:pl-[100px] cursor-pointer' 
                onClick={() => {navigate(`/orders/${orderId}`)}}>
                     <button className='pr-1'>View details</button>
                     <ArrowForwardIcon fontSize={'inherit'}/>

                </div>

            </div>
        </div>
    );
}


export default OrderItem;