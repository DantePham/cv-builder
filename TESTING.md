# 🧪 Hướng Dẫn Test CV Builder

## 🚀 Test Nhanh - Load Demo Data

### Cách 1: Không cần đăng nhập
1. Mở `builder.html` trực tiếp
2. Click nút **"📂 Load Demo (Thu Thủy)"** ở phía trên
3. ✅ Dữ liệu của Phạm Thị Thu Thủy sẽ được load tự động
4. Xem preview CV bên phải
5. Click "📥 Xuất PDF" để tải về

### Cách 2: Đăng nhập và xem từ Dashboard
1. Mở `login.html`
2. Nhập:
   - **Username:** `thuthuy`
   - **Password:** `thuy123`
3. Click "Đăng Nhập"
4. Tự động chuyển đến Dashboard
5. Thấy CV "Phạm Thị Thu Thủy - Laboratory Staff"
6. Click "✏️ Sửa" để chỉnh sửa
7. Xuất PDF

## 📝 Dữ Liệu Test Có Sẵn

### User Accounts (data/users.json)
```
1. admin / admin123
2. demo / demo123
3. thuthuy / thuy123 ⭐
```

### CV Data (data/cv-data.json)
```
1. Nguyễn Văn A - Senior Software Engineer (userId: 1)
2. Trần Thị B - Marketing Manager (userId: 2)
3. Phạm Thị Thu Thủy - Laboratory Staff (userId: 3) ⭐
```

## ✅ Checklist Test

### Test 1: Load Demo Data
- [ ] Mở `builder.html`
- [ ] Click "Load Demo (Thu Thủy)"
- [ ] Kiểm tra form đã điền đầy đủ thông tin
- [ ] Kiểm tra preview hiển thị đúng
- [ ] Thử đổi template (Professional → Modern → Elegant → Creative)
- [ ] Xuất PDF

### Test 2: Login & Dashboard
- [ ] Mở `login.html`
- [ ] Login với `thuthuy/thuy123`
- [ ] Dashboard hiển thị 1 CV
- [ ] Click "Sửa" CV
- [ ] Dữ liệu load đầy đủ
- [ ] Chỉnh sửa một vài field
- [ ] Dữ liệu tự động save

### Test 3: Tạo CV Mới
- [ ] Từ Dashboard, click "Tạo CV Mới"
- [ ] Điền thông tin mới
- [ ] Chọn template
- [ ] Xuất PDF
- [ ] Quay lại Dashboard, thấy 2 CV

### Test 4: Responsive Mobile
- [ ] Mở trên điện thoại (hoặc F12 → Device Mode)
- [ ] Click nút "📝 Form" ở góc dưới phải
- [ ] Form slide vào
- [ ] Click preview để đóng form
- [ ] Preview CV scale đúng

## 🐛 Debug

Nếu dữ liệu không load:
1. Mở Console (F12)
2. Xem log: "Populating form with data:"
3. Kiểm tra file `data/cv-data.json` có đúng format không
4. Thử clear LocalStorage: `localStorage.clear()`
5. Reload trang

## 📊 Kiểm Tra Data Đã Load

Mở Console (F12) và chạy:
```javascript
// Xem current CV data
console.log(cvData);

// Xem user hiện tại
console.log(getCurrentUser());

// Xem tất cả CV đã save
console.log(getUserSavedCVs());
```

## 🎯 Expected Results

### CV Thu Thủy phải có:
- ✅ Tên: Phạm Thị Thu Thủy
- ✅ Chức danh: Laboratory Staff
- ✅ Email: thuthuy3048@gmail.com
- ✅ Phone: 0357419175
- ✅ 2 Work Experience (QC staff Lab, QC line staff)
- ✅ 2 Education (HCMC Food Industry, Binh Duong Uni)
- ✅ 2 Certifications (MS Office, English Level B)
- ✅ 4 Interests
- ✅ Work Skills đầy đủ

## 🔧 Troubleshooting

### Lỗi: "Cannot read property 'join' of undefined"
- Nguyên nhân: technicalSkills hoặc softSkills không phải array
- Fix: Check data/cv-data.json, đảm bảo là array `[]`

### Lỗi: Form trống sau khi click Load Demo
- Check Console có lỗi fetch không
- Đảm bảo file `data/cv-data.json` tồn tại
- Thử mở trực tiếp: `http://localhost/cv-builder/data/cv-data.json`

### Lỗi: "getCurrentUser is not defined"
- Nguyên nhân: auth.js chưa load
- Fix: Thêm `<script src="auth.js"></script>` vào HTML

## 📱 Test Trên Live Server

**Quan trọng:** Vì sử dụng `fetch()`, cần chạy trên web server:

```bash
# Cách 1: VSCode Live Server
# Click chuột phải vào index.html → "Open with Live Server"

# Cách 2: Python
python -m http.server 8000
# Mở: http://localhost:8000/cv-builder/

# Cách 3: Node.js
npx serve
# Mở: http://localhost:3000/cv-builder/
```

## ✨ Features Hoạt Động

- [x] Load dữ liệu từ JSON
- [x] Đăng nhập với users.json
- [x] Dashboard quản lý CV
- [x] Tạo/Sửa/Xóa CV
- [x] 4 templates (Professional, Modern, Elegant, Creative)
- [x] Xuất PDF chuẩn A4
- [x] Responsive mobile
- [x] Auto-save vào LocalStorage
- [x] Upload PDF và parse (upload-cv.html)
