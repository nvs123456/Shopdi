import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Step, StepLabel, Stepper } from "@mui/material";
import { styled } from "@mui/material/styles";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import axios from "axios";
import SpinnerLoading from "../../../components/SpinnerLoading/SpinnerLoading.jsx";
import { baseUrl } from "../../../api/GET.jsx";

const CustomisedConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#FA8232",
            height: 4,

        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            height: 4,
            backgroundColor: "#FA8232",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 8,
        width: "100%",
        paddingBottom: 10,
        border: 20,
        backgroundColor: "#FFE7D6",
    },
}));
const steps = ['Order Placed', 'Order processed', 'Packaged', 'Out for delivery', 'Delivered'];

export default function OrderDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [order, setOrder] = useState({});
    const [step, setStep] = useState(-1);

    // Fetch order details from the server
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        }
    }
    useEffect(() => {
        axios.get(`${baseUrl}orders/${id}/details`, config)
            .then((response) => {
                if (response.data.code === 'OK') {
                    setOrder(response.data.result);
                    setStep(orderStatusToStep(response.data.result.orderStatus));
                    console.log('Order detail:', response.data.result); // Log dữ liệu chi tiết
                } else {
                    console.warn('Unexpected response:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching order details:', error.response?.data || error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);
    if (!order) {
        return <div>Order not found</div>; // Handle case when order is undefined
    }

    function handleStep(newStep) {
        if (newStep > step) {
            setStep(newStep);
            setIsEditing(true);
        }
    }

    function orderStatusToStep(status) {
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

    function stepToOrderStatus(step) {
        switch (step) {
            case 0:
                return 'PENDING';
            case 1:
                return 'CONFIRMED';
            case 2:
                return 'PROCESSING';
            case 3:
                return 'DELIVERING';
            case 4:
                return 'DELIVERED';
            default:
                return 'CANCELLED';
        }
    }

    function handleUpdateOrderStatus(orderId) {
        axios.put(`${baseUrl}seller/${orderId}/update-status`, null,
            {
                params: { orderStatus: stepToOrderStatus(step) },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                }
            })
            .then((response) => {
                if (response.data.code === 'OK') {
                    console.log('Order status updated successfully');
                } else {
                    console.warn('Unexpected response:', response.data);
                }
            })
            .catch(error => {
                console.error('Error updating order status:', error.response?.data || error.message);
            })
            .finally(() => {
                setIsEditing(false);
            });
    }

    if (loading) return <div><SpinnerLoading /></div>;
    else {
        return (
            <div className="py-16 px-32 bg-cloudBlue min-h-screen font-sans ">
                <div className="bg-cloudBlue min-h-screen">
                    <h1 className="text-2xl bg-white font-bold pt-4 pb-2 pl-8 border-t-[1px] border-x-[1px] text-yaleBlue">Order ID: {order.orderId}</h1>
                    <h2 className="text-xl font-semibold bg-white pl-8 pb-4 border-b-[1px] border-x-[1px]">Ordered
                        at {(new Date(order.deliveryDate)).toLocaleDateString()}</h2>
                    {/* Customer, Shipping and Payment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 my-12">
                        <div className="h-full flex flex-col">
                            <h2 className="font-semibold text-[22px] border-t-[1px] border-x-[1px] text-yaleBlue bg-white pt-4 pb-2 px-8">Customer details</h2>
                            <div className="bg-white px-8 pb-20 border-b-[1px] border-x-[1px] text-[16px] grow">
                                <p className={"border-t-2 pt-4 border-gray-300"}>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                                <p className={"py-2"}>{order.shippingAddress?.phoneNumber}</p>
                                <p>{order.shippingAddress?.email}</p>
                            </div>
                        </div>
                        <div className="h-full flex flex-col">
                            <h2 className="font-semibold text-[22px] border-t-[1px] border-x-[1px] text-yaleBlue bg-white pt-4 pb-2 px-8">Shipping address</h2>
                            <div className="bg-white px-8 pb-20 border-b-[1px] border-x-[1px] text-[16px] grow">
                                <p className={"border-t-2 pt-4 border-gray-300"}>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                                <p className={"py-2"}>{order.shippingAddress?.phoneNumber}</p>
                                <p>{order.shippingAddress?.address + ", " + order.shippingAddress?.city + ", " + order.shippingAddress?.state + ", " + order.shippingAddress?.country}</p>
                            </div>
                        </div>
                        <div className="h-full flex flex-col">
                            <h2 className="font-semibold text-[22px] border-t-[1px] border-x-[1px] text-yaleBlue bg-white pt-4 pb-2 px-8">Payment details</h2>
                            <div className="bg-white px-8 pb-6 border-b-[1px] border-x-[1px] text-[16px] grow">
                                <p className={"border-t-2 pt-4 border-gray-300"}>Transaction Id: {order?.transactionId}</p>
                                <p className={"py-2"}>Payment Method: {order?.paymentMethod}</p>
                                <p>Payment Status: {order?.paymentStatus}</p>
                                <p className={"pt-2"}>Total amount: {order?.totalPrice.toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="border-[1px] bg-white">
                        <h2 className="font-semibold text-2xl text-yaleBlue  pt-4 pb-4 px-8">Product details</h2>
                        <div className="">
                            <table className="w-full text-center">
                                <thead>
                                    <tr className={' text-xl text-center border-y-2 bg-[#F2F4F5]'}>
                                        <th className="pl-12 py-3 text-left w-[35%] font-semibold">Product</th>
                                        <th className=" w-[20%] font-semibold">Product ID</th>
                                        <th className="pr-8 w-[20%] font-semibold">Price</th>
                                        <th className="pr-8 w-[10%] font-semibold">Quantity</th>
                                        <th className="pr-8 w-[25%] font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.orderItems?.map((item, index) => (
                                        <tr key={index} className={'border-b-[1px]'}>
                                            <td className={'flex items-center py-4 ml-12 '}>
                                                <img src={item?.productImage} className={`w-20 h-20 mr-4`} />
                                                {item?.productName}</td>
                                            <td className="pr-8">{item?.orderItemId}</td>
                                            <td className="pr-8">{item?.price.toLocaleString()} &#8363;</td>
                                            <td className="pr-8">{item?.quantity}</td>
                                            <td className="pr-8">{item?.price.toLocaleString()} &#8363;</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Logistics and Billing Details */}
                    <div className=" bg-white border-x-[1px] border-b-[1px] pr-16 pt-6 pb-4">
                        <h2 className="text-right font-bold mb-2 text-2xl">Total bill:  {order?.totalPrice.toLocaleString()} &#8363;</h2>
                    </div>

                    {/* Order Status */}
                    {order.orderStatus === 'CANCELLED' ?
                        <div
                            className="text-[14px] md:text-[18px] xl:text-[22px] font-bold text-[#EE5858]  bg-white">Order
                            Cancelled!</div> :


                        <div className=" relative w-full my-12 font-semibold text-[22px] border-t-[1px] border-x-[1px] text-yaleBlue bg-white pt-4 pb-8 px-8">
                            <div>
                                <h2 className="font-semibold mb-8 border-b-2 pb-2 text-2xl">Order status</h2>
                                <Stepper activeStep={step} orientation={'horizontal'} alternativeLabel
                                    connector={<CustomisedConnector />}>
                                    {steps.map((label, index) => (
                                        <Step key={label}>
                                            <StepLabel onClick={() => handleStep(index)}
                                                StepIconProps={{
                                                    sx: {
                                                        color: index < step ? '#FF731D' : '#FFFFFF', // Color for completed steps
                                                        border: '4px solid #FF731D', // Border color
                                                        borderRadius: '50%', // Optional: make the border circular
                                                        '&.Mui-active': {
                                                            color: '#FF731D', // Color for the current step

                                                        },
                                                        '&.Mui-completed': {
                                                            color: '#FF731D', // Color for completed steps
                                                        },
                                                        '&.Mui-incompleted': {
                                                            color: '#FF731D', // Color for incompleted steps
                                                        },
                                                        '& .MuiStepIcon-text': {
                                                            fill: 'transparent', // Change color of the step number text
                                                        },
                                                    },
                                                }}

                                            >
                                                {label}
                                            </StepLabel>
                                        </Step>

                                    ))}
                                </Stepper>
                                {isEditing && <button
                                    onClick={() => handleUpdateOrderStatus(order.orderId)}
                                    className={`absolute right-8 top-4 bg-metallicOrange w-34 px-2  rounded text-white h-8`}>Save
                                    Changes
                                </button>}
                            </div>

                        </div>}
                </div>
            </div>
        );
    }

}