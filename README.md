# SHOPDI
![Screenshot (3245)](https://github.com/user-attachments/assets/87499a53-2240-4d60-8d99-50b9dc193592)
![Screenshot 2024-12-19 172301](https://github.com/user-attachments/assets/18f27d76-6fcb-4c3e-bfd0-1ac0340a3625)
## Giới thiệu chung
Bài tập lớn - INT3306 8: Phát triển ứng dụng Web 

Dự án Shopdi là hệ thống giao dịch thương mại điện tử đơn giản. Hệ thống là bên trung gian cho phép mọi người có thể đăng bán các sản phẩm và mua các sản phẩm hợp với nhu cầu. Hệ thông cũng cung cấp cho quản trị viên các chức năng giám sát hệ thống.

Hệ thống được xây dựng bởi nhóm WebWizards với các thành viên:

+ Trần Vũ Đức Huy - 22021111
+ Bùi Đỗ Khôi Nguyên - 22021183
+ Nguyễn Văn Sớm - 22021194
+ Nguyễn Văn Thịnh - 22021143

## Các tính năng chính
### Người mua:
+ Quản lý tài khoản: đăng ký tạo tài khoản, đăng nhập / đăng xuất, đổi mật khẩu, sửa thông tin cá nhân.
+ Quản lý sản phẩm: liệt kê / tìm kiếm / lọc các sản phẩm,  xem thông tin chi tiết sản phẩm.
+ Quản lý cửa hàng: xem thông tin cửa hàng, xem / tìm kiếm các sản phẩm trong cửa hàng
+ Quản lý giỏ hàng: liệt kê / thêm / xóa mặt hàng trong giỏ hàng.
+ Quản lý đơn hàng: tạo / hủy đơn hàng, xem lịch sử mua hàng, theo dõi đơn hàng, đánh giá đơn hàng.
### Người bán:
+ Quản lý cửa hàng: đăng ký tạo tài khoản, đăng nhập / đăng xuất, đổi mật khẩu, sửa thông tin cửa hàng.
+ Quản lý sản phẩm: liệt kê / thêm / xóa / sửa các sản phẩm.
+ Quản lý đơn hàng: liệt kê danh sách các đơn hàng, xác nhận trạng thái đơn hàng.
### Admin:
+ Quản lý tài khoản: đăng nhập / đăng xuất, đổi mật khẩu, liệt kê danh sách tài khoản người mua, xem thông tin người mua, cấm tài khoản người mua.
+ Quản lý cửa hàng:  liệt kê danh sách tài khoản cửa hàng, xem thông tin cửa hàng, cấm tài khoản cửa hàng.

Link slide giới thiệu: https://drive.google.com/file/d/1P5rfgsQ_Gs7UDAL9EP3pG5-0A9tZRmO4/view?usp=drive_link

Link figma: https://www.figma.com/design/76JBbAYX0ZiV9BFPiBkWBM/Shopdi?node-id=0-1&t=ljfiao8IGx5DOfYQ-1

Tài liệu backend: http://localhost:8080/swagger-ui/index.html#/
## Công nghệ sử dụng
### Frontend:
Frontend: Sử dụng VS Code để phát triển.<br>

Framework: React, Vite, Tailwind

### Backend:
Backend: Sử dụng IntelliJ IDEA để phát triển

Framework: Springboot
### Database:
Database sử dụng MySQL

## Hướng dẫn cài đặt
+   Clone repository

+   Chạy file có chứa main (hoặc sử dụng intellj)


   ```bash
   cd shopdi-web
   npm install
   npm run dev
   ```




