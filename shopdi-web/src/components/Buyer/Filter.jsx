import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Filter({ categories }) {

    return (
        <div className="bg-white border-b border-r-2 shadow border-gray-200">
            <div className="hidden lg:block min-h-screen pt-6 px-4">
                <SortFilter />
                <CategoryFilter categories={categories} />
            </div>
        </div>
    )
}

function CategoryFilter({ categories }) {
    let [isOpen, setIsOpen] = useState(true);
    categories.childCategories.sort((a, b) => a.id - b.id)

    const set = (value) => {
        setIsOpen(!isOpen);
    }
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const buildUrl = (categoryId) => {
        const params = new URLSearchParams(location.search);
        if (params.has("category")) {
            params.set("category", encodeURI(categoryId))
            return location.pathname + `?${params.toString()}`
        }
        if (location.search === '') {
            return location.pathname + `?category=${encodeURI(categoryId)}`
        } else {
            return location.pathname + `${location.search}&category=${encodeURI(categoryId)}`
        }
    }
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
function SortFilter({ sortBy, setSortBy }) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const sortByParam = params.get("sortBy");
    const orderParam = params.get("sortOrder");
    const Order = Object.freeze({
        asc: -1,
        desc: 1
    })
    let [isOpen, setIsOpen] = useState(true);

    const data = [
        {
            id: 1,
            name: "Price Low to High",
            order: "asc",
            sortBy: "price"
        },
        {
            id: 2,
            name: "Price High to Low",
            order: "desc",
            sortBy: "price"
        },
        {
            id: 3,
            name: "Most Popular",
            order: "desc",
            sortBy: "soldQuantity"
        }, {
            id: 4,
            name: "New Arrivals",
            order: "desc",
            sortBy: "createdAt"
        }
    ]
    const set = (value) => {
        setIsOpen(!isOpen);
    }
    const buildUrl = (sortBy, order) => {
        const params = new URLSearchParams(location.search);
        if (params.has("sortBy")) {
            params.set("sortBy", encodeURI(sortBy))
            params.set("sortOrder", encodeURI(order))
            return location.pathname + `?${params.toString()}`
        }
        if (location.search === '') {
            return location.pathname + `?sortBy=${encodeURI(sortBy)}&sortOrder=${encodeURI(order)}`
        } else {
            return location.pathname + `${location.search}&sortBy=${encodeURI(sortBy)}&sortOrder=${encodeURI(order)}`
        }
    }
    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button onClick={set} type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                    <span className="font-medium text-gray-900">Sort</span>
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
                (<div className="space-y-4" id="filter-section-0">
                    <div className="space-y-4">
                        {
                            data.map((item, index) =>
                                <div key={item.id} className="flex items-center">
                                    <Link to={buildUrl(item.sortBy, item.order)}>
                                        <input id={`${item.id}`}
                                            checked={sortByParam == item.sortBy && orderParam == item.order}
                                            onChange={(e) => {
                                                setSortBy({ sortBy: item.sortBy, order: item.order })
                                            }}
                                            name={"sort"} value={item.id} type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                        <label htmlFor={`${item.id}`} className="ml-3 text-sm text-gray-600">
                                            {item.name}
                                        </label>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>)
            }
        </div>
    )
}


