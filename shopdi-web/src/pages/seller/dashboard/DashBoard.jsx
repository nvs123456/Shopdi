import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
import SpinnerLoading from "../../../components/SpinnerLoading/SpinnerLoading";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import defaultImage from "@/assets/images/profileDefault.png";
import {
    Chart as ChartJS,
    CategoryScale
} from 'chart.js/auto';
import { useEffect, useState } from "react";
import { GET } from "@/api/GET";
ChartJS.register(
    CategoryScale
);
import { Bar, Pie } from 'react-chartjs-2';
function formatNumber(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}
export default function DashBoard() {
    const [data, setData] = useState({})
    let today = new Date();
    let week = []
    for (let i = 0; i < 7; i++) {
        // week.unshift(`${today.getDate()}-${today.toLocaleDateString('en-US', { month: 'short' })}`)
        week.unshift(today.toDateString())
        today.setDate(today.getDate() - 1)

    }
    const [doanhthu, setDoanhthu] = useState({
        labels: week,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: "Revenue Report (VND)",
                data: data.summaryInWeek,
                // you can set indiviual colors for each bar
                borderWidth: 2,
            }
        ]
    })
    const [products, setProducts] = useState([])
    const [profile, setProfile] = useState({})
    const [orders, setOrders] = useState([])
    const [loadding, setLoadding] = useState(true)
    const [currentSort, setCurrentSort] = useState("revenue")
    const sortBy = (sortBy, products) => {
        if (sortBy === "revenue") {
            products.sort((a, b) => {
                return b.soldQuantity * b.price - a.soldQuantity * a.price
            })
        } else if (sortBy === "order") {
            products.sort((a, b) => {
                return b.soldQuantity - a.soldQuantity
            })
        } else if (sortBy === "rating") {
            products.sort((a, b) => {
                return b.rating - a.rating
            })
        }
        let tmp = JSON.parse(JSON.stringify(products))
        setCurrentSort(sortBy)
        return tmp.slice(0, 3)
    }
    useEffect(() => {
        GET("seller/profile").then(res => {
            setProfile(res.result)
            GET("seller/my-products").then(res => {
                const bestSeller = sortBy("revenue", res.result?.items)
                setProducts(res.result?.items)
                GET("seller/orders").then(res => {
                    const summary = [0, 0, 0, 0, 0, 0, 0]
                    let sum = 0
                    let todayOrder = 0
                    res.result.items.forEach(order => {
                        if (order.orderStatus !== "PENDING" && order.orderStatus !== "CANCELLED") {
                            if (new Date(order.deliveryDate).toDateString() === new Date().toDateString()) {
                                todayOrder++
                            }
                            sum += order.totalPrice
                            week.forEach((day, index) => {
                                if (new Date(order.deliveryDate).toDateString() === day) {
                                    summary[index] += order.totalPrice
                                }

                            })
                        }
                    })
                    setData({ ...data, summaryInWeek: summary, todayEarning: sum, todayOrder: todayOrder, bestSeller: bestSeller })
                    setDoanhthu({ ...doanhthu, datasets: [{ ...doanhthu.datasets[0], data: summary }] })
                    setOrders(res.result?.items)
                    setLoadding(false)
                })
            })
        })


    }, [])

    if (loadding)
        return (
            <div className="w-full h-full flex justify-center items-center">
                <SpinnerLoading />
            </div>
        )
    else
        return (
            <div className="w-full bg-cloudBlue">

                <div className="flex flex-row gap-12 pt-10 pb-12 pl-16 pr-24">
                    <div className={"w-1/2"}>
                        <div className="flex flex-row gap-4">
                            <img src={profile.profileImage || defaultImage} alt="logo" className="h-20 w-auto rounded-full" />
                            <div className="ml-2 content-center text-3xl font-medium"><span >Hello, {profile.shopName}!</span></div>
                        </div>
                        {/*<div className="text-xl mt-4">Today is <span>{new Date().toISOString().slice(0, 10)}</span></div>*/}
                    </div>
                    <div className='flex flex-col py-4 px-6 rounded justify-between bg-white w-1/4 h-32 border-[1px] '>
                        <h1 className="text-2xl text-gray-600 font-medium">Total Earnings</h1>
                        <div className="flex flex-row justify-between">
                            <span className="text-3xl font-semibold pb-2">{data.todayEarning.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &#8363;</span>
                            {/* <span>
                            <span className={data.increaseEarning > 0 ? "text-green" : "text-red"}>{data.increaseEarning > 0 ? "+" : ""}{data.increaseEarning}</span>
                            <span className={data.increaseEarning > 0 ? "text-green" : "text-red"}>{data.increaseEarning > 0 ? <NorthEastIcon /> : <SouthEastIcon />}</span>
                        </span> */}

                        </div>
                    </div>
                    <div className='flex flex-col py-4 px-6 rounded justify-between bg-white w-1/4 h-32 border-[1px]'>
                        <h1 className="text-2xl text-gray-600 font-medium">Total Orders</h1>
                        <div className="flex flex-row justify-between">
                            <span className="text-3xl font-semibold pb-2">{data.todayOrder.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            {/* <span>
                            <span className={data.increaseOrder > 0 ? "text-green" : "text-red"}>{data.increaseOrder > 0 ? "+" : ""}{data.increaseOrder}</span>
                            <span className={data.increaseOrder > 0 ? "text-green" : "text-red"}>{data.increaseOrder > 0 ? <NorthEastIcon /> : <SouthEastIcon />}</span>
                        </span> */}

                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-12 pl-16 pr-24 mb-12">
                    <div className="w-[100%]">

                        <div className="text-3xl font-semibold text-yaleBlue bg-white pt-3 pb-2 px-5 border-b-2 border-t-[1px] border-x-[1px]">Best seller</div>
                        <div className="grid grid-cols-6 gap-4 bg-white px-6 py-2 pb-4 border-b-[1px] border-x-[1px]">
                            {/* <div className="header flex flex-row font-semibold text-xl"> */}
                            <span className="col-span-3 pl-2 text-2xl font-semibold">Product</span>
                            <span className={` text-center font-semibold text-2xl ${currentSort === "revenue" ? "text-yaleBlue border-b-2 border-yaleBlue" : ""}`} onClick={() => { setData({ ...data, bestSeller: sortBy("revenue", products) }) }}>Revenue<SwapVertIcon /></span>
                            <span className={` text-center font-semibold text-2xl ${currentSort === "order" ? "text-yaleBlue border-b-2 border-yaleBlue" : ""}`} onClick={() => { setData({ ...data, bestSeller: sortBy("order", products) }) }}>Orders<SwapVertIcon /></span>
                            <span className={` text-center font-semibold text-2xl ${currentSort === "rating" ? "text-yaleBlue border-b-2 border-yaleBlue" : ""}`} onClick={() => { setData({ ...data, bestSeller: sortBy("rating", products) }) }}>Rating<SwapVertIcon /></span>

                            {data.bestSeller.map((item, index) => {
                                return (
                                    <>
                                        <div className="flex flex-row col-span-3 text-[18px]">
                                            <div className="min-w-10 text-center pl-2 my-1"><img src={item.productImage} width={60} height={60} /></div>
                                            <div className="grow my-auto ml-3 truncate">{item.productName}</div>
                                        </div>
                                        <div className=" text-center text-[18px]">{(item.soldQuantity * item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &#8363;</div>
                                        <div className=" text-center text-[18px]">{item.soldQuantity}</div>
                                        <div className=" text-center text-[18px]">{item.rating} star</div>
                                    </>
                                );
                            })}
                        </div>

                    </div>
                    <div className="w-[80%] grow">
                        <Bar className="w-[100%] p-6 bg-white border-[1px]" height={170} data={doanhthu} />
                    </div>
                    {/* <div className="w-1/3 ">
                    <div className="text-3xl font-semibold text-tuftsBlue pt-4 px-6 bg-white border-t-[1px] border-x-[1px]">Customer's feedback</div>
                    <Pie className="w-full bg-white pb-8 px-5 pt-2  border-b-[1px] border-x-[1px]" data={danhgia} />
                </div> */}
                </div>
            </div>
        )
}