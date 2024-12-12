import {useEffect, useState} from "react";
import axios from "axios";
import defaultImage from "../../../assets/images/profileDefault.png";
import SpinnerLoading from "../../../components/SpinnerLoading/SpinnerLoading.jsx";
import {baseUrl} from "../../../api/GET.jsx";

export default function SellerProfile() {
    const [sellerInfo, setSellerInfo] = useState({});
    const [infoUpdated, setInfoUpdated] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [previewProfileImage, setPreviewProfileImage] = useState(null);
    const [previewProfileCoverImage, setPreviewProfileCoverImage] = useState(null);
    const [coverPopupOpen, setCoverPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCoverImage, setSelectedCoverImage] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSaveChangePopupOpen, setIsSaveChangePopupOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAPICalling, setIsAPICalling] = useState(false);

    const fetchSellerInfo = async () => {
        //Fetch seller info from API
        const response = await axios.get(baseUrl  + 'seller/profile', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
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
        //Update seller info
        setIsAPICalling(true);
        axios.put(baseUrl  + 'seller/profile', sellerInfo, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                "Access-Control-Allow-Origin": "http://localhost:5173",
            },
        }).then(response => {
            const data = response.data;
            if (data.code === "OK") {
                alert("Update successful");
                setIsEditing(false);
                setIsAPICalling(false);
            } else {
                alert("Failed to update seller info.");
            }
        }).catch(err => {
            alert("Error while updating data. Please try again later.");
        }).finally(() => {
            fetchSellerInfo();
        })
    }

    function handlePreviewProfileImage(e) {
        const file = e.target.files[0];
        if (file) {
            setPreviewProfileImage(URL.createObjectURL(file)); // Tạo URL preview từ file
            setSelectedImage(file); // Lưu file đã chọn vào state
        }
    }

    function handleUploadProfileImage() {
        //Upload profile image
        const formData = new FormData();
        formData.append("image", selectedImage);
        axios.put(baseUrl  + 'images/update-profile-seller-image', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                'Access-Control-Allow-Origin': 'http://localhost:5173',
            },
        }).then(response => {
            const data = response.data;
            if (data.code === "OK") {
                alert("Upload successful");
                fetchSellerInfo();
                setIsAPICalling(false);
                setPreviewProfileImage(null);
            } else {
                alert("Failed to upload image.");
            }
        }).catch(err => {
            alert("Error while uploading image. Please try again later.");
        })
    }

    function handlePreviewProfileCoverImage(e) {
        const file = e.target.files[0];
        if (file) {
            setPreviewProfileCoverImage(URL.createObjectURL(file)); // Tạo URL preview từ file
            setSelectedCoverImage(file); // Lưu file đã chọn vào state
        }
    }

    function handleUploadCoverImage() {
        //Upload cover image
        const formData = new FormData();
        formData.append("image", selectedCoverImage);
        axios.put(baseUrl  + 'images/update-cover-image', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                "Access-Control-Allow-Origin": "http://localhost:5173",
            },
        }).then(response => {
            const data = response.data;
            if (data.code === "OK") {
                alert("Upload successful");
                fetchSellerInfo();
                setPreviewProfileCoverImage(null);
                setIsAPICalling(false);
            } else {
                alert("Failed to upload image.");
            }
        }).catch(err => {
            alert("Error while uploading image. Please try again later.");
        }).finally(() => {
            setPreviewProfileCoverImage(null);
        })
    }

    return (
        <div className="min-h-screen font-sans text-sm">
            <h1 className="text-xl ml-6 font-semibold">Profile</h1>
            <div className="bg-white w-full min-w-screen rounded-lg mb-10">
                {/* EditProfile Picture and Name */}
                <div className=" relative group bg-gradient-to-b from-blue-300 rounded-t-lg w-full h-40 to-blue-50">
                    <img
                        src={previewProfileCoverImage || sellerInfo.coverImage || `https://i.pinimg.com/originals/be/82/b2/be82b2d8ab44a82f51295751e5ddc395.jpg`} // replace with actual image path
                        alt="CoverProfile"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute w-full h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {previewProfileCoverImage === null ?
                            <label htmlFor="upload1" className="text-white text-[16px] font-semibold cursor-pointer">
                                Upload Cover Image
                            </label> :
                            <label htmlFor="upload1" className="text-white text-[16px] font-semibold cursor-pointer">
                                Change Cover Image
                            </label>
                        }
                        <input id="upload1" type="file" className="hidden" accept={`image/*`}
                               onChange={handlePreviewProfileCoverImage}/>
                    </div>
                    {previewProfileCoverImage &&
                        <button disabled={isAPICalling}
                            className={`absolute flex items-center bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-lg mr-2 mt-2`}
                            onClick={() => setCoverPopupOpen(true)}>
                            {isAPICalling && <SpinnerLoading size={1}/>}
                            <span>{isAPICalling ? 'Loading...' : 'Save'}</span>
                        </button>}
                    {coverPopupOpen && <div
                        className={`absolute top-2/3 right-2 bg-white border-2 w-60 border-gray-300 p-4 rounded-lg`}>
                        <p className={`text-gray-500 text-sm`}>Are you sure you want to save this image?</p>
                        <div className={`flex justify-end mt-4`}>
                            <button className={`bg-blue-500 text-white px-2 py-1 rounded-lg mr-2`}
                                    onClick={() => {
                                        setIsAPICalling(true);
                                        setCoverPopupOpen(false)
                                        handleUploadCoverImage();
                                        //setSellerInfo({...sellerInfo, coverImage: selectedCoverImage});
                                    }}>Yes
                            </button>
                            <button className={`bg-gray-300 text-gray-700 px-2 py-1 rounded-lg`}
                                    onClick={() => {
                                        setPreviewProfileCoverImage(null);
                                        setCoverPopupOpen(false)
                                    }}>No
                            </button>
                        </div>
                    </div>}
                </div>
                <div className={`absolute top-[23%] left-[15%] group flex mt-2 border-2 rounded-full w-24 h-24`}>
                    <img
                        src={previewProfileImage || sellerInfo.profileImage || defaultImage} // replace with actual image path
                        alt="EditProfile"
                        className="w-full h-full object-cover rounded-full"
                    />
                    <div className={`mt-4 ml-4`}>
                        <h2 className="mt-6 text-2xl font-semibold">{sellerInfo.username}</h2>
                        <p className="text-gray-500">Owner & Founder</p>
                    </div>
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center rounded-full justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {previewProfileImage === null ?
                            <label htmlFor="upload" className="text-white text-[14px] font-semibold cursor-pointer">
                                Upload Image
                            </label> :
                            <label htmlFor="upload" className="text-white text-[14px] font-semibold cursor-pointer">
                                Change Image
                            </label>
                        }
                        <input id="upload" type="file" className="hidden" accept={`image/*`}
                               onChange={handlePreviewProfileImage}/>
                    </div>
                    {previewProfileImage && <button disabled={isAPICalling}
                        className={`absolute flex top-16 left-14 bg-blue-500 text-white px-2 py-1 rounded-lg mr-2 mt-2`}
                        onClick={() => setIsPopupOpen(true)}>
                        <span>{isAPICalling ? 'Uploading':'Save'}</span>
                        {isAPICalling && <SpinnerLoading size={1}/>}
                    </button>}
                    {isPopupOpen && <div className={`absolute top-16 left-14 bg-white border-2 w-60 border-gray-300 p-4 rounded-lg`}>
                        <p className={`text-gray-500 text-sm`}>Are you sure you want to save this image?</p>
                        <div className={`flex justify-end mt-4`}>
                            <button className={`bg-blue-500 text-white px-2 py-1 rounded-lg mr-2`}
                                    onClick={() => {
                                        setIsAPICalling(true);
                                        setIsPopupOpen(false)
                                        handleUploadProfileImage();
                                       // setSellerInfo({...sellerInfo, profileImage: selectedImage});
                                    }}>Yes
                            </button>
                            <button className={`bg-gray-300 text-gray-700 px-2 py-1 rounded-lg`}
                                    onClick={() => {
                                        setPreviewProfileImage(null);
                                        setIsPopupOpen(false)}}>No
                            </button>
                        </div>
                    </div>}
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
                                onChange={(e) => {
                                    setIsEditing(true);
                                    setSellerInfo({...sellerInfo, shopName: e.target.value})
                                    setInfoUpdated({...infoUpdated, shopName: e.target.value})
                                }}

                            />
                            {error.shopName && <p className="text-red text-sm">*{error.shopName}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                defaultValue={sellerInfo.email}
                                onChange={(e) => {
                                    setIsEditing(true);
                                    setSellerInfo({...sellerInfo, email: e.target.value})}}
                            />
                            {error.email && <p className="text-red text-sm">*{error.email}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Contact no.</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                defaultValue={sellerInfo.contactNumber}
                                onChange={(e) => {
                                    setIsEditing(true);
                                    setSellerInfo({...sellerInfo, contactNumber: e.target.value})
                                    setInfoUpdated({...infoUpdated, contactNumber: e.target.value})
                                }}

                            />
                            {error.contactNumber && <p className="text-red text-sm">*{error.contactNumber}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                defaultValue={sellerInfo.location}
                                onChange={(e) => {
                                    setIsEditing(true);
                                    setSellerInfo({...sellerInfo, location: e.target.value})
                                    setInfoUpdated({...infoUpdated, location: e.target.value})
                                }}
                            />
                            {error.location && <p className="text-red text-sm">*{error.location}</p>}
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label className="text-sm font-medium text-gray-700">About</label>
                            <textarea
                                className="h-[300px] border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                rows="3"
                                defaultValue={sellerInfo.about || ""}
                                onChange={(e) =>
                                {
                                    setIsEditing(true);
                                    setSellerInfo({...sellerInfo, about: e.target.value})
                                    setInfoUpdated({...infoUpdated, about: e.target.value})
                                }}
                            />
                            {error.about && <p className="text-red text-sm">*{error.about}</p>}
                        </div>
                    </div>
                    {/* Save Changes Button */}
                    {isEditing && <div className="flex justify-end mt-6">
                        <button onClick={() => {
                            const newError = {};
                            if(!sellerInfo.about) newError.about = "About field cannot be empty.";
                            if(!sellerInfo.contactNumber) newError.contactNumber = "Contact number field cannot be empty.";
                            if(!sellerInfo.location) newError.location = "Location field cannot be empty.";
                            if(!sellerInfo.shopName) newError.shopName = "Shop name field cannot be empty.";
                            if(!sellerInfo.email) newError.email = "Email field cannot be empty.";
                            setError(newError);
                            if(Object.keys(newError).length === 0 ) setIsSaveChangePopupOpen(true);
                        }}
                                disabled={isAPICalling}
                                className={`flex items-center ${isAPICalling ? 'bg-gray-300' :' '} bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600`}>
                            {isAPICalling && <SpinnerLoading size={1}/>}
                             <span className={`pl-2`}>SAVE CHANGES</span>
                        </button>
                    </div>}
                    {isSaveChangePopupOpen && <div className={`fixed top-[30%] left-[45%] bg-white border-2 w-60 border-gray-300 p-4 rounded-lg`}>
                        <p className={`text-gray-500 text-sm`}>Are you sure you want to save the changes?</p>
                        <div className={`flex justify-end mt-4`}>
                            <button className={`bg-blue-500 text-white px-2 py-1 rounded-lg mr-2`}
                                    onClick={() => {
                                        setIsSaveChangePopupOpen(false)
                                        handleUpdateInfo();
                                    }}>Yes
                            </button>
                            <button className={`bg-gray-300 text-gray-700 px-2 py-1 rounded-lg`}
                                    onClick={() => {
                                        setIsSaveChangePopupOpen(false)}}>No
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}