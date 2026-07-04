# ⚡ Quick Start - Test Ngay!

## 🚀 Cách Test Nhanh Nhất (30 giây)

### Bước 1: Chạy Web Server

**VSCode (Recommended):**
1. Cài extension "Live Server"
2. Right-click vào `builder.html`
3. Chọn "Open with Live Server"

**Hoặc dùng command line:**
```bash
# Node.js
npx serve

# Python 3
python -m http.server 8000

# PHP
php -S localhost:8000
```

### Bước 2: Test Load Data

Mở `builder.html` trong browser, bạn sẽ thấy:

```
┌─────────────────────────────┐
│ 📝 Điền Thông Tin CV       │
│ [📂 Load Demo (Thu Thủy)]  │  ← Click vào đây!
└─────────────────────────────┘
```

Click nút **"📂 Load Demo (Thu Thủy)"**

### Bước 3: Kiểm Tra

✅ **Form sẽ tự động điền:**
- Họ tên: Phạm Thị Thu Thủy
- Chức danh: Laboratory Staff
- Email: thuthuy3048@gmail.com
- Phone: 0357419175
- 2 Work Experience
- 2 Education
- 2 Certifications
- Skills & Interests

✅ **Preview bên phải hiển thị CV đầy đủ**

✅ **Console (F12) hiển thị:**
```
🔄 Loading demo data...
📦 JSON loaded, total CVs: 3
✅ Found Thu Thủy CV: Phạm Thị Thu Thủy
✓ fullName: Phạm Thị Thu Thủy
✓ title: Laboratory Staff
...
✅ Form population complete!
```

---

## 🐛 Nếu Không Load Được

### Check 1: Web Server?
❌ **SAI:** Mở file trực tiếp `file:///D:/Code/test/cv-builder/builder.html`
✅ **ĐÚNG:** `http://localhost:5500/cv-builder/builder.html`

### Check 2: Console có lỗi?
Mở Console (F12):

**Lỗi thường gặp:**
```javascript
// ❌ CORS error
Access to fetch at 'file:///...' from origin 'null' has been blocked
→ Fix: Chạy trên web server

// ❌ 404 Not Found
GET http://localhost:5500/data/cv-data.json 404
→ Fix: Check file tồn tại ở đúng path

// ❌ JSON parse error  
SyntaxError: Unexpected token
→ Fix: Check JSON syntax (dùng test-data.html)
```

### Check 3: Test JSON Trước
Mở `test-data.html`:
1. Click "Test CV-Data.json"
2. Phải thấy: "✅ CV-Data.json loaded successfully!"
3. Thấy 3 CVs được list ra

Nếu bước này fail → JSON file bị lỗi!

---

## 📋 Debug Checklist

```bash
✅ Đã chạy web server (Live Server hoặc npx serve)
✅ URL là http://localhost:... (không phải file://)
✅ File data/cv-data.json tồn tại
✅ File data/users.json tồn tại
✅ test-data.html load được JSON
✅ Console không có lỗi đỏ
✅ Đã clear cache (Ctrl+Shift+R)
```

---

## 🎯 Test Scenarios

### Scenario 1: Load Demo Data
```
1. Mở builder.html
2. Click "Load Demo (Thu Thủy)"
3. Check form có data
4. Check preview hiển thị
5. Click "Xuất PDF"
```

### Scenario 2: Login & Edit
```
1. Mở login.html
2. Login: thuthuy / thuy123
3. Dashboard → Click "Sửa"
4. Data tự động load
5. Chỉnh sửa → Auto-save
```

### Scenario 3: Change Template
```
1. Load demo data
2. Click tab "Modern"
3. Preview update
4. Click "Elegant"
5. Preview update again
6. Xuất PDF
```

---

## 💡 Tips

### Xem Data Trong Console
```javascript
// Xem CV data hiện tại
console.log(cvData);

// Xem user đang login
console.log(getCurrentUser());

// Xem tất cả CV đã save
console.log(getUserSavedCVs());

// Force load demo
loadDemoData();
```

### Clear All Data
```javascript
// Clear localStorage
localStorage.clear();

// Reload page
location.reload();
```

---

## 📱 Test Mobile

1. Mở DevTools (F12)
2. Click icon 📱 (Toggle device toolbar)
3. Chọn "iPhone 12 Pro" hoặc "Pixel 5"
4. Test:
   - Click nút "📝 Form" (góc dưới phải)
   - Form slide vào
   - Click preview → Form đóng
   - Preview có scale đúng không?

---

## ✅ Expected Results

### Form Fields Được Fill:
- [x] Họ tên
- [x] Chức danh
- [x] Ngày sinh
- [x] Email, Phone, Address
- [x] Objective
- [x] Work Skills
- [x] Interests (4 items)
- [x] 2 Experiences (QC staff Lab, QC line staff)
- [x] 2 Educations (HCMC, Binh Duong)
- [x] 2 Certifications (MS Office, English)
- [x] 2 Languages (English Level B, Vietnamese)

### Preview Shows:
- [x] Tên đầy đủ: PHẠM THỊ THU THỦY
- [x] Laboratory Staff
- [x] Contact info đầy đủ
- [x] Objective section
- [x] Experience với 2 jobs
- [x] Education với 2 degrees
- [x] Certifications section
- [x] Template = Professional (sidebar cyan)

---

## 🆘 Cần Giúp?

1. Chụp màn hình Console (F12)
2. Chụp màn hình Network tab
3. Check file paths
4. Test với `test-data.html` trước

---

## 🎉 Success!

Nếu thấy:
- ✅ Form đầy đủ data
- ✅ Preview hiển thị CV đẹp
- ✅ Có thể xuất PDF
- ✅ Console không có lỗi

→ **HỆ THỐNG HOẠT ĐỘNG HOÀN HẢO!** 🚀
