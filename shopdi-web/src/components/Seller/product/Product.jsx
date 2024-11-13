import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import{Link} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import shopdiLogo from '@/assets/images/shopdi_logo.jpeg';
import { DELETE } from '../../../api/GET';
export default function Product({product }) { 
    return (
        <div className="flex flex-row h-20 items-center">

            <div><Link to={`product-detail/${product.productId}`}><img className="w-20 h-20 min-w-20 ml-8" src={shopdiLogo} alt={"image"} /></Link></div>
            <span className="h-fit grow">{product.productName}</span>

            <span className="w-32 text-center">{product.price}</span>
            <span className="w-32 text-center">{product.quantity}</span>
            <span className="w-32 text-center ">{product.order}</span>
            <span className="w-32 text-center">{product.publish_date}</span>
            <div className='w-8 '>
                <Link to="edit-product">
                <button className='mr-4 w-auto'>
                    <EditIcon />
                </button>
                </Link>
            </div>
            <div className='w-8 '>
                <button onClick={() => {
                    DELETE(`seller/delete-product/${product.productId}`).then((res) => {
                        console.log(res);
                        window.location.reload();
                    })
                    
                }}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}