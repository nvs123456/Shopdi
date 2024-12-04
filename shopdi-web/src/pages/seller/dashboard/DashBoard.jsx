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
                label: "Dooanh so trong tuan(VND)",
                data: data.summaryInWeek,
                // you can set indiviual colors for each bar
                borderWidth: 1,
            }
        ]
    }
    const danhgia = {
        labels: ["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"],
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
        <div className="w-full bg-cloudBlue p-8">
            <div className="flex flex-row gap-4">
                <img src={shopdiLogo} alt="logo" className="h-14 w-auto rounded-full"/>
                <div className="content-center"><span >Xin chao Nguyen Van A</span></div>
            </div>
            <div className="text-2xl">Tong quan hom nay : <span>{new Date().toISOString().slice(0, 10)}</span></div>
            <div className="flex flex-row gap-8 p-8">
                <div className='flex flex-col p-4 rounded justify-between bg-white w-1/3 h-32'>
                    <h1 className="text-2xl text-gray-500">Doanh thu</h1>
                    <div className="flex flex-row justify-between">
                        <span className="text-3xl font-bold">{data.todayEarning.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        <span>
                            <span className={data.increaseEarning > 0 ? "text-green" : "text-red"}>{data.increaseEarning > 0 ? "+" : ""}{data.increaseEarning}</span>
                            <span className={data.increaseEarning > 0 ? "text-green" : "text-red"}>{data.increaseEarning > 0 ? <NorthEastIcon /> : <SouthEastIcon />}</span>
                        </span>

                    </div>
                </div>
                <div className='flex flex-col p-4 rounded justify-between bg-white w-1/3 h-32'>
                    <h1 className="text-2xl text-gray-500">Don hang</h1>
                    <div className="flex flex-row justify-between">
                        <span className="text-3xl font-bold">{data.todayOrder.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        <span>
                            <span className={data.increaseOrder > 0 ? "text-green" : "text-red"}>{data.increaseOrder > 0 ? "+" : ""}{data.increaseOrder}</span>
                            <span className={data.increaseOrder > 0 ? "text-green" : "text-red"}>{data.increaseOrder > 0 ? <NorthEastIcon /> : <SouthEastIcon />}</span>
                        </span>

                    </div>
                </div>
                <div className='flex flex-col p-4 rounded justify-between bg-white w-1/3 h-32'>
                    <h1 className="text-2xl text-gray-500">Khach hang moi</h1>
                    <div className="flex flex-row justify-between">
                        <span className="text-3xl font-bold">{data.todayCustomer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        <span>
                            <span className={data.increaseCustomer > 0 ? "text-green" : "text-red"}>{data.increaseCustomer > 0 ? "+" : ""}{data.increaseCustomer}</span>
                            <span className={data.increaseCustomer > 0 ? "text-green" : "text-red"}>{data.increaseCustomer > 0 ? <NorthEastIcon /> : <SouthEastIcon />}</span>
                        </span>

                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-8 p-8">
                <div className="w-2/3">
                    <div>
                        <Bar className="w-[100%]" height={150} data={doanhthu} />
                    </div>
                    <div className="text-2xl font-bold text-celticBlue">Best seller</div>
                    <div className="bg-white p-4 shadow-lg mt-8 rounded">
                        <div className="header flex flex-row font-bold text-xl">
                            <span className="grow pl-2">Ten san pham</span>
                            <span className="w-32 text-center">Doanh thu<SwapVertIcon /></span>
                            <span className="w-32 text-center">Don hang<SwapVertIcon /></span>
                            <span className="w-32 text-center">Danh gia<SwapVertIcon /></span>
                        </div>
                        {data.bestSeller.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-row py-2 border-b-2">
                                    <div className="w-10 text-center"><img src={shopdiLogo} width={40} height={40}/></div>
                                    <div className="grow">{item.name}</div>
                                    <div className="w-32 text-center">{item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&#8363;</div>
                                    <div className="w-32 text-center">{item.order}</div>
                                    <div className="w-32 text-center">{item.rating}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="text-2xl font-bold text-gray-500">Danh gia cua nguoi dung</div>
                    <Pie className="w-full" data={danhgia} />
                </div>
            </div>
        </div>
    )
}