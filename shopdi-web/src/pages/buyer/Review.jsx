import React from 'react';
import {Textarea} from "@headlessui/react";
import FiveStar from '../../components/Buyer/Review/FiveStar.jsx'

function Review() {
    return (
        <div className='h-96 w-96 mx-auto border-2 border-[#E4E7E9] rounded bg-white font-sans'>
            <div className='flex items-center justify-between border-2 border-[#E4E7E9] rounded p-4 m-4'>
                <h1 className='text-l font-sans'>BILLING ADDRESS</h1>
            </div>
            <div className='h-4/6 m-4 text-lg'>
                <div>
                    <h2 className='text-sm'>Rating</h2>
                    <div className="flex items-center mb-5">
                        <FiveStar/>
                    </div>

                    <h2 className='text-sm font-sans'>Feedback</h2>
                    <div className='border-2 border-[#E4E7E9] mb-4'>
                        <Textarea className='w-full h-28'
                                  placeholder={"Write down your feedback about our product & services"}></Textarea>
                    </div>
                </div>
                <div className='flex justify-between  mx-auto'>
                    <button className='bg-[#FA8232] rounded text-white h-10 text-sm p-2 font-bold font-sans'>
                        PUBLISH REVIEW
                    </button>
                    <button className='bg-[#FA8232] rounded text-white h-10 text-sm p-2 font-bold font-sans'>
                        REVIEW LATER
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Review;