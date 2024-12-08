import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET } from "../../api/GET";
const ShopBar = ({ sellerId }) => {
    const [shop_info, setShop_info] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GET(`seller/seller/${sellerId}`).then((data) => {
            if (data.code == "OK") {
                console.log(data.result);
                setShop_info(data.result);
            }
        })
    }, [])
    return (
        <div className="shop-info bg-white border-[1px] p-6">
            <div className=" flex flex-row gap-x-4 items-center">
                <div>
                    <img src={shop_info.profileImage} alt="Logo" className="h-20 w-20 rounded-full" />
                </div>
                <div>
                    <div className="text-2xl mb-2 font-bold">{shop_info.shopName}</div>
                    <Link to={`/shop/${sellerId}`}><div className='max-w-40 font-sans text-center rounded text-[16px] bg-[#FA8232] text-white cursor-pointer hover:bg-orangeRed font-bold'>Go to shop</div></Link>
                </div>
                <div className={"ml-4 text-xl"}>Contact number:   <span className='text-[#FA8232]'>{shop_info.contactNumber}</span></div>
                <div className={"ml-4 text-xl"}>Contact email:   <span className='text-[#FA8232]'>{shop_info.email}</span></div>
                

            </div>
        </div>
    )
}

export default ShopBar;