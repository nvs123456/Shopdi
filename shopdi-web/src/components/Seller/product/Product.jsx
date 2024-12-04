import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import shopdiLogo from '@/assets/images/shopdi_logo.jpeg';
import { DELETE } from '../../../api/GET';
export default function Product({ product }) {
    const [isDeleted, setIsDeleted] = useState(false);
    return (
        <div className={`flex flex-row  h-20 items-center  border-b-2 border-gray-200 pb-4 mb-4`}>
            {/* <div><Link to={`product-detail/${product.productId}`}><img className="w-20 h-20 min-w-20 ml-8" src={product.productImage} alt={"image"} /></Link></div> */}

            <div><img className="w-20 h-20 min-w-20" src={product.productImage} alt={"image"} /></div>
            <div className="grow">{product.productName}</div>

            <span className="min-w-24 text-center">{product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            <span className="min-w-24 text-center">{product.stock}</span>
            <span className="min-w-24 text-center ">{product.order}</span>
            <span className="min-w-24 text-center">{new Date(product.publishedOn).toLocaleString('vi', { day: 'numeric', month: 'numeric', year: 'numeric' })}</span>
            <div className='min-w-24 text-center'>
                <Link to={`edit-product/${product.productId}`}>
                    <button className='mr-4 w-auto'>
                        <EditIcon />
                    </button>
                </Link>
            </div>
            {/* <div className='w-8 '>
                <button onClick={() => {
                    DELETE(`seller/delete-product/${product.productId}`).then((res) => {
                        console.log(res);
                        if(res.code === "OK"){
                            setIsDeleted(true);
                        }
                        
                        // window.location.reload();
                    })
                    
                }}>
                    <DeleteIcon />
                </button>
            </div> */}
        </div>
    )
}