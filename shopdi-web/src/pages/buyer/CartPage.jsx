import React from "react";
import { useState } from "react";
import Cart from "../../components/Buyer/Cart.jsx";
import shopdiLogo from "../../assets/images/shopdi_logo.jpeg";
import { Link }from "react-router-dom";
export default function CartPage({ CartId }) {
    let l = [];
    for (let i = 0; i < 10; i++) {
        let tmp = {
            id: i,
            name: "Product " + (i + 1),
            quantity: i + 1,
            image: shopdiLogo,
            price: 100,
            variant: "mau xanh, kick thuoc S"
        }
        l.push(tmp)
    }
    const [productsInCart, setProductsInCart] = useState(l);
    const onDelete = (id) => {
        let l = productsInCart.filter((item) => item.id !== id);
        setProductsInCart(l);
    }

    const [total, setTotal] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const onSelect = (i) => {
        if (selectedProducts.includes(i)) {
            setSelectedProducts(selectedProducts.filter((item) => item.id !== i.id));
        } else {
            let l = selectedProducts;
            l.push(i);
            setSelectedProducts(l);
        }
    }
    return (
        <>
            <div className="mt-8 ml-32 mr-32">
                <Cart productInCart={productsInCart} selectedProducts={selectedProducts} onSelect={onSelect} setTotal={setTotal} total={total} onDelete={onDelete} />

                <div className="bg-gray-200 h-20 sticky w-full mr-32 bottom-0 p-4 right-0 left-0 mt-8 mb-8 flex flex-row justify-end gap-4">
                    <div className="text-2xl">Total : {total}</div>
                    <Link to="/buyer/checkout" state={{selectedProducts: selectedProducts}}><button className="bg-red text-white p-2">Checkout</button></Link>
                </div>

            </div>
        </>
    )
}