import React from "react";
import { useState } from "react";
import Navigation from "../../components/Navigation/Navigation.jsx";
import Cart from "../../components/Buyer/Cart.jsx";
export default function CartPage({ CartId }) {
    const [total, setTotal] = useState(0);
    return (
        <>
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