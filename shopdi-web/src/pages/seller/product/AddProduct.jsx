import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CATEGORIES from '@/data/categories_data';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
export default function AddProduct() {
    const categories = CATEGORIES.CATEGORIES;
    const [currentCategory, setCurrentCategory] = useState(categories[0]);
    const [variants, setVariants] = useState([]);

    const [listVariants, setListVariants] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    return (
        <div className='w-full flex flex-row'>
            <div className={`${openPopup ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center`}><QuantityOfVariants variants={listVariants} setOpenPopup={setOpenPopup} /></div>
            <div className={`add-product p-8 w-1/6  bg-white ${openPopup ? 'brightness-50' : ''}`}></div>

            <div className={`add-product p-8 w-4/6 flex flex-col gap-4 m-auto bg-cloudBlue ${openPopup ? 'brightness-50' : ''}`}>

                <div>
                    <span className='text-celticBlue text-xl hover:text-black cursor-pointers h-10' onClick={() => window.history.back()}><ArrowBackIcon style={{ fontSize: '40px' }} /></span>
                    <span className="inline-block font-bold text-xl ml-4 p-2">Add Product</span>
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
                            <input type="text" className='outline-none w-full border-2 border-gray-400 h-10 rounded pl-4' placeholder='Enter product name'></input>
                        </div>
                        <div>
                            <label> Product description</label>
                            <textarea className='outline-none w-full border-2 border-gray-400 h-40 rounded p-4' placeholder='Enter product name'></textarea>

                        </div>
                    </div>
                    <div className='media border-2 border-gray-200 p-4'>
                        <div>
                            <span className='font-bold text-xl'>Media</span>
                            <UploadAndDisplayImage />
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
                                <select className='border-2 border-gray-400 w-60 h-10 rounded'>
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
                            <input type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4'></input>
                        </div>
                        <div>
                            <label className='block'>Discount</label>
                            <input type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4'></input>
                        </div>
                        <div>
                            <label className='block'>Brand</label>
                            <input type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4'></input>
                        </div>
                        <div>
                            <label className='block'>Quantity</label>
                            <input type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4'></input>
                        </div>
                    </div>
                    <div className="variant">
                        <div>
                            <span className='font-bold text-xl'>Variant</span>
                        </div>
                        <div>
                            <VariantsForm variants={variants} setVariants={setVariants} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`add-product p-8 w-1/6  bg-white ${openPopup ? 'brightness-50' : ''}`}></div>

        </div>
    )
}

const UploadAndDisplayImage = () => {
    // Define a state variable to store the selected image
    const [selectedImage, setSelectedImage] = useState([]);

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
                            <div className='relative p-[12px] rounded'>
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
                                    <CloseIcon o />
                                </label>
                            </div>
                        )
                    })

                )}

            </div>

        </div >
    );
};
function QuantityOfVariants({ variants, setOpenPopup }) {
    if (variants.length === 0) {
        return (
            <div className='bg-white p-4'>
                <div className='w-[600px] rounded p-4 border-2 border-gray-200'>
                    <button onClick={() => setOpenPopup(false)} className='bg-pumpkin p-2  w-1/2 rounded text-black'>Save</button>
                </div>
            </div>
        )
    }
    function d(item) {
        return (
            <span>
                <span className='text-xl'>
                    {item.type}
                </span>
                <span className='font-bold text-pumpkin'>: {item.value}, </span>
            </span>
        )
    }
    function e(item) {
        return (
            <span>
                {item.map((item) => {
                    return d(item)
                })}
            </span>
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
                {variants.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-row gap-4 w-full border-b-2 border-gray-200 h-auto'>
                            <span className='border-r-2 border-gray-200 grow place-content-center'>{e(item)}</span>
                            <input type="number" placeholder='type number' className='outline-none w-1/6 h-10' onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9)
                            }}></input>
                        </div>

                    )
                })}
            </div>
            <div className='flex flex-row gap-4'>
                <button onClick={() => setOpenPopup(false)} className='bg-pumpkin p-2 w-1/2 rounded text-black'>Cancel</button>

                <button onClick={() => setOpenPopup(false)} className='bg-pumpkin p-2  w-1/2 rounded text-black'>Save</button>
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
function onAddVariant(variants, setListVariants, setOpenPopup) {
    console.log(variants)
    let tmp = []
    for (let i = 0; i < variants.length; i++) {
        if(variants[i].isDeleted) continue
        let l = []
        for (let j = 0; j < variants[i].values.length; j++) {
            if (variants[i].values[j].isDeleted) continue
            l.push([{ type: variants[i].type, value: variants[i].values[j].value }])
        }
        tmp.push(l)
    }
    let list = [...tmp[0]]
    for (let i = 1; i < tmp.length; i++) {
        list = combine(list, tmp[i])
    }
    setListVariants(list)
    setOpenPopup(true)
    console.log(list)
}

