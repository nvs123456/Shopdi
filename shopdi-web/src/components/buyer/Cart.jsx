import React from "react";
import CartItem from "./CartItem";
import { useState } from "react";
export default function Cart({ CartId ,setTotal,total}) {
    const tmp = []
    for (let i = 0; i < 10; i++) {
        tmp.push({
            id: i
        })
    }
    const [items, setItems] = useState(tmp);
    return (
        <div className="flex flex-col ">
            <div className="header flex flex-row w-full">
                <input type="checkbox"></input>
                <span className="w-full pl-12">Ten san pham</span>
                <span className="w-1/6">Gia</span>
                <span className="w-1/6">So luong</span>
                <span className="w-1/6">Thanh tien</span>
            </div>
            {items.map((item) => <div className="border-b-2 border-gray-200 py-4"><CartItem  key={item.id} cart_item_id={item.id} setTotal={setTotal} total={total}/></div>)}
        </div>
    )
}
