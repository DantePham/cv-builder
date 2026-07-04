// Global variables
let cvData = {};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Get template from URL or script tag
    const path = window.location.pathname;
    if (typeof currentTemplate === 'undefined') {
        currentTemplate = path.match(/template-(\w+)\.html/)?.[1] || 'modern';
    }

    loadFromStorage();
    addExperience();
    addEducation();
    addCertification();
    addLanguage();
    addReference();

    // Auto update preview on input
    const form = document.getElementById('cvForm');
    form.addEventListener('input', debounce(updatePreview, 500));
    
    // Initial preview
    updatePreview();
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

// Experience Management
let experienceCount = 0;
function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceList');
    const item = document.createElement('div');
    item.className = 'experience-item';
    item.innerHTML = `
        ${experienceCount > 1 ? '<button type="button" class="btn-remove" onclick="removeItem(this)">×</button>' : ''}
        <input type="text" placeholder="Vị trí công việc *" data-field="position" required>
        <input type="text" placeholder="Công ty *" data-field="company" required>
        <div class="form-grid">
            <input type="text" placeholder="Thời gian (VD: 01/2020 - 12/2022)" data-field="period">
            <input type="text" placeholder="Địa điểm" data-field="location">
        </div>
        <textarea placeholder="Mô tả công việc" data-field="description" rows="3"></textarea>
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
        <input type="text" placeholder="Bằng cấp / Chuyên ngành *" data-field="degree" required>
        <input type="text" placeholder="Trường *" data-field="school" required>
        <div class="form-grid">
            <input type="text" placeholder="Thời gian (VD: 2016 - 2020)" data-field="period">
            <input type="text" placeholder="GPA / Thành tích" data-field="achievement">
        </div>
    `;
    container.appendChild(item);
}

