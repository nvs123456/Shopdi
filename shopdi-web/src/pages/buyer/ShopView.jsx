import React, { useEffect } from "react";
import ShopBar from "@/components/Buyer/ShopBar";
import ProductList from "@/components/Buyer/ProductList";
import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Filter from "@/components/Buyer/Filter";
import { GET } from "../../api/GET";
export default function ShopView() {
    const location = useLocation();
    const pathname = location.pathname;
    let sellerId = 0;
    const [products, setProducts] = useState([]);
    if(pathname.startsWith("/shop/")){
        sellerId = pathname.split("/")[2];
    }
    useEffect(() => {
        GET("products/seller/" + sellerId+location.search).then((res) => {
            console.log(res)
            if (res.code === "OK") {
                setProducts(res.result?.items)
            }
        })
    })
    const shop_info = {
        name: "Shopdi",
        link: "https://shopdi.com",
        image: shopdiLogo,
        review: "3,1tr",
        "san_pham": "100",
        "tham_gia": " 2 nam truoc"
    }
    const categories = {
        name:"Danh muc",
        sub_categories:[
            "May tinh","Dien thoai","linh kien"
        ]
    };
    return (
        <div>
            <div className="text-center p-4"><ShopBar shop_info={shop_info} /></div>
            <ProductList products={products} />
        </div>
    )
}