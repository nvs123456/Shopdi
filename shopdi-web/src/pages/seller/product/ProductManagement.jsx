import React from 'react'
import ProductList from '@/components/Seller/product/ProductList'
import Filter from '@/components/Seller/product/Filter'
import shopdiLogo from '@/assets/images/shopdi_logo.jpeg'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GET } from '@/api/GET'
import CATEGORIES from '@/data/categories_data';
import { POST } from '../../../api/GET';
export default function ProductManagement() {
  const categories = CATEGORIES.CATEGORIES
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageParams = query.get('page');
  let pageUrl = ''
  const [page, setPage] = useState({ pageNo: 0, totalPage: 1 })
  if (pageParams !== null) {
    pageUrl = `?pageNo=${pageParams - 1}`
  }
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    GET("seller/my-products" + pageUrl).then((data) => {
      setProducts(data.result?.items)
      setPage({ pageNo: data.result.pageNo, totalPage: data.result.totalPages })
      setIsLoading(false)

    })
  }, [])
  if (isLoading) return <div className="text-center">Loading...</div>
  else
    return (
      <div className="flex flex-row pt-4">
        <div className=' min-w-[270px] max-w-[270px]'><Filter /></div>
        <div className='grow w-full'>
          <ProductList products={products} page={page} />
        </div>


      </div>
    )
}