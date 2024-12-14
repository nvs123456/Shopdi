import React from 'react'
import ProductList from '@/components/Seller/product/ProductList'
import Filter from '@/components/Seller/product/Filter'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GET } from '@/api/GET'

export default function ProductManagement() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageParams = query.get('page');
  let pageUrl = ''
  const [page, setPage] = useState({ pageNo: 0, totalPage: 1 })
  if (pageParams !== null) {
    pageUrl = `?pageNo=${pageParams - 1}`
  }
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState(null)
  const [filterByCategory, setFilterByCategory] = useState(null)
  const [filterByRating, setFilterByRating] = useState(null)


  useEffect(() => {
    GET("seller/my-products" + pageUrl).then((data) => {
      setProducts(data.result?.items)
      setPage({ pageNo: data.result.pageNo, totalPage: data.result.totalPages })
      loadAllProducts(data.result.totalPages)
      setIsLoading(false)

    })
  }, [])


  async function loadAllProducts(totalPage) {
    let tmp = []
    for (let i = 0; i < totalPage; i++) {
      await GET("seller/my-products?pageNo=" + i).then((data) => {
        tmp.push(...data.result?.items)
      })
    }
    setAllProducts(tmp)
  }


  const filterAndSort = (filterByCategory, filterByRating, sortBy) => {
    let filteredProducts = allProducts.filter((item) => {

      return (!((filterByCategory !== null && item.categoryId !== filterByCategory) ||
        (filterByRating !== null && item.rating !== filterByRating)))

    })
    console.log(filteredProducts)
    if (sortBy !== null) {
      let sortedProducts = filteredProducts.sort((a, b) => {
        return (a[sortBy.sortBy] - b[sortBy.sortBy]) * sortBy.order
      })
      setProducts(sortedProducts)
    } else {
      setProducts(filteredProducts)
    }
  }
  const onSetFilterByCategory = (categoryId) => {
    setFilterByCategory(categoryId)
    filterAndSort(categoryId, filterByRating, sortBy)
  }
  const onSetFilterByRating = (rating) => {
    setFilterByRating(rating)
    filterAndSort(filterByCategory, rating, sortBy)
  }
  const onSetSortBy = (sortBy) => {
    setSortBy(sortBy)
    filterAndSort(filterByCategory, filterByRating, sortBy)
  }
  
  if (isLoading) return <div className="text-center">Loading...</div>
  else {
    return (
      <div className="flex flex-row gap-x-12 p-12 bg-cloudBlue">
        <div className='rounded min-w-[210px] max-w-[210px] '><Filter allProducts={allProducts} setProducts={setProducts}
        /></div>
        
        <div className=' bg-white p-6 mr-2 grow border-[1px]'>
          <ProductList products={products} page={page} status allProducts={allProducts} setProducts={setProducts} setAllProducts={setAllProducts}/>
        </div>


      </div>
    )
  }
}
