import React from "react";
import ShopBar from "@/components/buyer/ShopBar";
import ProductList from "@/components/buyer/ProductList";
import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
import Filter from "@/components/buyer/Filter";
export default function ShopView() {
    let product = {
        id: 0,
        name: "Product 1",
        image: shopdiLogo,
        rating: 3.5,
        sold: 100,
        price: 100
    };
    let product_tmp = [];
    for (let i = 0; i < 10; i++) {
        let tmp = { ...product };
        tmp.id = i;
        tmp.name = "Product " + (i + 1);
        tmp.rating = Math.random() * 5;
        tmp.sold = Math.floor(Math.random() * 1000);
        tmp.price = Math.floor(Math.random() * 1000000);
        product_tmp.push(tmp);
    }
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
            <Filter category={categories} products={product_tmp}/>
        </div>
    )
}