// const v = [

//     {
//         type: 'color',
//         values: [
//             { value: 'red', isDeleted: false },
//             { value: 'green',isDeleted: false },
//             { value: 'blue',isDeleted: false },
//             { value: 'yellow',isDeleted: true },
//         ],
//         isDeleted: false
//     }
// ]
function VariantsForm({ variants, setVariants }) {
    return (
        <div>
            {
                variants.map((variant, index) => {
                    if (!variant.isDeleted)
                        return (
                            <VariantType variants={variants} setVariants={setVariants} index={index} />
                        )
                })
            }
            <label onClick={() => {
                let tmp = [...variants];
                tmp.push({ type: '', values: [], isDeleted: false });
                setVariants(tmp);
            }}
                className='inline-block mt-4 cursor-pointer bg-white border-dashed border-2 text-white rounded p-2 w-fit text-center content-center hover:bg-gray-200'>
                <span className='text-black '>Add variant</span>
            </label>
        </div>
    );
}
function VariantType({ variants, setVariants, index }) {
    return (
        <div className='flex flex-row gap-4'>
            <div className=''>
                <label onClick={() => {
                    let tmp = [...variants];
                    tmp[index].isDeleted = true;
                    setVariants(tmp);
                }}
                    className='inline-block mt-[22px] cursor-pointer bg-white border-dashed border-2 text-white rounded p-2 w-fit text-center content-center hover:bg-gray-200'>
                    <span className='text-black '>Delete</span>
                </label>
            </div>
            <div className='flex flex-col'>
                <label>Type</label>
                <input className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4' defaultValue={variants[index].type} onChange={(e) => {
                    let tmp = [...variants];
                    tmp[index].type = e.target.value;
                    setVariants(tmp);
                }} />
            </div>
            <div className='flex flex-col'>
                <label>Values</label>
                <div className='flex flex-row gap-4 items-center flex-wrap'>
                    {
                        variants[index].values.map((item, sub_index) => {
                            if (!item.isDeleted)
                                return (
                                    <VAriantValue variants={variants} setVariants={setVariants} index={index} sub_index={sub_index} />
                                );
                        })
                    }

                    <label onClick={() => {
                        let tmp = [...variants];
                        tmp[index].values.push({ value: "", isDeleted: false });

                        setVariants(tmp)
                    }}
                        className='inline-block cursor-pointer bg-white border-dashed border-2 text-white rounded w-10 h-10 text-center content-center hover:bg-gray-200'>
                        <AddIcon className='text-black ' />

                    </label>
                </div>

            </div>
        </div>
    );
}
function VAriantValue({ variants, setVariants, index, sub_index }) {
    return (
        <div className='border-2 border-gray-400 rounded h-10'>
            <input className='outline-none w-20 h-full rounded' defaultValue={variants[index].values[sub_index].value} onChange={(e) => {
                let tmp = [...variants];
                tmp[index].values[sub_index].value = e.target.value;
                setVariants(tmp);
            }} />
            <CloseIcon onClick={() => {
                let tmp = [...variants];
                tmp[index].values[sub_index].isDeleted = true;
                setVariants(tmp);
            }} />
        </div>
    );
}