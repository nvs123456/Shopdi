export default function Payment() {
    return (
        <div className="flex flex-col gap-4 p-8 border-2 border-gray-600 mr-40 ml-40 mb-8">
            <div>
                <label className="text-xl">Payment</label>
                <div className="flex flex-row justify-center">
                    <div className="flex flex-row">
                        <div className="flex flex-col contents-center border-r-2 border-gray-400">
                            <label className="p-2" htmlFor="the">Thanh toan bang the</label>
                            <input type="radio" name="payment" id="the"></input>

                        </div>
                        <div className="flex flex-col contents-center border-r-2 border-gray-400">
                            <label className="p-2" htmlFor="cod">Thanh toan khi nhan hang</label>
                            <input type="radio" name="payment" id="cod"></input>
                        </div>
                        <div className="flex flex-col">
                            <label className="p-2" htmlFor="vnpay">Thanh toan bang vnpay</label>
                            <input type="radio" name="payment" id="vnpay"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <label className="text-xl" htmlFor="name_on_card">name on card</label>
                <input className="w-full h-10 rounded border-2 border-gray-400 outline-none" type="text" id="name_on_card"></input>
            </div>
            <div>
                <label className="text-xl" htmlFor="card_number">card number</label>
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
            <input name="chrome-autofill-dummy1" style={{ display: 'none' }} disabled />
            <input name="chrome-autofill-dummy2" style={{ display: 'none' }} disabled />
            <input name="chrome-autofill-dummy2" style={{ display: 'none' }} disabled />

        </div>
    )
}