import React from 'react';
import {Textarea} from "@headlessui/react";
import FiveStar from '../../components/Buyer/Review/FiveStar.jsx'
import hiddenCssClasses from "@mui/material/Hidden/hiddenCssClasses.js";
import axios from "axios";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading.jsx";

function Review({isModalOpen,setIsModalOpen, productId}) {
    const [review, setReview] = React.useState({rating: 5, review: ''});
    const [isAPICalling, setIsAPICalling] = React.useState(false);
    const postReview = async () => {
        await axios.post(`http://localhost:8080/reviews/product/${productId}`,
            {
                rating: review.rating,
                review: review.review
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                }
            })
            .then(response => {
                console.log(response.data);
                setIsModalOpen(false);
            })
            .catch(error => {
                console.log(error);
            });
    }
    function handlePublishReview() {
        setIsAPICalling(true);
        postReview();
        setIsAPICalling(false);
    }

    return (
        <div className={`${isModalOpen ? '':'hidden' }max-h-80 w-60 md:h-full md:w-[400px] fixed top-40 lg:left-[30%] left-[7%] xl:top-[25%] xl:left-[40%] z-10 mx-auto mb-2 border-2 border-[#E4E7E9] rounded bg-white font-sans`}>
            <div className='flex items-center justify-between border-2 border-[#E4E7E9] rounded p-2 m-2'>
                <h1 className='text-[14px] md:text-[16px] font-sans'>BILLING ADDRESS</h1>
            </div>
            <div className='h-4/6 m-1 md:m-2 text-[14px]'>
                <div>
                    <h2 className='text-[14px] font-bold'>Rating</h2>
                    <div className="flex items-center mb-1 md:mb-5">
                        <FiveStar review={review} setReview={setReview}/>
                    </div>

                    <h2 className='text-[14px] font-bold font-sans'>Feedback</h2>
                    <div className='border-2 border-[#E4E7E9] mb-4'>
                        <Textarea className='w-full h-14 md:h-28'
                                  onChange={(e) => setReview({...review, review: e.target.value})}
                                  placeholder={"Write down your feedback about our product & services"}>
                        </Textarea>
                    </div>
                </div>
                <div className='flex justify-around  mx-auto'>
                    <button onClick={() => handlePublishReview()}
                        className='flex bg-[#FA8232] rounded-sm text-white h-6 w-24 md:w-28 md:h-8 text-[14px] p-1 md:p-2 font-bold font-sans hover:bg-orangeRed'>
                        {isAPICalling && <SpinnerLoading size={1}/>}
                        <span>PUBLISH REVIEW</span>
                    </button>
                    <button onClick={() => setIsModalOpen(false)} className='bg-[#FA8232] rounded-sm text-white h-6 w-24 md:w-28 md:h-8 text-[14px] p-1 md:p-2 font-bold font-sans hover:bg-orangeRed'>
                        REVIEW LATER
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Review;