// Global variables
let currentTemplate = 'professional';
let cvData = {};
let currentUser = null;

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    // Check if user is logged in (optional - allow guest use)
    currentUser = getCurrentUser();

    // Try to load CV if editing existing one
    const existingCV = await window.loadCVForEditing?.();
    if (existingCV) {
        cvData = existingCV;
        currentTemplate = existingCV.template || 'professional';
        populateForm(existingCV);
    } else {
        // Load from localStorage (fallback)
        const hasData = loadFromStorage();

        // Only add empty items if no data was loaded
        if (!hasData) {
            addExperience();
            addEducation();
            addCertification();
            addLanguage();
            addReference();
        }
    }

    // Auto update preview on input
    const form = document.getElementById('cvForm');
    form.addEventListener('input', debounce(updatePreview, 500));

    // Initial preview
    updatePreview();

    // Update active template tab
    if (currentTemplate) {
        document.querySelectorAll('.template-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-template="${currentTemplate}"]`)?.classList.add('active');
    }
});

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Switch Template
function switchTemplate(template) {
    currentTemplate = template;

    // Update active tab
    document.querySelectorAll('.template-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-template="${template}"]`).classList.add('active');

    // Update preview
    updatePreview();
}

// Experience Management
let experienceCount = 0;
function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceList');
    const item = document.createElement('div');
    item.className = 'experience-item';
    item.innerHTML = `
        ${experienceCount > 1 ? '<button type="button" class="btn-remove" onclick="removeItem(this)">×</button>' : ''}
        <input type="text" placeholder="Vị trí công việc *" data-field="position">
        <input type="text" placeholder="Công ty *" data-field="company">
        <div class="form-grid">
            <input type="text" placeholder="Thời gian (VD: 01/2020 - 12/2022)" data-field="period">
            <input type="text" placeholder="Địa điểm" data-field="location">
        </div>
        <textarea placeholder="Mô tả công việc (mỗi dòng 1 ý)" data-field="description" rows="3"></textarea>
    `;
    container.appendChild(item);
}

// Education Management
let educationCount = 0;
function addEducation() {
    educationCount++;
    const container = document.getElementById('educationList');
    const item = document.createElement('div');
    item.className = 'education-item';
    item.innerHTML = `
        ${educationCount > 1 ? '<button type="button" class="btn-remove" onclick="removeItem(this)">×</button>' : ''}
        <input type="text" placeholder="Bằng cấp / Chuyên ngành *" data-field="degree">
        <input type="text" placeholder="Trường *" data-field="school">
        <div class="form-grid">
            <input type="text" placeholder="Thời gian (VD: 2016 - 2020)" data-field="period">
            <input type="text" placeholder="GPA / Thành tích" data-field="achievement">
        </div>
    `;
    container.appendChild(item);
}

// Certification Management
let certificationCount = 0;
function addCertification() {
    certificationCount++;
    const container = document.getElementById('certificationsList');
    const item = document.createElement('div');
    item.className = 'education-item';
    item.innerHTML = `
        ${certificationCount > 1 ? '<button type="button" class="btn-remove" onclick="removeItem(this)">×</button>' : ''}
        <input type="text" placeholder="Tên chứng chỉ *" data-field="name">
        <input type="text" placeholder="Tổ chức cấp" data-field="organization">
        <div class="form-grid">
            <input type="text" placeholder="Năm đạt được" data-field="year">
            <input type="text" placeholder="Cấp độ (Level)" data-field="level">
        </div>
    `;
    container.appendChild(item);
}

// Language Management
let languageCount = 0;
function addLanguage() {
    languageCount++;
    const container = document.getElementById('languagesList');
    const item = document.createElement('div');
    item.className = 'education-item';
    item.innerHTML = `
        ${languageCount > 1 ? '<button type="button" class="btn-remove" onclick="removeItem(this)">×</button>' : ''}
        <input type="text" placeholder="Ngôn ngữ *" data-field="language">
        <select data-field="proficiency" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; margin-top: 10px;">
            <option value="">Chọn trình độ</option>
            <option value="Beginner">Beginner - Sơ cấp</option>
            <option value="Intermediate">Intermediate - Trung cấp</option>
            <option value="Advanced">Advanced - Cao cấp</option>
            <option value="Native">Native - Bản ngữ</option>
        </select>
    `;
    container.appendChild(item);
}

