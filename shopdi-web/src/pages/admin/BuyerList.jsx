import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UETLogo from "/src/assets/images/UETLogo.png";
import {keyframes} from "@emotion/react";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import {TabList} from "@mui/lab";
import {Tab} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import OrderTable from "../../components/Seller/order/OrderTable.jsx";
import Pagination from "@mui/material/Pagination";
import BuyerCard from "./BuyerCard.jsx";

const tabHeadings = ['All', 'Active', 'Blocked'];


const SellerList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idCard, setIdCard] = useState(null);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // Lấy dữ liệu từ API
        axios.get('http://localhost:8080/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }



    return (
        <div>
            <h1 className="text-xl font-bold font-sans mb-4">Customers</h1>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider', marginLeft: '60px'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {tabHeadings.map((tabHeading, index) => (<Tab
                                key={index}
                                label={tabHeading}
                                value={(index + 1).toString()}
                                sx={{
                                    color: 'gray', fontSize: '16px', fontWeight: 'normal', '&.Mui-selected': {
                                        color: tabHeading === 'All' ? 'darkblue' : tabHeading === 'Active' ? '#74DD7B' : '#F57E77',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        position: 'relative',
                                    },
                                }}
                            />
                        ))}

                    </TabList>
                </Box>
                <TabPanel value="1"><BuyerCard status={'All'}/></TabPanel>
                <TabPanel value="2"><BuyerCard status={'ACTIVE'}/></TabPanel>
                <TabPanel value="3"><BuyerCard status={'BLOCKED'}/></TabPanel>

            </TabContext>
            <div className="flex justify-center m-4">
                <Pagination/>
            </div>

        </div>
    );
};

export default SellerList;
