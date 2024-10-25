import React from 'react';
import { styled } from "@mui/material/styles"; 

import { Stepper, Step, StepLabel, Typography, Button } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import StepConnector, { stepConnectorClasses, } from "@mui/material/StepConnector"; 

const steps = ['Order Placed', 'Packaging', 'On The Road', 'Delivered'];
const icons = [<InventoryOutlinedIcon />, <EmailOutlinedIcon />, <LocalShippingOutlinedIcon />, <HandshakeOutlinedIcon />];
const activeStep = 2;
const data = [
    ['PRODUCTS', 'PRICE', 'QUANTITY', 'SUB-TOTAL'],
    ['Data Adidas Mens Restound M Running Shoe', '$1699', 'x1', '$1733.99'],
    ['Data 4', 'Data 5', 'Data 6', 'Data 7'],
    // Add more rows as needed
];

const CustomisedConnector = styled(StepConnector)(({ theme }) => ({ 
    [`&.${stepConnectorClasses.active}`]: { 
        [`& .${stepConnectorClasses.line}`]: { 
            backgroundColor: "#FA8232", 
        }, 
    }, 
    [`&.${stepConnectorClasses.completed}`]: { 
        [`& .${stepConnectorClasses.line}`]: { 
            backgroundColor: "#FA8232", 
        }, 
    }, 
    [`& .${stepConnectorClasses.line}`]: { 
        height: 10, 
        border: "20px", 
        backgroundColor: "#FFE7D6", 
        borderRadius: 1, 
    }, 
})); 

