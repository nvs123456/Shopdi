import React, {useEffect, useState} from 'react';
import {styled} from "@mui/material/styles";
import axios from 'axios';

import {Button, Step, StepLabel, Stepper, Typography} from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import StepConnector, {stepConnectorClasses,} from "@mui/material/StepConnector";
import {useParams} from 'react-router-dom';
import Review from "./Review.jsx";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading.jsx";

const steps = ['Order Placed','Confirmed', 'Packaging', 'On The Road', 'Delivered'];
const icons = [<InventoryOutlinedIcon/>, <VerifiedUserIcon/>, <EmailOutlinedIcon/>, <LocalShippingOutlinedIcon/>, <HandshakeOutlinedIcon/>];
const data = [
    ['PRODUCTS', 'PRICE', 'QUANTITY', 'TOTAL'],
];

const CustomisedConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#FA8232",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#FA8232",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 8,
        borderColor: '#FF9800',
        width: '100%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',

    },
}));

function OrderDetails() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productIdToReview, setProductIdToReview] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    const [orderDetail, setOrderDetail] = useState({});
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
    };
    const handleOpenModal = (productId) => {
        setIsModalOpen(true);
        setProductIdToReview(productId);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const fetchOrderDetail = async () => {
        await axios.get(`http://localhost:8080/orders/${id}/details`, config)
            .then((response) => {
                if (response.data.code === 'OK') {
                    setOrderDetail(response.data.result);
                    //console.log('Order detail:', response.data.result); // Log dữ liệu chi tiết
                } else {
                    console.warn('Unexpected response:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching order details:', error.response?.data || error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    async function handleCancelOrder(orderId) {
        try {
            const response = await axios.put(
                `http://localhost:8080/orders/cancel/${orderId}`,
                null,
                config
            );
            if(response.data.code === 'OK') {
                console.log('Data updated:', response.data);
                fetchOrderDetail();
            }
            console.log('Data updated:', response.data);
        } catch (error) {
            if (error.response) {
                console.error('Response error:', error.response.data);
            } else if (error.request) {
                console.error('Request error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    }

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    function statusToStep(status) {
        switch (status) {
            case 'PENDING':
                return 0;
            case 'CONFIRMED':
                return 1;
            case 'PROCESSING':
                return 2;
            case 'DELIVERING':
                return 3;
            case 'DELIVERED':
                return 5;
            default:
                return -1;
        }
    }
    const status = orderDetail.orderStatus;
    const activeStep = statusToStep(status);
    const deliveryDate = orderDetail?.deliveryDate;
    const date = new Date(deliveryDate);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    const shippingAddress = orderDetail?.shippingAddress || {};
    const {firstName = '', lastName = '', address = '', city = '', state = ''} = shippingAddress;
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <SpinnerLoading size={3}/>
            </div>
        );
    }

    return (
        <div>
            {isModalOpen && <Review isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} productId={productIdToReview}/>}
            <div className={`${isModalOpen ? "brightness-50" : ''}  bg-[#F7FBFF] flex justify-center font-sans`}>
                <div className="container md:mt-12 md:mb-12 my-5 h-5/6 border-[1px] bg-white w-full md:w-4/5 border-collapse">
                    {/* heading section */}
                    <div className="flex justify-between items-center border-b-2 h-8 md:h-14 mb-6 px-0 md:px-4">
                        <div className="flex items-center rounded hover:bg-gray-100 lg:h-[80%] hover:shadow-sm" >
                            <ArrowBackIcon className="text-black" fontSize={'inherit'}/>
                            <button className={`text-black text-[14px] md:text-[18px] pl-2 text-yaleBlue font-bold`} disabled={isModalOpen} onClick={() => window.location.href ='/orderhistory'}>
                                ORDER DETAILS</button>
                        </div>
                    </div>
                    {/* Order Details Section */}
                    <div
                        className=" bg-[#FDFAE7] border-2 border-[#F7E99E] p-3 md:p-6 w-5/6 mt-10 mb-3 md:mb-10 mx-auto border-collapse rounded">
                        <div className="flex justify-between items-center">
                            <div className={'text-[20px] pb-4'}>
                                Order #{orderDetail.orderId}
                            </div>
                            <div className={'text-[18px] md:text-[26px] xl:text-[32px] font-bold text-celticBlue'}>
                                {orderDetail.totalPrice.toLocaleString()} đ
                            </div>
                        </div>
                        <div className={'text-[14px] text-darkGray'}>
                            Order placed on {formattedDate.split(" ")[0]} at {formattedDate.split(" ")[1]}
                        </div>
                    </div>

                    {/* <div className='ml-2 md:ml-20'>
                    <div className='text-darkGray text-[16px]'>
                        Order expected arrival: <strong>23 Jun, 2021</strong>
                    </div>
                </div> */}

                    {/* Order Progress Section */}
                    {status === 'CANCELLED' ?
                        <div
                            className="text-[14px] md:text-[18px] xl:text-[24px] font-bold text-[#EE5858] ml-6 md:ml-10 lg:ml-24 mb-8">Order
                            Cancelled!</div>
                        :
                        <div className={`relative md:relative lg:relative`}>
                            {/* Mở tab review */}
                            {/* Progress bar */}
                            <div className=" pl-8 md:pl-16 xl:pl-40  bg-white  mb-3 md:mb-6">
                                <div className="flex justify-between items-center w-full">
                                    {steps.map((label, index) => (
                                        <div key={label} className="flex items-center w-full">
                                            {/* Step Circle */}
                                            <div
                                                className={`flex items-center justify-center w-4 h-4 md:w-10 md:h-10 rounded-full border-4 ${
                                                    index < activeStep
                                                        ? ' bg-[#2DB224] border-[#2DB224]' // Completed step
                                                        : index === activeStep
                                                            ? ' bg-white border-[#FF731D]' // Active step
                                                            : ' bg-gray-200 border-gray-300' // Upcoming step
                                                }`}
                                            >
          <span
              className={`text-[12px] md:text-lg font-bold ${
                  index < activeStep ? 'text-white pb-1' : 'text-[#FF731D]'
              }`}
          >
            {index < activeStep ? <CheckIcon/> : index + 1}
          </span>

                                            </div>


                                            {/* Connector Line */}
                                            {index < steps.length - 1 && (
                                                <div
                                                    className={`flex-1 h-1 md:h-2 ${
                                                        index < activeStep
                                                            ? ' bg-[#2DB224]' // Completed line
                                                            : ' bg-gray-300' // Incomplete line
                                                    }`}
                                                ></div>
                                            )}


                                        </div>

                                    ))}
                                </div>

                            </div>
                            {/* Step Labels */}
                            <div className={`flex px-2 lg:px-5 ml-4 md:ml-12 xl:ml-[115px] mb-3`}>
                                {steps.map((label, index) => (
                                    <div key={label}
                                         className="text-[12px] md:text-[18px] mt-0 flex items-center w-full"> {/* Step Label */}
                                        {label}
                                    </div>
                                ))}
                            </div>

                            {/* Step Icons */}
                            <div
                                className={`flex justify-around pr-5 md:pr-14 xl:pl-3 xl:mx-12 pl-3 md:pl-5 pb-2 mb-10`}>
                                {steps.map((label, index) => (
                                    <span className="flex justify-center mt-2">
                              {React.cloneElement(icons[index], {
                                  className: `text-[24px] ml-6 
                  ${
                                      index === activeStep
                                          ? 'text-[#FF731D]' // Active step color
                                          : index < activeStep
                                              ? 'text-[#2DB224]' // Completed step color
                                              : 'text-[#FF8800]' // Upcoming step color
                                  }`,
                              })}
                            </span>
                                ))}
                            </div>

                        </div>
                    }


                    {/* Product Section */}
                    <div className=" bg-white border-y-2 md:py-8 px-12 font-sans">
                        <div className={'text-[18px] font-semibold md:text-2xl mb-6'}>
                            Product ({orderDetail.orderItems?.length})
                        </div>
                        <table className="xl:table-fixed min-w-full border border-gray-200 mb-6">
                            <thead>
                            <tr className={"h-12"}>
                                <th className="xl:w-[40%] bg-[#F2F4F5] border-t border-b border-[#E4E7E9] pl-4 text-left text-[12px] md:text-[18px] font-medium">PRODUCTS</th>
                                <th className="xl:w-[15%] bg-[#F2F4F5] border-t border-b border-[#E4E7E9]  text-left text-[12px] md:text-[18px] font-medium">PRICE</th>
                                <th className="xl:w-[15%] bg-[#F2F4F5] border-t border-b border-[#E4E7E9]  text-left text-[12px] md:text-[18px] font-medium">QUANTITY </th>
                                <th className="xl:w-[30%] bg-[#F2F4F5] border-t border-b border-[#E4E7E9]  text-left text-[12px] md:text-[18px] font-medium">TOTAL</th>

                            </tr>

                            </thead>
                            <tbody>
                            {orderDetail.orderItems.map((row, rowIndex) => (
                                <tr key={rowIndex} className={"border-b-2 h-20"}>
                                    <td className='flex md:w-[90%] items-center text-[12px] md:text-[16px]'>
                                        <img className="md:w-20 md:h-20 w-8 h-8 pl-4 py-2.5 mr-4" src={row.productImage} alt="temp"/>
                                        {row.productName}
                                    </td>
                                    <td className=' text-[12px] md:text-[16px]'>{row.price.toLocaleString()} đ</td>
                                    <td className='pl-2 text-[12px] md:text-[16px]'>x {row.quantity}</td>
                                    <td className=' relative text-[12px] md:text-[16px]'>
                                        <span className={`font-semibold`}>{row.price.toLocaleString()} đ</span>

                                        {activeStep > 3 && <button className={`pl-0`} disabled={isModalOpen} onClick={(productId) => {
                                            handleOpenModal(row.productId)
                                        }}><span
                                            className=' absolute lg:top-7 lg:right-16 text-[#FA8232] hover:text-orangeRed text-[14px] md:text-[16px]'>Leave a Rating</span>
                                        </button>}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Billing and Shipping Section */}
                    <div className=" bg-white p-2 md:p-6 mb-0 ml-6">
                        <div className="md:grid md:grid-cols-3 md:gap-8">
                            <div className={`border-r-2`}>
                                <div className='text-[16px] md:text-[20px] font-semibold mt-2 md:pb-2'>Billing Address</div>
                                <div className='text-[14px] md:text-[18px] pb-1'>{firstName + " " + lastName} </div>
                                <div className=' text-[14px] md:text-[16px] text-[#5F6C72]'>
                                    {address} <br/>
                                    Phone Number: {shippingAddress.phone} <br/>
                                    Email: {shippingAddress.email}
                                </div>
                            </div>
                            <div className={`border-r-2`}>
                                <div className='text-[16px] md:text-[20px] font-semibold mt-2 md:pb-2'>Shipping Address
                                </div>
                                <div className='text-[14px] md:text-[18px] pb-1'>{firstName + " " + lastName} </div>
                                <div className=' text-[14px] md:text-[16px] text-[#5F6C72]'>
                                    {address} <br/>
                                    Phone Number: {shippingAddress.phone} <br/>
                                    Email: {shippingAddress.email}
                                </div>
                            </div>
                            <div>
                                <div className='text-[16px] md:text-[20px] font-semibold mt-2 md:pb-2'>Order Notes</div>
                                <div className=' text-[14px] md:text-[18px] text-[#5F6C72]'>
                                    {orderDetail.orderNotes !== null ? orderDetail.orderNotes : "None"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`relative lg:h-20`}>
                        {activeStep < 1 && <button disabled={status === 'CANCELLED'}
                                                     onClick={() => {
                                                         handleCancelOrder(orderDetail.orderId)
                                                     }}
                                                     className={`absolute rounded hover:bg-orangeRed right-0 md:right-2 lg:right-4 
                        top-0 md:top-2  lg:top-5 ${status === 'CANCELLED' ? ' bg-gray-300' : ' bg-red'} text-white text-[12px] md:text-[18px] w-1/4 md:w-[160px] 
                        h-5 md:h-8 lg:h-10 lg:mb-3 mb-4 md:mb-6`}>{status === 'CANCELLED' ? 'Cancelled' : 'Cancel'}</button>}
                    </div>

                </div>
            </div>
        </div>

    );
};

export default OrderDetails;