# 🐛 Debug: PDF Export Ra Màu Đen

## ❌ Vấn Đề:
PDF export ra màu **đen/xám** với chỉ một đường xanh phía trên.

---

## 🔍 Các Bước Debug:

### **Bước 1: Test File Đơn Giản**

1. Mở file `test-export.html` trong browser
2. Click nút "📥 Export PDF"
3. Kiểm tra:
   - ✅ Nếu PDF ra **đầy đủ màu sắc** → Vấn đề là ở `builder.html`
   - ❌ Nếu PDF vẫn **đen** → Vấn đề là thư viện `html2pdf.js`

---

### **Bước 2: Kiểm Tra Preview**

Mở `builder.html` và:

1. **Press F12** → Mở Developer Console
2. Kiểm tra xem CV có hiển thị trong preview không?
3. Click nút "🔍 Test Console" (nếu có) hoặc paste vào Console:

```javascript
const cv = document.querySelector('.cv-professional');
console.log('CV Element:', cv);
console.log('Width:', cv?.offsetWidth, 'px');
console.log('Height:', cv?.offsetHeight, 'px');
console.log('Display:', window.getComputedStyle(cv)?.display);
console.log('Visibility:', window.getComputedStyle(cv)?.visibility);
```

**Kết quả mong đợi:**
```
CV Element: <div class="cv-professional">...</div>
Width: 794 px (hoặc tương tự)
Height: 1123 px (hoặc hơn)
Display: flex
Visibility: visible
```

**Nếu `cv` là `null`:**
- ❌ CV không được render
- ❌ Chưa chọn template hoặc chưa có data

---

### **Bước 3: Kiểm Tra html2canvas**

Trong Console, chạy:

```javascript
// Test html2canvas trực tiếp
const cv = document.querySelector('.cv-professional');

html2canvas(cv, {
    scale: 2,
    logging: true,
    backgroundColor: '#ffffff'
}).then(canvas => {
    console.log('Canvas created:', canvas);
    console.log('Canvas size:', canvas.width, 'x', canvas.height);
    
    // Hiển thị canvas để xem
    canvas.style.border = '2px solid red';
    document.body.appendChild(canvas);
});
```

**Kết quả mong đợi:**
- Canvas hiển thị với **đầy đủ nội dung CV**
- Không phải màu đen

**Nếu canvas đen:**
- ❌ html2canvas không capture được
- ❌ Có thể do CSS transform, position, hoặc z-index

---

### **Bước 4: Kiểm Tra CSS**

Trong Console:

```javascript
const cv = document.querySelector('.cv-professional');
const styles = window.getComputedStyle(cv);

console.log('Background:', styles.background);
console.log('Transform:', styles.transform);
console.log('Position:', styles.position);
console.log('Z-index:', styles.zIndex);
console.log('Opacity:', styles.opacity);
```

**Vấn đề thường gặp:**
- `transform: scale(...)` → html2canvas bị lỗi
- `position: fixed/absolute` với offset lớn
- `opacity: 0` hoặc `display: none`

---

## ✅ Giải Pháp Theo Từng Trường Hợp:

### **Trường Hợp 1: CV Không Hiển Thị (null)**

**Nguyên nhân:** Chưa nhập data hoặc chưa chọn template

**Giải pháp:**
1. Nhập thông tin vào form
2. Chọn template (Professional, Modern, etc.)
3. Đợi preview render (1-2 giây)
4. Thử export lại

---

### **Trường Hợp 2: Canvas Đen (html2canvas fail)**

**Nguyên nhân:** CSS transform hoặc position

**Giải pháp:** Sửa `builder.js`:

```javascript
html2canvas: {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: true,
    backgroundColor: '#ffffff',
    scrollX: 0,
    scrollY: 0,
    windowWidth: document.body.scrollWidth,
    windowHeight: document.body.scrollHeight,
    onclone: function(clonedDoc) {
        const clonedCV = clonedDoc.querySelector('.cv-professional');
        if (clonedCV) {
            // Reset transform
            clonedCV.style.transform = 'none';
            clonedCV.style.position = 'relative';
            clonedCV.style.left = '0';
            clonedCV.style.top = '0';
        }
    }
}
```

---

### **Trường Hợp 3: Gradient Không Hiển Thị**

**Nguyên nhân:** Browser không render gradient trong canvas

**Giải pháp:** Dùng màu solid thay vì gradient:

```css
.cv-sidebar {
    background: #29B6F6; /* Solid color thay vì gradient */
}
```

Hoặc force render:

```javascript
onclone: function(clonedDoc) {
    const sidebar = clonedDoc.querySelector('.cv-sidebar');
    if (sidebar) {
        sidebar.style.background = '#29B6F6';
    }
}
```

---

### **Trường Hợp 4: Chỉ Có Đường Xanh Phía Trên**

**Nguyên nhân:** html2canvas chỉ capture được một phần

**Giải pháp:**

1. **Xóa transform/scale trong preview:**

```css
.cv-preview {
    transform: none !important;
    scale: 1 !important;
}
```

2. **Export từ full-size clone:**

```javascript
// Clone CV ra ngoài preview area
const clone = cvContainer.cloneNode(true);
clone.style.position = 'absolute';
clone.style.left = '-9999px';
clone.style.width = '210mm';
clone.style.transform = 'none';
document.body.appendChild(clone);

// Export clone
html2pdf().from(clone).save().then(() => {
    document.body.removeChild(clone);
});
```

---

## 🚀 Quick Fix - Thử Ngay:

Mở Console trong `builder.html` và paste:

```javascript
function quickFixExport() {
    const cv = document.querySelector('.cv-professional');
    if (!cv) {
        alert('Không tìm thấy CV! Hãy nhập thông tin trước.');
        return;
    }

    // Clone và đặt ở vị trí chuẩn
    const clone = cv.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '0';
    clone.style.top = '0';
    clone.style.transform = 'none';
    clone.style.width = '210mm';
    clone.style.zIndex = '9999';
    document.body.appendChild(clone);

    // Export
    html2pdf()
        .set({
            margin: 10,
            filename: 'CV_Test.pdf',
            html2canvas: { 
                scale: 2, 
                backgroundColor: '#fff',
                logging: true 
            },
            jsPDF: { 
                format: 'a4' 
            }
        })
        .from(clone)
        .save()
        .then(() => {
            document.body.removeChild(clone);
            alert('✅ Xong!');
        });
}

quickFixExport();
```

---

## 📋 Checklist:

- [ ] `test-export.html` export OK?
- [ ] CV hiển thị trong preview?
- [ ] Console có lỗi gì không?
- [ ] html2canvas test OK?
- [ ] CSS transform = none?
- [ ] Position không âm?
- [ ] Background color đúng?

---

## 💡 Nếu Vẫn Không Được:

**Plan B: Dùng Window.print()**

```javascript
function exportWithPrint() {
    window.print(); // Browser sẽ mở dialog in ấn
    // User chọn "Save as PDF"
}
```

**Ưu điểm:**
- ✅ Luôn hoạt động
- ✅ Màu sắc chính xác
- ✅ Không cần thư viện

**Nhược điểm:**
- ❌ User phải chọn "Save as PDF"
- ❌ Không tự động đặt tên file

---

Sau khi debug xong, báo kết quả để tôi fix! 🚀
