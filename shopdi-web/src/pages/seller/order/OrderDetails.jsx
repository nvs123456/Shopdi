import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Step, StepLabel, Stepper} from "@mui/material";
import {styled} from "@mui/material/styles";
import StepConnector, {stepConnectorClasses} from "@mui/material/StepConnector";
import axios from "axios";
import SpinnerLoading from "../../../components/SpinnerLoading/SpinnerLoading.jsx";
import { baseUrl } from "../../../api/GET.jsx";

const CustomisedConnector = styled(StepConnector)(({theme}) => ({
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
    const {id} = useParams();
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
                params: {orderStatus: stepToOrderStatus(step)},
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

    if (loading) return <div><SpinnerLoading/></div>;
    else {
        return (
            <div className="p-6 bg-gray-100 min-h-screen font-sans text-sm">
                <div className="bg-white px-6 py-10 rounded-lg min-h-screen">
                    <h1 className="text-lg bg-gray-50 rounded-lg font-semibold mb-4">Order ID : {order.orderId}</h1>
                    <h2 className="font-semibold mb-2">Ordered
                        at {(new Date(order.deliveryDate)).toLocaleDateString()}</h2>
                    {/* Customer, Shipping and Payment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <h2 className="font-semibold mb-2">Customer details</h2>
                            <div className="p-4 bg-gray-50 min-h-full rounded-lg">
                                <p>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                                <p>{order.shippingAddress?.email}</p>
                                <p>{order.shippingAddress?.phoneNumber}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="font-semibold mb-2">Shipping address</h2>
                            <div className="p-4 bg-gray-50 min-h-full rounded-lg">
                                <p>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                                <p>{order.shippingAddress?.phoneNumber}</p>
                                <p>{order.shippingAddress?.address}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="font-semibold mb-2">Payment details</h2>
                            <div className="p-4 bg-gray-50 min-h-full rounded-lg">
                                <p>Transaction: {order?.payment?.transaction}</p>
                                <p>Payment Method: {order?.paymentMethod}</p>
                                <p>Card Holder: {order?.payment?.cardHolder}</p>
                                <p>Total amount: {order?.price}</p>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="mb-6 mt-10">
                        <h2 className="font-semibold mb-2">Product details</h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <table className="w-full text-center">
                                <thead>
                                <tr className={'text-center border-b-2'}>
                                    <th className="py-2 text-left w-[40%]">Product</th>
                                    <th className="py-2 w-[10%]">Product ID</th>
                                    <th className="py-2 w-[20%]">Price</th>
                                    <th className="py-2 w-[10%]">Quantity</th>
                                    <th className="py-2 w-[10%]">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order?.orderItems?.map((item, index) => (
                                    <tr key={index} className={'border-b-2'}>
                                        <td className={'flex items-center py-2'}>
                                            <img src={item?.productImage} className={`w-20 h-20`}/>
                                            {item?.productName}</td>
                                        <td>{item?.orderItemId}</td>
                                        <td>{item?.price.toLocaleString()}đ</td>
                                        <td>{item?.quantity}</td>
                                        <td>{item?.price.toLocaleString()}.đ</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Logistics and Billing Details */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <h2 className="absolute right-8 font-semibold mb-2">Total
                            bill: {order?.totalPrice.toLocaleString()}đ</h2>
                    </div>

                    {/* Order Status */}
                    {order.orderStatus === 'CANCELLED' ?
                        <div
                            className="text-[14px] md:text-[18px] xl:text-[22px] font-bold text-[#EE5858] ml-6 md:ml-10 lg:ml-20">Order
                            Cancelled!</div> :

                        <div className=" w-full mb-10 ">
                            <div>
                                <h2 className="font-semibold mb-2">Order status</h2>
                                <Stepper activeStep={step} orientation={'horizontal'} alternativeLabel
                                         connector={<CustomisedConnector/>}>
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
                            </div>
                            {isEditing && <button
                                onClick={() => handleUpdateOrderStatus(order.orderId)}
                                className={`absolute right-8 bottom-[-150px] bg-metallicOrange w-34 px-2  rounded text-white h-8`}>Save
                                Changes
                            </button>}
                        </div>}
                </div>
            </div>
        );
    }

}