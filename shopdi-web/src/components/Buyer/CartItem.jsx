import React, { useEffect, useState } from 'react'
import { JSONToData } from '@/utils/todo.js';
import { GET, POST } from '../../api/GET.jsx';
export default function CartItem({ onSelect, selectedProducts, onDelete, item, setTotal, total }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [variant, setVariant] = useState(item);
    const [isOpen, setIsOpen] = useState(false);
    const isSelected = (item) => {
        let tmp = [...selectedProducts]
        return tmp.includes(item)
    }
    const [price, setPrice] = useState(item.price);
    useEffect(() => {
        GET("products/" + item.productId).then((data) => {
            if (data.code === "OK") {
                setPrice(data.result.price);
            }
        })
    }, [])
    return (
        <div className="flex flex-row h-20 items-center">
            <div className="h-fit"><input className="w-4 h-4" type="checkbox" defaultChecked={isSelected(item)} onChange={(e) => {
                if (e.target.checked) {
                    setTotal(total + item.price * quantity);
                    onSelect(item);
                } else {
                    setTotal(total - item.price * quantity);
                    onSelect(item);
                }

            }}></input></div>
            <div><img className="w-20 h-20 min-w-20 ml-8" src={item.image} alt={item.name} /></div>
            <span className="h-fit grow">{item.name}</span>
            <div className="flex flex-row w-1/6 relative" >
                <button className="variant-btn h-fit " onClick={() => { setIsOpen(!isOpen) }}>
                    <div className="flex flex-row">{JSONToData(item.variant)}
                        <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>

                {/* <div className={`variants absolute ${isOpen ? 'block' : 'hidden'} p-4 border border-gray-200 right-0 top-4 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                    <Variant  onChangeVariant={onChangeVariant} currentVariant={variant.variant} />
                </div> */}
            </div>
            <span className="w-40 text-center">{price}</span>

            <div className="w-40 flex flex-row justify-center">
                <div className='flex flex-row max-h-8 w-fit'>
                    <button className='bg-white  border-gray-300  px-2 border-x-2 border-y-2' onClick={() => { quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1) ; isSelected(item) && setTotal(total - item.price)}}>-</button>
                    <div className='min-w-16 text-center border-gray-300 border-y-2'><span >{quantity}</span></div>
                    <button className='bg-white  border-gray-300  px-2 border-x-2 border-y-2' onClick={() => { setQuantity(quantity + 1) ; isSelected(item) && setTotal(total + item.price)}}>+</button>
                </div>
            </div>
            <span className="w-40 text-center ">{price * quantity}</span>
            <div className='w-40 text-center'><button onClick={() => { onDelete(item.cartItemId); isSelected(item) && setTotal(total - item.price * quantity) }} className="text-center color-black hover:text-red">Xoa</button></div>
        </div>
    )
}