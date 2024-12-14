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
    const query = new URLSearchParams(location.search);
    let sellerId = 0;
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [page, setPage] = useState({ pageNo: 0, totalPage: 1 })
    if (pathname.startsWith("/shop/")) {
        sellerId = pathname.split("/")[2];
    }
    useEffect(() => {
        GET("products/seller/" + sellerId + location.search).then((res) => {
            console.log(res)
            if (res.code === "OK") {
                setProducts(res.result?.items)
                setAllProducts(JSON.parse(JSON.stringify(res.result?.items)))
                setPage({ pageNo: res.result.pageNo, totalPage: res.result.totalPages })
            }
        })
    }, [location])

    return (
        <div className={"bg-cloudBlue pt-12"}>
            <div className="text-center mx-12"><ShopBar sellerId={sellerId} /></div>
            <div className="flex flex-row mr-4">
                <div className="w-64 ml-12 mt-12 ">
                    <Filter allProducts={allProducts} setProducts={setProducts} />

                </div>
                <ProductList products={products} page={page} />
            </div>

        </div>
    )
}