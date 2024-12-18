import { useEffect, useState } from "react"
import { GET, PUT, POST } from "../../api/GET";
import CATEGORIES from "@/data/categories_data";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function CategoryManagement() {

    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState([])
    const [before, setbefore] = useState([])
    const [diff, setDiff] = useState([])
    useEffect(() => {
        GET(`categories`).then((data) => {
            if (data.result.length === 0) {
                const categoriese = CATEGORIES.CATEGORIES;
                for (let i = 0; i < categoriese.length; i++) {
                    POST("categories/create", { name: categoriese[i].name, parentName: null }).then(res => {
                        for(let j = 0; j < categoriese[i].sub_categories.length; j++){
                            POST("categories/create", { name: categoriese[i].sub_categories[j], parentName: categoriese[i].name }).then(res => {
                            })
                        }
                    })
                }
            }
            setCategory([...data.result])
            setbefore(JSON.parse(JSON.stringify(data.result)))
            setIsLoading(false)
        })

    }, [])
    const [currentParentSelected, setCurrentParentSelected] = useState(0)
    const [currentInputSelected, setCurrentInputSelected] = useState(null)
    const [isEditting, setIsEditting] = useState(false)
    const setcategory = (category) => {
        compare(category)
        setCategory(category)
    }
    function compare(category) {
        let diff = []
        for (let i = 0; i < category.length; i++) {
            if (category[i].name !== before[i].name) {
                diff.push({
                    from: { id: before[i].categoryId, name: before[i].name },
                    to: { id: category[i].categoryId, name: category[i].name },
                    parentId: null
                })
            }
            for (let j = 0; j < category[i].childCategories.length; j++) {
                if (category[i].childCategories[j].name !== before[i].childCategories[j].name) {
                    diff.push({
                        parentId: category[i].categoryId,
                        from: { id: before[i].childCategories[j].id, name: before[i].childCategories[j].name },
                        to: { id: category[i].childCategories[j].id, name: category[i].childCategories[j].name }
                    })
                }
            }
        }
        setDiff(diff)
    }
    async function updateCategory() {
        for (let i = 0; i < diff.length; i++) {
            await PUT(`categories/update/${diff[i].from.id}`, { name: diff[i].to.name, parentId: diff[i].parentId }).then(res => console.log(res))
        }
    }
    if (isLoading) return <div className="text-center">Loading...</div>
    else
        return (
            <div className="relative p-8">
                <h1>Category Management</h1>
                <button
                    className={` border-2 rounded ${currentInputSelected == null ? "hidden" : "bg-pumpkin hover:bg-orangeRed cursor-pointer"}  border-gray-400 text-black w-60 mt-2 mb-2 mr-2`}>Editting...</button>
                <button
                    onClick={() => {
                        if (diff.length > 0) {
                            updateCategory()
                        }
                    }}
                    className={` border-2 rounded ${isEditting ? "hidden" : ""} ${document.querySelectorAll(".diff").length > 0 ? "bg-pumpkin hover:bg-orangeRed cursor-pointer" : "bg-gray-400 disabled"}  border-gray-400 text-black w-60 mt-2 mb-2 mr-2`}>
                    Save
                </button>
                <div className="">
                    {category.map((parentCategory, index) => (
                        <Parent key={`${index}-parent`} Compare={Compare} before={before} setIsEditting={setIsEditting} isEditting={isEditting} category={category} index={index} currentInputSelected={currentInputSelected} currentParentSelected={currentParentSelected} setCategory={setcategory} setCurrentParentSelected={setCurrentParentSelected} setCurrentInputSelected={setCurrentInputSelected} />
                    ))}
                </div>
                <div className="absolute top-0 left-[50%]">
                    <Compare diff={diff} />
                </div>
            </div>
        )
}
function Compare({ diff }) {
    return (
        <div className="flex flex-col gap-2">
            {diff.length > 0 && <h1 className="font-bold text-pumpkin">Incoming changes</h1>}
            {diff.map((d, i) => (
                <div key={i} className="diff flex flex-row gap-2">
                    <div>{d.from.id} : {d.from.name}</div>
                    <span> → </span>
                    <div>{d.to.id} : {d.to.name}</div>
                </div>
            ))}
        </div>
    )
}

function Parent({ setIsEditting, Compare, category, index, setCategory, currentParentSelected, setCurrentParentSelected, setCurrentInputSelected, currentInputSelected }) {
    return (
        <div className={`relative`}>
            <div className={`flex w-[400px] flex-row gap-2 ${currentParentSelected == category[index].categoryId ? "bg-gray-400" : ""}`}>
                <div className="relative flex flex-row border-b-2 border-gray-400 h-12 hover:bg-gray-400" >
                    <label className="content-center w-[120px]">id : {category[index].categoryId}, name :</label>
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
                    <div className="absolute z-10 left-[380px] top-0 rounded bg-white border-2 border-gray-400">{category[index].childCategories.map((childCategory, child_index) => (
                        <div key={`${child_index}-${index}-child`} className="relative flex flex-row h-12 border-b-2 border-gray-400 hover:bg-gray-400" >
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