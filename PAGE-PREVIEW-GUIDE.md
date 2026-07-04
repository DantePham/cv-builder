# 📄 Hướng Dẫn Preview Trang PDF

## ✅ Tính Năng Mới: Xem Trước Chia Trang

### 🎯 Mục Đích:
**"View như thế nào thì PDF giống vậy"**

- ✅ Hiển thị đường ngăn cách trang trong preview
- ✅ Thấy rõ nội dung nằm ở trang nào
- ✅ Preview giống y hệt PDF export
- ✅ Tự động ẩn/hiện indicator theo chiều cao content

---

## 🎨 Cách Hoạt Động

### Visual Indicators:

```
┌─────────────────────────────┐
│                             │
│   CV Content (Trang 1)      │
│                             │
│                             │
├─────────────────────────────┤ ← Indicator: "Trang 1 Kết Thúc"
│                             │   (Vị trí: 297mm)
│   CV Content (Trang 2)      │
│                             │
│                             │
├─────────────────────────────┤ ← Indicator: "Trang 2 Kết Thúc"
│                             │   (Vị trí: 594mm)
│   CV Content (Trang 3)      │
└─────────────────────────────┘
```

### Smart Display Logic:

```javascript
// Tự động ẩn/hiện dựa trên chiều cao
if (height > 297mm) → Hiện "Trang 1 Kết Thúc"
if (height > 594mm) → Hiện "Trang 2 Kết Thúc"
if (height > 891mm) → Hiện "Trang 3 Kết Thúc"
```

---

## 📐 Technical Details

### CSS Structure:

**Preview Container:**
```css
.cv-preview {
    background: #e5e5e5; /* Gray background */
    padding: 20px;
}
```

**Page Indicators:**
```css
.page-indicator {
    position: absolute;
    left: -20px;
    right: -20px;
    height: 50px;
    background: linear-gradient(#e74c3c, #c0392b);
    /* Positioned at exact page boundaries */
}

.page-1-end { top: 297mm; }  /* End of page 1 */
.page-2-end { top: 594mm; }  /* End of page 2 */
.page-3-end { top: 891mm; }  /* End of page 3 */
```

### JavaScript Logic:

```javascript
// After rendering CV
setTimeout(() => {
    const height = container.offsetHeight;
    const mmToPx = (mm) => mm * 3.7795; // Convert mm to pixels
    
    // Show/hide indicators
    page1Indicator.style.display = height > mmToPx(297) ? 'flex' : 'none';
    page2Indicator.style.display = height > mmToPx(594) ? 'flex' : 'none';
    page3Indicator.style.display = height > mmToPx(891) ? 'flex' : 'none';
}, 100);
```

---

## 🎯 Use Cases

### Case 1: CV Ngắn (1 Trang)
**Content:** Dưới 297mm  
**Preview:**
```
┌─────────────────┐
│  CV Content     │
│                 │
│                 │
└─────────────────┘
(Không có indicator)
```

### Case 2: CV Trung Bình (1.5 Trang)
**Content:** 297mm - 594mm  
**Preview:**
```
┌─────────────────┐
│  CV Content     │
├═════════════════┤ ← "Trang 1 Kết Thúc"
│  CV Content     │
│  (Half page)    │
└─────────────────┘
```

### Case 3: CV Dài (2+ Trang)
**Content:** > 594mm  
**Preview:**
```
┌─────────────────┐
│  CV Content     │
├═════════════════┤ ← "Trang 1 Kết Thúc"
│  CV Content     │
├═════════════════┤ ← "Trang 2 Kết Thúc"
│  CV Content     │
└─────────────────┘
```

---

## 🎨 Styling

### Indicator Appearance:
- **Background:** Red gradient (#e74c3c → #c0392b)
- **Height:** 50px
- **Text:** White, uppercase, bold
- **Shadow:** Glowing red shadow
- **Position:** Absolute at exact page boundaries
- **Opacity:** 85% (100% on hover)

### Responsive:
- Indicators extend beyond CV width (-20px left/right)
- Gray background shows clear page separation
- White CV content stands out against gray

---

## 📥 PDF Export Behavior

### During Export:
```javascript
// 1. Hide indicators before export
indicators.forEach(ind => ind.style.display = 'none');

// 2. Export PDF
html2pdf().set(opt).from(element).save();

// 3. Show indicators after export
indicators.forEach(ind => ind.style.display = 'flex');
```

### Result:
- ✅ PDF không có indicators
- ✅ PDF clean, professional
- ✅ Preview vẫn giữ indicators để reference

---

## 🔧 Customization

### Thay Đổi Màu Indicator:
```css
.page-indicator {
    background: linear-gradient(135deg, #3498db, #2980b9); /* Blue */
}
```

### Thay Đổi Vị Trí:
```css
.page-1-end {
    top: calc(297mm - 25px); /* Dịch lên 25px */
}
```

### Thay Đổi Text:
```javascript
<div class="page-indicator page-1-end">
    <span>──── PAGE 1 ENDS HERE ────</span>
</div>
```

---

## 🐛 Troubleshooting

### Indicator không hiện?
**Check:**
- Content height > 297mm?
- `display: none` bị override?
- Timeout đã chạy chưa?

### Indicator ở sai vị trí?
**Fix:**
- Check DPI setting (default: 96 DPI)
- Adjust `mmToPx` conversion factor
- Verify `top` position in CSS

### Indicator xuất hiện trong PDF?
**Fix:**
- Check `@media print` rule
- Verify `onclone` callback hiding indicators
- Clear browser cache

---

## ✨ Benefits

1. **WYSIWYG Preview** - See exactly what PDF will look like
2. **No Surprises** - Know where page breaks occur
3. **Easy Editing** - Adjust content to fit pages nicely
4. **Professional** - Avoid content cut mid-sentence

---

## 📊 Comparison

### Before:
```
Preview: [CV content...]
PDF:     Page 1 | Page 2 (surprise!)
```

### After:
```
Preview: [CV content]
         ───── Trang 1 Kết Thúc ─────
         [More content]
PDF:     Page 1 | Page 2 (expected!)
```

---

## 🎉 Summary

**What You Get:**
- ✅ Visual page break indicators
- ✅ Automatic show/hide based on content
- ✅ Clean PDF export (no indicators)
- ✅ Professional preview experience
- ✅ WYSIWYG accuracy

**Perfect for:**
- Long CVs (2+ pages)
- Precise layout control
- Professional presentations
- Print-ready documents
