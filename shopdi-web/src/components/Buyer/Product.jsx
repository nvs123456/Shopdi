import React from "react";
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {Link} from 'react-router-dom';
import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
export default function Product({product}) {
    product.rating = Math.random() * 5
    product.reviewCount = Math.floor(Math.random() * 100)
    let stars = [];
    for (let i = 0; i < Math.round(product.rating); i++) {
        stars.push(<StarIcon key={i} style={{color: "#FFAD33", fontSize: "20px"}}/>)
    }
    for (let i = 0; i < 5 - Math.round(product.rating); i++) {
        stars.push(<StarIcon key={5 - i} style={{color: "gray", fontSize: "20px"}}/>)
    }
    return (
        <Link to={`/product/${product.productId}`}>
            <div className="bg-cloudBlue p-2 w-[300px] h-[420px] ">
                <div className="h-full flex flex-col ">
                    <div className=" bg-white min-w-full min-h-[224px]">
                        <img className="rounded-md" src={product.productImage}  style={{aspectRatio: "1/1"}} alt={product.name}/>
                    </div>
                    <div className="text-sm grow p-2">
                        <p className="truncate overflow-hidden">{product.productName}</p>
                    </div>
                    <div>
                        {stars}<span className="text-[14px]">({product.reviewCount})</span>
                    </div>
                    <div>
                        <p className="text-[#DB4444] text-[18px] font-bold mt-2">{product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
