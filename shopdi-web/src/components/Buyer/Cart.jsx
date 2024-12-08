import React from "react";
import CartItem from "./CartItem";
import { useState } from "react";
export default function Cart({ sellerGroups, selectedProducts, onSelect, setTotal, total, onDelete }) {

    return (
        <div className=" w-full font-sans min-h-screen">
            <div className="grid grid-cols-8 w-full font-sans">

                <div className="col-span-3 pl-12 h-12">Tên sản phẩm</div>
                <span className="w-40 text-center h-12">Phân loại</span>
                <span className="w-40 text-center h-12">Giá</span>
                <span className="w-40 text-center h-12">Số lượng</span>
                <span className="w-40 text-center h-12">Thành tiền</span>
                <span className="w-40 text-center h-12">Thao tác</span>
            </div>
            {sellerGroups && sellerGroups.map((seller) =>
                <div key={seller.sellerId} className="col-span-8">
                    <div>Cửa hàng: {seller.sellerName}</div>
                    {seller.cartItems && seller.cartItems.map((item) =>
                        <div key={item.cartItemId} className="border-b-2 border-gray-200 py-4">
                            <CartItem onSelect={onSelect} selectedProducts={selectedProducts} onDelete={onDelete} item={item} setTotal={setTotal} total={total} />
                        </div>
                    )}
                </div>)}
        </div>
    )
}
