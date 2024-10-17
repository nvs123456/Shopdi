import { Fragment, useState } from 'react'
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import shopdiLogo from '../../assets/images/Shopdi2.jpg';
import AccountMenu from './AccountMenu/AccountMenu';
import CATEGORIES  from '../../data/categories_data';
const navigation = {
  categories: [
    {
      id: 'Categories',
      name: 'Categories',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
        {
          id: 'footwear',
          name: 'Footwear',
          items: [
            { name: 'Sneakers', href: '#' },
            { name: 'Boots', href: '#' },
            { name: 'Sandals', href: '#' },
            { name: 'Formal Shoes', href: '#' },
            { name: 'Casual Shoes', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'beauty',
          name: 'Beauty',
          items: [
            { name: 'Skincare', href: '#' },
            { name: 'Makeup', href: '#' },
            { name: 'Haircare', href: '#' },
            { name: 'Fragrances', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'sports',
          name: 'Sports',
          items: [
            { name: 'Fitness Equipment', href: '#' },
            { name: 'Apparel', href: '#' },
            { name: 'Shoes', href: '#' },
            { name: 'Outdoor Gear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Become a Seller', href: '#' },
  ],
}
const categories = CATEGORIES.CATEGORIES
for (let i = 0; i < categories.length; i++) {
  console.log(categories[i].name) 
}
export default function Navigation() {
  return (
    <div className="bg-white">
      <header className="relative">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className=" border-gray-200">
            <div className="flex h-16 items-center">

              {/* Logo */}
              <div className="mr-11 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt="Logo"
                    src={shopdiLogo}
                    className="h-14 w-auto"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden sm:ml-8 sm:block sm:self-stretch">
                <div className="flex h-full space-x-8">
                    <Popover className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2  border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                          Categories
                        </PopoverButton>
                      </div>
                      
                       
                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid gap-x-8 gap-y-10 py-16">

                              <div className="row-start-1 grid grid-cols-6 gap-x-8 gap-y-10 text-sm">
                                {categories.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${section.name}-heading`} className="font-medium hover:text-gray-800">
                                      {section.name}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>


                  <button
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Become a Seller
                  </button>
                </div>
              </PopoverGroup>

              {/* Search */}
              <div className="flex lg:ml-6 border border-gray-200 rounded-xl w-full max-w-60 shadow-md">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                </a>
                <input
                  type="text"
                  className="p-2 w-full outline-none"
                  placeholder="Search..."
                />
              </div>

              <div className="ml-auto flex items-center">
                <a href='#' className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Support
                </a>
                <AccountMenu />
                {/* <ModeSelect />*/}
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}