import shopdiLogo from "@/assets/images/shopdi_logo.jpeg";
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import {
    Chart as ChartJS,
    CategoryScale
} from 'chart.js/auto';
ChartJS.register(
    CategoryScale
);
import { Bar, Pie } from 'react-chartjs-2';
function formatNumber(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}
export default function DashBoard() {
    let data = {
        increaseEarning: 0.034,
        todayEarning: 2000000,
        increaseOrder: -0.025,
        todayOrder: 200,
        increaseCustomer: -0.095,
        todayCustomer: 200,
        summaryInWeek: [100, 200, 50, 169, 124, 23, 89],
        bestSeller: [
            {
                name: "Product 1",
                image: shopdiLogo,
                amount: 1000000,
                order: 100,
                rating: 3.5,
            },
            {
                name: "Product 2",
                image: shopdiLogo,
                amount: 1000000,
                order: 100,
                rating: 3.5,
            }, {
                name: "Product 3",
                image: shopdiLogo,
                amount: 1000000,
                order: 100,
                rating: 3.5,
            }

        ]

    }
    let today = new Date();
    let week = []
    for (let i = 0; i < 7; i++) {
        week.unshift(`${today.getDate()}-${today.toLocaleDateString('en-US', { month: 'short' })}`)
        today.setDate(today.getDate() - 1)

    }
    console.log(week)
    const doanhthu = {
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
    }
    const danhgia = {
        labels: ["1 star", "2 star", "3 star", "4 star", "5 star"],
        datasets: [
            {
                label: "So luong san pham",
                data: [12,65,124,345,12],
                // you can set indiviual colors for each bar
                borderWidth: 1,
            }
        ]
    }
    return (
        <div className="w-full bg-cloudBlue p-12">
            <div className="flex flex-row gap-4">
                <img src={shopdiLogo} alt="logo" className="h-16 w-auto rounded-full"/>
                <div className="content-center text-3xl font-medium"><span >Hello, Username</span></div>
            </div>
            <div className="text-xl mt-4">Date: <span>{new Date().toISOString().slice(0, 10)}</span></div>
            <div className="flex flex-row gap-12 pt-8 pb-4 pl-2 pr-8">
                <div className='flex flex-col py-4 px-6 rounded justify-between bg-white w-1/3 h-32 border-[1px] '>
                    <h1 className="text-2xl text-gray-600 font-medium">Total Earnings</h1>
                    <div className="flex flex-row justify-between">
                        <span className="text-3xl font-semibold pb-2">{data.todayEarning.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &#8363;</span>
                        <span>
                            <span className={data.increaseEarning > 0 ? "text-green" : "text-red"}>{data.increaseEarning > 0 ? "+" : ""}{data.increaseEarning}</span>
                            <span className={data.increaseEarning > 0 ? "text-green" : "text-red"}>{data.increaseEarning > 0 ? <NorthEastIcon /> : <SouthEastIcon />}</span>
                        </span>

                    </div>
                </div>
                <div className='flex flex-col py-4 px-6 rounded justify-between bg-white w-1/3 h-32 border-[1px]'>
                    <h1 className="text-2xl text-gray-600 font-medium">Total Orders</h1>
                    <div className="flex flex-row justify-between">
                        <span className="text-3xl font-semibold pb-2">{data.todayOrder.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        <span>
                            <span className={data.increaseOrder > 0 ? "text-green" : "text-red"}>{data.increaseOrder > 0 ? "+" : ""}{data.increaseOrder}</span>
                            <span className={data.increaseOrder > 0 ? "text-green" : "text-red"}>{data.increaseOrder > 0 ? <NorthEastIcon /> : <SouthEastIcon />}</span>
                        </span>

                    </div>
                </div>
                <div className='flex flex-col py-4 px-6 rounded justify-between bg-white w-1/3 h-32 border-[1px]'>
                    <h1 className="text-2xl text-gray-600 font-medium">New customers</h1>
                    <div className="flex flex-row justify-between">
                        <span className="text-3xl font-semibold pb-2">{data.todayCustomer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        <span>
                            <span className={data.increaseCustomer > 0 ? "text-green" : "text-red"}>{data.increaseCustomer > 0 ? "+" : ""}{data.increaseCustomer}</span>
                            <span className={data.increaseCustomer > 0 ? "text-green" : "text-red"}>{data.increaseCustomer > 0 ? <NorthEastIcon /> : <SouthEastIcon />}</span>
                        </span>

                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-12 py-8 pl-2 pr-8">
                <div className="w-2/3">
                    <div>
                        <Bar className="w-[100%] p-6 bg-white border-[1px]" height={170} data={doanhthu} />
                    </div>
                    <div className="text-3xl font-semibold text-yaleBlue mt-12 bg-white pt-3 pb-4 px-5 border-b-2 border-t-[1px] border-x-[1px]">Best seller</div>
                    <div className="bg-white px-4 py-2 shadow-lg border-b-[1px] border-x-[1px]">
                        <div className="header flex flex-row font-semibold text-xl">
                            <span className="grow pl-2 text-2xl">Product</span>
                            <span className="w-32 text-center">Revenue<SwapVertIcon /></span>
                            <span className="w-32 text-center">Orders<SwapVertIcon /></span>
                            <span className="w-32 text-center">Feedback<SwapVertIcon /></span>
                        </div>
                        {data.bestSeller.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-row pb-2 border-b-2 ml-3 my-2">
                                    <div className="w-10 text-center"><img src={shopdiLogo} width={40} height={40}/></div>
                                    <div className="grow my-auto ml-2">{item.name}</div>
                                    <div className="w-32 text-center">{item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &#8363;</div>
                                    <div className="w-32 text-center">{item.order}</div>
                                    <div className="w-32 text-center">{item.rating} star</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="w-1/3 ">
                    <div className="text-3xl font-semibold text-tuftsBlue pt-4 px-6 bg-white border-t-[1px] border-x-[1px]">Customer's feedback</div>
                    <Pie className="w-full bg-white pb-8 px-5 pt-2  border-b-[1px] border-x-[1px]" data={danhgia} />
                </div>
            </div>
        </div>
    )
}