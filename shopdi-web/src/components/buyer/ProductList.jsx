import React from "react";
import Product from "./Product";

export default function ProductList({products}) {
    return (    
        <div className="self-center inline-grid grid-cols-4 gap-x-1 gap-y-1">
            {products.map(product => <Product key={product.id} product={product} />)}
        </div>
    )
}