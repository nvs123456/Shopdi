import {useEffect, useState} from "react";
import axios from "axios";
import defaultImage from "../../../assets/images/profileDefault.png";
export default function  SellerProfile() {
    const [sellerInfo, setSellerInfo] = useState({});
    const [infoUpdated, setInfoUpdated] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSellerInfo = async () => {
        //Fetch seller info from API
        const response = await axios.get('http://localhost:8080/seller/profile', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                "Access-Control-Allow-Origin": "http://localhost:5173",
            },
        });
        const data = response.data;
        if (data.code === "OK") {
            setSellerInfo(data.result);
        } else {
            setError("Failed to fetch seller info.");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSellerInfo();
    }, []);

    function handleUpdateInfo() {
        console.log(sellerInfo);
        //Update seller info
        axios.put('http://localhost:8080/seller/profile', sellerInfo, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                "Access-Control-Allow-Origin": "http://localhost:5173",
            },
        }).then(response => {
            const data = response.data;
            if (data.code === "OK") {
                alert("Update successful");
            } else {
                alert("Failed to update seller info.");
            }
        }).catch(err => {
            alert("Error while updating data. Please try again later.");
        }).finally(() => {
            fetchSellerInfo();
        })
    }

    return (
        <div className="min-h-screen flex flex-col items-center font-sans text-sm">
            <h1 className="text-3xl font-semibold mt-10">EditProfile</h1>
            <div className="bg-white w-full max-w-4xl rounded-lg mb-10 mt-10">
                {/* EditProfile Picture and Name */}
                <div className="bg-gradient-to-b from-blue-300 rounded-t-lg to-blue-50 flex flex-col items-center">
                    <div className="relative mt-2 border-2 rounded-full p-1 w-20 h-20">
                        <img
                            src={sellerInfo.profileImage || defaultImage} // replace with actual image path
                            alt="EditProfile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold">{sellerInfo.username}</h2>
                    <p className="text-gray-500">Owner & Founder</p>
                </div>

                {/* Business Info Section */}
                <div className="mt-8 p-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Business info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Business/shop name</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                defaultValue={sellerInfo.shopName}
                                onChange={(e) => setSellerInfo({...sellerInfo, shopName: e.target.value})}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                defaultValue={sellerInfo.email}
                                onChange={(e) => setSellerInfo({...sellerInfo, email: e.target.value})}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Contact no.</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                defaultValue={sellerInfo.contactNumber}
                                onChange={(e) => setSellerInfo({...sellerInfo, contactNumber: e.target.value})}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                defaultValue={sellerInfo.location}
                                onChange={(e) => setSellerInfo({...sellerInfo, location: e.target.value})}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Logo</label>
                            <div
                                className="h-[300px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mt-1">
                                <span className="text-gray-500">Logo here</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">About</label>
                            <textarea
                                className="h-[300px] border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                rows="3"
                                defaultValue={sellerInfo.about || ""}
                                onChange={(e) => setSellerInfo({...sellerInfo, about: e.target.value})}
                            />
                        </div>
                    </div>
                    {/* Save Changes Button */}
                    <div className="flex justify-end mt-6">
                        <button onClick={() => {
                            handleUpdateInfo();
                        }}
                            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
                            SAVE CHANGES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}