import React from 'react'
import OrderItem from '@/components/Buyer/Checkout/OrderItem'
import Payment from '@/components/Buyer/Checkout/Payment'
import AddressSelection from '@/components/Buyer/Checkout/AddressSelection'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
export default function Checkout({ ProductList }) {
    let location = useLocation()
    let tmp = location.state.selectedProducts;
    const addresses = []
    for (let i = 0; i < 8; i++) {
        let t = {
            id: i,
            firstName: "Nguyen",
            lastName: "Van Som" + i,
            address: "dia chi cua nguoi dung " + i,
            phone: `${i}${i}${i}${i}${i}${i}`
        }
        addresses.push(t)
    }
    const [currentAddress, setCurrentAddress] = useState(addresses[0])
    const [openAddress, setOpenAddress] = useState(false)
    const onClose = () => {
        setOpenAddress(!openAddress)
    }
    return (
        <div>
            {openAddress && <AddressSelection onClose={onClose} addresses = {addresses} currentAddress = {currentAddress} setCurrentAddress = {setCurrentAddress}/>}
            <div className={`bg-white ${(openAddress ? "brightness-50" : "")}`}>
                <div className="flex flex-col gap-4 p-8 bg-gray-100 mr-40 ml-40">
                    <div className='border-b-2 border-gray-400 '>
                        <div className='text-xl text-red font-bold'>Dia chi nhan hang</div>
                        <div>{`
                         ${currentAddress.firstName} ${currentAddress.lastName} (+84) ${currentAddress.phone} , ${currentAddress.address}`}</div>
                        <div className="text-blue-500 hover:underline" onClick={() => setOpenAddress(!openAddress)}>Thay doi</div>
                    </div>
                    <div className="header flex flex-row w-full border-b-2 border-gray-400 pb-4">
                        <span className="grow pl-12">Ten san pham</span>
                        <span className="w-40 text-center">Gia</span>
                        <span className="w-40 text-center">So luong</span>
                        <span className="w-40 text-center">Thanh tien</span>
                    </div>
                    <div>
                        {tmp.map((item) => <OrderItem key={item.id} item={item} />)}
                    </div>
                    <div className="flex flex-row">
                        <div className="w-4/6">
                            <Payment /></div>
                        <div className="text-left text-xl w-80">
                            <div className="flex flex-row justify-between">
                                <p className='inline-block'>Tien hang:</p>
                                <p className='inline-block'>{tmp.reduce((a, b) => a + b.price * b.quantity, 0)}</p>
                            </div>
                            <div className="flex flex-row justify-between mb-4 border-b-2 border-gray-400">
                                <p className='inline-block'>Tien ship:</p>
                                <p className='inline-block'>{10000}</p>
                            </div>
                            <div className="flex flex-row justify-between mb-4">
                                <p className='inline-block'>Tong tien :</p>
                                <p className='inline-block'>{tmp.reduce((a, b) => a + b.price * b.quantity, 0) + 10000}</p>
                            </div>
                            <div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Thanh toan
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}