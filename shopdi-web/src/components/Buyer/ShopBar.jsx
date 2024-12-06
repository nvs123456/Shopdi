import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET } from "../../api/GET";
const ShopBar = ({ sellerId }) => {
    const [shop_info, setShop_info] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GET(`seller/profile/${sellerId}`).then((data) => {
            if (data.code == "OK") {
                console.log(data.result);
                setShop_info(data.result);
            }
        })
    }, [])
    return (
        <div className="shop-info bg-white border-2 rounded-md p-4">
            <div className=" flex flex-row gap-x-4 items-center">
                <div>
                    <img src={shop_info.profileImage} alt="Logo" className="h-14 w-auto rounded-full" />
                </div>
                <div>
                    <div className="text-2xl">{shop_info.shopName}</div>
                    <Link to={`/shop/${sellerId}`}><div className='max-w-40 border-2 border-gray-300 bg-white font-publicSans p-2  text-center rounded-md text-sm hover:bg-pumpkin hover:text-white'> Xem shop</div></Link>
                </div>
                <div>Contact number:   <span className='text-pumpkin'>{shop_info.contactNumber}</span></div>
                <div>Contact email:   <span className='text-pumpkin'>{shop_info.email}</span></div>
                

            </div>
        </div>
    )
}

export default ShopBar;