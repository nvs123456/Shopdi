import React from "react";
export default function Categories() {
    let categories =["Thời Trang Nam", "Thời Trang Nữ", "Điện Thoại và Phụ Kiện", "Mẹ và Bé", "Thiết Bị Điện Tử", "Nhà Cửa và Đời Sống", "Máy Tính và Laptop", "Sắc Đẹp", "Máy Ảnh và Máy Quay Phim", "Sức Khỏe", "Đồng Hồ", "Giày Dép Nữ", "Giày Dép Nam", "Túi Ví Nữ", "Thiết Bị Điện Gia Dụng", "Phụ Kiện và Trang Sức Nữ", "Thể Thao và Du Lịch", "Bách Hóa Online", "Ô Tô và Xe Máy và Xe Đạp", "Nhà Sách Online", "Balo và Túi Ví Nam", "Thời Trang Trẻ Em", "Đồ Chơi", "Giặt Giũ và Chăm Sóc Nhà Cửa", "Chăm Sóc Thú Cưng", "Voucher và Dịch Vụ", "Dụng cụ và thiết bị tiện ích"]
    
    return (
        <div className="bg-yaleBlue pl-40 pr-40">
        <div className="flex flex-row flex-wrap space-x-6">
            {categories.map(category => <div className="inline-block">{category}</div>)}
        </div>
        </div>
    )
}