import React from 'react'
import { useState } from 'react'
import { POST } from '../../api/GET'
const SignUpForm = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [message, setMessage] = useState("");
    const handleSubmitEvent = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/users/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }).then(res => res.json()).then((res) => {
            if (res.code === 'OK') {
                setMessage("Create account successfully !");
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
            <div className="flex min-h-full flex-1 flex-col justify-center py-24">
                <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-cloudBlue px-12 py-6 border-t-[1px] border-x-[1px] rounded">
                    <h2 className="mt-4 text-left text-5xl font-bold leading-9 tracking-tight text-gray-900 font-size ">
                        Create an Account
                    </h2>
                </div>

                <div className=" sm:mx-auto sm:w-full sm:max-w-lg bg-cloudBlue px-12 pt-6 border-b-[1px] border-x-[1px] rounded">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="text-xl block font-medium leading-6 text-gray-900">
                                Username/Email address
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
        </>
    )
}

export default SignUpForm