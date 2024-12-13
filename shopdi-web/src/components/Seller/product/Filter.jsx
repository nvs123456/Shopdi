import React, { useEffect, useState, useContext } from "react";


export default function Filter({ allProducts, setProducts }) {
    const [sortBy, setSortBy] = useState(null)
    const [filterByCategory, setFilterByCategory] = useState(null)
    const [filterByRating, setFilterByRating] = useState(null)
    const filterAndSort = (filterByCategory, filterByRating, sortBy) => {
        let filteredProducts = allProducts.filter((item) => {

            return (!((filterByCategory !== null && item.categoryId !== filterByCategory) ||
                (filterByRating !== null && item.rating !== filterByRating)))

        })
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
    return (
        <div className="bg-white border-[1px]">
            <div className="hidden lg:block min-h-screen pt-4 px-4">
                <SortFilter sortBy={sortBy} setSortBy={onSetSortBy} />
                <CategoryFilter allProducts={allProducts} filterByCategory={filterByCategory} setFilterByCategory={onSetFilterByCategory} />
                <StarFilter filterByRating={filterByRating} setFilterByRating={onSetFilterByRating} />
            </div>
        </div>
    )
}

function CategoryFilter({ allProducts, filterByCategory, setFilterByCategory }) {
    let [isOpen, setIsOpen] = useState(true);
    const categories = []
    for (let i = 0; i < allProducts.length; i++) {
        if(categories.find((item) => item.id === allProducts[i].categoryId) === undefined)
        categories.push({ name: allProducts[i].category, id: allProducts[i].categoryId })
    }
    const set = (value) => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button onClick={set} type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                    <span className="font-medium text-gray-900 text-[18px]">Categories</span>
                    <span className="ml-6 flex items-center">
                        {isOpen ?
                            (<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                            </svg>) :
                            (<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>)}
                    </span>
                </button>
            </h3>
            {/* <!-- Filter section, show/hide based on section state. --> */}
            {isOpen &&
                (<div className="pt-6" id="filter-section-0">
                    <div className="space-y-4">
                        {categories.map((item, index) =>
                            <div key={item.name} className="flex items-center">
                                <input id={`${item.id}`}
                                    checked={filterByCategory === item.id}
                                    onChange={(e) => {
                                        setFilterByCategory(item.id)
                                    }
                                    }
                                    name={"category"} value={item.id} type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor={`${item.id}`} className="ml-3 text-sm text-gray-600 pr-4">{item.name}</label>
                            </div>
                        )}
                    </div>
                </div>)
            }
        </div>
    )
}
function StarFilter({ filterByRating, setFilterByRating }) {
    let [isOpen, setIsOpen] = useState(true);
    const set = (value) => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button onClick={set} type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                    <span className="font-medium text-gray-900  text-[18px]">Rating</span>
                    <span className="ml-6 flex items-center">
                        {isOpen ?
                            (<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                            </svg>) :
                            (<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>)}
                    </span>
                </button>
            </h3>
            {/* <!-- Filter section, show/hide based on section state. --> */}
            {isOpen &&
                (<div className="mt-4" id="filter-section-0">
                    <div className="">
                        {[1, 2, 3, 4, 5].map((item, index) =>
                            <div key={item} className="flex items-center">
                                <input id={`${item}`}
                                    checked={filterByRating === item}
                                    onChange={(e) => {
                                        setFilterByRating(item)
                                    }}
                                    name={"star"} value={item} type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor={`${item}`} className="ml-3 text-sm text-gray-600">
                                    <div>
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <span key={i} className={i <= item ? "text-yellow-400 text-xl" : "text-xl text-gray-400"}>★</span>
                                        ))}
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>
                </div>)
            }
        </div>
    )
}
function SortFilter({ sortBy, setSortBy }) {
    const Order = Object.freeze({
        asc: -1,
        desc: 1
    })
    let [isOpen, setIsOpen] = useState(true);

    const data = [
        {
            id: 1,
            name: "Price Low to High",
            order: Order.asc,
            sortBy: "price"
        },
        {
            id: 2,
            name: "Price High to Low",
            order: Order.desc,
            sortBy: "price"
        },
        {
            id: 3,
            name: "Most Popular",
            order: Order.desc,
            sortBy: "soldQuantity"
        }, {
            id: 4,
            name: "New Arrivals",
            order: Order.desc,
            sortBy: "createdAt"
        }, {
            id: 5,
            name: "Top Rated",
            order: Order.desc,
            sortBy: "rating"
        }
    ]
    const set = (value) => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="border-b border-gray-200 pb-6 pt-2">
            <h3 className="-my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button onClick={set} type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                    <span className="font-medium text-gray-900 text-[18px]">Sort</span>
                    <span className="ml-6 flex items-center">
                        {isOpen ?
                            (<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                            </svg>) :
                            (<svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>)}
                    </span>
                </button>
            </h3>
            {/* <!-- Filter section, show/hide based on section state. --> */}
            {isOpen &&
                (<div className="space-y-4 mt-6" id="filter-section-0">
                    <div className="space-y-4">
                        {
                            data.map((item, index) =>
                                <div key={item.id} className="flex items-center">
                                    <input id={`${item.id}`}
                                        checked={sortBy && sortBy.sortBy === item.sortBy && sortBy.order === item.order}
                                        onChange={(e) => {
                                            setSortBy({ sortBy: item.sortBy, order: item.order })
                                        }}
                                        name={"sort"} value={item.id} type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor={`${item.id}`} className="ml-3 text-sm text-gray-600 pr-4">
                                        {item.name}
                                    </label>
                                </div>
                            )
                        }
                    </div>
                </div>)
            }
        </div>
    )
}

