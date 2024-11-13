import '@/css/product_detail.css'

export default function Variant({ variantWithQuantity, onChangeCurrentSelectedVariant, currenSelectedVariant}) {
    // const variant =

    //     [
    //         {
    //     "variantDetail": "size:L,Color:toi,",
    //         "quantity": 45
    // },
    // {
    //     "variantDetail": "size:L,Color:sang,",
    //         "quantity": 34
    // },
    // {
    //     "variantDetail": "size:XL,Color:toi,",
    //         "quantity": 23
    // },
    // {
    //     "variantDetail": "size:XL,Color:sang,",
    //         "quantity": 12
    // }
    //     ]

    const v = []
    for (let i = 0; i < variantWithQuantity.length; i++) {
        let t = variantWithQuantity[i].variantDetail.split(",")
        for(let j = 0; j < t.length; j++){
            let k = t[j].split(":")
            if(v.find((i) => i.type === k[0]) === undefined){
                v.push({
                    type: k[0],
                    value: [k[1]]
                })
            }else {
                if(v.find((i) => i.type === k[0]).value.find((i) => i === k[1]) === undefined){
                    v.find((i) => i.type === k[0]).value.push(k[1])
                }
            }
        }
    }
    return (
        <>
            {v.map((item) => (
                <div key={item.type} className='mt-2 flex flex-row'>
                    <div className='text-base align-middle text-gray-600 min-w-20 text-left'>{item.type}</div>
                    <div className='flex flex-row gap-x-2 gap-y-2 flex-wrap'>
                        {item.value.map((i) =>
                        (<div key={i}>
                            <input type="radio" name={`${item.type}`} id={`${item.type}-${i}`}
                                className="opacity-0 w-0" value={i}
                                // checked={i === Array.from(currentVariant || []).find((i) => i.type === item.type)?.value}
                                onChange={(e) => {
                                    onChangeCurrentSelectedVariant(item.type, e.target.value)
                                }} />
                            < label htmlFor={`${item.type}-${i}`}
                                className=' inline-block text-center min-w-20 border-2 pt-1 pb-1 border-gray-300 cursor-pointer'>{i}</label>
                        </div>))}
                    </div>
                </div>
            ))}
        </>
    )
}