import React from 'react'
import OrderItem from '@/components/Buyer/Checkout/OrderItem'
import Payment from '@/components/Buyer/Checkout/Payment'
import AddressSelection from '@/components/Buyer/Checkout/AddressSelection'
import { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GET, POST } from '../../api/GET'
export default function Checkout({ ProductList }) {
    let location = useLocation()
    let tmp = location.state.selectedProducts;

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        GET("address/shipping").then((data) => {
            if (data.code === "OK") {
                setIsLoading(false)
                if(data.result.length === 0){
                    setCurrentAddress(null)
                }else{
                    setCurrentAddress(data.result[0])
                }
                setAllAddress(data.result)
            }
        })
    },[isLoading])

    const [currentAddress, setCurrentAddress] = useState( null)
    const [allAddress, setAllAddress] = useState([])
    const [openAddress, setOpenAddress] = useState(false)
    const onClose = () => {
        setOpenAddress(!openAddress)
    }
    return (
        <div>
            {openAddress && <AddressSelection onClose={onClose} addresses={allAddress} setAllAddress={setAllAddress} currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} />}
            <div className={`bg-white ${(openAddress ? "brightness-50" : "")}`}>
                <div className="flex flex-col gap-4 p-8 bg-gray-100 mr-40 ml-40">
                    <div className='border-b-2 border-gray-400 '>
                        <div className='text-xl text-red font-bold'>Dia chi nhan hang</div>
                        <div>{currentAddress === null ? "Chưa có địa chỉ" : `
                         ${currentAddress.firstName} ${currentAddress.lastName} (+84) ${currentAddress.phone} , ${currentAddress.address}`}</div>
                        <div className="text-blue-500 hover:underline" onClick={() => setOpenAddress(!openAddress)}>Thay đổi</div>
                    </div>
                    <div className="header flex flex-row w-full border-b-2 border-gray-400 pb-4">
                        <span className="grow pl-12">Tên sản phẩm   </span>
                        <span className="w-40 text-center">Giá</span>
                        <span className="w-40 text-center">Số lượng</span>
                        <span className="w-40 text-center">Thành tiền</span>
                    </div>
                    <div>
                        {tmp.map((item) =>
                            <div key={item.sellerId}>
                                <div className="text-xl font-bold">Cửa hàng  : {item.sellerName}</div>
                                {item.cartItems.map((item) => {
                                    if (item.isSelected) return <OrderItem key={item.cartItemId} item={item} />
                                })}
                            </div>)}
                    </div>
                    <div className="flex flex-row">
                        <div className="w-4/6">
                            <Payment /></div>
                        <div className="text-left text-xl w-80">
                            <div className="flex flex-row justify-between">
                                <p className='inline-block'>Tiền hàng :</p>
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
                            <div className="flex flex-row justify-between mb-4 border-b-2 border-gray-400">
                                <p className='inline-block'>Phí vận chuyển :</p>
                                <p className='inline-block'>{Number(0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className="flex flex-row justify-between mb-4">
                                <p className='inline-block'>Tổng tiền :</p>
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
                                        if(currentAddress === null) {
                                            alert("Vui lòng chọn điểm giao hàng")
                                        }
                                        POST('orders/checkout', {
                                            "addressId": currentAddress.addressId,
                                            "selectedCartItemIds": tmp[i].cartItems.map((item) => item.cartItemId),
                                        }).then((res) => {
                                            if (res.code === "OK") {
                                                alert("Dat hang thanh cong")
                                            }
                                        })
                                    }

                                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}