import React, { useState, useEffect } from "react";
import UETLogo from "/src/assets/images/UETLogo.png";

const Profile = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("")
    const [addressData, setAddressData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    // "data": [
    //     {
    //       "id": "01",
    //       "name": "Hà Nội",
    //       "name_en": "Ha Noi",
    //       "full_name": "Thành phố Hà Nội",
    //       "full_name_en": "Ha Noi City",
    //       "latitude": "21.0283334",
    //       "longitude": "105.854041",
    //       "data2": [
    //         {
    //           "id": "001",
    //           "name": "Ba Đình",
    //           "name_en": "Ba Dinh",
    //           "full_name": "Quận Ba Đình",
    //           "full_name_en": "Ba Dinh District",
    //           "latitude": "21.0365377",
    //           "longitude": "105.8285908",
    //           "data3": [
    //             {
    //               "id": "00001",
    //               "name": "Phúc Xá",
    //               "name_en": "Phuc Xa",
    //               "full_name": "Phường Phúc Xá",
    //               "full_name_en": "Phuc Xa Ward",
    //               "latitude": "21.0456942",
    //               "longitude": "105.8482503"
    //             },
    // useEffect(() => {
    //     fetch("https://esgoo.net/api-tinhthanh/4/0.htm")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log("success");
    //             setAddressData(data.data);
    //             setIsLoading(false)
    //         });
    // }, [isLoading])
   
    return (
        <div className="bg-[#F7FBFF] font-sans text-[14px] p-1 md:p-8">
            {/* Account Profile Edit Section */}
            <section className="max-w-4xl mx-auto bg-white p-2 md:p-6 rounded-s mb-4 md:mb-8 border-2 border-[#E4E7E9]">
                <h2 className="text-[20px] md:text-xl mb-6 border-b-4">ACCOUNT PROFILE EDIT</h2>
                <div className="flex flex-wrap -mx-4">
                    {/* Profile Image */}
                    <div className="w-full md:w-1/4 px-4 mb-4 md:mb-0 flex items-center justify-center">
                        <img
                            src={UETLogo}
                            alt="Profile"
                            className="w-40 h-40 rounded-full"
                        />
                    </div>
                    {/* Profile Information */}
                    <div className="w-full md:w-3/4 px-4">
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: "Username", placeholder: "Display name" },
                                { label: "Full Name", placeholder: "Kevin Gilbert" },
                                { label: "Email", placeholder: "kevin@gmail.com" },

                            ].map((field, index) => (

                                <div key={index} className='col-span-2'>
                                    <label className="block text-[15px] md:text-sm mb-1 col-span-2">
                                        {field.label}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-[#E4E7E9] border-2 rounded-sm p-2 col-span-2"
                                        placeholder={field.placeholder}
                                    />
                                </div>

                            ))}
                            {/* <div className='col-span-2'>
                                <label className="block text-[15px] text-sm mb-1">
                                    Country/Region
                                </label>
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="w-full border-[#E4E7E9] bg-white border-2 rounded-sm p-2"
                                >
                                    <option value="" disabled>Select a country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country.value}>
                                            {country.label}
                                        </option>
                                    ))}
                                </select>
                            </div> */}
                            {/* <div className='col-span-1'>
                                <label className="block text-[15px] text-sm mb-1">
                                    State
                                </label>
                                <select
                                    value={selectedState}
                                    onChange={(e) => setSelectedState(e.target.value)}
                                    className="w-full border-[#E4E7E9] bg-white border-2 rounded-sm px-0 py-2 md:p-2"
                                >
                                    <option value="" disabled>Select a state</option>
                                    {states.map((state, index) => (
                                        <option key={index} value={state.value}>
                                            {state.label}
                                        </option>
                                    ))}
                                </select>
                            </div> */}
                            {/* <div className='col-span-1'>
                                <label className="block text-[15px] text-sm mb-1">
                                    Zip Code
                                </label>
                                <input type='text' placeholder='zipcode' className="w-full border-[#E4E7E9] border-2 rounded-sm p-2" />

                            </div> */}
                        </div>
                        <button
                            className="bg-[#FA8232] text-white py-2 px-4 mt-4 rounded-sm hover:bg-orange-600">
                            Save Changes
                        </button>
                    </div>
                </div>
            </section>

            {/* Billing and Shipping Address Section */}
            {/* <section className="max-w-4xl mx-auto bg-white p-6 mb-8 border-2 border-[#E4E7E9]">
                <div className="flex flex-wrap -mx-4">

                    <AddressForm title="Shipping Address" addressData={addressData} />
                </div>
            </section> */}

            {/* Change Password Section */}
            <section className="max-w-4xl mx-auto bg-white px-2 md:p-6 border-2 border-[#E4E7E9] font-sans">
                <h3 className=" text-[20px] text-xl border-b-4 mb-4">Change Password</h3>
                <div className="grid grid-cols-1 gap-4">
                    {[
                        { label: "Current Password", type: "password" },
                        { label: "New Password", type: "password" },
                        { label: "Confirm Password", type: "password" },
                    ].map((field, index) => (
                        <div key={index}>
                            <label className="block text-[15px] md:text-sm mb-1">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                                placeholder="••••••••"
                            />
                        </div>
                    ))}
                </div>
                <button className="bg-[#FA8232] text-white py-2 px-4 mt-4 rounded-sm hover:bg-orange-600">
                    Change Password
                </button>
            </section>
        </div>
    );
};

