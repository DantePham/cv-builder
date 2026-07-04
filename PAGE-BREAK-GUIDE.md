# 📄 Hướng Dẫn Chia Trang PDF

## ✅ Đã Fix: Thanh Màu Xanh Tự Động Kéo Dài

### Vấn Đề Trước:
- ❌ Sidebar màu xanh (Professional template) bị cắt ở cuối trang 1
- ❌ Nội dung bị overflow nhưng background không kéo theo
- ❌ Trang 2 không có màu xanh

### Giải Pháp:
- ✅ Sidebar tự động kéo dài theo nội dung
- ✅ Background màu xanh kéo xuống trang 2 nếu cần
- ✅ PDF tự động chia trang khi content dài

---

## 🎨 Cách Hoạt Động

### CSS Updates:

**1. Container cho phép kéo dài:**
```css
.cv-professional {
    min-height: 297mm; /* Tối thiểu 1 trang A4 */
    height: auto;      /* Tự động kéo dài nếu cần */
}
```

**2. Sidebar kéo dài theo content:**
```css
.cv-professional .cv-sidebar {
    min-height: 297mm; /* Tối thiểu bằng 1 trang */
    height: auto;      /* Tự động kéo dài */
    background: linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%);
    /* Background sẽ kéo xuống trang 2 */
}
```

**3. Preview wrapper không giới hạn height:**
```css
.cv-preview {
    width: 210mm;
    min-height: 297mm;
    height: auto; /* Cho phép nhiều trang */
}
```

---

## 📥 PDF Export Config

### html2pdf.js settings:

```javascript
const opt = {
    html2canvas: {
        windowHeight: element.scrollHeight // Capture toàn bộ chiều cao
    },
    pagebreak: {
        mode: 'css', // Tự động chia trang
        avoid: '.no-page-break' // Tránh break những element này
    }
};
```

---

## 📋 Page Break Rules

### Tự động break (nếu quá dài):
- ✅ Sidebar sections
- ✅ Main sections
- ✅ Whole CV

### Tránh break (giữ nguyên):
- ✅ Timeline items (1 experience không bị cắt đôi)
- ✅ Education items
- ✅ Certification items
- ✅ Section title + content ngay sau nó

---

## 🧪 Test Cases

### Case 1: CV ngắn (1 trang)
**Input:** 
- 1 experience
- 1 education
- Skills ít

**Expected:**
- ✅ Vừa 1 trang A4
- ✅ Sidebar đủ cao 297mm
- ✅ Background xanh full trang

### Case 2: CV trung bình (1-2 trang)
**Input:**
- 2-3 experiences
- 2 educations
- Skills nhiều

**Expected:**
- ✅ Trang 1 đầy đủ
- ✅ Nếu lọt sang trang 2 một chút → Background xanh kéo xuống
- ✅ Trang 2 có background xanh tiếp tục

### Case 3: CV dài (2+ trang)
**Input:**
- 5+ experiences
- 3+ educations
- Nhiều certifications

**Expected:**
- ✅ Sidebar xanh kéo dài qua nhiều trang
- ✅ Main content cũng kéo dài tương ứng
- ✅ PDF có 2-3 trang, mỗi trang đều có sidebar xanh

---

## 🎯 Kết Quả

### Trước khi fix:
```
┌─────────────────┐
│ 🟦🟦🟦 | Content│  ← Trang 1
│ 🟦🟦🟦 | Content│
│ 🟦🟦🟦 | Content│
└─────────────────┘

┌─────────────────┐
│ ⬜⬜⬜ | Content│  ← Trang 2 (không có màu xanh!)
└─────────────────┘
```

### Sau khi fix:
```
┌─────────────────┐
│ 🟦🟦🟦 | Content│  ← Trang 1
│ 🟦🟦🟦 | Content│
│ 🟦🟦🟦 | Content│
└─────────────────┘

┌─────────────────┐
│ 🟦🟦🟦 | Content│  ← Trang 2 (có màu xanh!)
│ 🟦🟦🟦 | Content│
└─────────────────┘
```

---

## 🔧 Tùy Chỉnh

### Muốn force 1 trang (cắt bớt content):
```css
.cv-professional {
    max-height: 297mm;
    overflow: hidden; /* Cắt phần thừa */
}
```

### Muốn split sections vào trang mới:
Thêm class `page-break-before`:
```html
<div class="main-section page-break-before">
    <h2>Education</h2>
    ...
</div>
```

### Tránh break một phần cụ thể:
Thêm class `no-page-break`:
```html
<div class="timeline-item no-page-break">
    <!-- Content won't be split -->
</div>
```

---

## 📱 Mobile View

- ✅ Vẫn responsive
- ✅ Preview scale xuống 0.5x - 0.7x
- ✅ Sidebar stack lên trên (không còn side-by-side)
- ✅ Vẫn giữ background xanh

---

## ✨ Tips

1. **Giữ content ngắn gọn** để vừa 1 trang
2. **Dùng font nhỏ hơn** nếu cần fit nhiều nội dung
3. **Giảm line-height** để tiết kiệm không gian
4. **Xem preview** trước khi export PDF
5. **Test với nhiều data** để đảm bảo layout đúng

---

## 🐛 Troubleshooting

### PDF vẫn bị cắt?
- Check: `html2canvas.windowHeight = element.scrollHeight`
- Check: `.cv-preview { height: auto }`

### Background không kéo dài?
- Check: `.cv-sidebar { height: auto }`
- Check: Không có `overflow: hidden`

### Page break ở chỗ lạ?
- Thêm class `no-page-break` vào element
- Hoặc dùng CSS: `page-break-inside: avoid`

---

## 🎉 Kết Luận

Bây giờ CV của bạn:
- ✅ Tự động chia trang khi cần
- ✅ Background xanh kéo dài qua nhiều trang
- ✅ Không bị cắt ngang giữa sections
- ✅ Export PDF đẹp mắt chuyên nghiệp!