// Reference Management
let referenceCount = 0;
function addReference() {
    referenceCount++;
    const container = document.getElementById('referencesList');
    const item = document.createElement('div');
    item.className = 'experience-item';
    item.innerHTML = `
        ${referenceCount > 1 ? '<button type="button" class="btn-remove" onclick="removeItem(this)">×</button>' : ''}
        <input type="text" placeholder="Tên người tham khảo *" data-field="name">
        <input type="text" placeholder="Chức vụ / Công ty" data-field="position">
        <div class="form-grid">
            <input type="email" placeholder="Email" data-field="email">
            <input type="tel" placeholder="Số điện thoại" data-field="phone">
        </div>
    `;
    container.appendChild(item);
}

function removeItem(btn) {
    btn.parentElement.remove();
    updatePreview();
}

// Collect Form Data
function collectFormData() {
    cvData = {
        template: currentTemplate,
        personal: {
            fullName: document.getElementById('fullName').value || 'YOUR NAME',
            title: document.getElementById('title').value || 'JOB TITLE',
            dateOfBirth: document.getElementById('dateOfBirth')?.value || '',
            gender: document.getElementById('gender')?.value || '',
            email: document.getElementById('email').value || 'email@example.com',
            phone: document.getElementById('phone').value || '0123456789',
            address: document.getElementById('address').value,
            linkedin: document.getElementById('linkedin').value,
            website: document.getElementById('website')?.value || '',
            github: document.getElementById('github')?.value || ''
        },
        objective: document.getElementById('objective')?.value || '',
        profile: document.getElementById('profile')?.value || '',
        workSkills: document.getElementById('workSkills')?.value || '',
        technicalSkills: document.getElementById('technicalSkills')?.value.split(',').map(s => s.trim()).filter(s => s) || [],
        softSkills: document.getElementById('softSkills')?.value.split(',').map(s => s.trim()).filter(s => s) || [],
        interests: document.getElementById('interests')?.value.split(',').map(s => s.trim()).filter(s => s) || [],
        experience: [],
        education: [],
        certifications: [],
        languages: [],
        references: []
    };

    // Collect experience
    document.querySelectorAll('#experienceList .experience-item').forEach(item => {
        const exp = {
            position: item.querySelector('[data-field="position"]').value,
            company: item.querySelector('[data-field="company"]').value,
            period: item.querySelector('[data-field="period"]').value,
            location: item.querySelector('[data-field="location"]').value,
            description: item.querySelector('[data-field="description"]').value
        };
        if (exp.position || exp.company) {
            cvData.experience.push(exp);
        }
    });

    // Collect education
    document.querySelectorAll('#educationList .education-item').forEach(item => {
        const edu = {
            degree: item.querySelector('[data-field="degree"]').value,
            school: item.querySelector('[data-field="school"]').value,
            period: item.querySelector('[data-field="period"]').value,
            achievement: item.querySelector('[data-field="achievement"]').value
        };
        if (edu.degree || edu.school) {
            cvData.education.push(edu);
        }
    });

    // Collect certifications
    document.querySelectorAll('#certificationsList .education-item').forEach(item => {
        const cert = {
            name: item.querySelector('[data-field="name"]').value,
            organization: item.querySelector('[data-field="organization"]').value,
            year: item.querySelector('[data-field="year"]').value,
            level: item.querySelector('[data-field="level"]').value
        };
        if (cert.name) {
            cvData.certifications.push(cert);
        }
    });

    // Collect languages
    document.querySelectorAll('#languagesList .education-item').forEach(item => {
        const lang = {
            language: item.querySelector('[data-field="language"]').value,
            proficiency: item.querySelector('[data-field="proficiency"]').value
        };
        if (lang.language) {
            cvData.languages.push(lang);
        }
    });

    // Collect references
    document.querySelectorAll('#referencesList .experience-item').forEach(item => {
        const ref = {
            name: item.querySelector('[data-field="name"]').value,
            position: item.querySelector('[data-field="position"]').value,
            email: item.querySelector('[data-field="email"]').value,
            phone: item.querySelector('[data-field="phone"]').value
        };
        if (ref.name) {
            cvData.references.push(ref);
        }
    });

    saveToStorage();
}