const AddressForm = ({ addressData }) => (
    <div className="w-full px-0 md:px-4 mb-4">
        <h3 className=" text-[20px] text-xl mb-4 border-b-4">hehe</h3>
        <div className="grid grid-cols-2 gap-4">
            <div className="">
                <label className="block text-[15px] md:text-sm mb-1">
                    Ten
                </label>
                <input
                    type="text"
                    className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                    placeholder="Ten"
                />
            </div>
            <div className="">
                <label className="block text-[15px] md:text-sm mb-1">
                    Ho
                </label>
                <input
                    type="text"
                    className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                    placeholder="Ho"
                />
            </div>
            <div className="col-span-2">
                <label className="block text-[15px] md:text-sm mb-1">
                    Ten cong ty
                </label>
                <input
                    type="text"
                    className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                    placeholder="Ten cong ty"
                />
            </div>
            <div className="col-span-2">
                <label className="block text-[15px] md:text-sm mb-1">
                    Dia chi nha
                </label>
                <input
                    type="text"
                    className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                    placeholder="Dia chi nha"
                />
            </div>
            <div className="">
                <label className="block text-[15px] md:text-sm mb-1">
                    Tinh/thanh pho
                </label>
                <select className="w-full border-[#E4E7E9] border-2 rounded-sm p-2">
                    <option value="">Tinh/thanh pho</option>
                    {addressData.map((data) => (
                        <option key={data.id} value={data.name} >
                            {data.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="">
                <label className="block text-[15px] md:text-sm mb-1">
                    Quan/huyen
                </label>
                <input
                    type="text"
                    className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                    placeholder="Quan/huyen"
                />
            </div>
            <div className="">
                <label className="block text-[15px] md:text-sm mb-1">
                    Phuong/xa
                </label>
                <input
                    type="text"
                    className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                    placeholder="Phuong/xa"
                />
            </div>
            <div className="">
                <label className="block text-[15px] md:text-sm mb-1">
                    Zip-code
                </label>
                <input
                    type="text"
                    className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                    placeholder="Zip-code"
                />
            </div>
            <div className="">
                <label className="block text-[15px] md:text-sm mb-1">
                    Email
                </label>
                <input
                    type="text"
                    className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                    placeholder="Email@example.com"
                />
            </div>
            <div className="">
                <label className="block text-[15px] md:text-sm mb-1">
                    So dien thoai
                </label>
                <input
                    type="text"
                    className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                    placeholder="So dien thoai"
                />
            </div>
        </div>
        <button className="bg-[#FA8232] text-white py-2 px-4 mt-4 rounded-sm hover:bg-orange-600">
            Save Changes
        </button>
    </div>
);

export default Profile;
