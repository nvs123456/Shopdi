import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CATEGORIES from '@/data/categories_data';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
function combine(list1, list2) {
    let tmp = []
    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            tmp.push([...list1[i], list2[j][0]])
        }
    }
    return tmp
}
export default function AddProduct() {
    const categories = CATEGORIES.CATEGORIES;
    const [currentCategory, setCurrentCategory] = useState(categories[0]);
    const [variants, setVariants] = useState([{ id: 0, type: '', values: [{ id: 0, value: '' }] }]);
    const [listVariants, setListVariants] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    return (
        <div className='w-full flex flex-row'>
            <div className={`${openPopup ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center`}><QuantityOfVariants variants={listVariants} setOpenPopup={setOpenPopup} /></div>
            <div className={`add-product p-8 w-1/6  bg-white ${openPopup ? 'brightness-50' : ''}`}></div>

            <div className={`add-product p-8 w-4/6 flex flex-col gap-4 m-auto bg-cloudBlue ${openPopup ? 'brightness-50' : ''}`}>

                <div>
                    <span className='text-celticBlue text-xl' onClick={() => window.history.back()}><ArrowBackIcon style={{ fontSize: '40px' }} /></span>
                    <span className="inline-block font-bold text-xl ml-4 p-2">Add Product</span>
                    <span onClick={() => {
                        let tmp = []
                        for (let i = 0; i < variants.length; i++) {
                            let l = []
                            for (let j = 0; j < variants[i].values.length; j++) {
                                if (variants[i].values[j].value !== '')
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
                            <div>
                                {
                                    variants.map((variant, index) => {
                                        return (
                                            <div key={`variant-${variant.id}`}>
                                                <CloseIcon onClick={() => {
                                                    let tmp = [...variants];
                                                    tmp.splice(index, 1);
                                                    setVariants(tmp);
                                                }} />
                                                <div className="flex flex-row gap-4">
                                                    <div>
                                                        <label>Varient type</label>
                                                        <div>
                                                            <input type="text" className='outline-none w-60 border-2 border-gray-400 h-10 rounded pl-4' onChange={(e) => {
                                                                let tmp = [...variants];
                                                                tmp[index].type = e.target.value;
                                                                setVariants(tmp);
                                                            }}></input>
                                                        </div>
                                                    </div>
                                                    <div className=' flex flex-col'>
                                                        <label>Values</label>
                                                        <div className=' flex flex-row gap-4 items-center flex-wrap'>
                                                            {
                                                                variant.values.map((item, index_2) => {
                                                                    return (
                                                                        <div key={`${item.id}`} className='border-2 border-gray-400 rounded'>
                                                                            <input type="text" className='outline-none w-20 border-none h-8 rounded' defaultValue={item.value} onChange={(e) => {
                                                                                e.preventDefault();
                                                                                let tmp = [...variants];
                                                                                tmp[index].values[index_2].value = e.target.value;
                                                                                setVariants(tmp);
                                                                            }}></input>
                                                                            <CloseIcon onClick={() => {
                                                                                console.log(variants);
                                                                                let tmp = [...variants];
                                                                                tmp[index].values.splice(index_2, 1);
                                                                                setVariants(tmp);
                                                                            }} className='cursor-pointer' />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            <label onClick={() => {
                                                                let tmp = [...variants];
                                                                let last = tmp[index].values[tmp[index].values.length - 1];
                                                                let id = last ? last.id + 1 : 1
                                                                tmp[index].values.push({ id: id, value: "" });
                                                                setVariants(tmp)
                                                            }}
                                                                className='inline-block cursor-pointer bg-white border-dashed border-2 text-white rounded w-10 h-10 text-center content-center hover:bg-gray-200'>
                                                                <AddIcon className='text-black ' />

                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <label onClick={() => {
                                    console.log(variants);
                                    let tmp = [...variants];
                                    if (tmp.length === 0) tmp.push({ id: 0, type: "", values: [{ id: 0, value: "" }] });
                                    else tmp.push({ id: tmp[tmp.length - 1].id + 1, type: "", values: [{ id: 0, value: "" }] });
                                    setVariants(tmp)
                                }}
                                    className='inline-block mt-4 cursor-pointer bg-white border-dashed border-2 text-white rounded p-2 w-fit text-center content-center hover:bg-gray-200'>
                                    <span className='text-black '>Add variant</span>
                                </label>

                            </div>
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
                <label htmlFor="myImage" className='inline-block mt-4 cursor-pointer bg-white border-dashed border-2 text-white rounded p-2 w-20 text-center content-center hover:bg-gray-200'>
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
                            tmp.push(event.target.files[i])
                        }
                        setSelectedImage(tmp);
                    }}
                />
                {selectedImage.length > 0 && (
                    selectedImage.map((item, index) => {
                        return (<div key={index}>
                            <img
                                alt="not found"
                                style={{ aspectRatio: "1/1", width: "80px", height: "80px" }}
                                src={URL.createObjectURL(item)}
                            />
                            {/* Button to remove the selected image */}
                        </div>)
                    })

                )}

            </div>

        </div>
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
                            <span className='border-r-2 border-gray-200 grow place-content-center'>{[...item].reduce((a, b) => a + b.type + ":" + b.value + ", ", "")}</span>
                            <input type="number" placeholder='type number only' className='outline-none w-1/6 h-10'></input>
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