import React from "react";
import Product from "./Product.jsx";
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import PaginationButton from "@/components/Navigation/Pagination.jsx";
import { Box, Tab } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
export default function ProductList({ products, setProducts, page, allProducts}) {
    const tabHeadings = ["ALL", "PUBLISHED", "DELETED"]
    const [curretTab, setCurrentTab] = React.useState("ALL")
    let pageProduct = products.filter((product, index) => index >= (page.pageNo) * 10 && index < (page.pageNo + 1) * 10)
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="flex flex-row justify-between pb-6 ">
                    <div>
                        <input className=" h-10 w-80 rounded border-2 border-gray-400 outline-none px-4 py-2 font-sm"
                            type="text" placeholder="Tìm kiếm sản phẩm" onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setProducts(allProducts.filter(product => product.productName.toLowerCase().includes(e.target.value.toLowerCase())))
                                }
                            }}></input>
                    </div>
                    <div className="w-fit">
                        <Link to='add-product'>
                            <button className="w-full h-10 rounded text-white bg-yaleBlue outline-none px-2 pr-4 font-semibold hover:bg-celticBlue">
                                <AddIcon className={"mr-2 pb-1"} />Add product</button>
                        </Link>
                    </div>
                </div>
                <TabContext value={curretTab}>
                    <Box
                        sx={{
                            // borderBottom: 1,
                            borderColor: 'divider',
                            bgcolor: '#F2F4F5',
                            borderTop: '1px solid #E5E5E5',
                            borderLeft: '1px solid #E5E5E5',
                            borderRight: '1px solid #E5E5E5',

                        }}>
                        <TabList onChange={(e, value) => { { setCurrentTab(value) } }} aria-label="lab API tabs example">
                            {tabHeadings.map((tabHeading, index) => (<Tab
                                key={index}
                                label={tabHeading}
                                value={tabHeading}
                                sx={{
                                    marginRight: '36px',
                                    color: 'black', fontSize: '22px', fontWeight: 'semibold', '&.Mui-selected': {
                                        color: 'yaleBlue',
                                        fontWeight: 'bold',
                                        fontSize: '25px',
                                        position: 'relative',
                                    },
                                }}
                            />
                            ))}

                        </TabList>
                    </Box>
                </TabContext>
                <div className="header grid grid-cols-8 mb-4 py-2 text-[19px] font-semibold border-2 border-[#E4E7E9] bg-[#F2F4F5]">
                    <span className="col-span-3 pl-28">Product</span>
                    <span className=" text-left">Price</span>
                    <span className=" text-left">Stock</span>
                    <span className=" text-left">Orders</span>
                    <span className=" text-left">Published</span>
                    <span className=" text-center">Action</span>
                </div>

                {pageProduct && pageProduct.filter(product => {
                    if (curretTab === "ALL") {
                        return product
                    }
                    if (curretTab === "PUBLISHED") {
                        return product.status === "PUBLISHED"
                    } if (curretTab === "DELETED") {
                        return product.status === "DELETED"
                    }
                }).map((product) => <div key={product.productId}>
                    <Product product={product} />
                </div>)}

            </div>
            <div className="flex flex-col items-center pt-8">
                <PaginationButton pageObject={page} />
            </div>
        </>
    )
}

