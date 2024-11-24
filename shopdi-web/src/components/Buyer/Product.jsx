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
        stars.push(<StarIcon key={i} style={{color: "yellow", fontSize: "20px"}}/>)
    }
    for (let i = 0; i < 5 - Math.round(product.rating); i++) {
        stars.push(<StarIcon key={5 - i} style={{color: "white", fontSize: "20px"}}/>)
    }
    return (
        <Link to={`/product/${product.productId}`}>
            <div className="bg-tuftsBlue p-2 w-60 h-[300px] rounded-md ">
                <div className="h-full rounded-md flex flex-col space-y-2">
                    <div className=" bg-white min-w-full h-[224px] ">
                        <img src={product.imageUrls} width={224} alt={product.name}/>
                    </div>
                    <div className="text-lg grow p-2">
                        <p>{product.productName}</p>
                    </div>
                    <div>
                        {stars}<span className="text-sm">({product.reviewCount})</span>
                    </div>
                    <div>
                        <p>{product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
