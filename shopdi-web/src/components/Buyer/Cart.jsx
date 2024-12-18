import React from "react";
import CartItem from "./CartItem";
import { useState } from "react";
export default function Cart({ sellerGroups, selectedProducts,setSelectedProducts, onSelect, setTotal, total, onDelete }) {

    return (
        <div className=" w-full font-sans min-h-screen bg-white border-[#E4E7E9] border-[1px]">
            <div className="grid grid-cols-8 w-full font-sans px-6 pt-6 text-[20px] font-semibold text-yaleBlue border-[#E4E7E9] border-b-2">
                <div className="col-span-3 h-12 pl-40">Products</div>
                <span className="w-40 text-center h-12">Variation</span>
                <span className="w-40 text-center h-12">Price</span>
                <span className="w-40 text-center h-12">Quantity</span>
                <span className="w-40 text-center h-12">Subtotal</span>
                <span className="w-40 text-center h-12">Action</span>
            </div>
            {sellerGroups && sellerGroups.map((seller) =>
                <div key={seller.sellerId} className="col-span-8">
                    <div className={"bg-[#F2F4F5] px-14 py-4 text-[18px] font-medium font-sans"}>SHOP - {seller.sellerName}</div>
                    {seller.cartItems && seller.cartItems.map((item) =>
                        <div key={item.cartItemId} className="border-b-2 border-[#E4E7E9] p-4">
                            <CartItem onSelect={onSelect} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} onDelete={onDelete} item={item} setTotal={setTotal} total={total} />
                        </div>
                    )}
                </div>)}
        </div>
    )
}
