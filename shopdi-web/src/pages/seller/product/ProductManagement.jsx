import React from 'react'
import ProductList from '@/components/Seller/product/ProductList'
import Filter from '@/components/Seller/product/Filter'
import shopdiLogo from '@/assets/images/shopdi_logo.jpeg'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GET } from '@/api/GET'
export default function ProductManagement() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageParams = query.get('page');
    let pageUrl = ''
    if(pageParams!==null){
      pageUrl = `?page=${pageParams}`
    }
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    GET("seller/my-products"+pageUrl).then((data) => {
      setProducts(data.result?.items)
      console.log(products)
      console.log(data)
      setIsLoading(false)
    })
  }, [])
    return (
        <div>
            <Filter>
                <ProductList products={products}/>
            </Filter>
        </div>
    )
}