import React from "react";
import Cart from "@/components/buyer/Cart";
import { useState } from "react";
import Navigation from "@/components/Navigation/Navigation";
export default function CartPage({ CartId }) {
    const [total, setTotal] = useState(0);
    return (
        <>
        <Navigation/>
        <div className="mt-8 ml-20 mr-20 flex flex-row">
            <div className="w-2/3"><Cart CartId={CartId} setTotal={setTotal} total={total}/></div>
            
                <div className="bg-white p-8 justify-between w-1/3">
                    <div>Total : {total}</div>
                    <button className="bg-red text-white p-2">Checkout</button>
                </div>
            
        </div>
        </>
    )
}