import React, { useEffect } from "react";
import ShopBar from "@/components/Buyer/ShopBar";
import ProductList from "@/components/Buyer/ProductList";
import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Filter from "@/components/Seller/product/Filter";
import { GET } from "../../api/GET";
export default function ShopView() {
    const location = useLocation();
    const pathname = location.pathname;
    let sellerId = 0;
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    if (pathname.startsWith("/shop/")) {
        sellerId = pathname.split("/")[2];
    }
    useEffect(() => {
        GET("products/seller/" + sellerId + location.search).then((res) => {
            console.log(res)
            if (res.code === "OK") {
                setProducts(res.result?.items)
                setAllProducts(JSON.parse(JSON.stringify(res.result?.items)))
            }
        })
    }, [location])

    return (
        <div>
            <div className="text-center p-4"><ShopBar sellerId={sellerId} /></div>
            <div className="flex flex-row">
                <div className="w-1/4">
                    <Filter allProducts={allProducts} setProducts={setProducts} />

                </div>
                <ProductList products={products} />
            </div>

        </div>
    )
}