# 📥 Hướng Dẫn Export PDF

## 🎯 Có 2 Cách Export PDF:

---

## ✅ **CÁCH 1: Nút "🖨️ In PDF" (KHUYÊN DÙNG)**

### **Ưu điểm:**
- ✅ **Luôn hoạt động 100%**
- ✅ Màu sắc chính xác
- ✅ Không bị lỗi trang đen
- ✅ Chất lượng cao
- ✅ Không cần thư viện

### **Cách sử dụng:**
1. Nhập đầy đủ thông tin CV
2. Click nút **"🖨️ In PDF"** (màu xanh lá)
3. Trong dialog in:
   - **Windows:** Chọn "Microsoft Print to PDF" hoặc "Save as PDF"
   - **Mac:** Click "PDF" → "Save as PDF"
4. Chọn vị trí lưu file
5. Click "Save" → **XONG!**

### **Kết quả:**
```
✅ PDF đầy đủ màu sắc
✅ Layout đúng như preview
✅ Không bị trang trắng
✅ File size nhỏ
```

---

## ⚠️ **CÁCH 2: Nút "📥 Xuất PDF" (html2pdf.js)**

### **Vấn đề hiện tại:**
- ❌ PDF ra màu đen/xám
- ❌ Trang 1 trống, trang 2 thiếu dữ liệu
- ❌ Chỉ thấy sidebar xanh
- ❌ html2canvas không capture đúng

### **Nguyên nhân:**
1. Preview area có background xám (#e5e7eb)
2. CV container có transform/scale
3. html2canvas không render được gradient
4. Position và z-index bị conflict

### **Cách fix (nếu muốn dùng):**

#### **Fix 1: Mở file trong Web Server**

```bash
# Thay vì mở file:// trực tiếp
# Chạy server local:

# Python:
python -m http.server 8000

# Node.js:
npx serve

# Sau đó mở: http://localhost:8000
```

#### **Fix 2: Test với file đơn giản**

1. Mở `test-export.html`
2. Click "📥 Export PDF"
3. Nếu OK → Vấn đề là ở builder.html
4. Nếu vẫn đen → Vấn đề là browser/html2pdf

#### **Fix 3: Kiểm tra Console**

Mở `builder.html` → F12 → Console:

```javascript
// Check CV element
const cv = document.querySelector('.cv-professional');
console.log('CV:', cv);
console.log('Width:', cv.offsetWidth);
console.log('Height:', cv.offsetHeight);

// Nếu cv là null → Chưa có data
// Nếu width/height = 0 → CV bị ẩn
```

---

## 📊 So Sánh:

| Tính năng | 🖨️ In PDF | 📥 html2pdf |
|-----------|-----------|-------------|
| **Hoạt động** | ✅ 100% | ⚠️ 50% |
| **Màu sắc** | ✅ Chính xác | ❌ Đen |
| **Layout** | ✅ Perfect | ❌ Lỗi |
| **Dễ dùng** | ✅ Đơn giản | ⚠️ Phức tạp |
| **Tự động** | ❌ Manual save | ✅ Auto download |

---

## 🎯 KHUYẾN NGHỊ:

### **Cho người dùng thường:**
→ Dùng **"🖨️ In PDF"** (nút xanh lá)

### **Cho developer/test:**
→ Dùng **"📥 Xuất PDF"** sau khi fix xong

---

## 🔧 Nếu Muốn Fix html2pdf:

### **Cần làm:**

1. ✅ **Deploy lên Vercel** (khuyên dùng nhất)
   - html2pdf hoạt động tốt hơn trên web server
   - Không có vấn đề CORS
   - API serverless có thể xử lý PDF server-side

2. ✅ **Hoặc chạy local server:**
   ```bash
   python -m http.server 8000
   # Mở: http://localhost:8000
   ```

3. ✅ **Xóa transform/scale trong CSS:**
   ```css
   .cv-preview {
       transform: none !important;
       scale: 1 !important;
   }
   ```

4. ✅ **Đơn giản hóa CSS:**
   - Thay gradient bằng màu solid
   - Xóa các effect không cần thiết
   - Dùng position: relative thay vì absolute

---

## ✅ Workflow Hiện Tại:

```
1. Mở builder.html
   ↓
2. Nhập thông tin CV
   ↓
3. Chọn template
   ↓
4. Click "🖨️ In PDF" (NÚT XANH LÁ)
   ↓
5. Trong dialog in → Chọn "Save as PDF"
   ↓
6. Chọn vị trí lưu
   ↓
7. ✅ XONG! PDF hoàn hảo!
```

---

## 🐛 Troubleshooting:

### **Q: Nút "In PDF" không hiện?**
**A:** Reload lại trang (Ctrl + F5)

### **Q: Dialog in không hiện?**
**A:** Browser đang block popup. Cho phép popup từ site này.

### **Q: PDF không có màu?**
**A:** Trong dialog in, bật "Background graphics"

### **Q: Vẫn muốn dùng html2pdf?**
**A:** Deploy lên Vercel hoặc chạy local server, đừng mở file:// trực tiếp

---

## 🚀 Next Steps:

1. ✅ **Ngay bây giờ:** Dùng "🖨️ In PDF"
2. ⏳ **Sau này:** Deploy lên Vercel để html2pdf hoạt động tốt hơn
3. 🔮 **Tương lai:** Có thể thêm server-side PDF generation

---

## 📞 Kết Luận:

**TL;DR:** 
- Dùng **"🖨️ In PDF"** (nút xanh lá) → Luôn OK ✅
- "📥 Xuất PDF" đang bị lỗi → Cần fix hoặc deploy Vercel

**Happy PDF Exporting!** 🎉
