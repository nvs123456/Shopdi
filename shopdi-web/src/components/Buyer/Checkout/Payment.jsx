import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useState } from 'react';
export default function Payment() {
    const [payment, setPayment] = useState("cod");
    return (
        <div className="flex flex-col gap-4 p-8 border-2 border-gray-600 mr-10 ml-10 mb-8">
            <div>
                <label className="text-xl">Payment</label>
                <div className="flex flex-row justify-center">
                    <div className="flex flex-row">
                        
                        <div className="flex flex-col items-center border-r-2 border-gray-400">
                            <label className="text-pumpkin"><AttachMoneyIcon /></label>
                            <label className="p-2" htmlFor="cod">Thanh toán khi nhận hàng</label>
                            <input type="radio" name="payment" id="cod" defaultChecked onChange={()=>{setPayment("cod")}}></input>
                        </div>
                        <div className="flex flex-col items-center">
                            <label><img className=" h-[24px]" src='https://stcd02206177151.cloud.edgevnpay.vn/assets/images/logo-icon/logo-primary.svg' /></label>
                            <label className="p-2" htmlFor="vnpay">Thanh toán bằng VNPay</label>
                            <input type="radio" name="payment" id="vnpay" onChange={()=>{setPayment("vnpay")}}></input>
                        </div>
                    </div>
                </div>
            </div>
            {payment == "vnpay" && <div>
                <div>
                    <label className="text-xl" htmlFor="name_on_card">Name on card</label>
                    <input className="w-full h-10 rounded border-2 border-gray-400 outline-none" type="text" id="name_on_card"></input>
                </div>
                <div>
                    <label className="text-xl" htmlFor="card_number">Card number</label>
                    <input className="w-full h-10 rounded border-2 border-gray-400 outline-none" type="number" id="card_number"></input>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="exp_month">Expire date</label>
                        <input className=" h-10 rounded border-2 border-gray-400 outline-none" type="text" id="exp_month" />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="cvc">CVC</label>
                        <input className="h-10 rounded border-2 border-gray-400 outline-none" type="text" id="cvc" />
                    </div>
                </div>
            </div>
            }
            <input name="chrome-autofill-dummy1" style={{ display: 'none' }} disabled />
            <input name="chrome-autofill-dummy2" style={{ display: 'none' }} disabled />
            <input name="chrome-autofill-dummy2" style={{ display: 'none' }} disabled />

        </div>
    )
}