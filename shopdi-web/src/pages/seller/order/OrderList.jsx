import React, {useEffect, useState} from 'react';
import {Tab} from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Box from "@mui/material/Box";
import {TabList} from "@mui/lab";
import OrderTable from "../../../components/Seller/order/OrderTable.jsx";
import Pagination from "../../../components/Navigation/Pagination.jsx";
import axios from "axios";


const tabHeadings = ['All products', 'Pending', 'Processing', 'Delivered', 'Cancelled'];

const OrderList = () => {
    const [value, setValue] = React.useState('1');
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="h-full p-6 w-full bg-white shadow-md rounded-lg font-sans text-[16px]">
            <h2 className="text-2xl font-semibold mb-4">Overall Order</h2>
            <div className="pb-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div
                        className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search"
                           className="block ps-8 text-[16px] text-gray-900 border rounded w-60 h-6 bg-gray-50 focus:border-gray-400 "
                           placeholder="Search for items"/>
                </div>
            </div>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {tabHeadings.map((tabHeading, index) => (<Tab
                                key={index}
                                label={tabHeading}
                                value={(index + 1).toString()}
                                sx={{
                                    color: 'gray', fontSize: '16px', fontWeight: 'normal', '&.Mui-selected': {
                                        color: tabHeading === 'All products' ? 'darkblue' : tabHeading === 'Pending' ? '#ebd76e' : tabHeading === 'Processing' ? '#74DD7B' : tabHeading === 'Delivered' ? '#3A5BFF' : '#F57E77',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        position: 'relative',
                                    },
                                }}
                            />
                        ))}

                    </TabList>
                </Box>
                <TabPanel value="1"><OrderTable type='All products'/></TabPanel>
                <TabPanel value="2"><OrderTable type='PENDING'/></TabPanel>
                <TabPanel value="3"><OrderTable type='PROCESSING'/></TabPanel>
                <TabPanel value="4"><OrderTable type='DELIVERED'/></TabPanel>
                <TabPanel value="5"><OrderTable type='CANCELLED'/></TabPanel>

            </TabContext>

        </div>);
};

export default OrderList;
