import React, { useEffect } from "react";
import { useState } from "react";
import Cart from "../../components/Buyer/Cart.jsx";
import shopdiLogo from "../../assets/images/shopdi_logo.jpeg";
import { Link } from "react-router-dom";
import { DELETE, GET } from "../../api/GET";
export default function CartPage({ CartId }) {
    let l = [];
    useEffect(() => {
        GET("cart").then((res) => {
            if (res.code === "OK") {
                let tmp = res.result
                // let tmp = {
                //     "sellerGroups": [
                //         {
                //             "sellerId": "SG123",
                //             "sellerName": "Shop Name 1",
                //             "cartItems": [
                //                 {
                //                     "cartItemId": "CI123",
                //                     "productId": "P123",
                //                     "productName": "Product 1",
                //                     "productImage": "https://example.com/image1.jpg",
                //                     "variant": "Variant 1",
                //                     "quantity": 2,
                //                     "price": 19.99
                //                 },
                //                 {
                //                     "cartItemId": "CI456",
                //                     "productId": "P456",
                //                     "productName": "Product 2",
                //                     "productImage": "https://example.com/image2.jpg",
                //                     "variant": "Variant 2",
                //                     "quantity": 1,
                //                     "price": 49.99
                //                 }
                //             ]
                //         },
                //         {
                //             "sellerId": "SG456",
                //             "sellerName": "Shop Name 2",
                //             "cartItems": [
                //                 {
                //                     "cartItemId": "CI789",
                //                     "productId": "P789",
                //                     "productName": "Product 3",
                //                     "productImage": "https://example.com/image3.jpg",
                //                     "variant": "Variant 3",
                //                     "quantity": 3,
                //                     "price": 9.99
                //                 },
                //                 {
                //                     "cartItemId": "CI012",
                //                     "productId": "P012",
                //                     "productName": "Product 4",
                //                     "productImage": "https://example.com/image4.jpg",
                //                     "variant": "Variant 4",
                //                     "quantity": 1,
                //                     "price": 29.99
                //                 }
                //             ]
                //         }
                //     ]
                // }
                setProductsInCart(tmp)
                setProductsInCart(tmp);
                let tmp2 = [...tmp.sellerGroups]
                for(let i = 0; i < tmp2.length; i++){
                    for(let j = 0; j < tmp2[i].cartItems.length; j++){
                        tmp2[i].cartItems[j]["isSelected"] = false
                    }
                }
                console.log(tmp2)
                setSelectedProducts(tmp2)

            }
        })
    }, [])
    const [productsInCart, setProductsInCart] = useState([]);
    const onDelete = (cartItemId) => {
        DELETE("cart/items/" + cartItemId).then((res) => {
            if (res.code === "OK") {
                let tmp = [...productsInCart.sellerGroups]
                for(let i = 0; i < tmp.length; i++){
                    for(let j = 0; j < tmp[i].cartItems.length; j++){
                        if(tmp[i].cartItems[j].cartItemId === cartItemId){
                            tmp[i].cartItems.splice(j, 1)
                            break
                        }
                    }
                    if(tmp[i].cartItems.length === 0){
                        tmp.splice(i, 1)
                    }
                }
                setProductsInCart({ ...productsInCart, sellerGroups: tmp })
            }
        })

    }

    const [total, setTotal] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const onSelect = (cartItemId) => {
        let tmp = [...selectedProducts]
        for(let i = 0; i < tmp.length; i++){
            for(let j = 0; j < tmp[i].cartItems.length; j++){
                if(tmp[i].cartItems[j].cartItemId === cartItemId){
                    tmp[i].cartItems[j]["isSelected"] = !tmp[i].cartItems[j]["isSelected"]
                }
            }
        }
        setSelectedProducts(tmp)
    }
    return (
        <>
            <div className="mt-8 ml-32 mr-32">
                <Cart sellerGroups={productsInCart.sellerGroups} selectedProducts={selectedProducts} onSelect={onSelect} setTotal={setTotal} total={total} onDelete={onDelete} />

                <div className="bg-gray-200 h-20 sticky w-full mr-32 bottom-0 p-4 right-0 left-0 mt-8 mb-8 flex flex-row justify-end gap-4">
                    <div className="text-2xl">Total : {total.toLocaleString("vi", { style: "currency", currency: "VND" })}</div>
                    <Link to="/buyer/checkout" onClick={
                        (e) => {
                            if (selectedProducts.length === 0) {
                                e.preventDefault();

                                alert("Please select at least one product");
                            }
                        }
                    } state={{ selectedProducts: selectedProducts }}><button className="bg-red text-white p-2">Checkout</button></Link>
                </div>

            </div>
        </>
    )
}