const OrderDetails = () => {
  return (
    <div className="bg-[#F7FBFF] max-h-full">
      <div className="container mx-auto p-0  h-5/6 my-10 bg-white w-5/6 border-collapse">
        {/* heading section */}
        <div className="flex justify-between items-center border-2 h-10 mb-6 px-4">
            <div className="flex items-center">
                <ArrowBackIcon className="text-black" />
                <Button><span className='text-black'>Order Details</span></Button>
            </div>
            <Button><span className='text-[#FA8232]'>Leave a Rating</span></Button>
        </div>
        {/* Order Details Section */}
        <div className="bg-[#FDFAE7] border-2 border-[#F7E99E] p-6 w-5/6 mb-6 ml-20 border-collapse">
          <div className="flex justify-between items-center">
            <Typography variant="h6" component="h2">
              Order #96459761
            </Typography>
            <Typography variant="h6" component="h2" color="primary">
              $1736.99
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary">
            Order placed on 17 Jan, 2021 at 7:32 PM
          </Typography>
        </div>
        <div className='ml-20'>
            <Typography className='ml-20' variant="body2" color="textSecondary">
                Order expected arrival: <strong>23 Jun, 2021</strong>
            </Typography>
        </div>
        
        {/* Stepper for Order Status */}
        <div className="bg-white border-b-2 p-6 mb-6 border-collapse">
          <Stepper activeStep={activeStep} alternativeLabel connector={<CustomisedConnector />}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      color: index < activeStep ? '#FF731D' : '#FFFFFF', // Color for completed steps
                      border: '4px solid #FF731D', // Border color
                      borderRadius: '50%', // Optional: make the border circular
                      '&.Mui-active': {
                        color: '#FF731D', // Color for the current step
                        
                      },
                      '&.Mui-completed': {
                        color: '#FF731D', // Color for completed steps
                      },
                      '&.Mui-incompleted': {
                        color: '#FF731D', // Color for incompleted steps
                      },
                      '& .MuiStepIcon-text': {
                        fill: 'transparent', // Change color of the step number text
                      },
                    },
                  }}
                  
                >
                  {label}
                  <span className="flex justify-center mt-2">
                    {React.cloneElement(icons[index], {
                      style: {
                        fontSize: '60px',
                        color: index === activeStep ? '#FF731D' : index < activeStep ? '#2DB224' : '#FF8800',
                      },
                    })}
                  </span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        {/* Order Activity Section */}
        <div className="bg-white border-b-2 p-6 pt-0">
          <Typography variant="h6" component="h2" className="mb-4 pb-4">
            Order Activity
          </Typography>
          <div>
            <ul className="text-sm space-y-4">
                <li className='flex flex-row items-center'>
                    <div className='flex justify-center items-center border-2 bg-[#EAF7E9] border-[#D5F0D3] size-10 '>
                        <DoneAllIcon className='text-[#2DB224]'/>
                    </div>
                    
                    <div className='px-3'> 
                        <div>
                            <span> Your order has been delivered. Thank you for shopping at Clicon! </span>
                        </div>
                        <div>
                            23 Jun, 2021
                        </div>
                    </div>
                </li>
                <li className='flex flex-row items-center'>
                    <div className='flex justify-center items-center border-2 bg-[#EAF6FE] border-[#D5EDFD] size-10 '>
                        <PersonOutlineOutlinedIcon className='text-[#2DA5F3]'/>
                    </div>
                    
                    <div className='px-3'> 
                        <div>
                            <span> Our delivery man John Wick has picked up your order. </span>
                        </div>
                        <div>
                            23 Jun, 2021
                        </div>
                    </div>
                </li>
                <li className='flex flex-row items-center'>
                    <div className='flex justify-center items-center border-2 bg-[#EAF6FE] border-[#D5EDFD] size-10 '>
                        <LocationOnOutlinedIcon className='text-[#2DA5F3]'/>
                    </div>
                    
                    <div className='px-3'> 
                        <div>
                            <span> Your order has reached the last mile hub. </span>
                        </div>
                        <div>
                            21 Jun, 2021
                        </div>
                    </div>
                </li>
                <li className='flex flex-row items-center'>
                    <div className='flex justify-center items-center border-2 bg-[#EAF6FE] border-[#D5EDFD] size-10 '>
                        <MapOutlinedIcon className='text-[#2DA5F3]'/>
                    </div>
                    
                    <div className='px-3'> 
                        <div>
                            <span> Your order is on the way to the last mile hub. </span>
                        </div>
                        <div>
                            21 Jun, 2021
                        </div>
                    </div>
                </li>
                <li className='flex flex-row items-center'>
                    <div className='flex justify-center items-center border-2 bg-[#EAF7E9] border-[#D5F0D3] size-10 '>
                        <CheckCircleOutlinedIcon className='text-[#2DB224]'/>
                    </div>
                    
                    <div className='px-3'> 
                        <div>
                            <span> Your order is successfully verified.</span>
                        </div>
                        <div>
                            20 Jun, 2021
                        </div>
                    </div>
                </li>
                <li className='flex flex-row items-center'>
                    <div className='flex justify-center items-center border-2 bg-[#EAF6FE] border-[#D5EDFD] size-10 '>
                        <EventNoteOutlinedIcon className='text-[#2DA5F3]'/>
                    </div>
                    
                    <div className='px-3'> 
                        <div>
                            <span>Your order has been confirmed. </span>
                        </div>
                        <div>
                            19 Jun, 2021
                        </div>
                    </div>
                </li>
            </ul>
          </div>
          
        </div>

        {/* Product Section */}
        <div className="bg-white border-b-2 p-6">
          <Typography variant="h6" component="h2" className="mb-4">
            Product {(data.length-1)}
          </Typography>
          <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            {data[0].map((header, index) => (
              <th key={index} className=" bg-[#F2F4F5] border-t border-b border-[#E4E7E9] p-1 text-left font-small">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-t border-b border-[#E4E7E9] p-6 text-left">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
          </table>
        </div>

        {/* Billing and Shipping Section */}
        <div className="bg-white border-b-2 p-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Typography variant="h6" className='pb-4'>Billing Address</Typography>
              <Typography variant="body2" className='pb-2'>Kevin Gilbert </Typography>
              <Typography variant="body2" className='text-[#5F6C72]'>
                East Tejturi Bazar, Ward No. 04, Road No. 15, <br />
                Dhaka-1208, Bangladesh <br />
                Phone Number: +202-555-0118 <br />
                Email: kevin.gilbert@gmail.com
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className='pb-4'>Shipping Address</Typography>
              <Typography variant="body2" className='pb-2'>Kevin Gilbert </Typography>
              <Typography variant="body2" className='text-[#5F6C72]'>
                East Tejturi Bazar, Ward No. 04, Road No. 15, <br />
                Dhaka-1208, Bangladesh <br />
                Phone Number: +202-555-0118 <br />
                Email: kevin.gilbert@gmail.com
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className='pb-4'>Order Notes</Typography>
              <Typography variant="body2" className='text-[#5F6C72]'>
                Some notes about the order such as special delivery instructions or other information.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;