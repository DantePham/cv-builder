# 🚀 HƯỚNG DẪN SỬ DỤNG API BACKEND

## 📋 MỤC LỤC
1. [Cài đặt](#cài-đặt)
2. [Chạy Server](#chạy-server)
3. [API Endpoints](#api-endpoints)
4. [Code Flow](#code-flow)
5. [Test](#test)

---

## 🔧 CÀI ĐẶT

### Bước 1: Mở Terminal tại thư mục `cv-builder`
```powershell
cd d:\Code\test\cv-builder
```

### Bước 2: Cài dependencies
```powershell
npm install
```

Lệnh này sẽ cài:
- `express` - Web framework
- `cors` - Cho phép frontend gọi API từ domain khác

---

## ▶️ CHẠY SERVER

### Cách 1: Dùng npm
```powershell
npm start
```

### Cách 2: Dùng node trực tiếp
```powershell
node server.js
```

### Kết quả:
```
╔═══════════════════════════════════════════╗
║   🚀 CV Builder Server Running!          ║
╠═══════════════════════════════════════════╣
║   URL: http://localhost:3000             ║
║   API: http://localhost:3000/api/cvs     ║
╚═══════════════════════════════════════════╝
```

Server chạy tại: **http://localhost:3000**

---

## 🌐 API ENDPOINTS

### 1. **Lưu CV** (Tạo mới hoặc Update)
```
POST http://localhost:3000/api/cvs

Headers:
  Content-Type: application/json

Body:
{
  "userId": 1234,
  "username": "thuthuy",
  "template": "professional",
  "personal": {
    "fullName": "Phạm Thị Thu Thúy",
    "title": "Laboratory Staff",
    "email": "thuthuy3048@gmail.com",
    ...
  },
  "experience": [...],
  "education": [...],
  ...
}

Response (Success):
{
  "success": true,
  "message": "CV saved successfully",
  "cvId": 1234567890
}
```

### 2. **Load tất cả CV**
```
GET http://localhost:3000/api/cvs

Response:
{
  "cvs": [
    {
      "cvId": 1234567890,
      "userId": 1234,
      "username": "thuthuy",
      "template": "professional",
      "personal": {...},
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T12:45:00.000Z"
    },
    ...
  ]
}
```

### 3. **Load CV theo ID**
```
GET http://localhost:3000/api/cvs/:cvId

Example: GET http://localhost:3000/api/cvs/1234567890

Response:
{
  "cvId": 1234567890,
  "userId": 1234,
  "personal": {...},
  ...
}
```

### 4. **Xóa CV**
```
DELETE http://localhost:3000/api/cvs/:cvId

Example: DELETE http://localhost:3000/api/cvs/1234567890

Response:
{
  "success": true,
  "message": "CV deleted successfully"
}
```

### 5. **Load users**
```
GET http://localhost:3000/api/users

Response:
{
  "users": [
    {
      "userId": 1234,
      "username": "thuthuy",
      "password": "...",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    ...
  ]
}
```

---

## 🔄 CODE FLOW

### **Khi click "💾 Lưu Thông Tin"**

```javascript
// File: builder.js - Line 584

async function saveToStorage() {
  // 1. Check login
  const currentUser = checkAuth();
  
  // 2. Prepare data
  const cvToSave = {
    userId: currentUser.userId,
    username: currentUser.username,
    template: currentTemplate,
    ...cvData,
    updatedAt: new Date().toISOString()
  };

  // 3. Call API
  const response = await fetch('http://localhost:3000/api/cvs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cvToSave)
  });

  // 4. If success → Show notification
  if (response.ok) {
    showNotification('✅ CV đã được lưu vào server!');
  }
  
  // 5. Fallback: Save to localStorage if API fails
  localStorage.setItem(`userProfile_${userId}`, ...);
}
```

---

## ✅ TEST

### **Test 1: Chạy server**
```powershell
npm start
```
→ Thấy "🚀 CV Builder Server Running!"

### **Test 2: Mở website**
```
http://localhost:3000/builder.html
```

### **Test 3: Lưu CV**
1. Login (hoặc dùng mock user)
2. Nhập thông tin CV
3. Click "💾 Lưu Thông Tin"
4. Mở Console (F12) → Thấy "✅ Saved to backend"

### **Test 4: Kiểm tra file JSON**
```
cv-builder/data/cv-data.json
```
→ File này sẽ có data CV mới!

---

## 💾 DỮ LIỆU LƯU Ở ĐÂU?

```
cv-builder/
└── data/
    ├── cv-data.json     ← Tất cả CV lưu ở đây
    └── users.json       ← Thông tin users
```

---

## 🐛 TROUBLESHOOTING

### Lỗi: "Cannot find module 'express'"
→ Chạy: `npm install`

### Lỗi: "EADDRINUSE: address already in use"
→ Port 3000 đang được dùng. Sửa PORT trong `server.js`

### Lỗi: "CORS blocked"
→ Server đã cài `cors`, check xem server có chạy không

### API không hoạt động
→ Fallback sẽ dùng localStorage tự động
