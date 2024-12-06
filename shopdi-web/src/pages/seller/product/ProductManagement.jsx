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
      <div className="flex flex-row pt-4 gap-x-8 p-4 bg-cloudBlue">
        <div className='rounded min-w-[270px] max-w-[270px] bg-white p-4'><Filter allProducts={allProducts} setProducts={setProducts}
        /></div>
        <div className='rounded bg-white p-4 grow'>
          <ProductList products={products} page={page} />
        </div>


      </div>
    )
  }
}
