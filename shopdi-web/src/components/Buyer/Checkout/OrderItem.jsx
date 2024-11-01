import React, { useState } from 'react'


import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
export default function OrderItem({ cart_item_id }) {

    const item = {
        id: cart_item_id,
        name: `Product ${cart_item_id}`,
        quantity: cart_item_id + 1,
        image: shopdiLogo,
        price: 100,
        variant: "mau xanh, kick thuoc S"
    }
    return (
        <div className="flex flex-row h-auto items-center border-b-2 border-gray-200 mb-4 pb-4">
            <div><img className="w-20 h-20 min-w-20 ml-8" src={item.image} alt={item.name} /></div>
            <span className="h-fit grow">{item.name}</span>
            <div className="flex flex-row w-1/6 relative" >
                <div className="">
                    {item.variant}
                </div>
            </div>
            <span className="w-40 text-center">{item.price}</span>

            <div className="w-40 flex flex-row justify-center">{item.quantity}</div>
            <span className="w-40 text-center ">{item.price * item.quantity}</span>
        </div>
    )
}