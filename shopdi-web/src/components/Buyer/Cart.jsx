import React from "react";
import CartItem from "./CartItem";
import { useState } from "react";
export default function Cart({ sellerGroups, selectedProducts, onSelect, setTotal, total, onDelete }) {

    return (
        <div className=" w-full font-sans min-h-screen bg-white border-[#E4E7E9] border-2">
            <div className="grid grid-cols-8 w-full font-sans px-6 pt-6 text-[18px] font-bold">
                <div className="col-span-3 h-12 pl-40">PRODUCTS</div>
                <span className="w-40 text-center h-12">CATEGORY</span>
                <span className="w-40 text-center h-12">PRICE</span>
                <span className="w-40 text-center h-12">QUANTITY</span>
                <span className="w-40 text-center h-12">SUB-TOTAL</span>
                <span className="w-40 text-center h-12">ACTION</span>
            </div>
            {sellerGroups && sellerGroups.map((seller) =>
                <div key={seller.sellerId} className="col-span-8">
                    <div className={"bg-gray-200 px-14 py-4 text-[18px] font-bold font-sans"}>SHOP - {seller.sellerName}</div>
                    {seller.cartItems && seller.cartItems.map((item) =>
                        <div key={item.cartItemId} className="border-b-2 border-[#E4E7E9] p-4">
                            <CartItem onSelect={onSelect} selectedProducts={selectedProducts} onDelete={onDelete} item={item} setTotal={setTotal} total={total} />
                        </div>
                    )}
                </div>)}
        </div>
    )
}
