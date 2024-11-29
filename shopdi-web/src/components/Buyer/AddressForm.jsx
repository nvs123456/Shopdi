import React from "react";

export const AddressForm = ({addressForm, setAddressForm, title, isAddressPopupOpen, setIsAddressPopupOpen}) => {
        return (
            <div
                className="w-full md:w-1/3 md:h-2/3 overflow-y-auto border-2 fixed z-10 bg-gray-300 top-[15%] right-[35%]  px-0 md:px-4 mb-4">
                <h3 className=" text-[20px] mb-4 border-b-4">{title}</h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        {label: "First Name", placeholder: "Enter your first name"},
                        {label: "Last Name", placeholder: "Enter your last name"},
                        {label: "Address", placeholder: "specific address", colSpan: true},
                        {label: "District", placeholder: "District"},
                        {label: "City", placeholder: "City"},
                        {label: "Email", placeholder: "email@example.com", colSpan: true},
                        {label: "Phone Number", placeholder: "Phone number", colSpan: true},
                    ].map((field, index) => (
                        <div key={index} className={field.colSpan ? "col-span-2" : ""}>
                            <label className="block text-[14px] md:text-[14px] mb-1">
                                {field.label}
                            </label>
                            <input
                                type="text" onChange={(e) => {
                                setAddressForm({...addressForm, [field.label]: e.target.value});
                            }}
                                required={true}
                                className="w-full border-[#E4E7E9] md:text-[12px] border-2 rounded-sm p-2"
                                placeholder={field.placeholder}
                            />
                        </div>
                    ))}
                </div>
                <button className="bg-[#FA8232] text-white py-2 px-4 mt-4 rounded-sm hover:bg-orange-600">
                    Save Changes
                </button>
                <button onClick={setIsAddressPopupOpen(false)}
                        className="bg-gray-400 mx-2 text-white py-2 px-4 mt-4 rounded-sm hover:bg-gray-600">
                    Cancel
                </button>
            </div>
        );

    }
;