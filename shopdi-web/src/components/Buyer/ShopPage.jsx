import shopdiLogo from './assets/images/shopdi_logo.jpeg';
import Filter from './Filter.jsx';

export default function ShopPage() {
    const shop_info = {
        name: "Shopdi",
        link: "https://shopdi.com",
        image: shopdiLogo,
        review: "3,1tr",
        "san_pham": "100",
        "tham_gia": " 2 nam truoc"
    }
    let product = {
        id: 0,
        name: "Product 1",
        image: shopdiLogo,
        rating: 3.5,
        sold: 100,
        price: 100
    };
    let product_tmp = [];
    for (let i = 0; i < 10; i++) {
        let tmp = { ...product };
        tmp.id = i;
        product_tmp.push(tmp);
    }
    const currentCategory = {
        name:"Danh muc",
        sub_categories:[
            "May tinh","Dien thoai","linh kien"
        ]
    }
    return (
        <div className='flex flex-col px-11'>

            <div className="shop-info bg-white border-2 rounded-md p-4 mx-24">
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
            <div>
                <div>
                    <Filter category={currentCategory} products={product_tmp} />
                </div>
            </div>
        </div>
    )
}