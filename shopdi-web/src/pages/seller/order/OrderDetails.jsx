import React, {useState} from "react";
import { useParams } from "react-router-dom";
import {Step, StepLabel, Stepper} from "@mui/material";
import {styled} from "@mui/material/styles";
import StepConnector, {stepConnectorClasses} from "@mui/material/StepConnector";

const orders = [
    {
        id: 1,
        customer: {
            name: "Jonathan James",
            email: "JJ@gmail.com",
            phone: "+91 ********90"
        },
        shipping: {
            name: "Jonathan James",
            receivingPhone: "+91 ********90",
            address: "344C, Rocky mount, Chowk",
        },
        payment: {
            transaction: "#MHG**23527160123",
            method: "Paytm",
            cardHolder: "Joseph James",
            total: 1699
        },
        productDetails: [
            {
                productName: "Adidas Mens Run M Shoe",
                id: "#3453DR",
                price: 1699,
                quantity: 1,
                total: 1699
            },
            {
                productName: "Adidas Mens Run M Shoe",
                id: "#3453DR",
                price: 259,
                quantity: 2,
                total: 518
            },
            {
                productName: "Adidas Mens Run M Shoe",
                id: "#3453DR",
                price: 4009,
                quantity: 1,
                total: 4009
            }
        ],
        logistics: {
            company: "ABX Logistics",
            email: "abx@gmail.com",
            amount: 65,
            paymentMethod: "Paytm"
        },
        totalBill: {
            subtotal: 6226,
            discounts: -1382,
            logistics: 65,
            tax: 351,
            totalAmount: 5260
        },
        orderStatus: 2
    }
];
const CustomisedConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#FA8232",
            height: 40,

        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            height: 40,
            backgroundColor: "#FA8232",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 20,
        width: 10,
        border: "20px",
        backgroundColor: "#FFE7D6",
    },
}));
const steps = ['Order Placed', 'Order processed', 'Packed', 'Shipping','Out for delivery', 'Delivered'];

export default function OrderDetails() {
    const { id } = useParams();
    console.log(id);
    const [order] = useState(orders.find(order => order.id == id));
    const [step, setStep] = useState(-1);
    if (!order) {
        return <div>Order not found</div>; // Handle case when order is undefined
    }

    function handleStep(step) {
        setStep(step);
    }
    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans text-sm">
            <div className="bg-white px-6 py-10 rounded-lg min-h-screen">
                <h1 className="text-lg bg-gray-50 rounded-lg font-semibold mb-4">Order ID : {order.id}</h1>

                {/* Customer, Shipping and Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <h2 className="font-semibold mb-2">Customer details</h2>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p>{order.customer.name}</p>
                            <p>{order.customer.email}</p>
                            <p>{order.customer.phone}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Shipping address</h2>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p>{order.shipping.name}</p>
                            <p>{order.shipping.receivingPhone}</p>
                            <p>{order.shipping.address}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Payment details</h2>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p>Transaction: {order.payment.transaction}</p>
                            <p>Payment Method: {order.payment.method}</p>
                            <p>Card Holder: {order.payment.cardHolder}</p>
                            <p>Total amount: {order.payment.transaction}</p>
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="mb-6">
                    <h2 className="font-semibold mb-2">Product details</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <table className="w-full">
                            <thead>
                            <tr className={'text-left'}>
                                <th className="py-2">Product</th>
                                <th className="py-2">Product ID</th>
                                <th className="py-2">Price</th>
                                <th className="py-2">Quantity</th>
                                <th className="py-2">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.productDetails.map((product, index) => (
                                <tr key={index} className={'border-b-2'}>
                                    <td className={'py-2'}>{product.productName}</td>
                                    <td>{product.id}</td>
                                    <td>₹{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>₹{product.total}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Logistics and Billing Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h2 className="font-semibold mb-2">Logistics details</h2>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p>{order.logistics.company}</p>
                            <p>Email: {order.logistics.email}</p>
                            <p>Amount charged: {order.logistics.amount}</p>
                            <p>Payment method: {order.logistics.paymentMethod}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Total bill</h2>
                        <div className="grid grid-cols-2 p-4 bg-gray-50 rounded-lg">
                            <p>Subtotal: </p> <p>{order.totalBill.subtotal}</p>
                            <p>Discounts: </p> <p>{order.totalBill.discounts}</p>
                            <p>Logistics: </p> <p>{order.totalBill.logistics}</p>
                            <p>Tax: </p> <p>{order.totalBill.tax}</p>
                            <p className="font-bold">Total Amount: </p> <p>{order.totalBill.totalAmount}</p>
                        </div>
                    </div>
                </div>

                {/* Order Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="font-semibold mb-2">Order status</h2>
                        <Stepper activeStep={step}  orientation={'vertical'} connector={<CustomisedConnector/>}>
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

                    {/* Previous Orders */}
                    <div>
                        <h2 className="font-semibold mb-2">Previous Orders</h2>
                        <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-center h-full">
                            <p className="text-gray-500">No previous orders from the customer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}