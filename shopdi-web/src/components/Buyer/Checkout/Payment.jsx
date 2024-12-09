import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useState } from 'react';
export default function Payment({payment, setPayment}) {
    return (
        <div className="flex flex-col gap-4 px-8 pt-5 pb-8 border-2 border-[#E4E7E9] mx-10 mb-8">
            <div>
                <label className="text-xl font-semibold">Payment Method</label>
                <div className="flex flex-row justify-center mt-6">
                    <div className="flex flex-row">
                        
                        <div className="flex flex-col items-center border-r-2 border-[#E4E7E9] pr-10">
                            <label className="text-pumpkin"><AttachMoneyIcon /></label>
                            <label className="p-2" htmlFor="cod">Cash on Delivery</label>
                            <input type="radio" name="payment" id="cod" defaultChecked onChange={()=>{setPayment("COD")}}></input>
                        </div>
                        <div className="flex flex-col items-center ml-10">
                            <label><img className=" h-[24px]" src='https://stcd02206177151.cloud.edgevnpay.vn/assets/images/logo-icon/logo-primary.svg' /></label>
                            <label className="p-2" htmlFor="vnpay">VNPay</label>
                            <input type="radio" name="payment" id="vnpay" onChange={()=>{setPayment("VNPAY")}}></input>
                        </div>
                    </div>
                </div>
            </div>
            {payment == "vnpay" && <div>
                <div>
                    <label htmlFor="name_on_card">Name on card</label>
                    <input className="my-2 w-full h-10 rounded border-2 border-[#E4E7E9] outline-none" type="text" id="name_on_card"></input>
                </div>
                <div>
                    <label htmlFor="card_number">Card number</label>
                    <input className="my-2 w-full h-10 rounded border-2 border-[#E4E7E9] outline-none" type="number" id="card_number"></input>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="exp_month">Expire date</label>
                        <input className=" my-2 h-10 rounded border-2 border-[#E4E7E9] outline-none" type="text" id="exp_month" />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="cvc">CVC</label>
                        <input className="my-2 h-10 rounded border-2 border-[#E4E7E9] outline-none" type="text" id="cvc" />
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