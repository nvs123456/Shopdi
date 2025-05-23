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
            <div className="py-12 px-40 bg-cloudBlue">
                <Cart sellerGroups={productsInCart.sellerGroups} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} onSelect={onSelect} setTotal={setTotal} total={total} onDelete={onDelete} />

                <div className="bg-[#F2F4F5] h-20 sticky w-full bottom-0 p-4 flex flex-row justify-end gap-10 ">
                    <div className="text-2xl my-auto font-semibold font-sans">TOTAL: {total.toLocaleString("vi", { style: "currency", currency: "VND" })}</div>
                    <Link className={"bg-[#FA8232] rounded hover:bg-orangeRed"} to="/buyer/checkout" onClick={
                        (e) => {
                            let isSelected = false
                            for(let i = 0; i < selectedProducts.length; i++){
                                for(let j = 0; j < selectedProducts[i].cartItems.length; j++){
                                    if(selectedProducts[i].cartItems[j].isSelected){
                                        isSelected = true
                                        break
                                    }
                                }
                            }
                            if (!isSelected) {
                                e.preventDefault();

                                alert("Please select at least one product");
                            }
                        }
                    } state={{isBuyNow: false, selectedProducts: selectedProducts }}><button className=" text-white px-5 flex items-center justify-center h-full font-semibold font-sans">PROCEED TO CHECKOUT</button></Link>
                </div>

            </div>
        </>
    )
}