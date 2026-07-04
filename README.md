# 🎯 CV Builder Pro - Tạo CV Chuyên Nghiệp

Ứng dụng web đơn giản giúp bạn tạo CV chuyên nghiệp chỉ trong vài phút!

## ✨ Tính Năng

- **4 Template Đẹp Mắt**: Professional, Modern, Elegant, Creative
- **Nhập 1 Lần - Đổi Template Thoải Mái**: Chuyển đổi template real-time
- **Lưu Trữ Tự Động**: Dữ liệu được lưu vào LocalStorage
- **Xuất PDF Chuẩn A4**: Tải CV dưới dạng PDF chất lượng cao, tự động chia trang
- **Upload CV PDF**: Tự động parse thông tin từ CV cũ
- **Responsive 100%**: Tối ưu hoàn hảo cho điện thoại, tablet, desktop
- **Không Cần Server**: Chạy hoàn toàn trên trình duyệt

## 🚀 Cách Sử Dụng

### 💻 **Trên Desktop/Laptop:**
1. Mở file `builder.html` trong trình duyệt
2. Điền thông tin vào form bên trái (chỉ cần điền 1 lần)
3. Click tab trên cùng để chuyển đổi template (Professional, Modern, Elegant, Creative)
4. CV tự động cập nhật theo template đã chọn
5. Click "📥 Xuất PDF" để tải về

### 📱 **Trên Mobile/Tablet:**
1. Mở file `builder.html`
2. Click nút **"📝 Form"** ở góc dưới bên phải để mở form nhập liệu
3. Điền thông tin, sau đó click vùng preview để đóng form
4. Chuyển đổi template bằng các tab ở trên
5. Vuốt/zoom để xem preview CV
6. Xuất PDF khi hoàn tất

### 📤 **Upload CV Cũ:**
1. Mở `upload-cv.html`
2. Kéo thả hoặc chọn file PDF
3. Hệ thống tự động trích xuất thông tin
4. Chọn template mới và xuất PDF

## 🔐 **Hệ Thống Đăng Nhập & Lưu Trữ**

### **Tài Khoản Demo:**
```
Username: admin  |  Password: admin123
Username: demo   |  Password: demo123
```

### **Luồng Hoạt Động:**
1. 🔑 **Đăng nhập** tại `login.html`
2. 📊 Vào **Dashboard** để xem/quản lý CV của bạn
3. ✏️ Tạo mới hoặc chỉnh sửa CV
4. 💾 Dữ liệu tự động lưu vào LocalStorage (kết hợp với JSON mẫu)
5. 📥 Xuất PDF bất cứ lúc nào

### **⚠️ Lưu Ý Về Lưu Trữ:**
Do JavaScript client-side **không thể ghi trực tiếp** vào file JSON trên server:
- **`data/*.json`**: Chứa dữ liệu mẫu (chỉ đọc)
- **LocalStorage**: Lưu dữ liệu thực tế của người dùng

**Để lưu vào database thực sự, cần:**
- Backend API (Node.js/Express, PHP, Python/Flask, etc.)
- Database (MongoDB, MySQL, PostgreSQL, Firebase, Supabase, etc.)

## 📁 Cấu Trúc Dự Án

```
cv-builder/
├── index.html          # Trang chủ
├── login.html          # Đăng nhập ⭐
├── dashboard.html      # Quản lý CV ⭐
├── builder.html        # Editor side-by-side
├── template-*.html     # Các template riêng
├── upload-cv.html      # Upload & parse PDF
├── data/
│   ├── users.json      # User accounts ⭐
│   └── cv-data.json    # CV mẫu ⭐
├── styles.css          # CSS chính
├── auth.js             # Authentication ⭐
├── dashboard.js        # Dashboard logic ⭐
├── script.js           # Logic chính
├── cv-templates.js     # Template generator
├── builder.js          # Builder logic
├── upload-cv.js        # PDF parser
└── README.md
```

## 🎨 Templates

### Modern
- Phong cách hiện đại
- Header gradient đẹp mắt
- Phù hợp cho ngành công nghệ, thiết kế

### Classic
- Layout sidebar truyền thống
- Chuyên nghiệp, thanh lịch
- Phù hợp cho mọi ngành nghề

### Creative
- Sáng tạo với avatar tròn
- Màu sắc nổi bật
- Phù hợp cho ngành sáng tạo

### Minimal
- Tối giản, tinh tế
- Font chữ serif
- Phù hợp cho vị trí cao cấp

## 💾 Lưu Trữ Dữ Liệu

Dữ liệu được lưu tự động vào **LocalStorage** của trình duyệt:
- Không cần đăng ký tài khoản
- Dữ liệu được giữ ngay cả khi đóng trình duyệt
- Có thể xóa dữ liệu bất kỳ lúc nào

## 📥 Xuất PDF

Sử dụng thư viện **html2pdf.js** để chuyển đổi CV sang PDF:
- Chất lượng cao (A4, 300 DPI)
- Giữ nguyên định dạng và màu sắc
- Tên file tự động theo tên của bạn

## 🛠️ Công Nghệ

- **HTML5**: Cấu trúc
- **CSS3**: Styling, animations, responsive
- **JavaScript**: Logic, LocalStorage
- **html2pdf.js**: Xuất PDF

## 📝 Lưu Ý

- Cần kết nối internet lần đầu để tải thư viện html2pdf.js
- Sau đó có thể sử dụng offline
- Dữ liệu chỉ lưu trên máy của bạn (LocalStorage)

## 🎯 Cải Tiến Trong Tương Lai

- [ ] Thêm nhiều template hơn
- [ ] Upload ảnh đại diện
- [ ] Chọn màu sắc tùy chỉnh
- [ ] Xuất Word document
- [ ] Chia sẻ CV qua link
- [ ] Đa ngôn ngữ

## 📄 License

Free to use - MIT License

---

**Tạo bởi AI Assistant** 🤖
