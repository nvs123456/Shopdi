import React from "react";
import Product from "./Product.jsx";
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import PaginationButton from "@/components/Navigation/Pagination.jsx";
export default function ProductList({ products, page }) {
    console.log(page)
    let pageProduct = products.filter((product, index) => index >= (page.pageNo) * 10 && index < (page.pageNo + 1) * 10)
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="flex flex-row justify-between pb-6 ">
                    <div>
                        <input className=" h-10 w-80 rounded border-2 border-gray-400 outline-none px-4 py-2 font-sm" type="text" placeholder="Tìm kiếm sản phẩm"></input>
                    </div>
                    <div className="w-fit">
                        <Link to='add-product'>
                            <button className="w-full h-10 rounded text-white bg-yaleBlue outline-none px-2 pr-4 font-semibold hover:bg-celticBlue">
                                <AddIcon className={"mr-2 pb-1"} />Add product</button>
                        </Link>
                    </div>
                </div>
                <div className="header grid grid-cols-8 mb-4 py-2 text-[19px] font-semibold border-2 border-[#E4E7E9] bg-[#F2F4F5]">
                    <span className="col-span-3 pl-28">Product</span>
                    <span className=" text-left">Price</span>
                    <span className=" text-left">Stock</span>
                    <span className=" text-left">Orders</span>
                    <span className=" text-left">Published</span>
                    <span className=" text-center">Action</span>
                </div>

                {pageProduct && pageProduct.map((product) => <div key={product.productId}>
                    <Product product={product} />
                </div>)}

            </div>
            <div className="flex flex-col items-center pt-8">
                <PaginationButton pageObject={page} />
            </div>
        </>
    )
}
const generatePagination = (currentPage, totalPages) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
};
