import React, { useEffect, useState, useContext } from "react";
import ProductList from "./ProductList.jsx";
import { useLocation } from "react-router-dom";
import CATEGORIES from '@/data/categories_data';
import { GET } from '@/api/GET'
import { Link } from "react-router-dom";
import { CategoryContext } from "@/pages/buyer/CategoryContext.js";

export default function Filter({ allProducts }) {

    return (
        <div className="bg-white">
            <div className="hidden lg:block min-h-screen pt-6 px-4">
                {/* <CategoryFilter categories={categories} /> */}
            </div>
        </div>
    )
}

function CategoryFilter({ allProducts }) {
    let [isOpen, setIsOpen] = useState(true);
    categories.childCategories.sort((a, b) => a.id - b.id)

    const set = (value) => {
        setIsOpen(!isOpen);
    }
    // const location = useLocation();
    // const params = new URLSearchParams(location.search);
    // const buildUrl = (categoryId) => {
    //     const params = new URLSearchParams(location.search);
    //     if (params.has("category")) {
    //         params.set("category", encodeURI(categoryId))
    //         return location.pathname + `?${params.toString()}`
    //     }
    //     if (location.search === '') {
    //         return location.pathname + `?category=${encodeURI(categoryId)}`
    //     } else {
    //         return location.pathname + `${location.search}&category=${encodeURI(categoryId)}`
    //     }
    // }
    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button onClick={set} type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                    <span className="font-medium text-gray-900">{categories.name}</span>
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
                        {categories.childCategories.map((item, index) =>
                            <div key={item.name} className="flex items-center">
                                <Link to={buildUrl(item.id)}>
                                    <input id={`${index}`}
                                        checked={params.get("category") == item.id}
                                        name={"category"} value={item.name} type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor={`${index}`} className="ml-3 text-sm text-gray-600">{item.name}</label>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>)
            }
        </div>
    )
}

