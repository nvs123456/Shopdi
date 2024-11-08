import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CATEGORIES from '@/data/categories_data';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
const product = {
    id: 0,
    name: "Product name with long long long description",
    image: "",
    rating: 3.5,
    description: `✅Thông tin sản phẩm : Giày Jordan Cổ Thấp, Giày Thể Thao Jordan Paris Cổ Thấp Xám Hàng Chuẩn Trung, Đế đi êm chân, Full Bill Box \n

                    - Tăng thêm chiều cao 4cm \n

                    - phối đồ mọi phong cách\n

                    - Đế khâu 2 lớp chuẩ n hàng Trung\n

                    - Size: 36 > 43 dành cho cả nam và nữ\n

                    - Mã sản phẩm: Jordan Paris\n

                    - Xuất xứ : được sản xuất tại nhà máy Quảng Châu\n
                    James Sneaker cam kết:\n

                    ✅CAM KẾT : HOÀN TIỀN 100% NẾU SẢN PHẨM KHÔNG ĐÚNG MÔ TẢ .\n
                    ✅HỖ TRỢ ĐỔI SIZE TRONG 3 NGÀY NẾU KHÔNG ĐI VỪA .\n
                    ✅ĐƯỢC KIỂM TRA HÀNG TRƯỚC KHI THANH TOÁN ( GỌI CHO SHOP THEO HOTLINE NẾU BƯU TA K HỖ TRỢ CHO KIỂM TRA HÀNG )\n
                    ✅SẢN PHẨM TRƯỚC KHI GIAO CHO KHÁCH HÀNG ĐẦY ĐỦ BILL,BOX, TAG...`,
    review: 1000,
    sold: 100,
    price: 199000,
    inStock: 100,
    category: ["Thời Trang Nam", 'Quần Jeans'],
    phan_loai:
        [
            {
                type: "mau sac",
                value: [
                    "xanh",
                    "do",
                    "vang",
                    "tim",
                    "den",
                    "hong",
                    "xam", "nau",
                    "trang"
                ]
            },
            {
                type: "kich thuoc",
                value: [
                    "S",
                    "M",
                    "L"
                ]
            }
        ],
    chi_tiet: [
        {
            name: "Danh muc",
            value: "Thoi trang nam> Giay"
        },
        {
            name: "Mau sac",
            value: "xanh"
        },
        {
            name: "Brand",
            value: "Jordan"
        },
        {
            name: "khoi luong",
            value: "1kg"
        }, {
            name: "Kich thuoc",
            value: '33.5 x 22.5 x 12.5 cm'
        },
        {
            name: "chat lieu",
            value: "Polyester"
        }
    ]

}
export default function EditProduct({ }) {
    console.log('EditProduct component rendered');
    console.log('Product:', product);

    const categories = CATEGORIES.CATEGORIES;
    const [currentCategory, setCurrentCategory] = useState(categories[0]);
    const [variants, setVariants] = useState(product.variants || []);
    const [listVariants, setListVariants] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        if (product.category) {
            const category = categories.find(cat => cat.name === product.category[0]);
            setCurrentCategory(category);
        }
    }, [product, categories]);

    return (
        <div className='w-full flex flex-row'>
            <div className={`${openPopup ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center`}>
                {/*<QuantityOfVariants variants={listVariants} setOpenPopup={setOpenPopup} />*/}
            </div>
            <div className={`edit-product p-8 w-1/6 bg-white ${openPopup ? 'brightness-50' : ''}`}></div>

            <div className={`edit-product p-8 w-4/6 flex flex-col gap-4 m-auto bg-cloudBlue ${openPopup ? 'brightness-50' : ''}`}>
                <div>
                    <span className='text-celticBlue text-xl hover:text-black cursor-pointers h-10' onClick={() => window.history.back()}>
                        <ArrowBackIcon style={{ fontSize: '40px' }} />
                    </span>
                    <span className="inline-block font-bold text-xl ml-4 p-2">Edit Product</span>
                    <span onClick={() => {
                        onAddVariant(variants, setListVariants, setOpenPopup)
                    }}
                          className="inline-block font-bold text-xl float-right bg-celticBlue text-white p-2 rounded cursor-pointer hover:bg-yaleBlue">Save product</span>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='general-infor border-2 border-gray-200 p-4'>
                        <div>
                            <span className='font-bold text-xl'>General information</span>
                        </div>
                        <div>
                            <label> Product name</label>
                            <input type="text" className='outline-none w-full border-2 border-gray-400 h-10 rounded pl-4' placeholder='Enter product name' defaultValue={product.name}></input>
                        </div>
                        <div>
                            <label> Product description</label>
                            <textarea className='outline-none w-full border-2 border-gray-400 h-40 rounded p-4' placeholder='Enter product description' defaultValue={product.description}></textarea>
                        </div>
                    </div>
                    <div className='media border-2 border-gray-200 p-4'>
                        <div>
                            <span className='font-bold text-xl'>Media</span>
                            {/*<UploadAndDisplayImage initialImages={product.images} />*/}
                        </div>
                    </div>
                    <div className='category border-2 border-gray-200 p-4'>
                        <div>
                            <span className='font-bold text-xl'>Category</span>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className=' flex flex-col'>
                                <label> Category</label>
                                <select className='border-2 border-gray-400 w-60 h-10 rounded' defaultValue={currentCategory} onChange={(e) => {
                                    const tmp = categories.find((i) => i.name === e.target.value)
                                    setCurrentCategory(tmp)
                                }}>
                                    {categories.map((item, index) => {
                                        return (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className=' flex flex-col'>
                                <label>Sub Category</label>
                                <select className='border-2 border-gray-400 w-60 h-10 rounded' >
                                    {currentCategory.sub_categories.map((item, index) => {
                                        return <option key={index} value={item}>{item}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="pricing border-2 border-gray-200 p-4 flex flex-col gap-2">
                        <div>
                            <span className='font-bold text-xl'>Pricing</span>
                        </div>
                        <div>
                            <label className='block'>Price</label>
                            <input type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4' defaultValue={product.price}></input>
                        </div>
                        <div>
                            <label className='block'>Discount</label>
                            <input type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4' defaultValue={product.discount}></input>
                        </div>
                        <div>
                            <label className='block'>Brand</label>
                            <input type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4' defaultValue={product.brand}></input>
                        </div>
                        <div>
                            <label className='block'>Quantity</label>
                            <input type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4' defaultValue={product.quantity}></input>
                        </div>
                    </div>
                    <div className="variant">
                        <div>
                            <span className='font-bold text-xl'>Variant</span>
                        </div>
                        <div>
                            {/*<VariantsForm variants={variants} setVariants={setVariants} />*/}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`edit-product p-8 w-1/6 bg-white ${openPopup ? 'brightness-50' : ''}`}></div>
        </div>
    )
}