// Update Preview
function updatePreview() {
    collectFormData();
    const preview = document.getElementById('cvPreview');

    let cvHTML = '';
    switch(currentTemplate) {
        case 'professional':
            cvHTML = generateProfessionalCV();
            break;
        case 'modern':
            cvHTML = generateModernCV();
            break;
        case 'elegant':
            cvHTML = generateElegantCV();
            break;
        case 'creative':
            cvHTML = generateCreativeCV();
            break;
    }

    // Wrap CV content in page container with page break indicators
    preview.innerHTML = `
        <div class="cv-page-container">
            ${cvHTML}
            <div class="page-indicator page-1-end">
                <span>───────── Trang 1 Kết Thúc (A4: 297mm) ─────────</span>
            </div>
            <div class="page-indicator page-2-end">
                <span>───────── Trang 2 Kết Thúc (594mm) ─────────</span>
            </div>
            <div class="page-indicator page-3-end">
                <span>───────── Trang 3 Kết Thúc (891mm) ─────────</span>
            </div>
        </div>
    `;

    // Check height and show/hide indicators accordingly
    setTimeout(() => {
        const container = preview.querySelector('.cv-page-container');
        if (container) {
            const height = container.offsetHeight;
            const page1Indicator = container.querySelector('.page-1-end');
            const page2Indicator = container.querySelector('.page-2-end');
            const page3Indicator = container.querySelector('.page-3-end');

            // Convert mm to px (assuming 96 DPI: 1mm ≈ 3.7795px)
            const mmToPx = (mm) => mm * 3.7795;

            // Show indicators based on content height
            if (page1Indicator) page1Indicator.style.display = height > mmToPx(297) ? 'flex' : 'none';
            if (page2Indicator) page2Indicator.style.display = height > mmToPx(594) ? 'flex' : 'none';
            if (page3Indicator) page3Indicator.style.display = height > mmToPx(891) ? 'flex' : 'none';
        }
    }, 100);
}

