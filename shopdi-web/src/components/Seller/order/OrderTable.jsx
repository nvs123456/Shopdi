import React, {useState} from 'react';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const ordersData = [{
    id: '#617GF',
    customer: 'Jonathan A',
    product: 'Adidas Mens Restound M Running Shoe',
    price: 1699,
    date: '10-04-2023',
    paymentMethod: 'Paytm',
    status: 'Pending'
},
    {
        id: '#617GF',
        customer: 'Jonathan A',
        product: 'Bdidas Mens Restound M Running Shoe',
        price: 16949,
        date: '10-04-2023',
        paymentMethod: 'Paytm',
        status: 'Pending'
    }, {
        id: '#617GF',
        customer: 'Jonathan B',
        product: 'Bdidas Mens Restound M Running Shoe',
        price: 1699,
        date: '10-04-2023',
        paymentMethod: 'Paytm',
        status: 'Processing'
    }, {
        id: '#617GF',
        customer: 'Jonathan C',
        product: 'Cdidas Mens Restound M Running Shoe',
        price: 1699,
        date: '10-04-2023',
        paymentMethod: 'Paytm',
        status: 'Cancelled'
    }, {
        id: '#617GF',
        customer: 'Jonathan D',
        product: 'Ddidas Mens Restound M Running Shoe',
        price: 1699,
        date: '10-04-2023',
        paymentMethod: 'Paytm',
        status: 'Delivered'
    }, // Add more order objects as needed
];

const getStatusClass = (status) => {
    switch (status) {
        case 'Pending':
            return 'bg-[#FFFBAA] bg-opacity-[70%] text-[#FF731D]';
        case 'Processing':
            return 'bg-[#74DD7B] bg-opacity-[30%] text-[#4BB543]';
        case 'Cancelled':
            return 'bg-[#F57E77] bg-opacity-[12%] text-[#CC5F5F]';
        case 'Delivered':
            return 'bg-[#3A5BFF] bg-opacity-[15%] text-[#3A5BFF]';
        default:
            return '';
    }
};

const tableHeadings = ['id', 'customer', 'product', 'price', 'date', 'payment', 'status', 'action'];

function OrderTable({type}) {

    const [orders, setOrders] = useState(ordersData);
    const [sortConfig, setSortConfig] = useState({key: '', direction: ''});
    const [filter, setFilter] = useState(type);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});

        const sortedOrders = [...orders].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setOrders(sortedOrders);
    };
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                <tr className="border-b">
                    {tableHeadings.map((heading, index) => (
                        <th key={index} className="px-4 py-2 text-left font-semibold cursor-pointer"
                            onClick={() => handleSort(heading)}>
                            <div className={'flex items-center'}>
                                {heading.charAt(0).toUpperCase() + heading.slice(1)}

                                <svg className="w-3 h-3 text-gray-400 ms-1.5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                     viewBox="0 0 24 24">
                                    <path
                                        d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg>
                            </div>


                        </th>))}
                </tr>
                </thead>
                <tbody>
                {(filter === 'All products' ? orders :
                    orders.filter(order => order.status === filter))
                    .map((order, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="px-2 py-1">{order.id}</td>
                            <td className="px-2 py-1">{order.customer}</td>
                            <td className="px-2 py-1">{order.product}</td>
                            <td className="px-2 py-1">${order.price.toLocaleString()}</td>
                            <td className="px-2 py-1">{order.date}</td>
                            <td className="px-2 py-1">{order.paymentMethod}</td>
                            <td className="px-2 py-1">
                  <span className={`px-2 py-1 m-0 rounded w-full text-[16px] ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                            </td>
                            <td className="px-4 py-2">
                                {order.status === 'Pending' ? <button
                                        className="text-white rounded px-2 py-1 font-medium bg-[#3F81E0]">Confirm</button> :
                                    <div>
                                        <ModeEditIcon
                                            className='cursor-pointer hover:text-[#555555] text-[#A3A9B6]'
                                            fontSize='small'/>
                                        <DeleteIcon
                                            className='cursor-pointer hover:text-[#555555] text-[#A3A9B6]'
                                            fontSize='small'/>
                                    </div>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>);
}

export default OrderTable;