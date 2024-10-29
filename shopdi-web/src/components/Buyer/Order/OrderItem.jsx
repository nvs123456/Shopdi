import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PropTypes from "prop-types";

function OrderItem({orderId, status, orderDate, orderTotal}) {
    return (
        <div className='w-[95%] h-[60px] flex font-sans pt-1.5 '>
            <div className='pl-[110px] flex align-left w-[15%]'>
                {orderId}
            </div>
            <div className=' pl-12 font-sans text-sm text-left w-[20%]'>
                {status === 'Completed' ? <div className='text-[#2DB224] text-left'>COMPLETED</div> :
                    status === 'In progress' ? <div className='text-[#FA8232]'>IN PROGRESS</div> :
                        <div className='text-[#EE5858]'>CANCELLED</div>}
            </div>
            <div className='w-[20%] pl-20'>
                {orderDate}
            </div>
            <div className='w-[20%] pl-20'>
                {orderTotal}
            </div>
            <div className='pr-2 pl-20 text-[#2DA5F3] w-[20%]'>
                <button className='pr-1'>View details</button>
                <ArrowForwardIcon/>
            </div>
        </div>
    );
}

// OrderItem.propTypes = {
//     orderId: PropTypes.number.isRequired,
//     status: PropTypes.string.isRequired,
//     orderDate: PropTypes.string.isRequired,
//     orderTotal: PropTypes.number.isRequired
// };

export default OrderItem;