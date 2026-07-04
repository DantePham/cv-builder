# ⚡ Quick Fix: PDF Bị Trắng Bên Phải

## ❌ Vấn Đề:
- Sidebar (xanh) hiển thị OK
- Phần bên phải (cv-main) BỊ TRẮNG
- Không có Experience, Education

---

## ✅ GIẢI PHÁP NGAY:

### **Dùng Nút "🖨️ In PDF" (KHUYÊN DÙNG NHẤT)**

1. Click nút **"🖨️ In PDF"** (màu xanh lá)
2. Trong dialog in:
   - **Windows:** Chọn "Microsoft Print to PDF"
   - **Mac:** Click "PDF" → "Save as PDF"
3. Save file
4. **XONG! ✅**

**Kết quả:** PDF đầy đủ nội dung, đúng màu sắc!

---

## 🔍 TẠI SAO "Xuất PDF" BỊ LỖI?

### Nguyên nhân:

1. **html2canvas không capture được phần cv-main**
   - Có thể do flex layout
   - Hoặc text color bị conflict

2. **Preview có transform/scale**
   - html2canvas không handle tốt transform
   - Kích thước tính sai

3. **Chạy từ file:// local**
   - Không phải web server
   - CORS và rendering issues

---

## 🧪 DEBUG:

Mở Console (F12) và chạy:

```javascript
// Check cv-main có nội dung không
const cvMain = document.querySelector('.cv-main');
console.log('cv-main:', cvMain);
console.log('HTML length:', cvMain.innerHTML.length);
console.log('Children:', cvMain.children.length);
console.log('Text:', cvMain.textContent.substring(0, 100));

// Check data
console.log('Experience:', cvData.experience?.length);
console.log('Education:', cvData.education?.length);
```

**Nếu:**
- `cvMain` = null → Chưa render template
- `innerHTML.length` = 0 → Không có data
- `children.length` > 0 → Có data nhưng PDF không capture được

---

## 🔧 FIX (Nếu muốn dùng "Xuất PDF"):

### **Fix 1: Chạy trên Web Server**

```bash
# Python
python -m http.server 8000

# Hoặc Node.js
npx serve

# Mở: http://localhost:8000/cv-builder/builder.html
```

### **Fix 2: Force Inline Styles**

Mở Console, paste:

```javascript
function forceInlineStyles() {
    const cvMain = document.querySelector('.cv-main');
    if (!cvMain) return alert('Không tìm thấy cv-main!');
    
    // Force styles
    cvMain.style.background = 'white';
    cvMain.style.color = '#333';
    cvMain.style.padding = '30px';
    cvMain.style.flex = '1';
    
    // Force text color
    cvMain.querySelectorAll('*').forEach(el => {
        const tag = el.tagName.toLowerCase();
        if (tag === 'h2' || el.classList.contains('section-title')) {
            el.style.color = '#29B6F6';
        } else if (tag === 'p' || tag === 'li' || tag === 'div') {
            el.style.color = '#333';
        }
    });
    
    alert('✅ Đã force styles! Thử export lại!');
}

forceInlineStyles();
```

### **Fix 3: Export Visible Area Only**

```javascript
function exportVisibleOnly() {
    const cv = document.querySelector('.cv-professional');
    
    // Remove any transform
    cv.style.transform = 'none';
    cv.style.scale = '1';
    
    // Export
    html2pdf()
        .set({
            margin: 5,
            filename: 'CV_Fixed.pdf',
            html2canvas: {
                scale: 2,
                logging: true,
                backgroundColor: '#fff',
                onclone: (clonedDoc) => {
                    const clonedMain = clonedDoc.querySelector('.cv-main');
                    if (clonedMain) {
                        clonedMain.style.color = '#333';
                        clonedMain.style.background = 'white';
                    }
                }
            },
            jsPDF: { format: 'a4' }
        })
        .from(cv)
        .save();
}

exportVisibleOnly();
```

---

## 📊 Checklist Debug:

- [ ] Mở F12 → Console
- [ ] Check `cvData.experience.length` > 0?
- [ ] Check `.cv-main` có nội dung?
- [ ] Check `.cv-main` có màu text #333 không?
- [ ] Thử dùng "🖨️ In PDF" → OK không?
- [ ] Nếu In PDF OK → Vấn đề là html2canvas
- [ ] Nếu In PDF cũng trắng → Vấn đề là data/CSS

---

## 💡 KHUYẾN NGHỊ:

1. **✅ SỬ DỤNG "🖨️ IN PDF"** → Luôn hoạt động!
2. ⏳ Nếu muốn fix "Xuất PDF" → Deploy lên Vercel
3. 🔧 Hoặc chạy local server

---

## 🎯 TL;DR:

**Vấn đề:** PDF bị trắng phần bên phải  
**Giải pháp:** Click nút **"🖨️ In PDF"** (xanh lá) thay vì "Xuất PDF"  
**Kết quả:** ✅ PDF đầy đủ, chính xác!

---

Có vấn đề gì báo tiếp nhé! 🚀