function removeItem(btn) {
    btn.parentElement.remove();
    updatePreview();
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
        <input type="text" placeholder="Tên chứng chỉ *" data-field="name" required>
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
        <input type="text" placeholder="Ngôn ngữ *" data-field="language" required>
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
        <input type="text" placeholder="Tên người tham khảo *" data-field="name" required>
        <input type="text" placeholder="Chức vụ / Công ty" data-field="position">
        <div class="form-grid">
            <input type="email" placeholder="Email" data-field="email">
            <input type="tel" placeholder="Số điện thoại" data-field="phone">
        </div>
    `;
    container.appendChild(item);
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

    switch(currentTemplate) {
        case 'professional':
            preview.innerHTML = generateProfessionalCV();
            break;
        case 'modern':
            preview.innerHTML = generateModernCV();
            break;
        case 'elegant':
            preview.innerHTML = generateElegantCV();
            break;
        case 'classic':
            preview.innerHTML = generateClassicCV();
            break;
        case 'creative':
            preview.innerHTML = generateCreativeCV();
            break;
        case 'minimal':
            preview.innerHTML = generateMinimalCV();
            break;
    }
}

// Professional Template (giống mẫu bạn cung cấp)
function generateProfessionalCV() {
    const { personal, objective, profile, workSkills, technicalSkills, softSkills,
            experience, education, certifications, interests, languages, references } = cvData;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    return `
        <div class="cv-professional">
            <div class="cv-sidebar">
                <div class="sidebar-header">
                    <h1 class="cv-name">${personal.fullName || 'YOUR NAME'}</h1>
                    <div class="cv-title">${personal.title || 'JOB TITLE'}</div>
                </div>

                <!-- Profile Section -->
                <div class="sidebar-section">
                    <h3 class="sidebar-title">Profile</h3>
                    ${personal.dateOfBirth ? `<div class="info-item"><span class="icon">📅</span> ${formatDate(personal.dateOfBirth)}</div>` : ''}
                    ${personal.gender ? `<div class="info-item"><span class="icon">👤</span> ${personal.gender}</div>` : ''}
                    ${personal.phone ? `<div class="info-item"><span class="icon">📱</span> ${personal.phone}</div>` : ''}
                    ${personal.email ? `<div class="info-item"><span class="icon">📧</span> ${personal.email}</div>` : ''}
                    ${personal.address ? `<div class="info-item"><span class="icon">📍</span> ${personal.address}</div>` : ''}
                    ${personal.linkedin ? `<div class="info-item"><span class="icon">🔗</span> LinkedIn</div>` : ''}
                    ${personal.website ? `<div class="info-item"><span class="icon">🌐</span> ${personal.website}</div>` : ''}
                    ${personal.github ? `<div class="info-item"><span class="icon">💻</span> ${personal.github}</div>` : ''}
                </div>

                <!-- Skills Section -->
                ${workSkills || technicalSkills.length > 0 || softSkills.length > 0 ? `
                    <div class="sidebar-section">
                        <h3 class="sidebar-title">Skills</h3>
                        ${workSkills ? `
                            <div class="skill-category">
                                <strong>Work skills</strong>
                                <p style="font-size: 0.85em; line-height: 1.6; margin-top: 5px;">${workSkills}</p>
                            </div>
                        ` : ''}
                        ${technicalSkills.length > 0 ? `
                            <div class="skill-category">
                                <strong>Technical Skills</strong>
                                <ul class="skill-list">
                                    ${technicalSkills.map(skill => `<li>${skill}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${softSkills.length > 0 ? `
                            <div class="skill-category">
                                <strong>Soft Skills</strong>
                                <ul class="skill-list">
                                    ${softSkills.map(skill => `<li>${skill}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}

                <!-- Interests Section -->
                ${interests.length > 0 ? `
                    <div class="sidebar-section">
                        <h3 class="sidebar-title">Interests</h3>
                        <ul class="interest-list">
                            ${interests.map(interest => `<li>${interest}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- Languages Section -->
                ${languages.length > 0 ? `
                    <div class="sidebar-section">
                        <h3 class="sidebar-title">Languages</h3>
                        ${languages.map(lang => `
                            <div class="language-item">
                                <strong>${lang.language}</strong>
                                ${lang.proficiency ? `<span class="proficiency">${lang.proficiency}</span>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>

            <div class="cv-main">
                <!-- Objective Section -->
                ${objective ? `
                    <div class="main-section">
                        <h2 class="section-title">Objective</h2>
                        <p class="objective-text">${objective}</p>
                    </div>
                ` : ''}

                <!-- Profile/Summary Section -->
                ${profile ? `
                    <div class="main-section">
                        <h2 class="section-title">Profile</h2>
                        <p class="profile-text">${profile}</p>
                    </div>
                ` : ''}

                <!-- Education Section -->
                ${education.length > 0 ? `
                    <div class="main-section">
                        <h2 class="section-title">Education</h2>
                        ${education.map(edu => `
                            <div class="timeline-item">
                                <div class="timeline-header">
                                    <div>
                                        <strong>${edu.degree || 'Degree'}</strong>
                                        ${edu.school ? `<div class="subtitle">${edu.school}</div>` : ''}
                                    </div>
                                    <div class="date">${edu.period || ''}</div>
                                </div>
                                ${edu.achievement ? `<div class="description">${edu.achievement}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Work Experience Section -->
                ${experience.length > 0 ? `
                    <div class="main-section">
                        <h2 class="section-title">Work experience</h2>
                        ${experience.map(exp => `
                            <div class="timeline-item">
                                <div class="timeline-header">
                                    <div>
                                        <strong>${exp.position || 'Position'}</strong>
                                        ${exp.company ? `<div class="subtitle">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</div>` : ''}
                                    </div>
                                    <div class="date">${exp.period || ''}</div>
                                </div>
                                ${exp.description ? `
                                    <ul class="description-list">
                                        ${exp.description.split('\n').map(line => line.trim() ? `<li>${line}</li>` : '').join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Certifications Section -->
                ${certifications.length > 0 ? `
                    <div class="main-section">
                        <h2 class="section-title">Certifications</h2>
                        ${certifications.map(cert => `
                            <div class="certification-item">
                                <div class="cert-year">${cert.year || ''}</div>
                                <div class="cert-details">
                                    <strong>${cert.name}</strong>
                                    ${cert.organization ? `<div>${cert.organization}</div>` : ''}
                                    ${cert.level ? `<div class="cert-level">${cert.level}</div>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- References Section -->
                ${references.length > 0 ? `
                    <div class="main-section">
                        <h2 class="section-title">References</h2>
                        <div class="references-grid">
                            ${references.map(ref => `
                                <div class="reference-item">
                                    <strong>${ref.name}</strong>
                                    ${ref.position ? `<div class="ref-position">${ref.position}</div>` : ''}
                                    ${ref.email ? `<div class="ref-contact">📧 ${ref.email}</div>` : ''}
                                    ${ref.phone ? `<div class="ref-contact">📱 ${ref.phone}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Modern Template
function generateModernCV() {
    const { personal, experience, education, skills } = cvData;
    return `
        <div class="cv-modern">
            <div class="cv-header">
                <h1 class="cv-name">${personal.fullName}</h1>
                <div class="cv-title">${personal.title}</div>
                <div class="cv-contact">
                    <span>📧 ${personal.email}</span>
                    <span>📱 ${personal.phone}</span>
                    ${personal.address ? `<span>📍 ${personal.address}</span>` : ''}
                    ${personal.linkedin ? `<span>🔗 LinkedIn</span>` : ''}
                </div>
            </div>

            ${personal.summary ? `
                <div class="cv-section">
                    <h2 class="section-title">Giới Thiệu</h2>
                    <p>${personal.summary}</p>
                </div>
            ` : ''}

            ${experience.length > 0 ? `
                <div class="cv-section">
                    <h2 class="section-title">Kinh Nghiệm Làm Việc</h2>
                    ${experience.map(exp => `
                        <div class="cv-item">
                            <div class="item-header">
                                <span class="item-title">${exp.position}</span>
                                <span class="item-date">${exp.period}</span>
                            </div>
                            <div class="item-subtitle">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</div>
                            ${exp.description ? `<p>${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${education.length > 0 ? `
                <div class="cv-section">
                    <h2 class="section-title">Học Vấn</h2>
                    ${education.map(edu => `
                        <div class="cv-item">
                            <div class="item-header">
                                <span class="item-title">${edu.degree}</span>
                                <span class="item-date">${edu.period}</span>
                            </div>
                            <div class="item-subtitle">${edu.school}${edu.achievement ? ` • ${edu.achievement}` : ''}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${skills.length > 0 ? `
                <div class="cv-section">
                    <h2 class="section-title">Kỹ Năng</h2>
                    <div class="skills-list">
                        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Classic Template
function generateClassicCV() {
    const { personal, experience, education, skills } = cvData;
    return `
        <div class="cv-classic">
            <div class="cv-sidebar">
                <h1 class="cv-name">${personal.fullName}</h1>
                <div class="cv-title">${personal.title}</div>

                <div class="sidebar-section">
                    <h3 class="sidebar-title">Liên Hệ</h3>
                    <div class="contact-item">📧 ${personal.email}</div>
                    <div class="contact-item">📱 ${personal.phone}</div>
                    ${personal.address ? `<div class="contact-item">📍 ${personal.address}</div>` : ''}
                    ${personal.linkedin ? `<div class="contact-item">🔗 LinkedIn</div>` : ''}
                </div>

                ${skills.length > 0 ? `
                    <div class="sidebar-section">
                        <h3 class="sidebar-title">Kỹ Năng</h3>
                        ${skills.map(skill => `<div class="contact-item">• ${skill}</div>`).join('')}
                    </div>
                ` : ''}
            </div>

            <div class="cv-main">
                ${personal.summary ? `
                    <div class="cv-section">
                        <h2 class="section-title">Giới Thiệu</h2>
                        <p>${personal.summary}</p>
                    </div>
                ` : ''}

                ${experience.length > 0 ? `
                    <div class="cv-section">
                        <h2 class="section-title">Kinh Nghiệm</h2>
                        ${experience.map(exp => `
                            <div class="cv-item">
                                <div class="item-header">
                                    <span class="item-title">${exp.position}</span>
                                    <span class="item-date">${exp.period}</span>
                                </div>
                                <div class="item-subtitle">${exp.company}</div>
                                ${exp.description ? `<p>${exp.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${education.length > 0 ? `
                    <div class="cv-section">
                        <h2 class="section-title">Học Vấn</h2>
                        ${education.map(edu => `
                            <div class="cv-item">
                                <div class="item-header">
                                    <span class="item-title">${edu.degree}</span>
                                    <span class="item-date">${edu.period}</span>
                                </div>
                                <div class="item-subtitle">${edu.school}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Creative Template
function generateCreativeCV() {
    const { personal, experience, education, skills } = cvData;
    const initials = personal.fullName.split(' ').map(n => n[0]).join('').substring(0, 2);

    return `
        <div class="cv-creative">
            <div class="cv-header">
                <div class="cv-avatar">${initials}</div>
                <h1 class="cv-name">${personal.fullName}</h1>
                <div class="cv-title">${personal.title}</div>
                <div class="cv-contact" style="display: flex; justify-content: center; gap: 20px; margin-top: 20px; flex-wrap: wrap;">
                    <span>${personal.email}</span>
                    <span>${personal.phone}</span>
                    ${personal.address ? `<span>${personal.address}</span>` : ''}
                </div>
            </div>

            ${personal.summary ? `
                <div class="cv-section">
                    <h2 class="section-title">💼 Giới Thiệu</h2>
                    <p>${personal.summary}</p>
                </div>
            ` : ''}

            ${experience.length > 0 ? `
                <div class="cv-section">
                    <h2 class="section-title">🚀 Kinh Nghiệm</h2>
                    ${experience.map(exp => `
                        <div class="cv-item">
                            <div class="item-header">
                                <span class="item-title">${exp.position} - ${exp.company}</span>
                                <span class="item-date">${exp.period}</span>
                            </div>
                            ${exp.description ? `<p>${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${education.length > 0 ? `
                <div class="cv-section">
                    <h2 class="section-title">🎓 Học Vấn</h2>
                    ${education.map(edu => `
                        <div class="cv-item">
                            <div class="item-header">
                                <span class="item-title">${edu.degree}</span>
                                <span class="item-date">${edu.period}</span>
                            </div>
                            <div class="item-subtitle">${edu.school}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${skills.length > 0 ? `
                <div class="cv-section">
                    <h2 class="section-title">⚡ Kỹ Năng</h2>
                    <div class="skills-list">
                        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Minimal Template
function generateMinimalCV() {
    const { personal, experience, education, skills } = cvData;
    return `
        <div class="cv-minimal">
            <h1 class="cv-name">${personal.fullName}</h1>
            <div class="cv-title">${personal.title}</div>
            <div class="cv-contact">
                ${personal.email} • ${personal.phone}
                ${personal.address ? ` • ${personal.address}` : ''}
                ${personal.linkedin ? ` • LinkedIn` : ''}
            </div>

            ${personal.summary ? `
                <div class="cv-section">
                    <p>${personal.summary}</p>
                </div>
            ` : ''}

            ${experience.length > 0 ? `
                <div class="cv-section">
                    <h2 class="section-title">Experience</h2>
                    ${experience.map(exp => `
                        <div class="cv-item">
                            <div class="item-header">
                                <span class="item-title">${exp.position}, ${exp.company}</span>
                                <span class="item-date">${exp.period}</span>
                            </div>
                            ${exp.description ? `<p>${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${education.length > 0 ? `
                <div class="cv-section">
                    <h2 class="section-title">Education</h2>
                    ${education.map(edu => `
                        <div class="cv-item">
                            <div class="item-header">
                                <span class="item-title">${edu.degree}, ${edu.school}</span>
                                <span class="item-date">${edu.period}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${skills.length > 0 ? `
                <div class="cv-section">
                    <h2 class="section-title">Skills</h2>
                    <p>${skills.join(' • ')}</p>
                </div>
            ` : ''}
        </div>
    `;
}

// Local Storage
function saveToStorage() {
    localStorage.setItem('cvBuilderData', JSON.stringify(cvData));
}

function loadFromStorage() {
    const saved = localStorage.getItem('cvBuilderData');
    if (saved) {
        cvData = JSON.parse(saved);

        // Restore form data
        if (cvData.personal) {
            Object.keys(cvData.personal).forEach(key => {
                const input = document.getElementById(key);
                if (input) input.value = cvData.personal[key] || '';
            });
        }

        if (cvData.skills) {
            document.getElementById('skills').value = cvData.skills.join(', ');
        }
    }
}

// Export to PDF - Căn chuẩn A4
function exportPDF() {
    const element = document.getElementById('cvPreview');
    const fileName = `CV_${cvData.personal.fullName.replace(/\s/g, '_') || 'MyCV'}.pdf`;

    // A4 size in mm: 210 x 297
    const opt = {
        margin: [5, 5, 5, 5], // top, right, bottom, left (mm)
        filename: fileName,
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollY: 0,
            scrollX: 0
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            compress: true
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.page-break-before',
            after: '.page-break-after'
        }
    };

    html2pdf().set(opt).from(element).save();
}
