import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CATEGORIES from '@/data/categories_data';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { POST, GET } from '@/api/GET';
import { JSONToData } from '@/utils/todo';
import SpinnerLoading from '@/components/SpinnerLoading/SpinnerLoading';
import { baseUrl } from '@/api/GET';
export default function AddProduct() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productForm, setProductForm] = useState({
        productName: '',
        description: '',

        // Media
        images: [],

        // Pricing
        price: 0,
        discountPercent: 0,

        Brand: '',

        // Variant
        variantDetails: [],
        quantity: 0,

        // Category and Tags
        categoryName: 'dcm',
        tagNames: [],

        // Status
        status: 'PUBLISHED',
    })
    const [currentCategory, setCurrentCategory] = useState({ parent: '', child: '' });
    const [variants, setVariants] = useState([]);

    const [selectedImage, setSelectedImage] = useState([]);
    const [listVariants, setListVariants] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [isUploadingProduct, setIsUploadingProduct] = useState(false);
    useEffect(() => {
        GET("categories").then((res) => {
            if (res.code === "OK") {
                setCategories(res.result)
                if (res.result.length > 0) {
                    setCurrentCategory({ parent: res.result[0].name, child: res.result[0].childCategories[0].name })
                    setProductForm({ ...productForm, categoryName: res.result[0].childCategories[0].name })
                }
                setLoading(false)
            }
        })
    }, [])
    if (!loading) return (
        <div className='relative'>
            <div className={` ${isUploadingProduct ? '' : 'hidden'} justify-center items-center place-content-center text-2xl text-center bg-white z-10 fixed p-8 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                Uploading images...<SpinnerLoading size={2} />
            </div>
            <div className={`${isUploadingProduct ? 'brightness-50' : ''} w-full flex flex-row bg-cloudBlue `}>
                <div className={`${openPopup ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center`}>
                    <QuantityOfVariants variants={listVariants} setOpenPopup={setOpenPopup}
                        productForm={productForm} setProductForm={setProductForm}
                        selectedImage={selectedImage}
                        isUploadingProduct={isUploadingProduct} setIsUploadingProduct={setIsUploadingProduct} />
                </div>
                <div className={`add-product w-[15%]  bg-cloudBlue ${openPopup ? 'brightness-50' : ''}`}></div>

                <div className={` add-product my-12  pb-8 w-[70%] flex flex-col gap-8 m-auto bg-cloudBlue  ${openPopup ? 'brightness-50' : ''}`}>

                    <div className={"bg-white pt-6 pb-2 px-6 border-[1px]"}>
                        <span className='text-yaleBlue hover:text-black cursor-pointers' onClick={() => window.history.back()}><ArrowBackIcon className={"mb-4"} style={{ fontSize: '45px' }} /></span>
                        <span className="inline-block font-bold text-3xl ml-2 ">Add Product</span>
                        <span onClick={() => {
                            const allInput = document.querySelectorAll('.required-field');
                            for (let i = 0; i < allInput.length; i++) {
                                if (allInput[i].value === '') {
                                    alert('Vui long nhap day du thong tin')
                                    return
                                }
                                if (!imagesEnough(selectedImage).code) {
                                    alert(imagesEnough(selectedImage).message)
                                    return
                                }
                            }
                            onAddVariant(variants, setListVariants, setOpenPopup, productForm, setProductForm)
                        }}
                            className="inline-block font-bold text-xl float-right hover:bg-celticBlue text-white py-2 px-4 rounded cursor-pointer bg-yaleBlue">Save product</span>
                    </div>
                    <div className='flex flex-col gap-8 bg-cloudBlue'>
                        <div className='general-infor border-[1px] py-6 px-8 bg-white'>
                            <div className={"mb-5 pb-3 border-b-2 border-gray-300"}>
                                <span className='font-bold text-yaleBlue text-[26px] mb-6'>General information</span>
                            </div>
                            <div>
                                <label className={"text-xl font-semibold"}> Product name</label>
                                <input onChange={(e) => {
                                    setProductForm({ ...productForm, productName: e.target.value })

                                }}
                                    type="text" required className='mb-4 mt-2 required-field outline-none w-full border-2 border-gray-400 h-12 rounded pl-4 bg-[#F2F4F5]' placeholder='Enter product name'></input>
                            </div>
                            <div>
                                <label className={"text-xl font-semibold"}> Product description</label>
                                <textarea onChange={(e) => {
                                    setProductForm({ ...productForm, description: e.target.value })
                                }}
                                    className='my-2 required-field outline-none w-full border-2 border-gray-400 h-40 rounded p-4 bg-[#F2F4F5]' placeholder='Enter product description'></textarea>

                            </div>
                        </div>
                        <div className='media border-[1px] py-6 px-8 bg-white'>
                            <div >
                                <div className='font-bold text-yaleBlue text-[26px] mb-3 pb-3 border-b-2 border-gray-300'>Media
                                    <div className='text-gray-600 font-medium text-xl'>(From 5 to 10 images)</div>
                                </div>
                                <UploadAndDisplayImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
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
                                        setCurrentCategory({ parent: e.target.value, child: tmp.childCategories[0].name })
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
                                    <select name="categoryName" className='mt-4 border-2 border-gray-400 w-60 h-12 rounded px-2 bg-[#F2F4F5]' value={currentCategory.child} onChange={(e) => {
                                        setProductForm({ ...productForm, categoryName: e.target.value })
                                        setCurrentCategory({ ...currentCategory, child: e.target.value })
                                    }
                                    }>
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
                                <input
                                    onWheel={event => event.currentTarget.blur()}
                                    onChange={(e) => {
                                        setProductForm({ ...productForm, price: e.target.value })
                                    }}
                                    type="number" className='mb-4 mt-2 required-field outline-none w-60 border-2 border-gray-400 h-12 rounded px-2 bg-[#F2F4F5]'></input>
                            </div>

                            <div>
                                <label className='block text-xl font-semibold'>Brand</label>
                                <input onChange={(e) => {
                                    setProductForm({ ...productForm, brand: e.target.value })
                                }}
                                    type="text" className='mb-4 mt-2 outline-none w-60 border-2 border-gray-400 h-12 rounded px-2 bg-[#F2F4F5]'></input>
                            </div>
                            <div>
                                <label className='block text-xl font-semibold'>Status</label>
                                <select className='mb-4 mt-2 border-2 border-gray-400 w-60 h-12 rounded px-2 bg-[#F2F4F5]' onChange={(e) => {
                                    setProductForm({ ...productForm, web: e.target.value })
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
                                    <div className='text-gray-600 font-medium text-xl'>  (Ex: Type (color, size,...), Variation (green, red,..))</div>
                                </span>
                            </div>
                            <div>
                                <VariantsForm variants={variants} setVariants={setVariants} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`add-product w-[15%]  bg-cloudBlue ${openPopup ? 'brightness-50' : ''}`}></div>

            </div>
        </div>
    )
    else return (<div>Loading...</div>)
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
function QuantityOfVariants({ variants, setOpenPopup, productForm, setProductForm, selectedImage, isUploadingProduct, setIsUploadingProduct }) {
    // if (isUploadingProduct) return (
    //     <div className='bg-white p-4'>
    //         <div className='w-[600px] rounded p-4 border-2 border-gray-200 flex flex-col gap-4 items-center'>
    //             <Loading />
    //         </div>
    //     </div>
    // );
    const navigate = useNavigate();
    if (variants.length === 0) {
        return (
            <div className='bg-white p-4 rounded'>
                <div className='w-[400px] rounded p-4 flex flex-col gap-6 items-center'>
                    <div className='font-bold text-yaleBlue text-[26px] '>Enter Quantity</div>
                    <input id="quantity" className='outline-none w-60 border-2 border-gray-400 h-12 rounded pl-4 bg-[#F2F4F5] ' type='number' onChange={(e) => {
                        setProductForm({ ...productForm, variantDetails: [{ variantDetail: null, quantity: e.target.value, price: productForm.price }] })
                    }} />
                    <button onClick={() => setOpenPopup(false)} className='p-2  w-1/3 rounded text-white bg-red font-sans hover:bg-orangeRed font-semibold'>Cancel</button>
                    <button onClick={() => {
                        if (document.getElementById("quantity").value === "") {
                            alert("Please enter quantity");
                            return
                        }
                        POST("seller/add-product", productForm).then((res) => {
                            if (res.code !== "OK") {
                                alert(res.message)
                                setOpenPopup(false)
                            }
                            // document.querySelectorAll(".save-product").forEach((item) => {
                            //     item.disabled = true
                            //     item.innerHTML = "Uploading..."
                            // })
                            if (res.code === "OK") {
                                setIsUploadingProduct(true)
                                uploadImages(res.result.productId, selectedImage).then((res) => {
                                    console.log(res)
                                    if (res.code === "OK") {
                                        setOpenPopup(false);
                                        navigate("/seller/products");
                                    }
                                })
                            }

                        })
                    }} className='save-product p-2  w-1/3 rounded text-white bg-[#FA8232] font-sans hover:bg-orangeRed font-semibold'>Save</button>
                </div>
            </div>
        )
    }


    return (
        <div className='bg-white py-6 px-8 rounded'>
            <div><span className={"text-xl font-medium"}>Please fill the quantity of each variation (fill 0 if unavailable)</span></div>
            <div className='w-[600px] grid grid-cols-4 p-4 border-t-2 border-x-2 border-gray-400 mt-4 text-xl font-semibold'>
                <span className='col-span-2'>Variant</span>
                <span className='text-center'>Quantity</span>
                <span className="text-center">Price(VND)</span>
            </div>
            <div className='col-span-4 flex flex-col w-[600px] border-2 border-gray-400 overflow-y-scroll no-scrollbar max-h-[300px] mb-6'>
                {productForm.variantDetails.map((item, index) => {
                    return (
                        <div key={`${index}-${item}`} className='grid grid-cols-4 gap-4 w-full border-b-[1px] border-gray-400 h-auto'>
                            <span className='col-span-2 border-r-2 border-gray-400 grow place-content-center pl-4'>{JSONToData(item.variantDetail)}</span>
                            <input type="number" placeholder='fill a number' className='list-quantity outline-none h-12 border-r-[1px] border-gray-400' onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9)
                                let tmp = [...productForm.variantDetails];
                                tmp[index].quantity = e.target.value
                                setProductForm({ ...productForm, variantDetails: tmp })
                            }}></input>
                            <input type="number" placeholder='fill a number' className='list-quantity outline-none h-12' onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9)
                                let tmp = [...productForm.variantDetails];
                                tmp[index].price = e.target.value
                                setProductForm({ ...productForm, variantDetails: tmp })
                            }}></input>

                        </div>

                    )
                })}
            </div>
            <div className='flex flex-row gap-4 justify-end'>
                <button onClick={() => setOpenPopup(false)} className=' py-2 w-1/5 bg-red font-sans text-white rounded cursor-pointer px-4 hover:bg-orangeRed font-semibold'>Cancel</button>

                <button onClick={() => {
                    let tmp = 0
                    for (let i = 0; i < productForm.variantDetails.length; i++) {
                        console.log(productForm.variantDetails[i].quantity)
                        tmp += parseInt(productForm.variantDetails[i].quantity)
                    }
                    const listQuantity = document.getElementsByClassName("list-quantity")
                    for (let i = 0; i < listQuantity.length; i++) {
                        if (listQuantity[i].value === "") {
                            alert("Please enter quantity")
                            return
                        }
                    }
                    POST("seller/add-product", { ...productForm, quantity: tmp }
                    ).then((res) => {
                        if (res.code !== "OK") {
                            setOpenPopup(false)
                            alert(res.message)
                            return
                        }

                        if (res.code === "OK") {
                            setIsUploadingProduct(true)
                            uploadImages(res.result.productId, selectedImage).then((res) => {
                                if (res.code === "OK") {
                                    navigate("/seller/products");
                                    setOpenPopup(false)

                                }
                            })

                        } else {
                            alert(res.message)
                        }
                    })

                }

                } className=' py-2 w-1/5 bg-[#FA8232] font-sans text-white rounded cursor-pointer px-4 hover:bg-orangeRed font-semibold'>Save</button>
            </div>

        </div>
    )
}
function combine(list1, list2) {
    let tmp = []
    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            tmp.push([...list1[i], list2[j][0]])
        }
    }
    return tmp
}
function onAddVariant(variants, setListVariants, setOpenPopup, productForm, setProductForm) {
    console.log(productForm)
    const toString = (arr) => {
        let ans = ""
        arr.forEach(element => {
            ans = ans + element.type + ":" + element.value + ","
        });
        return ans.substring(0, ans.length - 1)
    }
    let tmp = []
    for (let i = 0; i < variants.length; i++) {
        if (variants[i].isDeleted) continue
        let l = []
        for (let j = 0; j < variants[i].values.length; j++) {
            if (variants[i].values[j].isDeleted) continue
            l.push([{ type: variants[i].type, value: variants[i].values[j].value }])
        }
        tmp.push(l)
    }
    if (tmp.length === 0) {
        setProductForm({ ...productForm, variantDetails: [] })
        setListVariants([])
        setOpenPopup(true)
        return
    }
    let list = [...tmp[0]]
    for (let i = 1; i < tmp.length; i++) {
        list = combine(list, tmp[i])
    }
    setListVariants(list)
    const quantity = []
    for (let i = 0; i < list.length; i++) {
        let tmp = []
        for (let j = 0; j < list[i].length; j++) {
            tmp.push({ type: list[i][j].type, value: list[i][j].value })
        }
        quantity.push({
            variantDetail: JSON.stringify(tmp),
            quantity: 0,
            price: 0
        })
    }
    setProductForm({ ...productForm, variantDetails: quantity })
    setOpenPopup(true)
}

// const v = [

//     {
//         type: 'color',
//         values: [
//             { value: 'red', id: 1 },
//             { value: 'green',id: 2 },
//             { value: 'blue',id: 3 },
//             { value: 'yellow',id: 4 },
//         ],
//         id 5
//     }
// ]
function VariantsForm({ variants, setVariants }) {
    return (
        <div>
            {
                variants.map((variant, index) => {
                    if (!variant.isDeleted)
                        return (
                            <VariantType key={index} variants={variants} setVariants={setVariants} index={index} />
                        )
                })
            }
            <label onClick={() => {
                let tmp = [...variants];
                tmp.push({ type: '', values: [], isDeleted: false });
                setVariants(tmp);
            }}
                className='inline-block mt-4 cursor-pointer text-white rounded p-2 w-fit text-center content-center bg-[#FA8232] font-sans hover:bg-orangeRed font-semibold'>
                <span className=''>Add variant</span>
            </label>
        </div>
    );
}
function VariantType({ variants, setVariants, index }) {
    return (
        <div className='flex flex-row gap-6'>
            <div className=''>
                <label onClick={() => {
                    let tmp = [...variants];
                    tmp[index].isDeleted = true;
                    setVariants(tmp);
                }}
                    className='inline-block mt-9 cursor-pointer text-white rounded p-2 w-fit text-center content-center bg-red font-sans hover:bg-orangeRed font-semibold'>
                    <span className=''>Delete</span>
                </label>
            </div>
            <div className='flex flex-col'>
                <label className={"text-xl font-semibold"}>Type</label>
                <input className='mb-4 mt-2 required-field outline-none w-60 border-2 border-gray-400 h-10 rounded px-2 bg-[#F2F4F5]' defaultValue={variants[index].type} onChange={(e) => {
                    let tmp = [...variants];
                    tmp[index].type = e.target.value;
                    setVariants(tmp);
                }} />
            </div>
            <div className='flex flex-col'>
                <label className={"text-xl font-semibold"}>Variation</label>
                <div className='flex flex-row gap-6 items-center flex-wrap'>
                    {
                        variants[index].values.map((item, sub_index) => {
                            if (!item.isDeleted)
                                return (
                                    <VariantValue key={`${index}-${sub_index}`} variants={variants} setVariants={setVariants} index={index} sub_index={sub_index} />
                                );
                        })
                    }

                    <label onClick={() => {
                        let tmp = [...variants];
                        tmp[index].values.push({ value: "", isDeleted: false });

                        setVariants(tmp)
                    }}
                        className='mt-2 mb-4 inline-block cursor-pointer text-white rounded w-10 h-10 text-center content-center bg-[#FA8232] font-sans hover:bg-orangeRed font-semibold'>
                        <AddIcon className='' />

                    </label>
                </div>

            </div>
        </div>
    );
}
function VariantValue({ variants, setVariants, index, sub_index }) {
    return (
        <div className='mb-4 mt-2 border-2 border-gray-400 rounded h-10 bg-[#F2F4F5]'>
            <input className='mb-4 required-field outline-none w-20 h-full rounded bg-[#F2F4F5] px-2' defaultValue={variants[index].values[sub_index].value} onChange={(e) => {
                let tmp = [...variants];
                tmp[index].values[sub_index].value = e.target.value;
                setVariants(tmp);
            }} />
            <CloseIcon className={"mb-2 mr-1 hover:bg-red"} onClick={() => {
                let tmp = [...variants];
                tmp[index].values[sub_index].isDeleted = true;
                setVariants(tmp);
            }} />
        </div>
    );
}
async function uploadImages(productId, selectedImage) {
    const formData = new FormData();
    for (let i = 0; i < selectedImage.length; i++) {
        if (selectedImage[i].isChoosed) {
            formData.append('images', selectedImage[i].path);
        }
    }
    return await fetch(baseUrl + `images/upload-product-images/${productId}`, {
        method: "POST",
        headers: {
            // 'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem("Authorization")}`
        },
        body: formData
    }).then(res => res.json());
}
function imagesEnough(selectedImage) {
    let count = 0;
    for (let i = 0; i < selectedImage.length; i++) {
        if (selectedImage[i].isChoosed)
            count++;
    }
    if (count < 5) { return { "code": false, message: "Please upload at least 5 images" } }
    if (count > 10) { return { "code": false, message: "Please upload at most 10 images" } }
    return { "code": true, message: "ok" }

}