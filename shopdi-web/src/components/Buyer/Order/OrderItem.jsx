import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PropTypes from "prop-types";

function OrderItem({orderId, status, orderDate, orderTotal}) {
    return (
        <div className="w-full max-w-4xl font-sans mx-auto p-2">
            <div className="grid grid-cols-11 text-left text-[16px] sm:text-[10px] md:text-[16px] lg:text-[18px]">
                <div className=' col-span-1 pl-0 sm:pl-7'>{orderId}</div>
                <div className='m-0 col-span-3 pl-0 sm:pl-14'>
                    {status === 'Completed' ? <div className='text-[#2DB224]'>COMPLETED</div> :
                        status === 'In progress' ? <div className='text-[#FA8232]'>IN PROGRESS</div> :
                            <div className='text-[#EE5858]'>CANCELLED</div>
                    }
                </div>
                <div className='col-span-3 pl-0 sm:pl-8'>
                    {orderDate}
                </div>
                <div className='col-span-1 pl-0 sm:pl-1 md:pl-0'>
                    {orderTotal}

                </div>
                <div className='text-[#2DA5F3] col-span-3 pl-0 sm:pl-20 cursor-pointer'>
                     <button className='pr-1'>View details</button>
                     <ArrowForwardIcon/>

                </div>

            </div>
        </div>
    );
}

// return (
//     <div className='max-w-full h-[60px] flex font-sans pt-1.5 '>
//         <div className='pl-[100px] flex align-left w-[15%]'>
//             {orderId}
//         </div>
//         <div className=' pl-10 font-sans text-sm text-left w-[20%]'>
//             {status === 'Completed' ? <div className='text-[#2DB224] text-left'>COMPLETED</div> :
//                 status === 'In progress' ? <div className='text-[#FA8232]'>IN PROGRESS</div> :
//                     <div className='text-[#EE5858]'>CANCELLED</div>}
//         </div>
//         <div className='w-[20%] pl-10'>
//             {orderDate}
//         </div>
//         <div className='w-[20%] pl-12'>
//             {orderTotal}
//         </div>
//         <div className='pr-2 pl-10 text-[#2DA5F3] w-[20%]'>
//             <button className='pr-1'>View details</button>
//             <ArrowForwardIcon/>
//         </div>
//     </div>
// );
// OrderItem.propTypes = {
//     orderId: PropTypes.number.isRequired,
//     status: PropTypes.string.isRequired,
//     orderDate: PropTypes.string.isRequired,
//     orderTotal: PropTypes.number.isRequired
// };

export default OrderItem;