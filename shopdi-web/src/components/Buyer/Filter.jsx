import React, { useState } from "react";
import ProductList from "./ProductList.jsx";
import { useLocation } from "react-router-dom";
import CATEGORIES from '@/data/categories_data';
const categories = CATEGORIES.CATEGORIES

export default function Filter({children, products }) {
    const [isSortOpen, setSortOpen] = useState(false);
    const location = useLocation();
    const currentCategory = decodeURIComponent(location.pathname.split("/")[1]);
    const isValidCategory = (category) => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === category) {
                return true
            }
        }
        return false
    }
    if (isValidCategory(currentCategory)) {
        const category = categories.find((category) => category.name === currentCategory);
        let sub_categories = location.state.sub_categories;
        return (
            <div className="bg-white">
                <main className="mx-auto max-width-20 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{category.name}</h1>
                        <div className="flex items-center">
                            <div className=" inline-block text-left">
                                <div>
                                    <button type="button" onClick={() => setSortOpen(!isSortOpen)} className="hs-dropdown-toggle group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="menu" aria-label="Dropdown">
                                        Sort<svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div id="sort-menu" role="menu" className={`absolute ${isSortOpen ? 'block' : 'hidden'} right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`} aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1" >
                                        <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-0">Most Popular</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex="-1" id="menu-item-1">Best Rating</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex="-1" id="menu-item-2">Newest</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex="-1" id="menu-item-3">Price: Low to High</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex="-1" id="menu-item-4">Price: High to Low</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* cac loai bo loc */}

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* <!-- Filters --> */}
                            <form className="hidden lg:block">
                                {/* <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {category.sub_categories.map(item => <li key={item}><a href="#">{item}</a></li>)}
                                </ul> */}
                                <FilterSection type={currentCategory} values={sub_categories} />
                                <FilterSection type="Brand" values={["Apple", "Samsung", "Google", "Sony"]} />
                                <PriceFilter />
                                <FilterSection type="Rating" values={["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"]} />
                            </form>

                            {/* <!-- Product grid --> */}
                            <div className="lg:col-span-3">
                                {/* <ProductList products={products} /> */}
                                {children}
                            </div>
                        </div>
                    </section>
                </main>

            </div>

        )
    }
    else {
        return (
            <div>
                <h1>Not Found</h1>
            </div>
        )
    }
}
function PriceFilter() {
    let [isOpen, setIsOpen] = useState(false);
    const set = (value) => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }
    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button onClick={set} type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                    <span className="font-medium text-gray-900">Price</span>
                    <span className="ml-6 flex items-center">
                        {isOpen ?
                            (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                            </svg>) :
                            (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>)}
                    </span>
                </button>
            </h3>
            {isOpen &&
                (<div className="pt-6" id="filter-section-1">
                    <div className="text-center">
                        <input onKeyDown={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} className="w-24 border-red border-2" />
                        <span> to </span>
                        <input onKeyDown={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} className="w-24 border-red border-2" />
                    </div>
                    <div className="text-center mt-4">
                        <button className="border-red border-2 rounded-md w-24">Apply</button>
                    </div>
                </div>)
            }
        </div>
    )
}
function FilterSection({ type, values }) {
    let [isOpen, setIsOpen] = useState(false);
    const set = (value) => {
        setIsOpen(!isOpen);
        console.log(isOpen)

    }

    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button onClick={set} type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                    <span className="font-medium text-gray-900">{type}</span>
                    <span className="ml-6 flex items-center">
                        {isOpen ?
                            (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                            </svg>) :
                            (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>)}
                    </span>
                </button>
            </h3>
            {/* <!-- Filter section, show/hide based on section state. --> */}
            {isOpen &&
                (<div className="pt-6" id="filter-section-0">
                    <div className="space-y-4">
                        {values.map((item, index) =>
                            <div key={item} className="flex items-center">
                                <input id={`${index}`} name={item} value="white" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor={`${index}`} className="ml-3 text-sm text-gray-600">{item}</label>
                            </div>
                        )}
                    </div>
                </div>)
            }
        </div>
    )
}
