import React, {useEffect, useState} from "react";
import UETLogo from "/src/assets/images/UETLogo.png";
import axios from "axios";

const EditProfile = () => {
    const [addressList, setAddressList] = useState({});
    const [info, setInfo] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("profile"); // State để lưu tab đang được chọn
    const [isEdit, setIsEdit] = useState(false); // State để xác định xem có đang ở chế độ chỉnh sửa hay không
    const [errorNo, setErrorNo] = useState(""); // Lưu thông báo lỗi
    const [errorEmail, setErrorEmail] = useState(""); // Lưu thông báo lỗi
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [form, setForm] = useState({firstNameForm: "", lastNameForm: "", emailForm: "", phoneForm: ""});
    useEffect(() => {
        axios.get(`http://localhost:8080/users/my-info`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                }
            })
            .then((respsonse) => {
                const data = respsonse.data;
                setInfo(data.result);
            })
        axios.get(`http://localhost:8080/address/shipping`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                }
            })
            .then((respsonse) => {
                const data = respsonse.data;
                setAddressList(data.result);
            })
            .finally(() => {
                setisLoading(false);
            })

    }, []);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    function handleUpdateProfile() {
        console.log(info);
        console.log(form);
        if(errorNo === "" && errorEmail === "") {
            axios.put(`http://localhost:8080/users/update-profile`,
                {
                    firstName: form.firstNameForm,
                    lastName: form.lastNameForm,
                    email: form.emailForm,
                    mobileNo: form.phoneForm,
                    role: info.role,

                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                        'Access-Control-Allow-Origin': 'http://localhost:5173',
                    }
                })
                .then((respsonse) => {
                    const data = respsonse.data;
                    console.log(data);
                    window.alert("Cập nhật thông tin thành công");
                })
        }
    }

    function handleNumberChange(e) {
        setIsEdit(true);
        const value = e.target.value.trim();
        if (value === "") {
            setErrorNo("");
        } else if (!isPhoneNumber(value)) {
            setErrorNo("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
        } else {
            setErrorNo("");
            setForm({...form, phoneForm: value});
        }
    }

    function handleEmailChange(e) {
        setIsEdit(true);
        const value = e.target.value.trim();
        if (value === "") {
            setErrorEmail("");
        } else if (!isEmail(value)) {
            setErrorEmail("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
        } else {
            setErrorEmail(""); // Xóa lỗi nếu hợp lệ
            setForm({...form, emailForm: value});
        }
    }

    // Hàm mở popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    // Hàm đóng popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // Hàm xử lý khi chọn "Tiếp tục"
    const handleConfirm = () => {
        closePopup();
        setIsEdit(false);
        console.log("Thông tin đã được xác nhận để sửa.");
        handleUpdateProfile();
    };
    const AskAgainNotification = () => (
        <div className="fixed left-[15%] md:left-[20%] xl:left-[35%] bg-gray-500 bg-opacity-50 z-10 flex justify-center items-center">
            <div className="bg-gray-300 rounded-lg shadow-lg p-6 w-80">
                <h2 className="lg:text-[22px] font-bold text-gray-800">
                    Bạn có chắc chắn sửa lại thông tin?
                </h2>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={handleConfirm}
                        className="bg-orange-400 text-white xl:px-4 xl:py-2 rounded hover:bg-orange-600"
                    >
                        Tiếp tục
                    </button>
                    <button
                        onClick={closePopup}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-[#F7FBFF] flex flex-col lg:flex-row font-sans md:text-[14px] p-1 md:p-8">
            <div className={`lg:flex lg:flex-col `}>
                <ul className=" flex lg:flex-col lg:space-y lg:space-y-4 text-[12px] md:text-[16px] font-medium text-gray-500 dark:text-gray-400  md:me-4 mb-2 md:mb-0">
                    <li>
                        <a onClick={() => setActiveTab('profile')}
                           className={`inline-flex items-center px-4 py-1 cursor-pointer ${activeTab === 'profile' ? 'text-orangeRed' : 'text-tintedBlack'} bg-transparent  active w-full`}
                           aria-current="page">
                            Hồ sơ
                        </a>
                    </li>
                    <li>
                        <a onClick={() => setActiveTab('address')}
                           className={`inline-flex items-center px-4 py-1 cursor-pointer ${activeTab === 'address' ? 'text-orangeRed' : 'text-tintedBlack'}  bg-transparent active w-full`}
                           aria-current="page">
                            Địa chỉ
                        </a>
                    </li>
                    <li>
                        <a onClick={() => setActiveTab('password')}
                           className={`inline-flex items-center px-4 py-1 cursor-pointer ${activeTab === 'password' ? 'text-orangeRed' : 'text-tintedBlack'}  bg-transparent active w-full`}
                           aria-current="page">
                            Đổi mật khẩu
                        </a>
                    </li>
                </ul>
            </div>

            <div className={`xl:w-[70%]`}>

                {/* Account EditProfile Edit Section */}
                {activeTab === 'profile' && <section
                    className="md:ml-[60px] lg:ml-[80px] xl:ml-[150px] xl:w-4xl mx-auto bg-white p-2 md:p-6 rounded-s mb-4 md:mb-8 border-2 border-[#E4E7E9]">
                    <h2 className="text-[16px] md:text-xl mb-6 border-b-4">ACCOUNT PROFILE EDIT</h2>
                    <div className="md:flex md:flex-wrap md:-mx-4">
                        {/* EditProfile Image */}
                        <div className="w-full md:w-1/4 flex justify-center  ">
                            <img
                                src={UETLogo}
                                alt="EditProfile"
                                className="w-10 h-10 lg:w-16 lg:h-16 rounded-full"
                            />
                        </div>
                        {/* EditProfile Information */}
                        {isPopupOpen && <AskAgainNotification/>}
                        <div className="w-full md:w-3/4 px-4">
                            <div className="grid grid-cols-1 gap-2">
                                <div>
                                    <label className="block text-[15px] md:text-sm mb-1 col-span-2">
                                        Username: {info.username}
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-[15px] md:text-sm mb-1 col-span-2">
                                        First name
                                    </label>
                                    <input
                                        id={"firstName"}
                                        type="text"
                                        defaultValue={info.firstName}
                                        onChange={(e) => {
                                            setIsEdit(true);
                                            setForm({...form, firstNameForm: e.target.value});
                                        }}
                                        className="w-full border-[#E4E7E9] text-[12px] lg:text[16px] h-[40px] border-2 rounded-sm p-2 col-span-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[15px] md:text-sm mb-1 col-span-2">
                                        Last name
                                    </label>
                                    <input
                                        id={"lastName"}
                                        type="text"
                                        defaultValue={info.lastName}
                                        onChange={(e) => {
                                            setIsEdit(true);
                                            setForm({...form, lastNameForm: e.target.value});
                                        }}
                                        className="w-full border-[#E4E7E9] text-[12px] lg:text[16px] h-[40px] border-2 rounded-sm p-2 col-span-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[15px] md:text-sm mb-1 col-span-2">
                                        Email
                                    </label>
                                    <input
                                        id={"email"}
                                        type="text"
                                        defaultValue={info.email}
                                        onChange={handleEmailChange}
                                        className="w-full border-[#E4E7E9] text-[12px] lg:text[16px] h-[40px] border-2 rounded-sm p-2 col-span-2"
                                    />
                                    {errorEmail && <p className="text-[10px] md:text-[12px] lg:text-[14px] text-red">Email không hợp lệ</p>}
                                </div>
                                <div>
                                    <label className="block text-[15px] md:text-sm mb-1 col-span-2">
                                        Phone number
                                    </label>
                                    <input
                                        id={"phone"}
                                        type="number"
                                        defaultValue={info.mobileNo}
                                        onChange={handleNumberChange}
                                        className="w-full border-[#E4E7E9] text-[12px] lg:text[16px] h-[40px] border-2 rounded-sm p-2 col-span-2"
                                    />
                                    {errorNo && <p className=" text-[10px] md:text-[12px] lg:text-[14px] text-red">Số điện thoại không hợp lệ</p>}
                                </div>
                            </div>
                            {isEdit && <button onClick={() => {
                                openPopup();
                            }}
                                               className="bg-[#FA8232] text-[14px] text-white py-1 px-1 mt-1 md:py-2 md:px-4 md:mt-4 rounded-sm hover:bg-orange-600">
                                Save Changes
                            </button>
                            }
                        </div>
                    </div>
                </section>
                }

                {/* Billing and Shipping Address Section */}
                {activeTab === 'address' &&
                    <section
                        className="md:ml-[60px] lg:ml-[100px] xl:ml-[250px] max-w-4xl mx-auto bg-white p-2 md:p-6 mb-8 border-2 border-[#E4E7E9]">
                        <div className="relative w-full md:w-full px-0 md:px-4 lg:mb-4">
                            <h3 className=" text-[16px] xl:text-xl md:mb-4 border-b-2 pb-2">Địa chỉ của tôi</h3>
                            <button
                                className={` absolute top-1 right-0 xl:fixed xl:top-[210px] xl:right-[500px] bg-orangeRed lg:h-[40px] rounded px-1 md:px-2 text-white text-[12px] lg:text-sm`}>Thêm
                                địa chỉ mới
                            </button>
                            <div>
                                <h4 className=" text-[14px] xl:text-lg mt-1 md:pb-2">Địa chỉ</h4>
                                <div>
                                    {addressList.map((address) =>
                                        (
                                            <div className={`lg:flex lg:relative border-b-2`}>
                                                <div className={`flex flex-col`}>
                                                    <div className={`text-[14px] lg:text-[16px] pt-2`}>
                                                        <b>{address.firstName + " " + address.lastName}</b> {"|" + address.phone}
                                                    </div>
                                                    <span className={`text-[14px]`}>{address.email}</span>
                                                    <span className={`text-[14px] md:mb-2`}>{address.address}</span>
                                                </div>

                                                <div
                                                    className={`xl:ml-[400px] text-[14px] lg:text-[16px]  xl:text-[18px]`}>
                                                    <button
                                                        className={`text-celticBlue mr-1 xl:mr-2 xl:absolute xl:top-2 xl:right-8`}>Cập
                                                        nhật
                                                    </button>
                                                    <button
                                                        className={`text-celticBlue mr-1 xl:absolute xl:top-2 xl:right-0`}>Xóa
                                                    </button>
                                                    <button
                                                        className={`xl:absolute mr-1 xl:right-0 xl:top-8 border-2 border-gray-300 px-1`}>Thiết
                                                        lập mặc định
                                                    </button>

                                                </div>
                                            </div>

                                        )
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                }
                {/* Change Password Section */}
                {activeTab === 'password' &&
                    <section
                        className="md:ml-[60px] lg:ml-[200px] xl:ml-[400px] w-[200px] md:w-[500px] mx-auto bg-white px-2 md:p-6 border-2 border-[#E4E7E9] font-sans">
                        <h3 className=" text-[16px] md:text-[20px] border-b-4 mb-2 md:mb-4">Change Password</h3>
                        <div className="grid grid-cols-1 gap-1 md:gap-4">
                            {[
                                {label: "Current Password", type: "password"},
                                {label: "New Password", type: "password"},
                                {label: "Confirm Password", type: "password"},
                            ].map((field, index) => (
                                <div key={index}>
                                    <label className="block text-[14px] md:text-sm mb-1">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        className="w-full h-[20px] border-[#E4E7E9] border-2 rounded-sm p-2"
                                        placeholder="••••••••"
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className="bg-[#FA8232] text-white flex h-[30px] xl:h-[40px] xl:my-2 items-center px-1 mb-1 rounded-sm hover:bg-orange-600">
                            <span className={`text-[12px] md:text-[16px] `}> Change Password </span>
                        </button>
                    </section>
                }
            </div>
        </div>
    );
};

function isPhoneNumber(phoneNumber) {
    const regex = /^(?:\+84|0)([3|5|7|8|9])\d{8}$/;
    return regex.test(phoneNumber);
}

function isEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}


const AddressForm = ({
                         title
                     }) => (
    <div className="w-full md:w-full px-0 md:px-4 mb-4">
        <h3 className=" text-[20px] text-xl mb-4 border-b-4">{title}</h3>
        <button className={``}>Thêm địa chỉ mới</button>
        <div className="grid grid-cols-2 gap-4">
            {[
                {label: "First Name", placeholder: "Kevin"},
                {label: "Last Name", placeholder: "Gilbert"},
                {label: "Company Name", placeholder: "Optional", colSpan: true},
                {label: "Address", placeholder: "Street address", colSpan: true},
                {label: "Country", placeholder: "Country"},
                {label: "Region/State", placeholder: "State"},
                {label: "City", placeholder: "City"},
                {label: "Zip Code", placeholder: "Zip Code"},
                {label: "Email", placeholder: "email@example.com", colSpan: true},
                {label: "Phone Number", placeholder: "Phone number", colSpan: true},
            ].map((field, index) => (
                <div key={index} className={field.colSpan ? "col-span-2" : ""}>
                    <label className="block text-[15px] md:text-sm mb-1">
                        {field.label}
                    </label>
                    <input
                        type="text"
                        className="w-full border-[#E4E7E9] border-2 rounded-sm p-2"
                        placeholder={field.placeholder}
                    />
                </div>
            ))}
        </div>
        <button className="bg-[#FA8232] text-white py-2 px-4 mt-4 rounded-sm hover:bg-orange-600">
            Save Changes
        </button>
    </div>
);

export default EditProfile;
