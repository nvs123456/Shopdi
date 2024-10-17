import React from "react";
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
export default function Product({product}) {
    let stars = [];
    for(let i = 0; i < Math.round(product.rating); i++) {
        stars.push(<StarIcon key={i} style={{color: "yellow",fontSize: "15px"}}/>)
    }
    for(let i = 0; i < 5 - Math.round(product.rating); i++) {
        stars.push(<StarIcon key={5-i} style={{color: "white",fontSize: "15px"}}/>)
    }
    return (
        <div className="bg-productBg p-2 w-60 h-96 rounded-md ">
            <div className="h-full rounded-md flex flex-col space-y-2">
            <div className=" bg-white min-w-full grow ">
                <img src={product.image} alt={product.name} />
            </div>
            <div>
                <p>{product.name}</p>
            </div>
            <div>
                {stars}
                <p className="inline">({product.sold} sold)</p>
            </div>
            <div>
                <p><AttachMoneyIcon style={{fontSize: "15px"}}/>{product.price}</p>
            </div>
            </div>
        </div>
    )
}
