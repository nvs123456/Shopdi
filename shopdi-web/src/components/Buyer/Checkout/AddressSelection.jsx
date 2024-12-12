import React, { useEffect } from "react"
import { useState } from "react"
import { POST } from "../../../api/GET"
export default function AddressSelection({ onClose, addresses, setAllAddress, currentAddress, setCurrentAddress }) {
    const [isAdding, setIsAdding] = useState(false)
    const [newAddress, setNewAddress] = useState(
        {
            // "firstName": null,
            // "lastName": null,
            // "companyName": null,
            // "address": null,
            // "country": null,
            // "state": null,
            // "city": null,
            // "zipCode": null,
            // "email": null,
            // "phoneNumber": null
        }
    )
    return (
        <div className="flex flex-col justify-between w-[800px] h-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-10 m-4 rounded">

            {
                isAdding ?
                    (
                        <>
                            <div className="text-2xl text-yaleBlue font-bold border-b-[1px] border-gray-400 p-4">My Address</div>
                            <AddAddress newAddress={newAddress} setNewAddress={setNewAddress} />
                            <div className="flex flex-row justify-end">
                                <button onClick={() => {
                                    setIsAdding(false)
                                }} className="bg-red rounded font-sans hover:bg-orangeRed cursor-pointer text-white w-24 p-2 px-4 mb-8 mr-5">Cancel</button>
                                <button onClick={() => {
                                    POST(`address/shipping`, newAddress).then((data) => {
                                        if (data.code === "OK") {
                                            setAllAddress([...addresses, data.result])
                                            setIsAdding(false)
                                        }
                                    })
                                    // setAllAddress([...addresses, newAddress]);
                                    // console.log(addresses)
                                    setIsAdding(false)
                                }} className="bg-[#FA8232] rounded font-sans hover:bg-orangeRed cursor-pointer text-white w-24 p-2 px-4 mb-8 mr-6">Confirm</button>
                            </div>
                        </>
                    ) : (<>
                        <div className="text-2xl text-yaleBlue font-bold border-b-[1px] border-gray-400 p-4">My Address</div>
                        <div className="no-scrollbar overflow-y-scroll h-full mx-6">
                            {addresses.map((item) => <Address key={item.addressId} address={item} currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} />)}

                        </div>
                        <div className="flex flex-row justify-end ">
                            <button onClick={() => setIsAdding(true)} className="bg-[#FA8232] rounded font-sans hover:bg-orangeRed cursor-pointer text-white h-12 p-2 px-4 my-4 mr-5">Add New Address</button>
                            <button onClick={() => onClose()} className="bg-red rounded font-sans hover:bg-orangeRed cursor-pointer text-white w-24 p-2 px-4 my-4 mr-5">Cancel</button>
                            <button onClick={() => onClose()} className="bg-[#FA8232] rounded font-sans hover:bg-orangeRed cursor-pointer text-white w-24 p-2 px-4 my-4 mr-6">Confirm</button>
                        </div>
                    </>)
            }
        </div>
    )
}
function Address({ address, currentAddress, setCurrentAddress }) {
    return (
        <div className="flex flex-row gap-4 py-4 border-b-2 border-[#E4E7E9]">
            <div className="flex justify-center items-center">
                <input id={`address${address.addressId}`} defaultChecked={address.default} type="radio" name="selected-address"
                    onChange={(e) => {
                        console.log(address);
                        if (e.target.checked) {
                            setCurrentAddress(address)
                        }

                    }
                    } />
            </div>
            <div>
                <div htmlFor={`address${address.addressId}`} className="flex flex-row">
                    <div className="pr-2 font-semibold">{address.firstName} {address.lastName}</div>
                    <div className="text-gray-600">(Phone number : {address.phoneNumber})</div>
                </div>
                <div className="text-gray-600">{address.address}, {address.city}, {address.state}, {address.country}</div>
            </div>

        </div>
    )
}
function AddAddress({ newAddress, setNewAddress }) {
    const get = async (path) => {
        return fetch(path, {
            method: "GET"
        })
            .then(res => res.json())
    }
    const [provinces, setProvinces] = useState([{ province_id: "", province_name: "Province/City" }])
    const [districts, setDistricts] = useState([{ district_id: "", district_name: "District" }])
    const [wards, setWards] = useState([{ ward_id: "", ward_name: "Ward" }])
    const [currentProvince, setCurrentProvince] = useState("Province/City")
    const [currentDistrict, setCurrentDistrict] = useState("District")
    const [currentWard, setCurrentWard] = useState("")
    useEffect(() => {
        get("https://vapi.vnappmob.com/api/province/").then((data) => {
            data.results.unshift({ province_id: "", province_name: "Province/City" })
            setProvinces(data.results)
        })
    },[])
    useEffect(() => {
        if(currentProvince.province_name !== "Province/City")
        get(`https://vapi.vnappmob.com/api/province/district/${currentProvince.province_id}`).then((data) => {
            data.results.unshift({ district_id: "", district_name: "District" })
            setDistricts(data.results)
        })
    },[currentProvince])
    useEffect(() => {
        if(currentDistrict.district_name !== "District")
        get(`https://vapi.vnappmob.com/api/province/ward/${currentDistrict.district_id}`).then((data) => {
            data.results.unshift({ ward_id: "", ward_name: "Ward" })
            setWards(data.results)
        })
    },[currentDistrict])

    return (
        <div className="w-full px-0 md:px-4 mb-4">
            <h3 className=" text-xl mb-4 pt-2 font-bold">Add New Address</h3>
            <div className="grid grid-cols-4 gap-4">
                {/* {[
                    { label: "firstName", name: "firstName", placeholder: "First Name" },
                    { label: "lastName", name: "lastName", placeholder: "Last Name" },
                    // { label: "companyName", name: "companyName", placeholder: "Optional", colSpan: true },
                    { label: "address", name: "address", placeholder: "Street address", colSpan: true },
                    { label: "Province/City", name: "country", placeholder: "Province/City" },
                    { label: "District", name: "state", placeholder: "District" },
                    { label: "Commune/Ward", name: "city", placeholder: "Commune/Ward" },
                    // { label: "zip Code", name: "zipCode", placeholder: "Zip Code" },
                    { label: "Email", name: "email", placeholder: "email@example.com", colSpan: true },
                    { label: "Phone Number", name: "phoneNumber", placeholder: "Phone number", colSpan: true },
                ].map((field, index) => (
                    <div key={index} className={field.colSpan ? "col-span-2" : ""}>
                        <label className="block text-[15px] md:text-sm mb-1">
                            {field.label}
                        </label>
                        <input
                            type="text"
                            className="w-full border-[#E4E7E9] border-2 rounded p-2"
                            placeholder={field.placeholder}
                            onChange={(e) => {
                                setNewAddress({ ...newAddress, [field.name]: e.target.value })
                                // console.log(newAddress)
                            }}
                        />
                    </div>
                ))} */}
                <div className="col-span-2">
                    <label className="block text-[15px] md:text-sm mb-1">
                        First name
                    </label>
                    <input
                        type="text"
                        className="w-full border-[#E4E7E9] border-2 rounded p-2"
                        placeholder="First name"
                        onChange={(e) => {
                            setNewAddress({ ...newAddress, firstName: e.target.value })
                        }}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-[15px] md:text-sm mb-1">
                        Last name
                    </label>
                    <input
                        type="text"
                        className="w-full border-[#E4E7E9] border-2 rounded p-2"
                        placeholder="Last name"
                        onChange={(e) => {
                            setNewAddress({ ...newAddress, lastName: e.target.value })
                        }}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-[15px] md:text-sm mb-1">
                        Email
                    </label>
                    <input
                        type="text"
                        className="w-full border-[#E4E7E9] border-2 rounded p-2"
                        placeholder="example@gmail.com"
                        onChange={(e) => {
                            setNewAddress({ ...newAddress, email: e.target.value })
                        }}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-[15px] md:text-sm mb-1">
                        Phone number
                    </label>
                    <input
                        type="text"
                        className="w-full border-[#E4E7E9] border-2 rounded p-2"
                        placeholder="Phone number"
                        onChange={(e) => {
                            setNewAddress({ ...newAddress, phoneNumber: e.target.value })
                        }}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-[15px] md:text-sm mb-1">
                        Province/City
                    </label>
                    <select className="w-full border-[#E4E7E9] border-2 rounded p-2 bg-white" onChange={(e) => { 
                        setNewAddress({ ...newAddress, country: e.target.value }) 
                        setCurrentProvince(provinces.find(province => province.province_name === e.target.value))
                        }}>
                        {
                            provinces.map((province, index) => (
                                <option  value={province.province_name} key={`province${index}`}>{province.province_name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block text-[15px] md:text-sm mb-1">
                        District
                    </label>
                    <select className="w-full border-[#E4E7E9] border-2 rounded p-2 bg-white" onChange={(e) => { 
                        setNewAddress({ ...newAddress, state: e.target.value }) 
                        setCurrentDistrict(districts.find(district => district.district_name === e.target.value))
                        }}>
                        {
                            districts.map((district, index) => (
                                <option  value={district.district_name} key={`district${index}`}>{district.district_name}</option>
                            ))
                        }
                    </select>
                </div>
                
                <div className="col-span-2">
                    <label className="block text-[15px] md:text-sm mb-1">
                        Commune/Ward
                    </label>
                    <select className="w-full border-[#E4E7E9] border-2 rounded p-2 bg-white" onChange={(e) => { 
                        setNewAddress({ ...newAddress, city: e.target.value }) 
                        setCurrentWard(wards.find(ward => ward.ward_name === e.target.value))
                        }}>
                        {
                            wards.map((ward, index) => (
                                <option  value={ward.ward_name} key={`ward${index}`}>{ward.ward_name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block text-[15px] md:text-sm mb-1">
                        Address
                    </label>
                    <input
                        type="text"
                        className="w-full border-[#E4E7E9] border-2 rounded p-2"
                        placeholder="House number, street, ..."
                        onChange={(e) => {
                            setNewAddress({ ...newAddress, address: e.target.value })
                        }}
                    />
                </div>
            </div>

        </div>
    );
}