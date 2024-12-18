import React from 'react'
import { useState } from 'react'
import { baseUrl, POST } from '../../api/GET'
const SignUpForm = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [openPopup, setOpenPopup] = useState(false);
    const [message, setMessage] = useState("");
    const handleSubmitEvent = (e) => {

        if (input.email === "" || input.password === "") {
            alert("Please provide email and password");
            return
        } else if (!input.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            alert("Pleae provide a valid email");
            return
        } else if (input.password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return
        } else if (!input.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/)) {
            alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return
        }
        e.preventDefault();

        fetch(`${baseUrl}users/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }).then(res => res.json()).then((res) => {
            if (res.code === 'OK') {
                setOpenPopup(true);
            } else {
                setMessage(res.message);
            }

        })
    }
    return (
        <div className='w-full'>
            {openPopup && <PopUp />}
            <div className={`flex min-h-full flex-1 flex-col justify-center py-24 ${openPopup ? "brightness-50" : ""} bg-white`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-cloudBlue px-12 py-6 border-t-[1px] border-x-[1px] rounded">
                    <h2 className="mt-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900 font-size ">
                        Create an Account
                    </h2>
                </div>

                <div className=" sm:mx-auto sm:w-full sm:max-w-lg bg-cloudBlue px-12 pt-6 border-b-[1px] border-x-[1px] rounded">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="text-xl block font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2 mb-5">
                                <input
                                    onChange={(e) => setInput({ ...input, email: e.target.value })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    tabIndex={1}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={"Username/Email address"}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-xl font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2 mb-8">
                            <input
                                onChange={(e) => setInput({ ...input, password: e.target.value })}
                                id="password"
                                name="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={"Password"}
                            />
                        </div>
                        <div className='text-left text-sm text-red'>
                            *Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleSubmitEvent}
                            type="submit"
                            tabIndex={3}
                            className="flex w-full justify-center rounded-md bg-yaleBlue p-3 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create account
                        </button>
                    </div>
                    <p className={`mt-4 mb-4 text-left text-sm text-red ${message === "" ? "hidden" : ""}`}>
                        {message}
                    </p>
                    <p className="mt-5 mb-10 text-left text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold leading-6 text-orange-600 hover:text-orange-400">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
function PopUp({ orderId }) {
    const navigate = useNavigate();
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto p-8 bg-white rounded flex gap-4 flex-col items-center justify-center z-50 border-[1px] border-gray-400">
            <div className='text-[24px] font-bold'>
                You have successfully signed up
            </div>
            <div>
                Please active your account by clicking the link sent to your email
            </div>
            <div>
                <CheckCircleOutlineIcon style={{ "fontSize": "60px", "color": "green" }} />
            </div>
            <div className='flex gap-4 flex-row pl-4 pr-4 w-full'>
                <button onClick={() => { navigate("/") }} className="bg-white border-[1px] border-pumpkin text-pumpkin rounded px-4 py-2 w-full h-[40px]">
                    OK
                </button>

            </div>
        </div>
    );
}