// Populate form with data
function populateForm(data) {
    console.log('🔄 Populating form with data:', data);

    // Personal info
    if (data.personal) {
        Object.keys(data.personal).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                input.value = data.personal[key] || '';
                console.log(`  ✓ ${key}: ${data.personal[key]}`);
            }
        });
    }

    // Other fields
    const objective = document.getElementById('objective');
    const profile = document.getElementById('profile');
    const workSkills = document.getElementById('workSkills');
    const technicalSkills = document.getElementById('technicalSkills');
    const softSkills = document.getElementById('softSkills');
    const interests = document.getElementById('interests');

    if (objective && data.objective) {
        objective.value = data.objective;
        console.log('  ✓ Objective loaded');
    }
    if (profile && data.profile) {
        profile.value = data.profile;
        console.log('  ✓ Profile loaded');
    }
    if (workSkills && data.workSkills) {
        workSkills.value = data.workSkills;
        console.log('  ✓ Work Skills loaded');
    }

    // Handle arrays
    if (technicalSkills && data.technicalSkills && Array.isArray(data.technicalSkills)) {
        technicalSkills.value = data.technicalSkills.join(', ');
        console.log('  ✓ Technical Skills loaded');
    }
    if (softSkills && data.softSkills && Array.isArray(data.softSkills)) {
        softSkills.value = data.softSkills.join(', ');
        console.log('  ✓ Soft Skills loaded');
    }
    if (interests && data.interests && Array.isArray(data.interests)) {
        interests.value = data.interests.join(', ');
        console.log('  ✓ Interests loaded');
    }

    // Clear existing dynamic sections
    const experienceList = document.getElementById('experienceList');
    const educationList = document.getElementById('educationList');
    const certificationList = document.getElementById('certificationList');
    const languageList = document.getElementById('languageList');
    const referenceList = document.getElementById('referenceList');

    if (experienceList) experienceList.innerHTML = '';
    if (educationList) educationList.innerHTML = '';
    if (certificationList) certificationList.innerHTML = '';
    if (languageList) languageList.innerHTML = '';
    if (referenceList) referenceList.innerHTML = '';

    console.log('  🗑️ Cleared all dynamic sections');

    // Populate Experience
    if (data.experience && Array.isArray(data.experience) && data.experience.length > 0) {
        console.log(`  📝 Loading ${data.experience.length} experiences...`);
        data.experience.forEach((exp, idx) => {
            addExperience();
            const items = document.querySelectorAll('#experienceList .experience-item');
            const lastItem = items[items.length - 1];
            if (lastItem) {
                const posInput = lastItem.querySelector('[data-field="position"]');
                const compInput = lastItem.querySelector('[data-field="company"]');
                const periodInput = lastItem.querySelector('[data-field="period"]');
                const locInput = lastItem.querySelector('[data-field="location"]');
                const descInput = lastItem.querySelector('[data-field="description"]');

                if (posInput) posInput.value = exp.position || '';
                if (compInput) compInput.value = exp.company || '';
                if (periodInput) periodInput.value = exp.period || '';
                if (locInput) locInput.value = exp.location || '';
                if (descInput) descInput.value = exp.description || '';

                console.log(`    ✓ Experience ${idx + 1}: ${exp.position} at ${exp.company}`);
            }
        });
    } else if (!data.experience || data.experience.length === 0) {
        // Add one empty experience if none exists
        addExperience();
    }

    // Populate Education
    if (data.education && Array.isArray(data.education) && data.education.length > 0) {
        console.log(`  🎓 Loading ${data.education.length} educations...`);
        data.education.forEach((edu, idx) => {
            addEducation();
            const items = document.querySelectorAll('#educationList .education-item');
            const lastItem = items[items.length - 1];
            if (lastItem) {
                const degInput = lastItem.querySelector('[data-field="degree"]');
                const schoolInput = lastItem.querySelector('[data-field="school"]');
                const periodInput = lastItem.querySelector('[data-field="eduPeriod"]');
                const achInput = lastItem.querySelector('[data-field="achievement"]');

                if (degInput) degInput.value = edu.degree || '';
                if (schoolInput) schoolInput.value = edu.school || '';
                if (periodInput) periodInput.value = edu.period || '';
                if (achInput) achInput.value = edu.achievement || '';

                console.log(`    ✓ Education ${idx + 1}: ${edu.degree} at ${edu.school}`);
            }
        });
    } else {
        addEducation();
    }

    // Populate Certifications
    if (data.certifications && Array.isArray(data.certifications) && data.certifications.length > 0) {
        console.log(`  📜 Loading ${data.certifications.length} certifications...`);
        data.certifications.forEach((cert, idx) => {
            addCertification();
            const items = document.querySelectorAll('#certificationList .certification-item');
            const lastItem = items[items.length - 1];
            if (lastItem) {
                const nameInput = lastItem.querySelector('[data-field="certName"]');
                const orgInput = lastItem.querySelector('[data-field="organization"]');
                const yearInput = lastItem.querySelector('[data-field="certYear"]');
                const levelInput = lastItem.querySelector('[data-field="certLevel"]');

                if (nameInput) nameInput.value = cert.name || '';
                if (orgInput) orgInput.value = cert.organization || '';
                if (yearInput) yearInput.value = cert.year || '';
                if (levelInput) levelInput.value = cert.level || '';

                console.log(`    ✓ Certification ${idx + 1}: ${cert.name}`);
            }
        });
    } else {
        addCertification();
    }

    // Populate Languages
    if (data.languages && Array.isArray(data.languages) && data.languages.length > 0) {
        console.log(`  🌍 Loading ${data.languages.length} languages...`);
        data.languages.forEach((lang, idx) => {
            addLanguage();
            const items = document.querySelectorAll('#languageList .language-item');
            const lastItem = items[items.length - 1];
            if (lastItem) {
                const langInput = lastItem.querySelector('[data-field="language"]');
                const profInput = lastItem.querySelector('[data-field="proficiency"]');

                if (langInput) langInput.value = lang.language || '';
                if (profInput) profInput.value = lang.proficiency || '';

                console.log(`    ✓ Language ${idx + 1}: ${lang.language} (${lang.proficiency})`);
            }
        });
    } else {
        addLanguage();
    }

    // Populate References
    if (data.references && Array.isArray(data.references) && data.references.length > 0) {
        console.log(`  👥 Loading ${data.references.length} references...`);
        data.references.forEach((ref, idx) => {
            addReference();
            const items = document.querySelectorAll('#referenceList .reference-item');
            const lastItem = items[items.length - 1];
            if (lastItem) {
                const nameInput = lastItem.querySelector('[data-field="refName"]');
                const posInput = lastItem.querySelector('[data-field="refPosition"]');
                const emailInput = lastItem.querySelector('[data-field="refEmail"]');
                const phoneInput = lastItem.querySelector('[data-field="refPhone"]');

                if (nameInput) nameInput.value = ref.name || '';
                if (posInput) posInput.value = ref.position || '';
                if (emailInput) emailInput.value = ref.email || '';
                if (phoneInput) phoneInput.value = ref.phone || '';

                console.log(`    ✓ Reference ${idx + 1}: ${ref.name}`);
            }
        });
    } else {
        addReference();
    }

    // Update cvData
    cvData = data;
    console.log('✅ Form population complete! Total data:', {
        personal: !!data.personal,
        experience: data.experience?.length || 0,
        education: data.education?.length || 0,
        certifications: data.certifications?.length || 0
    });
}

