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
import SellerCard from "./SellerCard.jsx";
import Pagination from "@mui/material/Pagination";

const tabHeadings = ['All', 'Active', 'Blocked'];

const SellerList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idCard, setIdCard] = useState(null);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={"pl-12 py-12 pr-20"}>
            <h1 className="text-4xl font-bold text-yaleBlue mb-4">Seller Management</h1>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider', marginLeft: '0px'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {tabHeadings.map((tabHeading, index) => (<Tab
                                key={index}
                                label={tabHeading}
                                value={(index + 1).toString()}
                                sx={{
                                    color: 'gray', fontSize: '18px', fontWeight: 'normal', '&.Mui-selected': {
                                        color: tabHeading === 'All' ? 'darkblue' : tabHeading === 'Active' ? '#74DD7B' : '#F57E77',
                                        fontWeight: 'bold',
                                        fontSize: '22px',
                                        position: 'relative',
                                    },
                                }}
                            />
                        ))}

                    </TabList>
                </Box>
                <TabPanel value="1"><SellerCard status={'All'}/></TabPanel>
                <TabPanel value="2"><SellerCard status={'ACTIVE'}/></TabPanel>
                <TabPanel value="3"><SellerCard status={'BLOCKED'}/></TabPanel>

            </TabContext>
            <div className="flex justify-center m-4">
                <Pagination/>
            </div>

        </div>
    );
};

export default SellerList;
