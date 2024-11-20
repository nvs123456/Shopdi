import React from "react";
import Product from "./Product.jsx";
import Pagination from "@/components/Navigation/Pagination.jsx";
export default function ProductList({ products }) {
    return (
        <div className="flex flex-col w-full items-center gap-y-4">

            <div className="self-center inline-grid grid-cols-4 gap-x-1 gap-y-1 font-sans">
                {products.map(product => <Product key={product.productId + product.productName} product={product} />)}
            </div>
            <Pagination />
        </div >
    )
}