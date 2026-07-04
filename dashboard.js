// Dashboard Script

// Check authentication on page load
const currentUser = checkAuth();

if (currentUser) {
    // Display user info
    document.getElementById('userName').textContent = currentUser.username;
    document.getElementById('userEmail').textContent = currentUser.email;
    
    // Load and display CVs
    loadAndDisplayCVs();
}

// Load and display user's CVs from localStorage
async function loadAndDisplayCVs() {
    const cvGrid = document.getElementById('cvGrid');
    const cvCount = document.getElementById('cvCount');

    // Load all CVs from localStorage
    const allCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');

    // Filter CVs for current user
    const userCVs = allCVs.filter(cv => cv.userId === currentUser.userId);

    // Deduplicate by userId + template (keep newest)
    const uniqueCVs = [];
    const seenKeys = new Map();

    for (const cv of userCVs) {
        const key = `${cv.userId}_${cv.template}`;
        const existing = seenKeys.get(key);

        if (!existing || new Date(cv.updatedAt) > new Date(existing.updatedAt)) {
            seenKeys.set(key, cv);
        }
    }

    uniqueCVs.push(...seenKeys.values());

    if (uniqueCVs.length === 0) {
        cvGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <h3>Chưa có CV nào</h3>
                <p>Hãy tạo CV đầu tiên của bạn!</p>
                <a href="builder.html" class="btn-create-new" style="margin-top: 20px;">➕ Tạo CV Mới</a>
            </div>
        `;
        cvCount.textContent = '(0 CV)';
        return;
    }

    cvCount.textContent = `(${uniqueCVs.length} CV)`;

    // Sort by updated date (newest first)
    uniqueCVs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    // Display CVs
    cvGrid.innerHTML = uniqueCVs.map(cv => `
        <div class="cv-card">
            <div class="cv-card-header">
                <div>
                    <h3>${cv.personal?.fullName || 'Untitled CV'}</h3>
                    <p>${cv.personal?.title || 'No position'}</p>
                </div>
                <span class="cv-template-badge">${getTemplateLabel(cv.template)}</span>
            </div>
            <p>📅 Cập nhật: ${formatDate(cv.updatedAt)}</p>
            <p>📧 ${cv.personal?.email || 'No email'}</p>
            <div class="cv-card-actions">
                <button class="btn-small btn-edit" onclick="editCV(${cv.cvId})" title="Chỉnh sửa CV này">
                    ✏️ Sửa
                </button>
                <button class="btn-small btn-copy" onclick="copyToNewTemplate(${cv.cvId})" title="Copy sang template khác">
                    📋 Copy
                </button>
                <button class="btn-small btn-delete" onclick="deleteCV(${cv.cvId})" title="Xóa CV này">
                    🗑️ Xóa
                </button>
            </div>
        </div>
    `).join('');
}

// Get template display label
function getTemplateLabel(template) {
    const labels = {
        'professional': 'Professional',
        'modern': 'Modern',
        'elegant': 'Elegant',
        'creative': 'Creative'
    };
    return labels[template] || template;
}

// Format date
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// Edit CV
function editCV(cvId) {
    localStorage.setItem('currentCVId', cvId);
    window.location.href = 'builder.html';
}

// Delete CV
async function deleteCV(cvId) {
    if (!confirm('Bạn có chắc chắn muốn xóa CV này?')) {
        return;
    }
    
    // Remove from localStorage
    const savedCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');
    const updatedCVs = savedCVs.filter(cv => cv.cvId !== cvId);
    localStorage.setItem('userCVs', JSON.stringify(updatedCVs));
    
    // If this was the current CV, clear it
    const currentCVId = localStorage.getItem('currentCVId');
    if (currentCVId == cvId) {
        localStorage.removeItem('currentCVId');
        localStorage.removeItem('currentCVData');
    }
    
    // Reload CVs
    loadAndDisplayCVs();
}

// Load CV data when editing
window.loadCVForEditing = async function() {
    const cvId = localStorage.getItem('currentCVId');
    if (!cvId) return null;
    
    // Try to load from localStorage first
    const savedCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');
    let cv = savedCVs.find(c => c.cvId == cvId);
    
    // If not found, try to load from JSON
    if (!cv) {
        cv = await loadCVById(parseInt(cvId));
    }
    
    return cv;
};

// Copy CV to new template
function copyToNewTemplate(cvId) {
    // Show template selection modal
    const templates = [
        { id: 'professional', name: 'Professional', icon: '💼' },
        { id: 'modern', name: 'Modern', icon: '🎨' },
        { id: 'elegant', name: 'Elegant', icon: '✨' },
        { id: 'creative', name: 'Creative', icon: '🚀' }
    ];

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: white; border-radius: 15px; padding: 30px; max-width: 500px; width: 90%;">
            <h2 style="margin: 0 0 20px 0; color: #333;">
                📋 Chọn Template Mới
            </h2>
            <p style="color: #666; margin-bottom: 20px;">
                Thông tin CV sẽ được copy sang template bạn chọn
            </p>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                ${templates.map(t => `
                    <button onclick="confirmCopyToTemplate(${cvId}, '${t.id}')"
                            style="padding: 20px; border: 2px solid #e0e0e0; border-radius: 10px; background: white; cursor: pointer; transition: all 0.3s;">
                        <div style="font-size: 2em; margin-bottom: 10px;">${t.icon}</div>
                        <div style="font-weight: 600; color: #333;">${t.name}</div>
                    </button>
                `).join('')}
            </div>
            <button onclick="this.closest('div').parentElement.remove()"
                    style="width: 100%; padding: 12px; background: #e0e0e0; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                ❌ Hủy
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Confirm copy to template
window.confirmCopyToTemplate = async function(sourceCvId, targetTemplate) {
    // Load source CV
    const savedCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');
    let sourceCV = savedCVs.find(c => c.cvId == sourceCvId);

    if (!sourceCV) {
        sourceCV = await loadCVById(parseInt(sourceCvId));
    }

    if (!sourceCV) {
        alert('❌ Không tìm thấy CV nguồn!');
        return;
    }

    // Check if template already exists for this user
    const existingCV = savedCVs.find(c => c.userId === currentUser.userId && c.template === targetTemplate);
    if (existingCV) {
        if (!confirm(`⚠️ Bạn đã có CV với template ${targetTemplate}.\n\nGhi đè CV cũ?`)) {
            return;
        }
    }

    // Create new CV with copied data
    const newCV = {
        ...sourceCV,
        cvId: existingCV ? existingCV.cvId : Date.now(),
        template: targetTemplate,
        createdAt: existingCV ? existingCV.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Save to localStorage
    if (existingCV) {
        const index = savedCVs.findIndex(c => c.cvId === existingCV.cvId);
        savedCVs[index] = newCV;
    } else {
        savedCVs.push(newCV);
    }

    localStorage.setItem('userCVs', JSON.stringify(savedCVs));

    // Close modal
    document.querySelector('[style*="rgba(0,0,0,0.7)"]')?.remove();

    // Reload CVs
    loadAndDisplayCVs();

    // Show success
    alert(`✅ Đã copy CV sang template ${targetTemplate.toUpperCase()}!`);
};

// Save all CVs to JSON file (download)
window.saveAllCVsToJSON = async function() {
    try {
        // Get all CVs (from API + localStorage)
        const jsonCVs = await loadUserCVs(currentUser.userId);
        const localCVs = getUserSavedCVs();

        // Combine and deduplicate by userId + template
        const allCVs = [...jsonCVs, ...localCVs];
        const uniqueCVs = [];
        const seenKeys = new Set();

        for (const cv of allCVs) {
            const key = `${cv.userId}_${cv.template}`;
            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                uniqueCVs.push(cv);
            }
        }

        // Create JSON structure
        const jsonData = {
            user: {
                userId: currentUser.userId,
                username: currentUser.username,
                email: currentUser.email
            },
            cvs: uniqueCVs,
            exportDate: new Date().toISOString(),
            totalCVs: uniqueCVs.length
        };

        // Convert to JSON string
        const jsonString = JSON.stringify(jsonData, null, 2);

        // Create blob and download
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `cv-data-${currentUser.username}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);

        alert(`✅ Đã tải xuống ${uniqueCVs.length} CV dưới dạng JSON!`);
    } catch (error) {
        console.error('Error saving JSON:', error);
        alert('❌ Có lỗi khi lưu JSON: ' + error.message);
    }
};

// Save all CVs to JSON file (download)
window.saveAllCVsToJSON = async function() {
    try {
        // Get all CVs (JSON + localStorage)
        const jsonCVs = await loadUserCVs(currentUser.userId);
        const localCVs = getUserSavedCVs();

        // Combine and deduplicate by userId + template
        const allCVs = [...jsonCVs, ...localCVs];
        const uniqueCVs = [];
        const seenKeys = new Set();

        for (const cv of allCVs) {
            const key = `${cv.userId}_${cv.template}`;
            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                uniqueCVs.push(cv);
            }
        }

        // Create JSON structure
        const jsonData = {
            user: {
                userId: currentUser.userId,
                username: currentUser.username,
                email: currentUser.email
            },
            cvs: uniqueCVs,
            exportDate: new Date().toISOString(),
            totalCVs: uniqueCVs.length
        };

        // Convert to JSON string
        const jsonString = JSON.stringify(jsonData, null, 2);

        // Create blob and download
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `cv-data-${currentUser.username}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);

        alert(`✅ Đã tải xuống ${uniqueCVs.length} CV dưới dạng JSON!`);
    } catch (error) {
        console.error('Error saving JSON:', error);
        alert('❌ Có lỗi khi lưu JSON: ' + error.message);
    }
};
