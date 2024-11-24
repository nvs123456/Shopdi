import '@/css/product_detail.css'

export default function Variant({ product_id, onChangeVariant, currentVariant }) {
    const variant =

        [
            {
                type: "mau sac",
                value: [
                    "xanh",
                    "do",
                    "vang",
                    "tim",
                    "den",
                    "hong",
                    "xam", "nau",
                    "trang"
                ]
            },
            {
                type: "kich thuoc",
                value: [
                    "S",
                    "M",
                    "L"
                ]
            }
        ]
    return (
        <>
            {variant.map((item) => (
                <div key={item.type} className='mt-2 flex flex-row'>
                    <div className='text-base align-middle text-gray-600 min-w-20 text-left'>{item.type}</div>
                    <div className='flex flex-row gap-x-2 gap-y-2 flex-wrap'>
                        {item.value.map((i) =>
                        (<div key={i}>
                            <input type="radio" name={`${product_id}-${item.type}`} id={`${product_id}-${i}`}
                                className="opacity-0 w-0" value={i}
                                // checked={i === Array.from(currentVariant || []).find((i) => i.type === item.type)?.value}
                                onChange={(e) => {
                                    onChangeVariant(item.type, e.target.value)
                                }} />
                            < label htmlFor={`${product_id}-${i}`}
                                className=' inline-block text-center min-w-20 border-2 pt-1 pb-1 border-gray-300 cursor-pointer'>{i}</label>
                        </div>))}
                    </div>
                </div>
            ))}
        </>
    )
}