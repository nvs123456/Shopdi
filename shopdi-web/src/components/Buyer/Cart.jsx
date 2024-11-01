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
    const onDelete = (id) => {
        let l = items.filter((item) => item.id !== id);
        setItems(l);
    }
    return (
        <div className="flex flex-col w-full">
            <div className="header flex flex-row w-full">
                <input type="checkbox"></input>
                <span className="grow pl-12">Ten san pham</span>
                <span className="w-40 text-center">Gia</span>
                <span className="w-40 text-center">So luong</span>
                <span className="w-40 text-center">Thanh tien</span>
                <span className="w-40 text-center">Thao tac</span>
            </div>
            {items.map((item) => <div className="border-b-2 border-gray-200 py-4"><CartItem onDelete={onDelete} key={item.id} cart_item_id={item.id} setTotal={setTotal} total={total}/></div>)}
        </div>
    )
}
