import React from 'react'
import { useState } from 'react'
import { baseUrl } from '../../api/GET';
export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmitEvent = (e) => {
        e.preventDefault();
        fetch(`${baseUrl}auth/verify-email?token=${token}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(res => res.json()).then((res) => {
            if (res.code === 'OK') {
                setMessage("Verify email successfully !");
            } else {
                setMessage(res.message);
            }

        })
    }
    return (
        <>
            {/*
            This example requires updating your template:

            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-left text-[2.9rem] font-bold leading-9 tracking-tight text-gray-900 font-size ">
                        Verify Email
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Verify Code
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setToken(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    tabIndex={1}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>


                    <div>
                        <button
                            onClick={handleSubmitEvent}
                            type="submit"
                            tabIndex={3}
                            className="flex w-full justify-center rounded-md bg-yaleBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Verify
                        </button>
                    </div>
                    <p className={`mt-4 mb-4 text-left text-sm text-red ${message === "" ? "hidden" : ""}`}>
                        {message}
                    </p>

                </div>
            </div>
        </>
    )
}

