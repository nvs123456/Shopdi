# SHOPDI
![Screenshot (3245)](https://github.com/user-attachments/assets/87499a53-2240-4d60-8d99-50b9dc193592)
![Screenshot 2024-12-19 172301](https://github.com/user-attachments/assets/18f27d76-6fcb-4c3e-bfd0-1ac0340a3625)
## Giới thiệu chung
Bài tập lớn - INT3306 8: Phát triển ứng dụng Web

Dự án Shopdi là một hệ thống giao dịch thương mại điện tử đơn giản, đóng vai trò trung gian để kết nối người bán và người mua.
- Người mua: Có thể tìm kiếm, đặt mua các sản phẩm phù hợp nhu cầu.
- Người bán: Có thể đăng bán các sản phẩm của mình.
- Quản trị viên (Admin): Quản lý và giám sát hoạt động trên hệ thống.

Hệ thống được xây dựng bởi nhóm WebWizards với các thành viên:

+ Trần Vũ Đức Huy - 22021111
+ Bùi Đỗ Khôi Nguyên - 22021183
+ Nguyễn Văn Sớm - 22021194
+ Nguyễn Văn Thịnh - 22021143

## Các tính năng chính
### Người mua
- Quản lý tài khoản:
  + Đăng ký, đăng nhập, đăng xuất.
  + Đổi mật khẩu, sửa thông tin cá nhân.
- Quản lý sản phẩm:
  + Liệt kê, tìm kiếm, lọc sản phẩm.
   + Xem thông tin chi tiết sản phẩm.
  - Quản lý cửa hàng:
  + Xem thông tin cửa hàng, tìm kiếm sản phẩm trong cửa hàng.
- Quản lý giỏ hàng:
  + Liệt kê, thêm, xóa mặt hàng trong giỏ hàng.
- Quản lý đơn hàng:
  + Tạo, hủy đơn hàng.
  + Xem lịch sử mua hàng, theo dõi đơn hàng, đánh giá đơn hàng. 
### Người bán
- Quản lý cửa hàng:
  + Đăng ký, đăng nhập, đăng xuất.
  + Đổi mật khẩu, sửa thông tin cửa hàng.
- Quản lý sản phẩm:
  + Liệt kê, thêm, xóa, sửa sản phẩm.
- Quản lý đơn hàng:
  + Liệt kê danh sách đơn hàng, xác nhận trạng thái đơn hàng.
  + Thống kê đơn hàng
### Admin
- Quản lý tài khoản:
  + Đăng nhập, đăng xuất, đổi mật khẩu.
  + Liệt kê danh sách tài khoản người mua, xem thông tin và cấm tài khoản người mua.
- Quản lý cửa hàng:
  + Liệt kê danh sách tài khoản cửa hàng, xem thông tin và cấm tài khoản cửa hàng.

Link slide giới thiệu: [Tại đây](https://drive.google.com/file/d/1P5rfgsQ_Gs7UDAL9EP3pG5-0A9tZRmO4/view?usp=drive_link)

Link figma:[Tại đây](https://www.figma.com/design/76JBbAYX0ZiV9BFPiBkWBM/Shopdi?node-id=0-1&t=ljfiao8IGx5DOfYQ-1)

Tài liệu backend: [Tại đây](http://localhost:8080/swagger-ui/index.html#/)
## Công nghệ sử dụng
### Frontend:
- ⚛️ Framework: React + Vite
- 📡 Thư viện hỗ trợ:
- ☁️ Axios.
- 🎨 TailwindCSS, Material UI

### Backend:
- 🚀 Framework: Java Spring Boot
- 💾  Cơ sở dữ liệu: MySQL.
- 🔒 Xác thực: JSON Web Token (JWT).
- 💳  Tích hợp thanh toán: VNPay API.

## Hướng dẫn cài đặt
Clone repository
```sh
git clone https://github.com/BuiDoKhoiNguyen/Shopdi.git
cd shopdi
```
Cài đặt và chạy Frontend
```sh
cd shopdi-web
npm install
npm run dev
```
Cài đặt và chạy Backend
- Mở project backend bằng IntelliJ IDEA hoặc một IDE Java bất kỳ.
- Chạy file chứa hàm main.



