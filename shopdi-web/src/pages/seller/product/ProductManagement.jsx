import React from 'react'
import ProductList from '@/components/Seller/product/ProductList'
import Filter from '@/components/Seller/product/Filter'
import shopdiLogo from '@/assets/images/shopdi_logo.jpeg'
export default function ProductManagement() {
    let products = [];

    for (let i = 0; i < 10; i++) {
        let tmp = {
            id: i,
            name: "Product " + (i + 1),
            image: shopdiLogo,
            price: 100000,
            stock: 100,
            order: 100,
            publish_date: '01/01/2022'
        }
        products.push(tmp);
    }
    return (
        <div>
            <Filter>
                <ProductList products={products}/>
            </Filter>
        </div>
    )
}