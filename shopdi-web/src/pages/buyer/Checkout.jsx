import React from 'react'
import OrderItem from '@/components/Buyer/Checkout/OrderItem'
import Payment from '@/components/Buyer/Checkout/Payment'
export default function Checkout() {
    const tmp = []
    for (let i = 0; i < 3; i++) {
        tmp.push({
            id: i
        })
    }
    return (
        <div className="flex flex-col gap-4 p-8 bg-gray-100 mr-40 ml-40">
            <div>
                <div>Dia chi nhan hang</div>
                <div>{`Nguyen Van A (+84) 2234 556 798 nha 10 ngo 3 xa Cho nay huyen Cho kia tinh Cho do`}</div>
                <div className="text-blue-500 hover:underline">Thay doi</div>
            </div>
            <div>
            {tmp.map((item) => <OrderItem key={item.id} cart_item_id={item.id} />)}
            </div>
            <div className="flex flex-row">
                <div className="w-4/6">
                    <Payment /></div>
                <div className="text-left text-xl w-80">
                    <div className="flex flex-row justify-between">
                        <p className='inline-block'>Tien hang:</p>
                        <p className='inline-block'>300000</p>
                    </div>
                    <div className="flex flex-row justify-between mb-4 border-b-2 border-gray-400">
                        <p className='inline-block'>Tien ship:</p>
                        <p className='inline-block'>300000</p>
                    </div>
                    <div className="flex flex-row justify-between mb-4">
                        <p className='inline-block'>Tong tien :</p>
                        <p className='inline-block'>300000</p>
                    </div>
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Thanh toan
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}