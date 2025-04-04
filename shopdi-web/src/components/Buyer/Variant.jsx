import '@/css/product_detail.css'

export default function Variant({ variantWithQuantity, onChangeCurrentSelectedVariant, currenSelectedVariant }) {
    if (variantWithQuantity[0].variantDetail === null) {
        return <></>

    }
    const v = []
    for (let i = 0; i < variantWithQuantity.length; i++) {
        let t = variantWithQuantity[i].variantDetail
        for (let j = 0; j < t.length; j++) {
            if (v.find((item) => item.type === t[j].type) === undefined) {
                v.push({ type: t[j].type, value: [t[j].value] })
            } else {
                if (v.find((item) => item.type === t[j].type).value.find((i) => i === t[j].value) === undefined) {
                    v.find((item) => item.type === t[j].type).value.push(t[j].value)

                }
            }
        }
    }
    return (
        <>
            {v.map((item) => (
                <div key={item.type} className='mt-2 flex flex-row'>
                    <div className='text-base align-middle text-gray-600 min-w-20 text-left my-auto'>{item.type}</div>
                    <div className='flex flex-row gap-x-4 gap-y-1 flex-wrap'>
                        {item.value.map((i) =>
                        (<div key={i}>
                            <input type="radio" name={`${item.type}`} id={`${item.type}-${i}`}
                                className="opacity-0 w-0" value={i}
                                // defaultChecked={currenSelectedVariant.find((dcm) => dcm.type === item.type)?.value === i}
                                onChange={(e) => {
                                    onChangeCurrentSelectedVariant(item.type, e.target.value)
                                }} />
                            < label htmlFor={`${item.type}-${i}`}
                                className=' inline-block text-center min-w-16 min-h-8 border-2 py-1 px-2 border-gray-300 cursor-pointer'>{i}</label>
                        </div>))}
                    </div>
                </div>
            ))}
        </>
    )
}