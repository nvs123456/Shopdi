export default function AddressSelection({ onClose, addresses, currentAddress, setCurrentAddress }) {

    return (
        <div className="flex flex-col w-96 h-2/3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-10 p-4">
            <div className="text-xl text-red font-bold border-b-2 border-gray-400 pb-4">Dia chi cua toi</div>
            <div className="no-scrollbar overflow-y-scroll">
                {addresses.map((item) => <Address key={item.id} address={item} currentAddress={currentAddress} setCurrentAddress={setCurrentAddress}/>)}
                
            </div>
            <div className="flex flex-row justify-end">
                <button onClick={() => onClose()} className="bg-white cursor-pointer border-2 border-gray-400 text-black w-20 p-2 mt-2 mb-2 mr-2">Huy</button>
                <button onClick={() => onClose()} className="bg-pumpkin cursor-pointer border-2 border-gray-400 text-white w-20 p-2 mt-2 mb-2 mr-4">Luu</button>
            </div>
        </div>
    )
}
function Address({ address,currentAddress,setCurrentAddress }) {
    return (
        <div className="flex flex-row gap-2 py-2 border-b-2 border-gray-400">
            <div className="">
                <input type="radio" name="selected-address" onClick={() => setCurrentAddress(address)} defaultChecked={address.id === currentAddress.id} id={address.id} className="mt-2" />
            </div>
            <div>
                <div className="flex flex-row">
                    <div className="pr-2 border-r-2 border-gray-400">{address.firstName} {address.lastName}</div>
                    <div className="text-gray-600">(Phone){address.phone}</div>
                </div>
                <div className="text-gray-600">{address.address}</div>
            </div>

        </div>
    )
}