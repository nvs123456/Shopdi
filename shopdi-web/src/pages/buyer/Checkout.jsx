import React from 'react'
import OrderItem from '@/components/Buyer/Checkout/OrderItem'
import Payment from '@/components/Buyer/Checkout/Payment'
import AddressSelection from '@/components/Buyer/Checkout/AddressSelection'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GET, POST } from '../../api/GET'
import CheckoutPopup from '../../components/Buyer/Checkout/CheckoutPopup'
export default function Checkout({ ProductList }) {
    let location = useLocation()
    let tmp = location.state.selectedProducts;
    console.log(tmp)
    let isBuyNow = location.state.isBuyNow;
    const [isLoading, setIsLoading] = useState(true)
    const [payment, setPayment] = useState("COD")
    useEffect(() => {
        GET("address/shipping").then((data) => {
            if (data.code === "OK") {
                setIsLoading(false)
                if (data.result.length === 0) {
                    setCurrentAddress(null)
                } else {
                    setCurrentAddress(data.result[0])
                }
                setAllAddress(data.result)
            }
        })
    }, [isLoading])

    const [currentAddress, setCurrentAddress] = useState(null)
    const [allAddress, setAllAddress] = useState([])
    const [openAddress, setOpenAddress] = useState(false)
    const [openCheckoutSuccess, setOpenCheckoutSuccess] = useState(false)
    const [orderId, setOrderId] = useState(null)
    useEffect(() => {
        if (orderId !== null) {
            setOpenCheckoutSuccess(true)
        }
    }, [orderId])

    const onClose = () => {
        setOpenAddress(!openAddress)
    }

    return (
        <div>
            {openCheckoutSuccess && <CheckoutPopup orderId={orderId} paymentMethod={payment} />}
            {openAddress && <AddressSelection onClose={onClose} addresses={allAddress} setAllAddress={setAllAddress} currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} />}
            <div className={`bg-cloudBlue py-12 px-40 ${(openAddress || openCheckoutSuccess ? "brightness-50" : "")}`}>
                <div className="flex flex-col bg-white font-sans">
                    <div className='border-b-[20px] border-b-cloudBlue border-t-[1px] border-l-[1px] border-r-[1px] border-t-[#E4E7E9] border-l-[#E4E7E9] border-r-[#E4E7E9]'>
                        <div className='text-2xl text-yaleBlue font-bold ml-8 mt-6'>DELIVERY ADDRESS</div>
                        <div className={"ml-8 mt-2 text-xl"}>{currentAddress === null ? "No address available" : `
                         ${currentAddress.firstName} ${currentAddress.lastName} (+84) ${currentAddress.phone} , ${currentAddress.address}, ${currentAddress.city}, ${currentAddress.state}, ${currentAddress.country}`}</div>
                        <div className="pl-8 py-4 text-blue-500 hover:underline border-b-[1px] border-[#E4E7E9] w-fit" onClick={() => setOpenAddress(!openAddress)}>{currentAddress === null ? "Add address" : "Change address"}</div>
                    </div>
                    <div className="header flex flex-row w-full py-4 pr-4 bg-[#F2F4F5] border-[#E4E7E9] border-[1px]">
                        <span className="grow pl-12 text-xl font-semibold">Products Ordered</span>
                        <span className="w-40 text-center text-xl pr-16 font-semibold">Unit Price</span>
                        <span className="w-40 text-center text-xl pr-16 font-semibold">Quantity</span>
                        <span className="w-40 text-center text-xl pr-16 font-semibold">Subtotal</span>
                    </div>
                    <div className={"border-b-[20px] border-b-cloudBlue border-t-[1px] border-l-[1px] border-r-[1px] border-t-[#E4E7E9] border-l-[#E4E7E9] border-r-[#E4E7E9] pb-4"}>
                        {tmp.map((item) =>
                            <div key={item.sellerId}>
                                <div className="text-[20x] font-semibold mx-8 py-4 border-b-2 border-[#E4E7E9] ">SHOP - {item.sellerName}</div>
                                {item.cartItems.map((item) => {
                                    if (item.isSelected) return <OrderItem key={item.cartItemId} item={item} />
                                })}
                            </div>)}
                    </div>
                    <div className="flex flex-row border-[1px] border-[#E4E7E9] pt-8" >
                        <div className="w-4/6">
                            <Payment payment={payment} setPayment={setPayment} />
                            <div className={"mx-10"}>
                                <div>Message for Sellers:</div>
                                <textarea id="note" className="w-full h-20 border-2 border-[#E4E7E9] rounded mt-2 mb-6 p-2" placeholder="(Optional)"></textarea>
                            </div>
                        </div>
                        <div className="text-left text-xl w-80">
                            <div className="flex flex-row justify-between mb-2">
                                <p className='inline-block'>Merchandise Subtotal</p>
                                <p className='inline-block'>{
                                    tmp.reduce((total, current) => {
                                        for (let i = 0; i < current.cartItems.length; i++) {
                                            if (current.cartItems[i].isSelected) {
                                                total += current.cartItems[i].price * current.cartItems[i].quantity
                                            }
                                        }
                                        return total
                                    }, 0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className="flex flex-row justify-between mb-4 border-b-2 border-[#E4E7E9] pb-4">
                                <p className='inline-block'>Shipping Subtotal</p>
                                <p className='inline-block'>{Number(0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className="flex flex-row justify-between mb-4">
                                <p className='inline-block'>Total Payment:</p>
                                <p className='inline-block'>{
                                    tmp.reduce((total, current) => {
                                        for (let i = 0; i < current.cartItems.length; i++) {
                                            if (current.cartItems[i].isSelected) {
                                                total += current.cartItems[i].price * current.cartItems[i].quantity
                                            }
                                        }
                                        return total
                                    }, 0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div>
                                <button onClick={() => {
                                    for (let i = 0; i < tmp.length; i++) {
                                        if (currentAddress === null) {
                                            alert("Vui lòng chọn điểm giao hàng")
                                        }
                                        if (isBuyNow) {
                                            POST('orders/buy-now/' + tmp[i].cartItems[0].productId, {

                                                "variant": tmp[i].cartItems[0].variant,
                                                "quantity": tmp[i].cartItems[0].quantity,
                                                "addressId": currentAddress.addressId,
                                                "orderNotes": document.getElementById("note").value,
                                                'paymentMethod': payment

                                            }).then((res) => {
                                                if (res.code === "OK") {
                                                    if (res.result.paymentMethod === "VNPAY") {
                                                        GET(`payment/vn-pay?amount=${res.result.totalPrice}&orderId=${res.result.orderId}`).then((res) => {
                                                            if (res.code === "OK") {
                                                                window.location.href = res.result
                                                            }
                                                        })
                                                    } else {
                                                        setOrderId(res.result.orderId)
                                                        setOpenCheckoutSuccess(true)
                                                    }

                                                }
                                            })
                                        } else {
                                            POST('orders/place-order', {
                                                "addressId": currentAddress.addressId,
                                                "selectedCartItemIds": tmp[i].cartItems.filter((item) => item.isSelected).map((item) => item.cartItemId),
                                                orderNotes: document.getElementById("note").value,
                                                'paymentMethod': payment
                                            }).then((res) => {
                                                if (res.code === "OK") {
                                                    if (res.result.paymentMethod === "VNPAY") {
                                                        GET(`payment/vn-pay?amount=${res.result.totalPrice}&orderId=${res.result.orderId}`).then((res) => {
                                                            if (res.code === "OK") {
                                                                window.location.href = res.result
                                                            }
                                                        })
                                                    } else {
                                                        setOrderId(res.result.orderId)
                                                        setOpenCheckoutSuccess(true)
                                                    }

                                                }
                                            })
                                        }
                                    }

                                }} className="text-white font-semibold py-2 px-4 bg-[#FA8232] rounded font-sans hover:bg-orangeRed">
                                    {payment === "COD" ? "PLACE ORDER" : "CHECK OUT"}
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}