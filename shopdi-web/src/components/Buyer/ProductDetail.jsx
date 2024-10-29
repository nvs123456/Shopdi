import React, {useState} from 'react'
import StarIcon from '@mui/icons-material/Star';
import './product_detail.css'
import shopdiLogo from '@/assets/images/shopdi_logo.jpeg';

export default function ProductDetail() {
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
        categoty: ["Thoi trang nam", 'Quan'],
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
    const shop_info = {
        name: "Shopdi",
        link: "https://shopdi.com",
        image: shopdiLogo,
        review: "3,1tr",
        "san_pham": "100",
        "tham_gia": " 2 nam truoc"
    }
    let phan_loai = product.phan_loai.map((i) => {
        return {
            type: i.type,
            value: null
        }
    })
    const [amount, setAmount] = useState(1);
    const [attributeProduct, setAttributeProduct] = useState(phan_loai);
    const [isBuyNowWithoutAttribute, setIsBuyNowWithoutAttribute] = useState(false);
    const onChangeAttribute = (type, value) => {
        let tmp = [...attributeProduct]
        tmp.find((i) => i.type === type).value = value
        setAttributeProduct(tmp)
    }
    const handleAddToCart = () => {
        console.log("add to cart")
    }
    const handleBuyNow = () => {
        for (let i = 0; i < attributeProduct.length; i++) {
            if (attributeProduct[i].value === null) {
                setIsBuyNowWithoutAttribute(true)
                return
            }
        }
        setIsBuyNowWithoutAttribute(false)
        console.log("buy now")
    }
    const product_subImages = ["link-main-image", "link-image-1", "link-image-2", "link-image-3", "link-image-4", "link-image-5", "link-image-6", "link-image-7", "link-image-8", "link-image-9", "link-image-10"]
    const [subImages, setSubImages] = useState([0, 1, 2, 3, 4])
    const [curImage, setCurImage] = useState(0)
    return (
        <div className="pr-40 pl-40 bg-cloudBlue">
            <div className="pt-10 flex flex-col gap-y-2">
                <div className="product-info bg-white flex flex-row gap-x-8 border-2 rounded-md">
                    <div className="product-image w-2/5 p-2">
                        <div className=" main-image w-full min-h-96 bg-red">
                            <img src="#" alt={`image ${curImage}`} className="w-100 h-100" />
                        </div>
                        <div className="sub-image w-full min-h-12 bg-white flex flex-row gap-x-2 mt-2">
                            <button onClick={() => {
                                if(subImages[0] === 0) return
                                let tmp = subImages.map((i) => i-1)
                                setSubImages(tmp)
                            }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                            </button>
                            {subImages.map((i) => <div className="w-16 h-16 stretch bg-green" key={i} onClick={() => setCurImage(i)}><img src="#" alt={`image ${i}`} /></div>)}
                            <button onClick={() => {
                                if (subImages[4] === product_subImages.length - 1) return
                                let tmp = subImages.map((i) => i + 1)
                                setSubImages(tmp)
                            }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="product-description flex flex-col gap-y-4">
                        <div className="text-2xl text-wrap">
                            <p>{product.name}</p>
                        </div>
                        <div className="flex flex-row gap-x-5">
                            <div className='border-r-2 pr-4 border-grey'>
                                {[1, 2, 3, 4, 5].map((i) => i < Math.round(product.rating) ? <StarIcon key={i} style={{ color: "yellow", fontSize: "20px" }} /> : <StarIcon key={i} style={{ color: "grey", fontSize: "20px" }} />)}
                            </div>
                            <div className='border-r-2 pr-4 border-grey'>
                                {product.review} danh gia
                            </div>
                            <div>
                                {product.sold} da ban
                            </div>
                        </div>
                        <div>
                            <span className='text-4xl'>&#8363; {product.price}</span>
                        </div>
                        {product.phan_loai.map((item) => (
                            <div key={item.type} className='flex flex-row'>
                                <div className='text-base align-middle text-gray-600 min-w-20 text-left'>{item.type}</div>
                                <div className='flex flex-row gap-x-2 gap-y-2 flex-wrap'>
                                    {item.value.map((i) =>
                                    (<div key={i}>
                                        <input type="radio" name={`${item.type}`} id={`${i}`} className="opacity-0 w-0" value={i} onChange={(e) => { onChangeAttribute(item.type, e.target.value) }} />
                                        < label htmlFor={`${i}`} className=' inline-block text-center min-w-20 border-2 pt-1 pb-1 border-gray-300 cursor-pointer' >{i}</label>
                                    </div>))}
                                </div>
                            </div>
                        ))}
                        <div className='flex flex-row'>
                            <div className='text-base align-middle text-gray-600 min-w-20 text-left'>So luong</div>
                            <div className='flex flex-row flex-wrap'>
                                <button className='bg-white  border-gray-300  px-2 border-x-2 border-y-2' onClick={() => { amount > 1 ? setAmount(amount - 1) : setAmount(amount) }}>-</button>
                                <div className='min-w-16 text-center border-gray-300 border-y-2'><span >{amount}</span></div>
                                <button className='bg-white  border-gray-300  px-2 border-x-2 border-y-2' onClick={() => setAmount(amount + 1)}>+</button>
                                <div className='ml-4'> Con lai {product.inStock} san pham </div>
                            </div>
                        </div>
                        {isBuyNowWithoutAttribute ? <div className='text-red'>Vui long chon phan loai hang !</div> : null}
                        <div className='flex flex-row ml-4'>
                            <button className='bg-pumpkin font-publicSans text-white rounded-sm cursor-pointer border-2 p-2' onClick={handleAddToCart}>Them vao gio hang</button>
                            <button className='ml-2 bg-white font-publicSans text-pumpkin rounded-sm cursor-pointer  border-pumpkin  p-2 border-2' onClick={handleBuyNow}>Mua ngay</button>
                        </div>
                    </div>
                </div>
                <div className="shop-info bg-white border-2 rounded-md p-4">
                    <div className=" flex flex-row gap-x-4 items-center">
                        <div>
                            <img src={shopdiLogo} alt="Logo" className="h-14 w-auto rounded-full" />
                        </div>
                        <div>
                            <div className="text-2xl">{shop_info.name}</div>
                            <div className='max-w-40 border-2 border-gray-300 bg-white font-publicSans p-2 text-sm'><a href="#"> Xem shop</a></div>
                        </div>
                        <div>Danh gia:   <span className='text-pumpkin'>{shop_info.review}</span></div>
                        <div>San pham:   <span className='text-pumpkin'>{shop_info.san_pham}</span></div>
                        <div>Tham gia:   <span className='text-pumpkin'>{shop_info.tham_gia}</span></div>

                    </div>
                </div>
                <div className="description bg-white flex flex-col gap-x-8 border-2 rounded-md p-4">
                    <div className="text-2xl">
                        <pre>Chi tiet san pham</pre>
                    </div>
                    <div className="flex flex-col">
                        {product.chi_tiet.map((item) => (
                            <div key={item.name}>
                                <div className='inline-block text-left min-w-40 max-w-40'>{item.name}:</div>
                                <div className='inline-block'>{item.value}</div>
                            </div>
                        ))}
                    </div>
                    <div className="text-2xl">
                        <pre>Mo ta</pre>
                    </div>
                    <div className="font-publicSans white-space-pre">
                        {product.description}
                    </div>
                </div>
            </div>
        </div >
    )
}