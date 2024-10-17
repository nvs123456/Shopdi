import React from 'react'
import ProductList from '../components/buyer/ProductList'
import Navigation from '../components/Navigation/Navigation'
import shopdiLogo from '../assets/images/shopdi_logo.jpeg';
import Filter from '../components/buyer/Filter';
const HomePage = () => {
  let product = {
    id: 0,
    name: "Product 1",
    image: shopdiLogo,
    rating: 3.5,
    sold: 100,
    price: 100
  };
  let product_tmp = [];
  for (let i = 0; i < 10; i++) {
    let tmp = { ...product };
    tmp.id = i;
    product_tmp.push(tmp);
  }
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div> 
        <Filter products={product_tmp}/>
      </div>

    </div>
  )
}

export default HomePage