// Load demo data from JSON
async function loadDemoData() {
    console.log('🔄 Loading demo data...');
    try {
        const response = await fetch('data/cv-data.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📦 JSON loaded, total CVs:', data.cvs.length);

        // Load Thu Thuy's CV (userId: 3, cvId: 3)
        const demoCV = data.cvs.find(cv => cv.userId === 3 && cv.cvId === 3);

        if (demoCV) {
            console.log('✅ Found Thu Thủy CV:', demoCV.personal.fullName);

            // Update template first
            currentTemplate = demoCV.template || 'professional';

            // Small delay to ensure form is ready
            await new Promise(resolve => setTimeout(resolve, 100));

            // Populate form
            populateForm(demoCV);

            // Wait a bit then update preview
            setTimeout(() => {
                updatePreview();
                console.log('🎨 Preview updated');
            }, 300);

            // Update active tab
            document.querySelectorAll('.template-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector(`[data-template="${currentTemplate}"]`)?.classList.add('active');

            alert('✅ Đã load dữ liệu demo của Phạm Thị Thu Thủy!\n\n' +
                  'Tên: ' + demoCV.personal.fullName + '\n' +
                  'Chức danh: ' + demoCV.personal.title + '\n' +
                  'Email: ' + demoCV.personal.email);
        } else {
            console.error('❌ Demo CV not found in data');
            alert('❌ Không tìm thấy dữ liệu demo!\n\nKiểm tra Console (F12) để xem chi tiết.');
        }
    } catch (error) {
        console.error('❌ Error loading demo data:', error);
        alert('❌ Lỗi khi load dữ liệu demo!\n\n' +
              'Error: ' + error.message + '\n\n' +
              'Đảm bảo bạn đang chạy trên web server (không phải file://)');
    }
}

// Save CV - Lưu vào API Backend hoặc localStorage (fallback)
async function saveToStorage() {
    try {
        // Get current user
        const currentUser = checkAuth();
        if (!currentUser) {
            alert('⚠️ Bạn cần đăng nhập để lưu thông tin!');
            window.location.href = 'login.html';
            return;
        }

        // Prepare CV data to save
        const cvToSave = {
            userId: currentUser.userId,
            username: currentUser.username,
            template: currentTemplate,
            ...cvData,
            updatedAt: new Date().toISOString()
        };

        console.log('💾 Saving CV...', cvToSave);

        // Try to save to backend API first
        try {
            const response = await fetch('http://localhost:3000/api/cvs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cvToSave)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Saved to backend:', result);
                showNotification('✅ CV đã được lưu vào server!', 'success');

                // Also save to localStorage as backup
                localStorage.setItem(`userProfile_${currentUser.userId}`, JSON.stringify({
                    userId: currentUser.userId,
                    username: currentUser.username,
                    data: cvData,
                    updatedAt: new Date().toISOString()
                }));

                return;
            }
        } catch (apiError) {
            console.warn('⚠️ Backend API not available, using localStorage:', apiError.message);
        }

        // Fallback: Save to localStorage only
        localStorage.setItem(`userProfile_${currentUser.userId}`, JSON.stringify({
            userId: currentUser.userId,
            username: currentUser.username,
            data: cvData,
            updatedAt: new Date().toISOString()
        }));

        showNotification('✅ Thông tin đã được lưu (localStorage)!', 'success');
        console.log('✅ Saved to localStorage for:', currentUser.username);

    } catch (error) {
        console.error('❌ Error saving:', error);
        showNotification('❌ Lỗi khi lưu thông tin!', 'error');
    }
}

