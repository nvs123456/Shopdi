import React, { useState } from 'react'
import { JSONToData } from '@/utils/todo'
export default function OrderItem({ item }) {
    return (
        <div className="flex flex-row h-auto items-center border-b-2 border-gray-200 mb-4 pb-4">
            <div><img className="w-20 h-20 min-w-20 ml-8" src={item.image} alt={item.name} /></div>
            <div className="h-fit grow">
                <div className="text-xl font-bold">{item.name}</div>
                <div className='text-sm text-gray-500'>{JSONToData(item.variant)}</div>
            </div>
            {/* <div className="flex flex-row w-1/6 relative" >
                <div className="">
                    {item.variant}
                </div>
            </div> */}
            <span className="w-40 text-center">{item.price}</span>

            <div className="w-40 flex flex-row justify-center">{item.quantity}</div>
            <span className="w-40 text-center ">{item.price * item.quantity}</span>
        </div>
    )
}