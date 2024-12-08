import React from "react";
import { useState, useEffect } from "react";
import { GET } from "@/api/GET"
import StarIcon from "@mui/icons-material/Star";
export default function Comments({ productId }) {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        GET(`reviews/product/${productId}`).then((res) => {
            if (res.code === "OK") {
                // res.result.content = [
                //     {
                //         userName: "user1",
                //         review: "this is a review",
                //         ratingScore: 5
                //     },
                //     {
                //         userName: "user2",
                //         review: "this is an another review",
                //         ratingScore: 4
                //     }
                // ]
                setComments(res.result.items)
                setIsLoading(false)
            }
        })
    }, [])

    if (!isLoading) return (
        <div >
            {comments.map((comment) => {
                return (
                    <div key={`${comment.userName}`} className="flex flex-col bg-white p-4 ">
                        <div className="flex items-center mb-4 border-b border-gray-200">
                            {/* <img
                                src={comment.user.avatar}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full mr-2"
                            /> */}
                            <div>
                                <p className="font-semibold">{comment.username}
                                    <span>{stars(comment.ratingScore)}</span>
                                </p>
                                <p className="mt-4 text-gray-600">&emsp;&emsp;{comment.review}</p>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
const stars = (ratingScore) => {
    const tmp = []
    for(let i = 0; i < ratingScore; i++){
        tmp.push(<StarIcon key={`start-${i}`} className="w-4 h-4 inline" style={{color: "yellow",fontSize: "20px"}} />)
    }
    for(let i = 0; i < 5 - ratingScore; i++){
        tmp.push(<StarIcon key={`start-${5-i}`} className="w-4 h-4 inline text-gray-300"style={{fontSize: "20px"}} />)
    }
    return tmp
}