// Load User Profile - Load từ API hoặc localStorage
async function loadUserProfile() {
    try {
        const currentUser = checkAuth();
        if (!currentUser) return null;

        // Try to load from backend API first
        try {
            const response = await fetch(`http://localhost:3000/api/cvs`);
            if (response.ok) {
                const data = await response.json();
                // Find user's CV
                const userCV = data.cvs?.find(cv => cv.userId === currentUser.userId);
                if (userCV) {
                    console.log('✅ Loaded from backend:', userCV);
                    return userCV;
                }
            }
        } catch (apiError) {
            console.warn('⚠️ Backend API not available, using localStorage:', apiError.message);
        }

        // Fallback: Load from localStorage
        const profileKey = `userProfile_${currentUser.userId}`;
        const profileData = localStorage.getItem(profileKey);

        if (profileData) {
            const profile = JSON.parse(profileData);
            console.log('✅ Loaded from localStorage for:', currentUser.username);
            return profile.data;
        }

        return null;
    } catch (error) {
        console.error('❌ Error loading profile:', error);
        return null;
    }
}

function loadFromStorage() {
    const saved = localStorage.getItem('cvBuilderData');
    if (saved) {
        const data = JSON.parse(saved);
        populateForm(data);
        return true; // Data was loaded
    }
    return false; // No data
}

function clearData() {
    if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu đã lưu?')) {
        localStorage.removeItem('cvBuilderData');
        location.reload();
    }
}

// Show notification helper
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#48bb78' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Export to PDF - No margins version
function exportPDF() {
    const fileName = `CV_${cvData.personal.fullName.replace(/\s/g, '_') || 'MyCV'}_${currentTemplate}.pdf`;
    const element = document.getElementById('cvPreview');

    // Hide page indicators before export
    const indicators = document.querySelectorAll('.page-indicator');
    indicators.forEach(ind => ind.style.display = 'none');

    // Thu nhỏ font một chút để fit
    const originalFontSize = element.style.fontSize;
    element.style.fontSize = '95%'; // Giảm 5% font size

    const opt = {
        margin: 0, // BỎ HẾT MARGIN!
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        // Restore
        indicators.forEach(ind => ind.style.display = '');
        element.style.fontSize = originalFontSize;
    }).catch(err => {
        console.error('PDF Export Error:', err);
        alert('⚠️ Lỗi xuất PDF! Hãy thử dùng nút "🖨️ In PDF" và chọn "Save as PDF" thay thế.');
        indicators.forEach(ind => ind.style.display = '');
        element.style.fontSize = originalFontSize;
    });
}

