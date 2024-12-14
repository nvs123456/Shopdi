import React from "react";
import Product from "./Product.jsx";
import Pagination from "@/components/Navigation/Pagination.jsx";
import { useState } from "react";
export default function ProductList({ products, page }) {
    const [isSortOpen, setSortOpen] = useState(false);

    return (
        <div className="flex flex-col w-full items-center gap-y-4 bg-cloudBlue pt-12">
            <div className="self-center inline-grid grid-cols-4 gap-x-5 gap-y-5 font-sans min-h-screen ">
                {products.filter(product => product.status !== 'DELETED').map(product => <Product key={product.productId + product.productName} product={product} />)}
            </div>
            <Pagination pageObject={page} />
        </div >
    )
}