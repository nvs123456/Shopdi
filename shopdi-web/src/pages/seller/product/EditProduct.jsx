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
            <div className={`${uploadingImage ? 'brightness-50' : ''} w-full flex flex-row  bg-cloudBlue`}>
                <div className={`add-product p-8 w-[15%]  bg-cloudBlue ${openPopup ? 'brightness-50' : ''}`}></div>

                <div className={`add-product my-12  pb-8 w-[70%] flex flex-col gap-8 m-auto bg-cloudBlue  ${openPopup ? 'brightness-50' : ''}`}>

                    <div className={"bg-white pt-6 pb-2 px-6 border-[1px]"}>
                        <span className='text-yaleBlue hover:text-black cursor-pointers' onClick={() => window.history.back()}><ArrowBackIcon  className={"mb-4"} style={{ fontSize: '45px' }} /></span>
                        <span className="inline-block font-bold text-3xl ml-2">Edit Product</span>
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
                            className="inline-block font-bold text-xl float-right hover:bg-celticBlue text-white py-2 px-4 rounded cursor-pointer bg-yaleBlue">Save product</span>
                    </div>
                    <div className='flex flex-col gap-8 bg-cloudBlue'>
                        <div className='general-infor border-[1px] py-6 px-8 bg-white'>
                            <div className={"mb-5 pb-3 border-b-2 border-gray-300"}>
                                <span className='font-bold text-yaleBlue text-[26px] mb-6'>General information</span>
                            </div>
                            <div>
                                <label className={"text-xl font-semibold"}> Product name</label>
                                <input defaultValue={productForm.productName} onChange={(e) => {
                                    setProductForm({ ...productForm, productName: e.target.value })

                                }}
                                    type="text" required className='mb-4 mt-2 required-field outline-none w-full border-2 border-gray-400 h-12 rounded pl-4 bg-[#F2F4F5]' placeholder='Enter product name'></input>
                            </div>
                            <div>
                                <label className={"text-xl font-semibold"}> Product description</label>
                                <textarea defaultValue={productForm.description} onChange={(e) => {
                                    setProductForm({ ...productForm, description: e.target.value })
                                }}
                                    className='my-2 required-field outline-none w-full border-2 border-gray-400 h-40 rounded p-4 bg-[#F2F4F5]' placeholder='Enter product name'></textarea>

                            </div>
                        </div>
                        <div className='media border-[1px] py-6 px-8 bg-white'>
                            <div>
                                <div className='font-bold text-yaleBlue text-[26px] mb-3 pb-3 border-b-2 border-gray-300'>Media<span className='text-white float-right bg-[#FA8232] font-sans hover:bg-orangeRed font-semibold text-[20px] rounded px-2 py-1' onClick={
                                    () => {
                                        document.getElementById("displayImages").style.display = "none"
                                        document.getElementById("uploadAndDisplayImage").classList.remove("hidden")
                                        setProductForm({ ...productForm, imageUrls: [] })
                                    }
                                }>Replace images</span></div>
                                <div id="displayImages">
                                    <DisplayImages imageUrls={productForm.imageUrls} />

                                </div>
                                <div className='hidden' id='uploadAndDisplayImage'>
                                    <UploadAndDisplayImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                                </div>
                            </div>
                        </div>
                        <div className='category border-[1px] py-6 px-8 bg-white'>

                            <div className={"mb-5 pb-3 border-b-2 border-gray-300"}>
                                <span className='font-bold text-yaleBlue text-[26px] mb-6'>Category</span>
                            </div>
                            <div className="flex flex-row gap-12">
                                <div className=' flex flex-col'>
                                    <label className={"text-xl font-semibold"}> Category</label>
                                    <select className='mt-4 border-2 border-gray-400 w-60 h-12 rounded px-2 bg-[#F2F4F5]' value={currentCategory.parent} onChange={(e) => {
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
                                    <label className={"text-xl font-semibold"}>Sub Category</label>
                                    <select name="categoryName" className='mt-4 border-2 border-gray-400 w-60 h-12 rounded px-2 bg-[#F2F4F5]' value={currentCategory.child}
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
                        <div className="pricing flex flex-col border-[1px] py-6 px-8 bg-white">
                            <div className={"mb-5 pb-3 border-b-2 border-gray-300"}>
                                <span className='font-bold text-yaleBlue text-[26px]'>Pricing</span>
                            </div>
                            <div>
                                <label className='block text-xl font-semibold'>Price</label>
                                <input defaultValue={productForm.price} onChange={(e) => {
                                    setProductForm({ ...productForm, price: e.target.value })
                                }}
                                    type="number" className='mb-4 mt-2 required-field outline-none w-60 border-2 border-gray-400 h-12 rounded px-2 bg-[#F2F4F5]'></input>
                            </div>

                            <div>
                                <label className='block text-xl font-semibold'>Brand</label>
                                <input defaultValue={productForm.brand} onChange={(e) => {
                                    setProductForm({ ...productForm, brand: e.target.value })
                                }}
                                    type="text" className='mb-4 mt-2 outline-none w-60 border-2 border-gray-400 h-12 rounded px-2 bg-[#F2F4F5]'></input>
                            </div>
                            <div>
                                <label className='block text-xl font-semibold'>Status</label>
                                <select defaultValue={productForm.status} className='mb-4 mt-2 border-2 border-gray-400 w-60 h-12 rounded px-2 bg-[#F2F4F5]' onChange={(e) => {
                                    setProductForm({ ...productForm, status: e.target.value })
                                }}>
                                    <option value={"PUBLISHED"}>PUBLISHED</option>
                                    <option value={"DRAFT"}>DRAFT</option>
                                    <option value={"DELETED"}>DELETED</option>

                                </select>
                            </div>
                        </div>
                        <div className="variant border-[1px] py-6 px-8 bg-white">
                            <div className={"mb-5 pb-3 border-b-2 border-gray-300"}>
                                <span className='font-bold text-yaleBlue text-[26px]'>Variant
                                    <div className='text-gray-600 font-medium text-xl'>  (Ex: Type (color, size,...), Variation (green, red,..))</div></span>
                            </div>
                            {/* <div> */}
                            {/* <VariantsForm variants={variants} setVariants={setVariants} /> */}
                            {/* </div> */}
                            <div className={`inset-0 z-50`}>
                                <QuantityOfVariants variants={listVariants} setOpenPopup={setOpenPopup} productForm={productForm} setProductForm={setProductForm} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`add-product w-[15%]  bg-cloudBlue ${openPopup ? 'brightness-50' : ''}`}></div>

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
        <div className='flex flex-row gap-8 flex-wrap p-4 w-full min-h-[100px]'>
            {imageUrls.map((item, index) => {
                return (
                    <div key={index} className='flex flex-col'>
                        <img src={item} className='w-24 h-24 flex items-center bg-white rounded border-[1px]' />
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
            <div className='flex flex-row gap-4 flex-wrap w-full min-h-[100px] '>
                <label htmlFor="myImage" className='bg-[#F2F4F5] inline-block mt-[12px] mx-[12px] cursor-pointer border-dashed border-2 text-white rounded w-24 h-24 text-center content-center hover:bg-gray-200'>
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
                                <div key={index} className='w-24 h-24 flex items-center bg-white rounded border-[1px]'>
                                    <img
                                        alt="not found"
                                        src={URL.createObjectURL(item.path)}
                                    />
                                </div>
                                <label className='absolute top-0 right-0 bg-gray-200 rounded-full' onClick={() => {
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
            <div className='bg-white p-4 rounded'>
                <div className='w-[400px] rounded p-4 flex flex-col gap-6 items-center'>
                    <span className='font-bold text-yaleBlue text-[26px] '>Enter quantity</span>
                    <input defaultValue={productForm.variantDetails[0].quantity} id="quantity" className='outline-none w-60 border-2 border-gray-400 h-12 rounded pl-4 bg-[#F2F4F5]' type='number' onChange={(e) => {
                        setProductForm({ ...productForm, variantDetails: [{ variantDetail: null, quantity: e.target.value }] })
                    }} />
                </div>
            </div>
        )
    }


    return (
        <div className='bg-white'>
            <div><span className={"text-xl font-medium"}>Please fill the quantity of each variation (fill 0 if unavailable)</span></div>
            <div className='w-[600px] p-4 border-t-2 border-x-2 border-gray-400 mt-4 text-xl font-semibold'>
                <span>Variant</span>
                <span className='float-right pr-8'>Quantity</span>
            </div>
            <div className='flex flex-col w-[600px] border-2 border-gray-400 overflow-y-scroll no-scrollbar max-h-[300px] mb-6'>
                {productForm.variantDetails.map((item, index) => {
                    return (
                        <div key={`${index}-${item}`} className='flex flex-row gap-4 w-full border-b-[1px] border-gray-400 h-auto'>
                            <span className='border-r-2 border-gray-400 grow place-content-center pl-4'>{JSONToData(item.variantDetail)}</span>
                            <input type="number" defaultValue={productForm.variantDetails[index].quantity} placeholder='fill a number' className='list-quantity outline-none w-1/4 h-12' onInput={(e) => {
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