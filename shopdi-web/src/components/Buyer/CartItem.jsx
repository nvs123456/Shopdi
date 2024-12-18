import React, { useEffect, useState } from 'react'
import { JSONToData } from '@/utils/todo.js';
import { GET, PUT, POST } from '../../api/GET.jsx';
import { useNavigate } from 'react-router-dom';

export default function CartItem({ onSelect, selectedProducts,setSelectedProducts, onDelete, item, setTotal, total }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [variant, setVariant] = useState(item);
    const [isOpen, setIsOpen] = useState(false);
    const isSelected = (item) => {
        let tmp = [...selectedProducts]
        return tmp.includes(item)
    }
    const navigate = useNavigate();
    // useEffect(() => {
    //     GET("products/" + item.productId).then((data) => {
    //         if (data.code === "OK") {
    //             setPrice(data.result.price);
    //         }
    //     })
    // }, [])
    return (
        <div className="grid grid-cols-8 h-20 items-center font-sans">
            <div className='col-span-3 flex flex-row'>
                <div className="h-fit my-auto ml-1 ">
                    <input className="w-4 h-4" type="checkbox" defaultChecked={isSelected(item)} onChange={(e) => {
                        if (e.target.checked) {
                            setTotal(total + item.price * quantity);
                            onSelect(item.cartItemId);
                        } else {
                            setTotal(total - item.price * quantity);
                            onSelect(item.cartItemId);
                        }

                    }}></input>
                </div>
                <div onClick={() => {
                    navigate(`/product/${item.productId}`)
                }}><img className="w-20 h-20 min-w-20 ml-4" src={item.productImage} alt={item.name} /></div>
                {/* <span className="h-fit grow pl-4">{item.productName}</span> */}
                <div className='overflow-hidden my-auto ml-4'><p
                    className='break-words overflow-hidden max-h-20'>{item.productName}</p></div>
            </div>
            <div className="min-w-40 text-center relative">
                {JSONToData(item.variant)}

            </div>
            <span className="min-w-40 text-center">{item.price.toLocaleString()} đ</span>

            <div className="min-w-40 flex flex-row justify-center">
                <div className='flex flex-row max-h-8 w-fit'>
                    <button className='bg-white  border-gray-300  px-2 border-x-2 border-y-2' onClick={() => {
                        if (quantity > 1) {
                            PUT(`cart/items/${item.cartItemId}?quantity=${- 1}`).
                                then((data) => {
                                    if (data.code === "OK") {
                                        setQuantity(quantity - 1);
                                        let tmp = JSON.parse(JSON.stringify(selectedProducts))
                                        for(let i = 0; i < tmp.length; i++){
                                            for(let j = 0; j < tmp[i].cartItems.length; j++){
                                                if(tmp[i].cartItems[j].cartItemId === item.cartItemId){
                                                    tmp[i].cartItems[j]["quantity"] = quantity - 1
                                                }
                                            }
                                        }
                                        setSelectedProducts(tmp)
                                        if (item.isSelected) {
                                            setTotal(total - item.price);
                                        }

                                    }
                                })

                        }
                    }
                    }>-
                    </button>
                    <div className='min-w-16 text-center border-gray-300 border-y-2'><span>{quantity}</span></div>
                    <button className='bg-white  border-gray-300  px-2 border-x-2 border-y-2' onClick={() => {
                        PUT(`cart/items/${item.cartItemId}?quantity=${1}`).
                            then((data) => {
                                if (data.code === "OK") {
                                    setQuantity(quantity + 1);
                                    let tmp = JSON.parse(JSON.stringify(selectedProducts))
                                        for(let i = 0; i < tmp.length; i++){
                                            for(let j = 0; j < tmp[i].cartItems.length; j++){
                                                if(tmp[i].cartItems[j].cartItemId === item.cartItemId){
                                                    tmp[i].cartItems[j]["quantity"] = quantity + 1
                                                }
                                            }
                                        }
                                        setSelectedProducts(tmp)
                                    if (item.isSelected) setTotal(total + item.price);
                                }

                            })
                    }}>+
                    </button>
                </div>
            </div>
            <span className="min-w-40 text-center ">{(item.price * quantity).toLocaleString()} đ</span>
            <div className='min-w-40 text-center'>
                <button onClick={() => {
                    onDelete(item.cartItemId);
                    isSelected(item) && setTotal(total - item.price * quantity)
                }} className="text-center color-black hover:text-red">Delete
                </button>
            </div>
        </div>
    )
}