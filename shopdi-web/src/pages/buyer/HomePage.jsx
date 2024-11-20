import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation.jsx";
import { Route, Routes } from "react-router-dom";
import ProductList from "../../components/Buyer/ProductList.jsx";
import Filter from "../../components/Buyer/Filter.jsx";
import ProductDetail from "./ProductDetail.jsx";
import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
import Cart from "../../components/Buyer/Cart.jsx";
import { GET } from "@/api/GET";
const HomePage = () => {
  // let product = {
  //   id: 0,
  //   name: "Product 1",
  //   image: shopdiLogo,
  //   rating: 3.5,
  //   sold: 100,
  //   price: 100
  // };
  // let product_tmp = [];
  // for (let i = 0; i < 10; i++) {
  //   let tmp = { ...product };
  //   tmp.id = i;
  //   tmp.name = "Product " + (i + 1);
  //   tmp.rating = Math.random() * 5;
  //   tmp.sold = Math.floor(Math.random() * 1000);
  //   tmp.price = Math.floor(Math.random() * 1000000);
  //   product_tmp.push(tmp);
  // }
  const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageParams = query.get('page');
    let pageUrl = ''
    if(pageParams!==null){
      pageUrl = `?page=${pageParams}`
    }
  const [product_tmp, setProduct_tmp] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    GET("products"+pageUrl).then((data) => {
      setProduct_tmp(data.result?.items)
      setIsLoading(false)
    },[])
    
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<div className='flex flex-col justify-center'>
          <ProductList products={product_tmp} />
        </div>} />
        <Route path="/:category" element={
          <div>
            <Filter>
              <ProductList products={product_tmp} />

            </Filter>
          </div>} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>


    </div>
  )
}

export default HomePage