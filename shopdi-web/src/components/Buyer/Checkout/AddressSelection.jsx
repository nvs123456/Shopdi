import React from "react"
import { useState } from "react"
import { POST } from "../../../api/GET"
export default function AddressSelection({ onClose, addresses, setAllAddress, currentAddress, setCurrentAddress }) {
    const [isAdding, setIsAdding] = useState(false)
    const [newAddress, setNewAddress] = useState(
        {
            "firstName": null,
            "lastName": null,
            "companyName": null,
            "address": null,
            "country": null,
            "state": null,
            "city": null,
            "zipCode": null,
            "email": null,
            "phoneNumber": null
        }
    )
    return (
        <div className="flex flex-col justify-between w-[800px] h-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-10 p-4">

            {
                isAdding ?
                    (
                        <>
                            <div className="text-xl text-red font-bold border-b-2 border-gray-400 pb-4">Địa chỉ của tôi</div>
                            <AddAddress newAddress={newAddress} setNewAddress={setNewAddress} />
                            <div className="flex flex-row justify-end">
                                <button onClick={() => {
                                    setIsAdding(false)
                                }} className="bg-white cursor-pointer border-2 border-gray-400 text-black w-20 p-2 mt-2 mb-2 mr-2">Hủy</button>
                                <button onClick={() => {
                                    // POST(`addresses/shipping`, newAddress).then((data) => {
                                    //     if (data.code === "OK") {
                                    //         setAllAddress(addresses.push(newAddress))
                                    //         setIsAdding(false)
                                    //     }
                                    // })
                                    setAllAddress([...addresses, newAddress]);
                                    console.log(addresses)
                                    setIsAdding(false)
                                }} className="bg-pumpkin cursor-pointer border-2 border-gray-400 text-white w-20 p-2 mt-2 mb-2 mr-4">Lưu</button>
                            </div>
                        </>
                    ) : (<>
                        <div className="text-xl text-red font-bold border-b-2 border-gray-400 pb-4">Địa chỉ của tôi</div>
                        <div className="no-scrollbar overflow-y-scroll">
                            {addresses.map((item) => <Address key={item.id} address={item} currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} />)}

                        </div>
                        <div className="flex flex-row justify-end ">
                            <button onClick={() => setIsAdding(true)} className="bg-white cursor-pointer border-2 border-gray-400  text-black h-12 p-2 mt-2 mb-2 mr-2">Thêm địa chỉ mới</button>
                            <button onClick={() => onClose()} className="bg-white cursor-pointer border-2 border-gray-400 text-black w-20 p-2 mt-2 mb-2 mr-2">Hủy</button>
                            <button onClick={() => onClose()} className="bg-pumpkin cursor-pointer border-2 border-gray-400 text-white w-20 p-2 mt-2 mb-2 mr-4">Lưu</button>
                        </div>
                    </>)
            }
        </div>
    )
}
function Address({ address, currentAddress, setCurrentAddress }) {
    return (
        <div className="flex flex-row gap-2 py-2 border-b-2 border-gray-400">
            <div className="">
                <input type="radio" name="selected-address" onClick={() => setCurrentAddress(address)} className="mt-2" />
            </div>
            <div>
                <div className="flex flex-row">
                    <div className="pr-2 border-r-2 border-gray-400">{address.firstName} {address.lastName}</div>
                    <div className="text-gray-600">(SDT:){address.phoneNumber}</div>
                </div>
                <div className="text-gray-600">{address.address}</div>
            </div>

        </div>
    )
}
function AddAddress({newAddress, setNewAddress}) {

    return (
        <div className="w-full px-0 md:px-4 mb-4">
            <h3 className=" text-[20px] text-xl mb-4 border-b-4">Thêm địa chỉ mới</h3>
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
                            className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
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