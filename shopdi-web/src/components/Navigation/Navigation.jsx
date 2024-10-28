import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import shopdiLogo from '@/assets/images/Shopdi2.jpg';
import AccountMenu from './AccountMenu/AccountMenu';
import CATEGORIES from '@/data/categories_data';
import { Link } from 'react-router-dom';
const categories = CATEGORIES.CATEGORIES

export default function Navigation(props) {

  return (
    <div className="bg-white">
      <header className="relative">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className=" border-gray-200">
            <div className="flex h-16 items-center">

              {/* Logo */}
              <div className="mr-11 flex lg:ml-0">
                <a href="/" onClick={() => {
                  props.setCurrentCategory({name:"",sub_categories:[]});
                  props.setIsFiltered(false);
                }}>
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
                      <PopoverButton className="relative z-10 -mb-px outline-none flex items-center border-b-2  border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                        Categories<svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </PopoverButton>
                    </div>


                    <PopoverPanel
                      transition
                      className="absolute z-15 inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {/* <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" /> */}

                      <div className="relative bg-white z-14">
                        <div className="mx-auto max-w-7xl px-8">
                          <div className="inset-y-0 grid gap-x-8 gap-y-10 py-16">

                            <div className="row-start-1 grid grid-cols-6 gap-x-8 gap-y-10 text-sm">
                              {categories.map((section) => (
                                <Link to={`/${section.name}`}>
                                <div key={section.name}>
                                  <p id={`${section.name}-heading`} onClick={() => {
                                    props.setCurrentCategory({name:section.name,sub_categories:section.sub_categories});
                                    props.setIsFiltered(true)
                                  }} className="font-medium hover:text-gray-800">
                                    {section.name}
                                  </p>
                                </div>
                                </Link>
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
                  <a href="/cart" className="group -m-2 flex items-center p-2">
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