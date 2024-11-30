import { useEffect, useState } from "react"
import { GET, POST } from "../../api/GET";
import CATEGORIES from "@/data/categories_data";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function CategoryManagement() {

    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState([])
    const [tmp, setTmp] = useState([])
    useEffect(() => {
        console.log(tmp)
        GET(`categories`).then((data) => {
            setCategory([...data.result])
            setTmp(JSON.parse(JSON.stringify(data.result)))
            setIsLoading(false)
        })

    }, [])
    // useEffect(() => {
    //     console.log(tmp)
    // },[tmp])
    const [currentParentSelected, setCurrentParentSelected] = useState(0)
    const [currentInputSelected, setCurrentInputSelected] = useState(null)
    const [isEditting, setIsEditting] = useState(false)


    if (isLoading) return <div className="text-center">Loading...</div>
    else
        return (
            <div className="relative">
                <h1>Category Management</h1>
                <button
                    className={` border-2 rounded ${currentInputSelected == null ? "hidden" : "bg-pumpkin hover:bg-orangeRed cursor-pointer"}  border-gray-400 text-black w-60 mt-2 mb-2 mr-2`}>Editting...</button>
                <button 
                 className={` border-2 rounded ${isEditting ? "hidden" : ""} ${document.querySelectorAll(".diff").length > 0 ? "bg-pumpkin hover:bg-orangeRed cursor-pointer" : "bg-gray-400 disabled"}  border-gray-400 text-black w-60 mt-2 mb-2 mr-2`}>
                    Save
                </button>
                <div className="">
                    {category.map((parentCategory, index) => (
                        <Parent key={`${index}-parent`} tmp={tmp} setIsEditting={setIsEditting} isEditting={isEditting} category={category} index={index} currentInputSelected={currentInputSelected} currentParentSelected={currentParentSelected} setCategory={setCategory} setCurrentParentSelected={setCurrentParentSelected} setCurrentInputSelected={setCurrentInputSelected} />
                    ))}
                </div>
                <div className="absolute top-0 left-[50%]">
                    <Compare category={category} tmp={tmp} />
                </div>
            </div>
        )
}
function Compare({ category, tmp }) {
    // console.log("category", category)   
    // console.log("tmp", tmp)
    let diff = []
    for (let i = 0; i < category.length; i++) {
        if (category[i].name !== tmp[i].name) {
            diff.push({ from: { id: tmp[i].categoryId, name: tmp[i].name }, to: { id: category[i].categoryId, name: category[i].name } })
        }
        for (let j = 0; j < category[i].childCategories.length; j++) {
            if (category[i].childCategories[j].name !== tmp[i].childCategories[j].name) {
                diff.push({ from: { id: tmp[i].childCategories[j].id, name: tmp[i].childCategories[j].name }, to: { id: category[i].childCategories[j].id, name: category[i].childCategories[j].name } })
            }
        }
    }
    return (
        <div className="flex flex-col gap-2">
            {diff.length > 0 && <h1 className="font-bold text-pumpkin">Incoming changes</h1>}
            {diff.map((d, i) => (
                <div key={i} className="diff flex flex-row gap-2">
                    <div>{d.from.id} : {d.from.name}</div>
                    <div>{d.to.id} : {d.to.name}</div>
                </div>
            ))}
        </div>
    )
}
function Parent({ tmp, setIsEditting, isEditting, category, index, setCategory, currentParentSelected, setCurrentParentSelected, setCurrentInputSelected, currentInputSelected }) {
    return (
        <div className="relative">
            <div className="flex w-[400px] flex-row gap-2">
                <div className="relative flex flex-row border-b-2 border-gray-400 h-12" >
                    <label className="content-center">id : {category[index].categoryId}, name :</label>
                    <input id={`${index}-parent`} className="category-input" type="text" value={category[index].name}
                        onClick={(e) => {
                            setCurrentInputSelected(e.target.id);
                            setIsEditting(true);
                        }}
                        onBlur={(e) => {
                            setCurrentInputSelected(null);
                            setIsEditting(false);
                        }}
                        onChange={

                            (e) => {
                                if (e.target.id == currentInputSelected) {
                                    let dcm = [...category]
                                    dcm[index].name = e.target.value
                                    setCategory(dcm)
                                    console.log(tmp)
                                }
                            }
                        } />
                    {
                        currentParentSelected == category[index].categoryId ? (
                            <KeyboardArrowRightIcon onClick={() => setCurrentParentSelected(0)} />
                        ) :
                            (
                                <KeyboardArrowDownIcon onClick={() => setCurrentParentSelected(category[index].categoryId)} />
                            )
                    }
                </div>

            </div>
            {
                currentParentSelected == category[index].categoryId && (
                    <div className="absolute z-10 left-[340px] top-0 rounded bg-white border-2 border-gray-400">{category[index].childCategories.map((childCategory, child_index) => (
                        <div key={`${child_index}-${index}-child`} className="relative flex flex-row h-12 border-b-2 border-gray-400" >
                            <label className="content-center">id : {childCategory.id}, name :</label>
                            <input id={`${child_index}-${index}-child`} className="category-input" type="text" value={childCategory.name}
                                onClick={(e) => {
                                    setCurrentInputSelected(e.target.id);
                                    setIsEditting(true);
                                }}
                                onBlur={(e) => {
                                    setCurrentInputSelected(null);
                                    setIsEditting(false);
                                }}
                                onChange={

                                    (e) => {
                                        if (e.target.id == currentInputSelected) {
                                            let dcm = [...category]
                                            dcm[index].childCategories[child_index].name = e.target.value
                                            setCategory(dcm)
                                        }
                                    }
                                } />
                        </div>
                    ))}
                    </div>
                )
            }
        </div>
    )
}