import React, { useState } from 'react'
import{Link} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Product({item }) { 
    return (
        <div className="flex flex-row h-20 items-center">

            <div><Link to="product-detail"><img className="w-20 h-20 min-w-20 ml-8" src={item.image} alt={item.name} /></Link></div>
            <span className="h-fit grow">{item.name}</span>

            <span className="w-32 text-center">{item.price}</span>
            <span className="w-32 text-center">{item.stock}</span>
            <span className="w-32 text-center ">{item.order}</span>
            <span className="w-32 text-center">{item.publish_date}</span>
            <div className='w-8 '>
                <Link to="edit-product">
                <button className='mr-4 w-auto'>
                    <EditIcon />
                </button>
                </Link>
            </div>
            <div className='w-8 '>
                <button>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}