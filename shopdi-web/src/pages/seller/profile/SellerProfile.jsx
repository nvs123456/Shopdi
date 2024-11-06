export default function  SellerProfile() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans text-sm">
            <h1 className="text-3xl font-semibold mt-10">Profile</h1>
            <div className="bg-white w-full max-w-4xl rounded-lg mb-10 mt-10">
                {/* Profile Picture and Name */}
                <div className="bg-gradient-to-b from-blue-300 rounded-t-lg to-blue-50 flex flex-col items-center">
                    <div className="relative mt-2 w-20 h-20">
                        <img
                            src="/src/assets/images/UETLogo.png" // replace with actual image path
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold">Username</h2>
                    <p className="text-gray-500">Owner & Founder</p>
                </div>

                {/* Business Info Section */}
                <div className="mt-8 p-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Business info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Business/shop name</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                value="Shopdi"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                value="shopdi@gmail.com"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Contact no.</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                value="1********0"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                value="1 Xuan Thuy, Cau Giay, Hanoi, Vietnam"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Account no.</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                value="7***********"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">GSTIN</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                value="1*******"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Logo</label>
                            <div
                                className="h-[300px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center h-24 mt-1">
                                <span className="text-gray-500">Logo here</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">About</label>
                            <textarea
                                className="h-[300px] border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                                rows="3"
                                value="Lorem ipsum hrfuhjsnkliiojwi xshuihn ahuiujoimnklince adbuijnhjnjk jabdijooiaksnmklmb sdweijlfowmkl. edewjsnmnnbdffhcklj,s shhjboioiauauwnjnsdbuwbuh shdbuibuihuinj j ljknoioj."
                            />
                        </div>
                    </div>
                    {/* Save Changes Button */}
                    <div className="flex justify-end mt-6">
                        <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
                            SAVE CHANGES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}