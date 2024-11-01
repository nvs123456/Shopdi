import React from "react";
import { useState } from "react";
import Navigation from "../../components/Navigation/Navigation.jsx";
import Cart from "../../components/Buyer/Cart.jsx";
export default function CartPage({ CartId }) {
    const [total, setTotal] = useState(0);
    return (
        <>
            <div className="mt-8 ml-32 mr-32">
                <Cart CartId={CartId} setTotal={setTotal} total={total} />

                <div className="bg-gray-200 h-20 sticky w-full mr-32 bottom-0 p-4 right-0 left-0 mt-8 mb-8 flex flex-row justify-end gap-4">
                    <div className="text-2xl">Total : {total}</div>
                    <button className="bg-red text-white p-2">Checkout</button>
                </div>

            </div>
        </>
    )
}