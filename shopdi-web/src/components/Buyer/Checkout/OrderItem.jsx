import React, { useState } from 'react'
import { JSONToData } from '@/utils/todo'
export default function OrderItem({ item }) {
    return (
        <div className="flex flex-row h-auto items-center border-b-2 border-gray-200 mx-12 my-4 pb-4">
            <div><img className="w-20 h-20 min-w-20" src={item.productImage} alt={item.name} /></div>
            <div className="h-fit grow">
                <div className="text-[16px] font-bold pl-4">{item.productName}</div>
                <div className='text-sm text-gray-500 pl-4'>{JSONToData(item.variant)}</div>
            </div>
            <span className="min-w-40 text-center">{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>

            <div className="min-w-40 flex flex-row justify-center">{item.quantity}</div>
            <span className="min-w-40 text-center ">{(item.price * item.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
        </div>
    )
}