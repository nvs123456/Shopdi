import { useEffect, useState } from "react"
import { GET, POST } from "../../api/GET";
import CATEGORIES from "@/data/categories_data";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function CategoryManagement() {
    const categories = CATEGORIES.CATEGORIES
    const put = async () => {
        for (let i = 0; i < categories.length; i++) {
            const res = await POST(`categories/create`, { name: categories[i].name, parentName: null }).then((res) => {
                console.log(res)
            })
            for (let j = 0; j < categories[i].sub_categories.length; j++) {
                const res = await POST(`categories/create`, { name: categories[i].sub_categories[j], parentName: categories[i].name }).then((res) => {
                    console.log(res)
                })
            }
        }

    }
    useEffect(() => {
        // put().then(() => {
        //     console.log("done")
        // })

    }, [])
    const [currentParentSelected, setCurrentParentSelected] = useState(0)
    const tmp = [
        {
            "categoryId": 2,
            "name": "Thời Trang Nam",
            "parentId": null,
            "parentName": null,
            "childCategories": [
                {
                    "id": 31,
                    "name": "Kính Mắt Nam"
                }
            ]
        }
    ]
    return (
        <div>
            <h1>Category Management</h1>
            <button onClick={() => {
             }} 
             className="cursor-pointer border-2 rounded bg-pumpkin hover:bg-orangeRed border-gray-400 text-black w-60 p-2 mt-2 mb-2 mr-2">Edit Categories</button>
            <div>
                {tmp.map((parentCategory,index) => (
                    <Parent parentCategory={tmp} index={index} currentParentSelected={currentParentSelected} setCurrentParentSelected={setCurrentParentSelected} />
                ))}
            </div>
        </div>
    )
}
function Parent({category,index, currentParentSelected, setCurrentParentSelected }) {
    const parentCategory = category[index]
    return (
        <div className="flex flex-row gap-2">
            <div className="relative flex flex-row border-2 border-gray-400" >
                <label >id : {parentCategory.categoryId}, name :</label>
                <input className="category-input" disabled type="text"  value={parentCategory.name} />
                {
                    currentParentSelected == parentCategory.categoryId ? (
                        <KeyboardArrowRightIcon onClick={() => setCurrentParentSelected(0)} />
                    ) :
                        (
                            <KeyboardArrowDownIcon onClick={() => setCurrentParentSelected(parentCategory.categoryId)} />
                        )
                }
            </div>
            {
                currentParentSelected == parentCategory.categoryId && (
                    <div className="relative">{parentCategory.childCategories.map((childCategory) => (
                        <div className="relative flex flex-row border-2 border-gray-400" >
                            <label >id : {childCategory.id}, name :</label>
                            <input className="category-input" disabled type="text" value={childCategory.name} />
                        </div>
                    ))}
                    </div>
                )
            }
        </div>
    )
}