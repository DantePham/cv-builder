# 🔧 Fix: PDF Bị Tách 2 Trang

## ❌ Vấn Đề:
- Nội dung có đầy đủ ✅
- Nhưng bị **TÁCH RA 2 TRANG** ❌
- Trang 1: Một phần CV (hoặc trắng)
- Trang 2: Phần còn lại

---

## 🔍 Nguyên Nhân:

### **CV cao hơn 297mm (1 trang A4)**

Khi có nhiều nội dung:
- Experience (2-3 items)
- Education (2 items)
- Certifications
- Skills, Interests, etc.

→ Tổng chiều cao > 297mm → **Tự động tràn sang trang 2!**

---

## ✅ GIẢI PHÁP:

### **Cách 1: Dùng "🖨️ In PDF" (KHUYÊN DÙNG)**

1. Click nút **"🖨️ In PDF"** (màu xanh lá)
2. Browser sẽ tự động chia trang chuẩn
3. Save as PDF
4. **✅ XONG!**

**Ưu điểm:**
- Tự động chia trang đẹp
- Không bị cắt ngang content
- Chất lượng cao

---

### **Cách 2: Rút Gọn Nội Dung**

Nếu muốn **FIT 1 TRANG:**

#### **A. Giảm Font Size:**

Mở Console (F12), paste:

```javascript
const cv = document.querySelector('.cv-professional');
cv.style.fontSize = '0.85em'; // Giảm 15%

// Hoặc cụ thể hơn:
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.fontSize = '0.9em';
    item.style.marginBottom = '15px'; // Giảm margin
});
```

#### **B. Giảm Padding:**

```javascript
const sidebar = document.querySelector('.cv-sidebar');
sidebar.style.padding = '20px 15px'; // Thay vì 30px 20px

const main = document.querySelector('.cv-main');
main.style.padding = '20px 25px'; // Thay vì 30px 35px
```

#### **C. Giảm Line Height:**

```javascript
document.querySelectorAll('.description-list, .skill-list').forEach(list => {
    list.style.lineHeight = '1.4'; // Thay vì 1.6
});
```

---

### **Cách 3: Xóa Nội Dung Không Quan Trọng**

**Ẩn một số section:**

```javascript
// Ẩn Interests (nếu không quan trọng)
document.querySelector('.sidebar-section:has(.sidebar-title:contains("Interests"))')?.remove();

// Hoặc rút gọn Work Skills
const workSkills = document.querySelector('.skill-category p');
if (workSkills) {
    const text = workSkills.textContent;
    workSkills.textContent = text.substring(0, 150) + '...'; // Rút gọn
}
```

---

### **Cách 4: Chấp Nhận 2 Trang**

Nếu CV thực sự dài, **2 trang là BẮT BUỘC!**

**Để 2 trang đẹp:**

1. Dùng **"🖨️ In PDF"**
2. Browser tự động chia trang hợp lý
3. Không bị cắt ngang text

**Kết quả:**
- Trang 1: Header + Education + Experience (một phần)
- Trang 2: Experience (còn lại) + Certifications

---

## 🧪 DEBUG - Kiểm Tra Chiều Cao CV:

Mở Console (F12):

```javascript
const cv = document.querySelector('.cv-professional');
const heightMM = cv.scrollHeight / 3.7795; // Convert px to mm

console.log('📏 CV Height:', {
    pixels: cv.scrollHeight + 'px',
    millimeters: heightMM.toFixed(0) + 'mm',
    pages: Math.ceil(heightMM / 297),
    recommendation: heightMM <= 297 ? '✅ Vừa 1 trang' : `⚠️ Cần ${Math.ceil(heightMM / 297)} trang`
});
```

**Kết quả mong đợi:**
```
📏 CV Height:
  pixels: 1050px
  millimeters: 278mm
  pages: 1
  recommendation: ✅ Vừa 1 trang
```

**Nếu > 297mm:**
```
📏 CV Height:
  pixels: 1300px
  millimeters: 344mm
  pages: 2
  recommendation: ⚠️ Cần 2 trang
```

---

## 📊 Tối Ưu Để Fit 1 Trang:

### **Công thức:**

```
A4 Height = 297mm = 1123px (at 96 DPI)

Nếu CV > 1123px → Giảm:
1. Font size (-10%)
2. Padding (-20%)
3. Line height (-0.2)
4. Margin between sections (-5px)
```

### **Script Tối Ưu Tự Động:**

```javascript
function optimizeForOnePage() {
    const cv = document.querySelector('.cv-professional');
    const currentHeight = cv.scrollHeight;
    const targetHeight = 1123; // 297mm in px
    
    if (currentHeight <= targetHeight) {
        alert('✅ CV đã vừa 1 trang!');
        return;
    }
    
    // Giảm font
    cv.style.fontSize = '0.9em';
    
    // Giảm padding
    const sidebar = cv.querySelector('.cv-sidebar');
    const main = cv.querySelector('.cv-main');
    if (sidebar) sidebar.style.padding = '25px 18px';
    if (main) main.style.padding = '25px 30px';
    
    // Giảm margin
    cv.querySelectorAll('.timeline-item').forEach(item => {
        item.style.marginBottom = '12px';
    });
    
    // Check lại
    setTimeout(() => {
        const newHeight = cv.scrollHeight;
        const newMM = newHeight / 3.7795;
        alert(`📏 Chiều cao mới: ${newMM.toFixed(0)}mm (${Math.ceil(newMM/297)} trang)\n\n` +
              `${newMM <= 297 ? '✅ Đã fit 1 trang!' : '⚠️ Vẫn cần ' + Math.ceil(newMM/297) + ' trang'}`);
    }, 100);
}

optimizeForOnePage();
```

---

## 🎯 KHUYẾN NGHỊ:

### **Nếu CV ≤ 297mm (1 trang):**
→ Dùng nút "📥 Xuất PDF" hoặc "🖨️ In PDF" đều OK

### **Nếu CV > 297mm (2+ trang):**
→ **DÙNG "🖨️ IN PDF"** để chia trang đẹp tự động

### **Muốn FIT 1 trang:**
→ Chạy script `optimizeForOnePage()` ở trên

---

## ✅ TL;DR:

**Vấn đề:** PDF bị 2 trang  
**Nguyên nhân:** CV cao > 297mm  
**Giải pháp:**  
1. ✅ **Dùng "🖨️ In PDF"** → Chia trang tự động đẹp  
2. ⚙️ Rút gọn nội dung → Fit 1 trang  
3. ✅ Chấp nhận 2 trang nếu cần

---

Có vấn đề gì báo tiếp! 🚀