// Print CV - Alternative method (always works!)
function printCV() {
    // Ẩn page indicators
    const indicators = document.querySelectorAll('.page-indicator');
    indicators.forEach(ind => ind.style.display = 'none');

    // Ẩn các elements không cần in
    const formSidebar = document.querySelector('.form-sidebar');
    const mobileToggle = document.querySelector('.mobile-toggle');

    if (formSidebar) formSidebar.style.display = 'none';
    if (mobileToggle) mobileToggle.style.display = 'none';

    // Chỉnh preview area để in
    const previewArea = document.querySelector('.preview-area');
    if (previewArea) {
        previewArea.style.background = 'white';
        previewArea.style.padding = '0';
    }

    // Mở dialog in
    window.print();

    // Restore sau khi in xong
    setTimeout(() => {
        indicators.forEach(ind => ind.style.display = 'flex');
        if (formSidebar) formSidebar.style.display = '';
        if (mobileToggle) mobileToggle.style.display = '';
        if (previewArea) {
            previewArea.style.background = '';
            previewArea.style.padding = '';
        }
    }, 1000);
}




// Generate CV from User Profile
async function generateCVFromProfile() {
    const currentUser = checkAuth();
    if (!currentUser) {
        alert('⚠️ Bạn cần đăng nhập để sử dụng tính năng này!');
        window.location.href = 'login.html';
        return;
    }

    // Load user profile (async)
    const profileData = await loadUserProfile();

    console.log('📥 Profile data loaded:', profileData);

    if (!profileData) {
        alert('⚠️ Bạn chưa lưu thông tin cá nhân!\n\n' +
              '💡 Hướng dẫn:\n' +
              '1. Nhập đầy đủ thông tin vào form bên trái\n' +
              '2. Click nút "💾 Lưu Thông Tin"\n' +
              '3. Sau đó có thể chọn template và click "✨ Generate CV"');
        return;
    }

    console.log('✅ Profile data exists, generating CV...');

    // Copy profile data to cvData
    cvData = {
        personal: { ...profileData.personal },
        objective: profileData.objective || '',
        profile: profileData.profile || '',
        workSkills: profileData.workSkills || '',
        technicalSkills: [...(profileData.technicalSkills || [])],
        softSkills: [...(profileData.softSkills || [])],
        experience: profileData.experience ? profileData.experience.map(exp => ({ ...exp })) : [],
        education: profileData.education ? profileData.education.map(edu => ({ ...edu })) : [],
        certifications: profileData.certifications ? profileData.certifications.map(cert => ({ ...cert })) : [],
        interests: [...(profileData.interests || [])],
        languages: profileData.languages ? profileData.languages.map(lang => ({ ...lang })) : [],
        references: profileData.references ? profileData.references.map(ref => ({ ...ref })) : []
    };

    console.log('📝 Populating form with cvData...');

    // Populate form
    populateForm(cvData);

    console.log('🔄 Updating preview with template:', currentTemplate);

    // Update preview with current template
    updatePreview();

    // Show success
    showNotification(`✅ Đã generate CV với template ${getTemplateLabel(currentTemplate)}!`, 'success');

    console.log('✅ Generated CV from profile for template:', currentTemplate);
}


