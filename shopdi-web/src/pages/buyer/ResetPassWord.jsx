import React from 'react'
import { POST, baseUrl } from '../../api/GET'
import { useNavigate } from 'react-router-dom'
const ResetPassword = () => {
    const navigate = useNavigate()
    const token = new URLSearchParams(window.location.search).get('token')
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const onSubmit = () => {
        if (password === "") {
            alert("Vui lòng nhập mật khẩu")
            return
        } else if (password.length < 8) {
            alert("Mật khẩu phải có ít nhất 8 ký tự")
            return
        } else if (password.length > 32) {
            alert("Mật khẩu phải có nhiều nhất 32 ký tự")
            return
        } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/)) {
            alert("Mật khẩu phải có ít nhất 1 ký tự in hoa, 1 ký tự in thường, 1 số và 1 ký tự đặc biệt, ít nhất 8 ký tự và nhiều nhất 32 ký tự")
            return
        } else if (password !== confirmPassword) {
            alert("Mật khẩu không khớp")
            return
        }
        fetch(`${baseUrl}auth/reset-password`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                newPassword: password,
                confirmPassword: confirmPassword
            })
        }).then(res => res.json()).then((res) => {
            if(res.code === 'OK'){
                navigate("/login")
            }else{
                alert("Token không hợp lệ")
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
                        Reset password
                    </h2>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-cloudBlue px-12 pt-6 border-b-[1px] border-x-[1px] rounded">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">
                                New password
                            </label>

                            <div className="mt-2 mb-8">
                                <input
                                    id="newPassword"
                                    required
                                    tabIndex={1}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={"New password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <span className="text-red text-sm">*Mật khẩu phải có ít nhất 1 ký tự in hoa, 1 ký tự in thường, 1 số và 1 ký tự đặc biệt, ít nhất 8 ký tự và nhiều nhất 32 ký tự</span>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">
                                Confirm new password
                            </label>
                            <div className="mt-2 mb-8">
                                <input
                                    id="confirmPassword"
                                    required
                                    tabIndex={1}
                                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={"Confirm password"}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={onSubmit}
                                tabIndex={3}
                                className="flex w-full justify-center rounded-md bg-yaleBlue p-3 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

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

export default ResetPassword