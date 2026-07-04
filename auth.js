// Authentication System

// Load users from API (with fallback to JSON file)
async function loadUsers() {
    try {
        // Try API first (for Vercel deployment)
        const apiResponse = await fetch('/api/users');
        if (apiResponse.ok) {
            const data = await apiResponse.json();
            console.log('✅ Loaded users from API');
            return data.users;
        }
    } catch (apiError) {
        console.warn('⚠️ API not available, trying JSON file:', apiError.message);
    }

    // Fallback to JSON file (for local development)
    try {
        const response = await fetch('data/users.json');
        const data = await response.json();
        console.log('✅ Loaded users from JSON file');
        return data.users;
    } catch (error) {
        console.error('❌ Error loading users:', error);
        // Final fallback to default users
        return [
            { id: 1, username: 'admin', password: 'admin123', email: 'admin@cvbuilder.com', fullName: 'Administrator' },
            { id: 2, username: 'demo', password: 'demo123', email: 'demo@example.com', fullName: 'Demo User' }
        ];
    }
}

// Show alert message
function showAlert(message, type = 'error') {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} show`;
    
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 5000);
}

// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showAlert('Vui lòng nhập đầy đủ thông tin!', 'error');
        return;
    }
    
    // Load users and verify credentials
    const users = await loadUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Login successful
        const sessionData = {
            userId: user.id,
            username: user.username,
            email: user.email,
            loginTime: new Date().toISOString()
        };
        
        // Save session to localStorage
        localStorage.setItem('cvBuilderSession', JSON.stringify(sessionData));
        
        showAlert('Đăng nhập thành công! Đang chuyển hướng...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showAlert('Tên đăng nhập hoặc mật khẩu không đúng!', 'error');
    }
});

// Check if user is logged in
function checkAuth() {
    const session = localStorage.getItem('cvBuilderSession');
    if (!session) {
        window.location.href = 'login.html';
        return null;
    }
    
    try {
        return JSON.parse(session);
    } catch (error) {
        localStorage.removeItem('cvBuilderSession');
        window.location.href = 'login.html';
        return null;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('cvBuilderSession');
    localStorage.removeItem('currentCVId');
    window.location.href = 'login.html';
}

// Get current user
function getCurrentUser() {
    const session = localStorage.getItem('cvBuilderSession');
    if (!session) return null;
    
    try {
        return JSON.parse(session);
    } catch (error) {
        return null;
    }
}

// Load CV data for current user from API (with fallback to JSON)
async function loadUserCVs(userId) {
    try {
        // Try API first
        const apiResponse = await fetch(`/api/load-cv?userId=${userId}`);
        if (apiResponse.ok) {
            const data = await apiResponse.json();
            console.log('✅ Loaded CVs from API');
            return data.cvs || [];
        }
    } catch (apiError) {
        console.warn('⚠️ API not available, trying JSON file:', apiError.message);
    }

    // Fallback to JSON file
    try {
        const response = await fetch('data/cv-data.json');
        const data = await response.json();
        console.log('✅ Loaded CVs from JSON file');
        return data.cvs.filter(cv => cv.userId === userId);
    } catch (error) {
        console.error('❌ Error loading CV data:', error);
        return [];
    }
}

// Load specific CV by ID from API (with fallback)
async function loadCVById(cvId) {
    try {
        // Try API first
        const apiResponse = await fetch(`/api/load-cv?cvId=${cvId}`);
        if (apiResponse.ok) {
            const data = await apiResponse.json();
            console.log('✅ Loaded CV from API');
            return data.cv;
        }
    } catch (apiError) {
        console.warn('⚠️ API not available, trying JSON file:', apiError.message);
    }

    // Fallback to JSON file
    try {
        const response = await fetch('data/cv-data.json');
        const data = await response.json();
        console.log('✅ Loaded CV from JSON file');
        return data.cvs.find(cv => cv.cvId === cvId);
    } catch (error) {
        console.error('❌ Error loading CV:', error);
        return null;
    }
}

// Save CV data (in production, this would be a server API call)
// For now, we'll use localStorage as a temporary solution
function saveCVData(cvData) {
    const user = getCurrentUser();
    if (!user) {
        alert('Bạn cần đăng nhập để lưu CV!');
        return false;
    }
    
    // Add metadata
    cvData.userId = user.userId;
    cvData.updatedAt = new Date().toISOString();
    
    if (!cvData.cvId) {
        cvData.cvId = Date.now(); // Generate unique ID
        cvData.createdAt = new Date().toISOString();
    }
    
    // Save to localStorage (in production, send to server)
    const savedCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');
    const existingIndex = savedCVs.findIndex(cv => cv.cvId === cvData.cvId);
    
    if (existingIndex >= 0) {
        savedCVs[existingIndex] = cvData;
    } else {
        savedCVs.push(cvData);
    }
    
    localStorage.setItem('userCVs', JSON.stringify(savedCVs));
    localStorage.setItem('currentCVData', JSON.stringify(cvData));
    
    return true;
}

// Get saved CVs for current user
function getUserSavedCVs() {
    const user = getCurrentUser();
    if (!user) return [];
    
    const savedCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');
    return savedCVs.filter(cv => cv.userId === user.userId);
}
