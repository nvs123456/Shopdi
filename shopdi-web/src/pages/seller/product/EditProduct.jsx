import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CATEGORIES from '@/data/categories_data';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { JSONToData } from '@/utils/todo';
import { useNavigate, useLocation } from 'react-router-dom';
import { PUT, GET, POST,baseUrl } from '@/api/GET';
import SpinnerLoading from '@/components/SpinnerLoading/SpinnerLoading';

export default function EditProduct() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/');
    const productId = path[path.length - 1];
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productForm, setProductForm] = useState({
        productName: '',
        description: '',

        // Media
        imageUrls: [],

        // Pricing
        price: 0,
        discountPercent: 0,

        brand: '',

        // Variant
        variantDetails: [],
        quantity: 0,

        // Category and Tags
        categoryName: '',
        tagNames: [],

        // Status
        productStatus: 'PUBLISHED',
    })
    useEffect(() => {
        GET('categories').then((data) => {
            if (data.code === 'OK') {
                setCategories(data.result)
                const tmpCategories = data.result
                GET(`products/${productId}`).then((data) => {
                    if (data.code === 'OK') {
                        let parent = tmpCategories.find((item) => item.childCategories.find((i) => i.name === data.result.categoryName) !== undefined)
                        setCurrentCategory({ parent: parent.name, child: data.result.categoryName })
                        setProductForm({ ...data.result, variantDetails: data.result.variants })
                        setLoading(false)

                    }
                })
            }
        })

    }, [])

    const [currentCategory, setCurrentCategory] = useState({
        parent: '',
        child: '',
    });
    const [variants, setVariants] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [listVariants, setListVariants] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    if (!loading && currentCategory.child !== '') return (
        <div className='relative'>
            <div className={` ${uploadingImage ? '' : 'hidden'} justify-center items-center place-content-center text-2xl text-center bg-white z-10 fixed p-8 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                Uploading images...<SpinnerLoading size={2} />
            </div>
            <div className={`${uploadingImage ? 'brightness-50' : ''} w-full flex flex-row `}>
                <div className={`add-product p-8 w-1/6  bg-white ${openPopup ? 'brightness-50' : ''}`}></div>

                <div className={`add-product p-8 w-4/6 flex flex-col gap-4 m-auto bg-cloudBlue ${openPopup ? 'brightness-50' : ''}`}>

                    <div>
                        <span className='text-celticBlue text-xl hover:text-black cursor-pointers h-10' onClick={() => window.history.back()}><ArrowBackIcon style={{ fontSize: '40px' }} /></span>
                        <span className="inline-block font-bold text-xl ml-4 p-2">Edit Product</span>
                        <span onClick={() => {
                            let tmp = 0
                            for (let i = 0; i < productForm.variantDetails.length; i++) {
                                tmp += parseInt(productForm.variantDetails[i].quantity)
                            }
                            const listQuantity = document.getElementsByClassName("list-quantity")
                            for (let i = 0; i < listQuantity.length; i++) {
                                if (listQuantity[i].value === "") {
                                    alert("Please enter quantity")
                                    return
                                }
                            }

                            PUT(`seller/update-product/${productId}`, { ...productForm, quantity: tmp }
                            ).then((res) => {
                                if (res.code === "OK") {
                                    if (!document.getElementById("uploadAndDisplayImage").classList.contains("hidden")) {
                                        let count = 0
                                        for (let i = 0; i < selectedImage.length; i++) {
                                            if (selectedImage[i].isChoosed === true) {
                                                count++
                                            }
                                        }
                                        if (count < 5) {
                                            alert("Please upload at least 5 images")
                                            return
                                        } if (count > 10) {
                                            alert("Please upload at most 10 images")
                                            return
                                        }
                                        setUploadingImage(true)
                                        updateImages(productId, selectedImage).then((res) => {
                                            if (res.code === "OK") {
                                                alert("Update product successfully")
                                                navigate(`/seller/products`)
                                            }
                                        })
                                    } else {
                                        navigate(`/seller/products`)
                                    }


                                } else {
                                    alert(res.message)
                                }
                            })

                        }
                        }
                            className="inline-block font-bold text-xl float-right bg-celticBlue text-white p-2 rounded cursor-pointer hover:bg-yaleBlue">Save product</span>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='general-infor border-2 border-gray-200 p-4'>
                            <div>
                                <span className='font-bold text-xl'>General information</span>
                            </div>
                            <div>
                                <label> Product name</label>
                                <input defaultValue={productForm.productName} onChange={(e) => {
                                    setProductForm({ ...productForm, productName: e.target.value })

                                }}
                                    type="text" required className='required-field outline-none w-full border-2 border-gray-400 h-10 rounded pl-4' placeholder='Enter product name'></input>
                            </div>
                            <div>
                                <label> Product description</label>
                                <textarea defaultValue={productForm.description} onChange={(e) => {
                                    setProductForm({ ...productForm, description: e.target.value })
                                }}
                                    className=' required-field outline-none w-full border-2 border-gray-400 h-40 rounded p-4' placeholder='Enter product name'></textarea>

                            </div>
                        </div>
                        <div className='media border-2 border-gray-200 p-4'>
                            <div>
                                <span className='font-bold text-xl'>Media<span className='text-red float-right underline hover:text-celticBlue' onClick={
                                    () => {
                                        document.getElementById("displayImages").style.display = "none"
                                        document.getElementById("uploadAndDisplayImage").classList.remove("hidden")
                                        setProductForm({ ...productForm, imageUrls: [] })
                                    }
                                }>Replace images</span></span>
                                <div id="displayImages">
                                    <DisplayImages imageUrls={productForm.imageUrls} />

                                </div>
                                <div className='hidden' id='uploadAndDisplayImage'>
                                    <UploadAndDisplayImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                                </div>
                            </div>
                        </div>
                        <div className='category border-2 border-gray-200 p-4'>

                            <div>
                                <span className='font-bold text-xl'>Category</span>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className=' flex flex-col'>
                                    <label> Category</label>
                                    <select className='border-2 border-gray-400 w-60 h-10 rounded' value={currentCategory.parent} onChange={(e) => {
                                        const tmp = categories.find((i) => i.name === e.target.value)
                                        setCurrentCategory({ parent: tmp.name, child: tmp.childCategories[0].name })
                                        setProductForm({ ...productForm, categoryName: tmp.childCategories[0].name })
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
                                    <select name="categoryName" className='border-2 border-gray-400 w-60 h-10 rounded' value={currentCategory.child}
                                        onChange={(e) => {
                                            setCurrentCategory({ parent: currentCategory.parent, child: e.target.value })
                                            setProductForm({ ...productForm, categoryName: e.target.value })
                                        }}>
                                        {categories.find((i) => i.name === currentCategory.parent).childCategories.map((item, index) => {
                                            return <option key={index} value={item.name}>{item.name}</option>
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
                                <input defaultValue={productForm.price} onChange={(e) => {
                                    setProductForm({ ...productForm, price: e.target.value })
                                }}
                                    type="number" className=' required-field outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4'></input>
                            </div>

                            <div>
                                <label className='block'>Brand</label>
                                <input defaultValue={productForm.brand} onChange={(e) => {
                                    setProductForm({ ...productForm, brand: e.target.value })
                                }}
                                    type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4'></input>
                            </div>
                            <div>
                                <label className='block'>Status</label>
                                <select defaultValue={productForm.status} className='border-2 border-gray-400 w-60 h-10 rounded' onChange={(e) => {
                                    setProductForm({ ...productForm, status: e.target.value })
                                }}>
                                    <option value={"PUBLISHED"}>PUBLISHED</option>
                                    <option value={"DRAFT"}>DRAFT</option>
                                    <option value={"DELETED"}>DELETED</option>

                                </select>
                            </div>
                        </div>
                        <div className="variant">
                            <div>
                                <span className='font-bold text-xl'>Variant<span className='text-gray-400'>  (Ex: Type: Color, Values: green, red,..)</span></span>
                            </div>
                            {/* <div> */}
                            {/* <VariantsForm variants={variants} setVariants={setVariants} /> */}
                            {/* </div> */}
                            <div className={`inset-0 z-50 flex items-center justify-center`}>
                                <QuantityOfVariants variants={listVariants} setOpenPopup={setOpenPopup} productForm={productForm} setProductForm={setProductForm} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`add-product p-8 w-1/6  bg-white ${openPopup ? 'brightness-50' : ''}`}></div>

            </div>
        </div>
    )
    else {
        return (<h1>Loading...</h1>
        )
    }
}
const DisplayImages = ({ imageUrls }) => {
    return (
        <div className='flex flex-row gap-4 flex-wrap p-4 w-full min-h-[100px] border-2 border-gray-200 rounded'>
            {imageUrls.map((item, index) => {
                return (
                    <div key={index} className='flex flex-col'>
                        <img src={item} className='w-24 h-24' />
                    </div>
                )
            })
            }
        </div>
    )
}
const UploadAndDisplayImage = ({ selectedImage, setSelectedImage }) => {
    // Define a state variable to store the selected image

    // Return the JSX for rendering
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-4 flex-wrap p-4 w-full min-h-[100px] border-2 border-gray-200 rounded'>
                <label htmlFor="myImage" className='inline-block mt-[12px] ml-[12px] cursor-pointer bg-white border-dashed border-2 text-white rounded w-24 h-24 text-center content-center hover:bg-gray-200'>
                    <AddIcon className='text-black ' />
                </label>
                <input
                    id='myImage'
                    className='hidden'
                    type="file"
                    multiple
                    name="myImage"
                    onChange={(event) => {
                        let tmp = [...selectedImage]
                        for (let i = 0; i < event.target.files.length; i++) {
                            tmp.push({ path: event.target.files[i], isChoosed: true })
                        }
                        setSelectedImage(tmp);

                    }}
                />
                {selectedImage.length > 0 && (
                    selectedImage.map((item, index) => {
                        if (item.isChoosed === false) return null
                        return (
                            <div key={`image-${index}`} className='relative p-[12px] rounded'>
                                <div key={index} className='w-24 h-24 flex items-center bg-white rounded'>
                                    <img
                                        alt="not found"
                                        src={URL.createObjectURL(item.path)}
                                    />
                                </div>
                                <label className='absolute top-0 right-0 bg-gray-600 rounded-full' onClick={() => {
                                    let tmp = [...selectedImage];
                                    tmp[index].isChoosed = false
                                    setSelectedImage(tmp);
                                }} >
                                    <CloseIcon />
                                </label>
                            </div>
                        )
                    })

                )}

            </div>

        </div >
    );
};
function QuantityOfVariants({ productForm, setProductForm }) {
    if ((productForm.variantDetails.length === 1 && productForm.variantDetails[0].variantDetail === null) || (productForm.variantDetails.length === 0)) {
        return (
            <div className='bg-white p-4'>
                <div className='w-[600px] rounded p-4 border-2 border-gray-200 flex flex-col gap-4 items-center'>
                    <span className='font-bold text-xl'>Enter quantity</span>
                    <input defaultValue={productForm.variantDetails[0].quantity} id="quantity" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4' type='number' onChange={(e) => {
                        setProductForm({ ...productForm, variantDetails: [{ variantDetail: null, quantity: e.target.value }] })
                    }} />
                </div>
            </div>
        )
    }


    return (
        <div className='bg-white p-4 rounded'>
            <div><span>*Please type quantity of each variant ( 0 if not available)</span></div>
            <div className='w-[600px] rounded p-4 border-2 border-gray-200'>
                <span>Variant</span>
                <span className='float-right'>Quantity</span>
            </div>
            <div className='flex flex-col w-[600px] border-2 border-gray-200 overflow-y-scroll no-scrollbar max-h-[300px]'>
                {productForm.variantDetails.map((item, index) => {
                    return (
                        <div key={`${index}-${item}`} className='flex flex-row gap-4 w-full border-b-2 border-gray-200 h-auto'>
                            <span className='border-r-2 border-gray-200 grow place-content-center'>{JSONToData(item.variantDetail)}</span>
                            <input type="number" defaultValue={productForm.variantDetails[index].quantity} placeholder='type number' className='list-quantity outline-none w-1/6 h-10' onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9)
                                let tmp = [...productForm.variantDetails];
                                tmp[index].quantity = e.target.value
                                setProductForm({ ...productForm, variantDetails: tmp })
                            }}></input>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}
async function updateImages(productId, selectedImage) {
    const formData = new FormData();
    for (let i = 0; i < selectedImage.length; i++) {
        if (selectedImage[i].isChoosed) {
            formData.append('images', selectedImage[i].path);
        }
    }
    return await fetch(`${baseUrl}images/update-product-images/${productId}`, {
        method: "PUT",
        headers: {
            // 'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem("Authorization")}`
        },
        body: formData
    }).then(res => res.json());
}