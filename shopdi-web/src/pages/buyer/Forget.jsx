import React from 'react'

const ForgetPassword = () => {
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
                        Forget password
                    </h2>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-cloudBlue px-12 pt-6 border-b-[1px] border-x-[1px] rounded">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2 mb-8">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    tabIndex={1}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={"Email address"}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                tabIndex={3}
                                className="flex w-full justify-center rounded-md bg-yaleBlue p-3 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Send code
                            </button>
                        </div>
                    </form>

                    <p className="mt-5 text-left text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold leading-6 text-orange-600 hover:text-orange-400">
                            Sign in
                        </a>
                    </p>
                    <p className="mt-2 mb-10 text-left text-sm text-gray-500">
                        Haven't an account yet?{' '}
                        <a href="/buyer/signup" className="font-semibold leading-6 text-orange-600 hover:text-orange-400">
                            Create an account
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword