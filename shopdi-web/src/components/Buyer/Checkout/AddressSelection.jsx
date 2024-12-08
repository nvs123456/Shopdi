import React from "react"
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
                                            setAllAddress([...addresses, newAddress])
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
                <input id={`address${address.addressId}`} type="radio" name="selected-address" onClick={() => setCurrentAddress(address)} />
            </div>
            <div>
                <div htmlFor={`address${address.addressId}`} className="flex flex-row">
                    <div className="pr-2 font-bold">{address.firstName} {address.lastName}</div>
                    <div className="text-gray-600">(Phone number:){address.phone}</div>
                </div>
                <div className="text-gray-600">{address.address}</div>
            </div>

        </div>
    )
}
function AddAddress({newAddress, setNewAddress}) {

    return (
        <div className="w-full px-0 md:px-4 mb-4">
            <h3 className=" text-xl mb-4 pt-2 font-bold">Add New Address</h3>
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: "firstName", placeholder: "First Name" },
                    { label: "lastName", placeholder: "Last Name" },
                    { label: "companyName", placeholder: "Optional", colSpan: true },
                    { label: "address", placeholder: "Street address", colSpan: true },
                    { label: "country", placeholder: "Country" },
                    { label: "state", placeholder: "State" },
                    { label: "city", placeholder: "City" },
                    { label: "zip Code", placeholder: "Zip Code" },
                    { label: "email", placeholder: "email@example.com", colSpan: true },
                    { label: "phoneNumber", placeholder: "Phone number", colSpan: true },
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
                                setNewAddress({ ...newAddress, [field.label]: e.target.value })
                                // console.log(newAddress)
                            }}
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}