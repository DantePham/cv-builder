# 🚀 Deploy CV Builder lên Vercel

## 📋 Tổng Quan

CV Builder được thiết kế để chạy hoàn hảo trên **Vercel** với:
- ✅ **Serverless Functions** để lưu/đọc CV vào file JSON
- ✅ **Static Site Hosting** cho HTML/CSS/JavaScript
- ✅ **HTTPS tự động**
- ✅ **Deploy tự động** khi push code lên GitHub
- ✅ **Miễn phí hoàn toàn**

---

## 🎯 Yêu Cầu

1. **GitHub Account** - Để lưu code
2. **Vercel Account** - Để deploy (đăng ký miễn phí tại [vercel.com](https://vercel.com))

---

## 📦 Cấu Trúc Dự Án

```
cv-builder/
├── api/                      ← Serverless Functions
│   ├── save-cv.js           ← API lưu CV vào JSON
│   ├── load-cv.js           ← API đọc CV từ JSON
│   └── users.js             ← API authentication
├── data/
│   ├── cv-data.json         ← Database CV (JSON)
│   └── users.json           ← Database users
├── index.html               ← Trang chủ
├── builder.html             ← CV Builder
├── dashboard.html           ← User Dashboard
├── login.html               ← Login page
├── *.js, *.css              ← JavaScript & CSS files
└── vercel.json              ← Vercel config ⭐
```

---

## 🚀 Các Bước Deploy

### **Bước 1: Push Code Lên GitHub**

```bash
# Khởi tạo Git repository (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "CV Builder ready for Vercel deployment"

# Tạo repository trên GitHub (github.com/new)
# Sau đó push code lên

git remote add origin https://github.com/YOUR_USERNAME/cv-builder.git
git branch -M main
git push -u origin main
```

---

### **Bước 2: Deploy Lên Vercel**

#### **Option A: Qua Vercel Website (Đơn Giản Nhất)**

1. Truy cập [vercel.com](https://vercel.com)
2. Click **"Sign Up"** hoặc **"Login"** (dùng GitHub account)
3. Click **"Add New Project"**
4. **Import Git Repository** → Chọn repo `cv-builder`
5. **Configure Project:**
   - Framework Preset: **Other**
   - Root Directory: `cv-builder`
   - Build Command: (để trống)
   - Output Directory: (để trống)
6. Click **"Deploy"**
7. Đợi 1-2 phút → ✅ **DONE!**

#### **Option B: Qua Vercel CLI**

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd cv-builder
vercel

# Follow the prompts:
# ? Set up and deploy "~/cv-builder"? Y
# ? Which scope do you want to deploy to? (Your Account)
# ? Link to existing project? N
# ? What's your project's name? cv-builder
# ? In which directory is your code located? ./
```

---

### **Bước 3: Kiểm Tra**

Sau khi deploy, Vercel sẽ cung cấp URL:
```
https://cv-builder-xxx.vercel.app
```

**Test các tính năng:**

1. ✅ **Login:** https://your-url.vercel.app/login.html
   - Username: `thuthuy` / Password: `thuy123`
2. ✅ **Dashboard:** Xem danh sách CV
3. ✅ **Builder:** Tạo/sửa CV
4. ✅ **Save CV:** Click "Lưu" → Kiểm tra Console (F12)
5. ✅ **Export PDF:** Download PDF

---

## 🔧 Cấu Hình Vercel

File `vercel.json` đã được cấu hình sẵn:

```json
{
  "version": 2,
  "routes": [
    { "src": "/api/save-cv", "dest": "/cv-builder/api/save-cv.js" },
    { "src": "/api/load-cv", "dest": "/cv-builder/api/load-cv.js" },
    { "src": "/api/users", "dest": "/cv-builder/api/users.js" }
  ]
}
```

---

## 🎯 API Endpoints

Sau khi deploy, các API này sẽ hoạt động:

### **1. POST /api/save-cv**
Lưu CV vào file JSON

**Request:**
```json
{
  "userId": 3,
  "template": "professional",
  "personal": { ... },
  "experience": [ ... ],
  "education": [ ... ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "CV saved successfully",
  "cvId": 1234567890
}
```

---

### **2. GET /api/load-cv?userId=3**
Đọc tất cả CV của user

**Response:**
```json
{
  "cvs": [ { ... }, { ... } ]
}
```

---

### **3. GET /api/load-cv?cvId=123**
Đọc 1 CV cụ thể

**Response:**
```json
{
  "cv": { ... }
}
```

---

### **4. POST /api/users**
Login

**Request:**
```json
{
  "username": "thuthuy",
  "password": "thuy123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 3,
    "username": "thuthuy",
    "email": "thuthuy@example.com"
  }
}
```

---

## ✅ Checklist

- [ ] Code đã push lên GitHub
- [ ] Vercel project đã tạo và link với GitHub repo
- [ ] Deploy thành công (có URL)
- [ ] Login hoạt động
- [ ] Save CV hoạt động (check Console F12)
- [ ] Load CV hoạt động
- [ ] Export PDF hoạt động
- [ ] Copy CV sang template khác hoạt động
- [ ] Download JSON hoạt động

---

## 🐛 Troubleshooting

### **Problem: API trả về 404**
**Solution:** Kiểm tra `vercel.json` và đảm bảo routes đúng

### **Problem: Cannot write to JSON file**
**Solution:** Serverless functions có quyền ghi file. Check logs tại Vercel dashboard

### **Problem: CORS error**
**Solution:** API đã có CORS headers. Clear browser cache và thử lại

---

## 🎉 Kết Quả

Sau khi deploy thành công:

✅ **Website:** https://your-project.vercel.app  
✅ **Tự động update** khi push code mới lên GitHub  
✅ **HTTPS** miễn phí  
✅ **Lưu CV vào JSON file** thật sự  
✅ **Multi-user support**  

---

## 📞 Support

Nếu gặp vấn đề, check:
1. Vercel Dashboard → Logs
2. Browser Console (F12)
3. Network Tab (F12) để xem API calls

**Happy Deploying!** 🚀