// Show modal to copy data from another template
function showCopyDataModal() {
    const currentUser = checkAuth();
    if (!currentUser) {
        alert('⚠️ Bạn cần đăng nhập để sử dụng tính năng này!');
        return;
    }

    // Get all CVs of current user
    const allCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');
    const userCVs = allCVs.filter(cv => cv.userId === currentUser.userId);

    if (userCVs.length === 0) {
        alert('⚠️ Bạn chưa có CV nào đã lưu!\n\nHãy nhập thông tin và lưu CV trước.');
        return;
    }

    // Create modal
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
        <div style="background: white; border-radius: 15px; padding: 30px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <h2 style="margin: 0 0 10px 0; color: #333;">
                📋 Copy Dữ Liệu từ CV Đã Lưu
            </h2>
            <p style="color: #666; margin-bottom: 20px; font-size: 0.95em;">
                Chọn CV để copy toàn bộ thông tin vào template hiện tại (<strong>${getTemplateLabel(currentTemplate)}</strong>)
            </p>
            <div style="display: grid; gap: 15px;">
                ${userCVs.map(cv => `
                    <div onclick="copyDataFromCV(${cv.cvId})" style="
                        padding: 20px;
                        border: 2px solid #e0e0e0;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: all 0.3s;
                        background: white;
                    " onmouseover="this.style.borderColor='#667eea'; this.style.background='#f0f4ff';"
                       onmouseout="this.style.borderColor='#e0e0e0'; this.style.background='white';">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                            <div>
                                <div style="font-weight: 700; font-size: 1.1em; color: #333; margin-bottom: 5px;">
                                    ${cv.personal?.fullName || 'Untitled CV'}
                                </div>
                                <div style="color: #666; font-size: 0.9em;">
                                    ${cv.personal?.title || 'No position'}
                                </div>
                            </div>
                            <span style="
                                background: ${cv.template === 'professional' ? '#667eea' : cv.template === 'modern' ? '#f59e0b' : cv.template === 'elegant' ? '#8b5cf6' : '#ec4899'};
                                color: white;
                                padding: 4px 12px;
                                border-radius: 20px;
                                font-size: 0.75em;
                                font-weight: 600;
                            ">
                                ${getTemplateLabel(cv.template)}
                            </span>
                        </div>
                        <div style="font-size: 0.85em; color: #999;">
                            📅 ${new Date(cv.updatedAt).toLocaleDateString('vi-VN')}
                        </div>
                        ${cv.template === currentTemplate ? `
                            <div style="margin-top: 10px; padding: 8px; background: #fef3c7; border-radius: 6px; font-size: 0.85em; color: #92400e;">
                                ⚠️ Đang sử dụng template này
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
            <button onclick="this.closest('div').parentElement.remove()"
                    style="width: 100%; padding: 12px; margin-top: 20px; background: #e0e0e0; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                ❌ Đóng
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

// Copy data from selected CV
function copyDataFromCV(sourceCvId) {
    const allCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');
    const sourceCV = allCVs.find(cv => cv.cvId === sourceCvId);

    if (!sourceCV) {
        alert('❌ Không tìm thấy CV nguồn!');
        return;
    }

    if (sourceCV.template === currentTemplate) {
        if (!confirm('⚠️ Bạn đang copy từ cùng template!\n\nBạn có muốn tiếp tục không?')) {
            return;
        }
    }

    // Copy all data fields
    cvData = {
        personal: { ...sourceCV.personal },
        objective: sourceCV.objective || '',
        profile: sourceCV.profile || '',
        workSkills: sourceCV.workSkills || '',
        technicalSkills: [...(sourceCV.technicalSkills || [])],
        softSkills: [...(sourceCV.softSkills || [])],
        experience: sourceCV.experience ? sourceCV.experience.map(exp => ({ ...exp })) : [],
        education: sourceCV.education ? sourceCV.education.map(edu => ({ ...edu })) : [],
        certifications: sourceCV.certifications ? sourceCV.certifications.map(cert => ({ ...cert })) : [],
        interests: [...(sourceCV.interests || [])],
        languages: sourceCV.languages ? sourceCV.languages.map(lang => ({ ...lang })) : [],
        references: sourceCV.references ? sourceCV.references.map(ref => ({ ...ref })) : []
    };

    // Populate form with copied data
    populateForm(cvData);

    // Update preview
    updatePreview();

    // Close modal
    document.querySelector('[style*="rgba(0,0,0,0.7)"]')?.remove();

    // Show success message
    showNotification(`✅ Đã copy dữ liệu từ "${sourceCV.personal?.fullName || 'CV'}" (${getTemplateLabel(sourceCV.template)})!`, 'success');

    alert(`✅ Đã copy thành công!\n\n` +
          `Từ: ${sourceCV.personal?.fullName || 'CV'} (${getTemplateLabel(sourceCV.template)})\n` +
          `Vào: Template ${getTemplateLabel(currentTemplate)}\n\n` +
          `💡 Nhớ click "💾 Lưu CV" để lưu lại nhé!`);
}

// Helper function to get template label
function getTemplateLabel(template) {
    const labels = {
        'professional': 'Professional',
        'modern': 'Modern',
        'elegant': 'Elegant',
        'creative': 'Creative'
    };
    return labels[template] || template;
}
