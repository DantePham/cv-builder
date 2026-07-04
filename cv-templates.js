// CV Template Generation Functions

// Professional Template
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

                ${interests.length > 0 ? `
                    <div class="sidebar-section">
                        <h3 class="sidebar-title">Interests</h3>
                        <ul class="interest-list">
                            ${interests.map(interest => `<li>${interest}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

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
                ${objective ? `
                    <div class="main-section">
                        <h2 class="section-title">Objective</h2>
                        <p class="objective-text">${objective}</p>
                    </div>
                ` : ''}

                ${profile ? `
                    <div class="main-section">
                        <h2 class="section-title">Profile</h2>
                        <p class="profile-text">${profile}</p>
                    </div>
                ` : ''}

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
                                        ${exp.description.split('\n').flatMap(line => {
                                            // Nếu dòng có dấu chấm, split thành nhiều câu
                                            if (line.includes('.') && line.split('.').length > 2) {
                                                return line.split('.').map(s => s.trim()).filter(s => s.length > 0);
                                            }
                                            return [line.trim()];
                                        }).filter(line => line.length > 0).map(line => `<li>${line}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

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
    const { personal, objective, profile, workSkills, technicalSkills, softSkills,
            experience, education, certifications, interests, languages, references } = cvData;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    return `
        <div class="cv-modern">
            <div class="cv-header">
                <h1 class="cv-name">${personal.fullName || 'YOUR NAME'}</h1>
                <div class="cv-title">${personal.title || 'POSITION'}</div>
                <div class="cv-contact">
                    ${personal.email ? `<span>📧 ${personal.email}</span>` : ''}
                    ${personal.phone ? `<span>📱 ${personal.phone}</span>` : ''}
                    ${personal.address ? `<span>📍 ${personal.address}</span>` : ''}
                    ${personal.linkedin ? `<span>🔗 LinkedIn</span>` : ''}
                    ${personal.website ? `<span>🌐 ${personal.website}</span>` : ''}
                </div>
            </div>

            <div class="cv-content">
                ${objective ? `
                    <div class="cv-section">
                        <h2 class="section-title">🎯 Objective</h2>
                        <p class="section-text">${objective}</p>
                    </div>
                ` : ''}

                ${profile ? `
                    <div class="cv-section">
                        <h2 class="section-title">👤 Profile</h2>
                        <p class="section-text">${profile}</p>
                    </div>
                ` : ''}

                ${experience.length > 0 ? `
                    <div class="cv-section">
                        <h2 class="section-title">💼 Work Experience</h2>
                        ${experience.map(exp => `
                            <div class="cv-item">
                                <div class="item-header">
                                    <div>
                                        <strong class="item-title">${exp.position || 'Position'}</strong>
                                        ${exp.company ? `<div class="item-subtitle">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</div>` : ''}
                                    </div>
                                    <div class="item-date">${exp.period || ''}</div>
                                </div>
                                ${exp.description ? `
                                    <ul class="item-description">
                                        ${exp.description.split('\n').flatMap(line => {
                                            if (line.includes('.') && line.split('.').length > 2) {
                                                return line.split('.').map(s => s.trim()).filter(s => s.length > 0);
                                            }
                                            return [line.trim()];
                                        }).filter(line => line.length > 0).map(line => `<li>${line}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${education.length > 0 ? `
                    <div class="cv-section">
                        <h2 class="section-title">🎓 Education</h2>
                        ${education.map(edu => `
                            <div class="cv-item">
                                <div class="item-header">
                                    <div>
                                        <strong class="item-title">${edu.degree || 'Degree'}</strong>
                                        ${edu.school ? `<div class="item-subtitle">${edu.school}</div>` : ''}
                                    </div>
                                    <div class="item-date">${edu.period || ''}</div>
                                </div>
                                ${edu.achievement ? `<p class="item-text">${edu.achievement}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${workSkills || technicalSkills.length > 0 || softSkills.length > 0 ? `
                    <div class="cv-section">
                        <h2 class="section-title">⚡ Skills</h2>
                        ${workSkills ? `
                            <div class="skill-group">
                                <strong>Work Skills:</strong>
                                <p>${workSkills}</p>
                            </div>
                        ` : ''}
                        ${technicalSkills.length > 0 ? `
                            <div class="skill-group">
                                <strong>Technical Skills:</strong>
                                <div class="skills-list">
                                    ${technicalSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                        ${softSkills.length > 0 ? `
                            <div class="skill-group">
                                <strong>Soft Skills:</strong>
                                <div class="skills-list">
                                    ${softSkills.map(skill => `<span class="skill-tag skill-tag-soft">${skill}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}

                ${certifications.length > 0 ? `
                    <div class="cv-section">
                        <h2 class="section-title">🏆 Certifications</h2>
                        ${certifications.map(cert => `
                            <div class="cert-item">
                                <span class="cert-year">${cert.year || ''}</span>
                                <div class="cert-info">
                                    <strong>${cert.name}</strong>
                                    ${cert.organization ? ` - ${cert.organization}` : ''}
                                    ${cert.level ? `<span class="cert-level">${cert.level}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${languages.length > 0 ? `
                    <div class="cv-section">
                        <h2 class="section-title">🌐 Languages</h2>
                        <div class="languages-grid">
                            ${languages.map(lang => `
                                <div class="language-item">
                                    <strong>${lang.language}</strong>
                                    ${lang.proficiency ? `<span class="lang-level">${lang.proficiency}</span>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${interests.length > 0 ? `
                    <div class="cv-section">
                        <h2 class="section-title">🎨 Interests</h2>
                        <div class="interests-list">
                            ${interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${references.length > 0 ? `
                    <div class="cv-section">
                        <h2 class="section-title">📞 References</h2>
                        <div class="references-grid">
                            ${references.map(ref => `
                                <div class="reference-card">
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

// Elegant Template
function generateElegantCV() {
    const { personal, objective, profile, workSkills, technicalSkills, softSkills,
            experience, education, certifications, interests, languages, references } = cvData;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    return `
        <div class="cv-elegant">
            <!-- Header -->
            <div class="elegant-header">
                <h1 class="elegant-name">${personal.fullName || 'YOUR NAME'}</h1>
                <div class="elegant-title">${personal.title || 'PROFESSIONAL TITLE'}</div>
                <div class="elegant-contact">
                    ${personal.email ? `<span>✉️ ${personal.email}</span>` : ''}
                    ${personal.phone ? `<span>☎️ ${personal.phone}</span>` : ''}
                    ${personal.address ? `<span>📍 ${personal.address}</span>` : ''}
                </div>
                <div class="elegant-divider"></div>
            </div>

            <!-- Two Column Layout -->
            <div class="elegant-body">
                <!-- Left Column -->
                <div class="elegant-left">
                    ${personal.dateOfBirth || personal.gender || personal.linkedin || personal.website || personal.github ? `
                        <div class="elegant-section">
                            <h3 class="elegant-section-title">Personal Information</h3>
                            ${personal.dateOfBirth ? `<div class="elegant-info-item"><strong>Date of Birth:</strong> ${formatDate(personal.dateOfBirth)}</div>` : ''}
                            ${personal.gender ? `<div class="elegant-info-item"><strong>Gender:</strong> ${personal.gender}</div>` : ''}
                            ${personal.linkedin ? `<div class="elegant-info-item"><strong>LinkedIn:</strong> ${personal.linkedin}</div>` : ''}
                            ${personal.website ? `<div class="elegant-info-item"><strong>Website:</strong> ${personal.website}</div>` : ''}
                            ${personal.github ? `<div class="elegant-info-item"><strong>GitHub:</strong> ${personal.github}</div>` : ''}
                        </div>
                    ` : ''}

                    ${workSkills || technicalSkills.length > 0 || softSkills.length > 0 ? `
                        <div class="elegant-section">
                            <h3 class="elegant-section-title">Skills</h3>
                            ${workSkills ? `
                                <div class="skill-block">
                                    <strong class="skill-category-title">Work Skills</strong>
                                    <p class="skill-text">${workSkills}</p>
                                </div>
                            ` : ''}
                            ${technicalSkills.length > 0 ? `
                                <div class="skill-block">
                                    <strong class="skill-category-title">Technical Skills</strong>
                                    <ul class="elegant-list">
                                        ${technicalSkills.map(skill => `<li>${skill}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            ${softSkills.length > 0 ? `
                                <div class="skill-block">
                                    <strong class="skill-category-title">Soft Skills</strong>
                                    <ul class="elegant-list">
                                        ${softSkills.map(skill => `<li>${skill}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}

                    ${languages.length > 0 ? `
                        <div class="elegant-section">
                            <h3 class="elegant-section-title">Languages</h3>
                            ${languages.map(lang => `
                                <div class="elegant-lang-item">
                                    <strong>${lang.language}</strong>
                                    ${lang.proficiency ? `<span class="lang-proficiency">${lang.proficiency}</span>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${interests.length > 0 ? `
                        <div class="elegant-section">
                            <h3 class="elegant-section-title">Interests</h3>
                            <ul class="elegant-list">
                                ${interests.map(interest => `<li>${interest}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>

                <!-- Right Column -->
                <div class="elegant-right">
                    ${objective ? `
                        <div class="elegant-section">
                            <h3 class="elegant-section-title">Career Objective</h3>
                            <p class="elegant-text">${objective}</p>
                        </div>
                    ` : ''}

                    ${profile ? `
                        <div class="elegant-section">
                            <h3 class="elegant-section-title">Professional Profile</h3>
                            <p class="elegant-text">${profile}</p>
                        </div>
                    ` : ''}

                    ${experience.length > 0 ? `
                        <div class="elegant-section">
                            <h3 class="elegant-section-title">Professional Experience</h3>
                            ${experience.map(exp => `
                                <div class="elegant-timeline-item">
                                    <div class="elegant-item-header">
                                        <strong class="elegant-item-title">${exp.position || 'Position'}</strong>
                                        <span class="elegant-item-period">${exp.period || ''}</span>
                                    </div>
                                    ${exp.company ? `<div class="elegant-item-company">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</div>` : ''}
                                    ${exp.description ? `
                                        <ul class="elegant-description-list">
                                            ${exp.description.split('\n').flatMap(line => {
                                                if (line.includes('.') && line.split('.').length > 2) {
                                                    return line.split('.').map(s => s.trim()).filter(s => s.length > 0);
                                                }
                                                return [line.trim()];
                                            }).filter(line => line.length > 0).map(line => `<li>${line}</li>`).join('')}
                                        </ul>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${education.length > 0 ? `
                        <div class="elegant-section">
                            <h3 class="elegant-section-title">Education</h3>
                            ${education.map(edu => `
                                <div class="elegant-timeline-item">
                                    <div class="elegant-item-header">
                                        <strong class="elegant-item-title">${edu.degree || 'Degree'}</strong>
                                        <span class="elegant-item-period">${edu.period || ''}</span>
                                    </div>
                                    ${edu.school ? `<div class="elegant-item-company">${edu.school}</div>` : ''}
                                    ${edu.achievement ? `<p class="elegant-achievement">${edu.achievement}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${certifications.length > 0 ? `
                        <div class="elegant-section">
                            <h3 class="elegant-section-title">Certifications</h3>
                            ${certifications.map(cert => `
                                <div class="elegant-cert-item">
                                    <div class="elegant-cert-header">
                                        <strong>${cert.name}</strong>
                                        <span class="elegant-cert-year">${cert.year || ''}</span>
                                    </div>
                                    ${cert.organization ? `<div class="elegant-cert-org">${cert.organization}</div>` : ''}
                                    ${cert.level ? `<div class="elegant-cert-level">${cert.level}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${references.length > 0 ? `
                        <div class="elegant-section">
                            <h3 class="elegant-section-title">References</h3>
                            <div class="elegant-references">
                                ${references.map(ref => `
                                    <div class="elegant-ref-item">
                                        <strong>${ref.name}</strong>
                                        ${ref.position ? `<div class="elegant-ref-position">${ref.position}</div>` : ''}
                                        ${ref.email ? `<div class="elegant-ref-contact">✉️ ${ref.email}</div>` : ''}
                                        ${ref.phone ? `<div class="elegant-ref-contact">☎️ ${ref.phone}</div>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Creative Template
function generateCreativeCV() {
    const { personal, objective, profile, workSkills, technicalSkills, softSkills,
            experience, education, certifications, interests, languages, references } = cvData;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    return `
        <div class="cv-creative">
            <!-- Creative Header with Gradient -->
            <div class="creative-header">
                <div class="creative-header-content">
                    <h1 class="creative-name">${personal.fullName || 'YOUR NAME'}</h1>
                    <div class="creative-title">${personal.title || 'CREATIVE PROFESSIONAL'}</div>
                    <div class="creative-contact-bar">
                        ${personal.email ? `<span class="contact-item">📧 ${personal.email}</span>` : ''}
                        ${personal.phone ? `<span class="contact-item">📱 ${personal.phone}</span>` : ''}
                        ${personal.address ? `<span class="contact-item">📍 ${personal.address}</span>` : ''}
                        ${personal.linkedin ? `<span class="contact-item">🔗 LinkedIn</span>` : ''}
                        ${personal.website ? `<span class="contact-item">🌐 ${personal.website}</span>` : ''}
                    </div>
                </div>
            </div>

            <!-- Main Grid Layout -->
            <div class="creative-grid">
                <!-- Sidebar -->
                <div class="creative-sidebar">
                    ${personal.dateOfBirth || personal.gender ? `
                        <div class="creative-card">
                            <h3 class="creative-card-title">👤 About Me</h3>
                            ${personal.dateOfBirth ? `<div class="creative-info"><strong>DOB:</strong> ${formatDate(personal.dateOfBirth)}</div>` : ''}
                            ${personal.gender ? `<div class="creative-info"><strong>Gender:</strong> ${personal.gender}</div>` : ''}
                        </div>
                    ` : ''}

                    ${workSkills || technicalSkills.length > 0 || softSkills.length > 0 ? `
                        <div class="creative-card">
                            <h3 class="creative-card-title">⚡ Skills</h3>
                            ${workSkills ? `
                                <div class="creative-skill-group">
                                    <div class="skill-group-title">💼 Work Skills</div>
                                    <p class="skill-description">${workSkills}</p>
                                </div>
                            ` : ''}
                            ${technicalSkills.length > 0 ? `
                                <div class="creative-skill-group">
                                    <div class="skill-group-title">💻 Technical</div>
                                    <div class="creative-skill-tags">
                                        ${technicalSkills.map(skill => `<span class="creative-skill-tag">${skill}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${softSkills.length > 0 ? `
                                <div class="creative-skill-group">
                                    <div class="skill-group-title">🧠 Soft Skills</div>
                                    <div class="creative-skill-tags">
                                        ${softSkills.map(skill => `<span class="creative-skill-tag soft">${skill}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}

                    ${languages.length > 0 ? `
                        <div class="creative-card">
                            <h3 class="creative-card-title">🌐 Languages</h3>
                            ${languages.map(lang => `
                                <div class="creative-lang">
                                    <strong>${lang.language}</strong>
                                    ${lang.proficiency ? `<span class="creative-lang-level">${lang.proficiency}</span>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${interests.length > 0 ? `
                        <div class="creative-card">
                            <h3 class="creative-card-title">🎨 Interests</h3>
                            <div class="creative-interests">
                                ${interests.map(interest => `<span class="creative-interest-tag">${interest}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Main Content -->
                <div class="creative-main">
                    ${objective ? `
                        <div class="creative-section">
                            <h2 class="creative-section-title">🎯 Career Objective</h2>
                            <p class="creative-text">${objective}</p>
                        </div>
                    ` : ''}

                    ${profile ? `
                        <div class="creative-section">
                            <h2 class="creative-section-title">✨ Professional Profile</h2>
                            <p class="creative-text">${profile}</p>
                        </div>
                    ` : ''}

                    ${experience.length > 0 ? `
                        <div class="creative-section">
                            <h2 class="creative-section-title">💼 Work Experience</h2>
                            ${experience.map((exp, index) => `
                                <div class="creative-exp-item">
                                    <div class="creative-exp-number">${String(index + 1).padStart(2, '0')}</div>
                                    <div class="creative-exp-content">
                                        <div class="creative-exp-header">
                                            <strong class="creative-exp-position">${exp.position || 'Position'}</strong>
                                            <span class="creative-exp-period">${exp.period || ''}</span>
                                        </div>
                                        ${exp.company ? `<div class="creative-exp-company">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</div>` : ''}
                                        ${exp.description ? `
                                            <ul class="creative-exp-list">
                                                ${exp.description.split('\n').flatMap(line => {
                                                    if (line.includes('.') && line.split('.').length > 2) {
                                                        return line.split('.').map(s => s.trim()).filter(s => s.length > 0);
                                                    }
                                                    return [line.trim()];
                                                }).filter(line => line.length > 0).map(line => `<li>${line}</li>`).join('')}
                                            </ul>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${education.length > 0 ? `
                        <div class="creative-section">
                            <h2 class="creative-section-title">🎓 Education</h2>
                            ${education.map(edu => `
                                <div class="creative-edu-item">
                                    <div class="creative-edu-icon">🎓</div>
                                    <div class="creative-edu-content">
                                        <div class="creative-edu-header">
                                            <strong class="creative-edu-degree">${edu.degree || 'Degree'}</strong>
                                            <span class="creative-edu-period">${edu.period || ''}</span>
                                        </div>
                                        ${edu.school ? `<div class="creative-edu-school">${edu.school}</div>` : ''}
                                        ${edu.achievement ? `<p class="creative-edu-achievement">${edu.achievement}</p>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${certifications.length > 0 ? `
                        <div class="creative-section">
                            <h2 class="creative-section-title">🏆 Certifications</h2>
                            <div class="creative-cert-grid">
                                ${certifications.map(cert => `
                                    <div class="creative-cert-card">
                                        <div class="creative-cert-year">${cert.year || ''}</div>
                                        <div class="creative-cert-content">
                                            <strong class="creative-cert-name">${cert.name}</strong>
                                            ${cert.organization ? `<div class="creative-cert-org">${cert.organization}</div>` : ''}
                                            ${cert.level ? `<div class="creative-cert-level">${cert.level}</div>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${references.length > 0 ? `
                        <div class="creative-section">
                            <h2 class="creative-section-title">📞 References</h2>
                            <div class="creative-ref-grid">
                                ${references.map(ref => `
                                    <div class="creative-ref-card">
                                        <div class="creative-ref-avatar">${ref.name.charAt(0).toUpperCase()}</div>
                                        <div class="creative-ref-info">
                                            <strong class="creative-ref-name">${ref.name}</strong>
                                            ${ref.position ? `<div class="creative-ref-position">${ref.position}</div>` : ''}
                                            ${ref.email ? `<div class="creative-ref-contact">📧 ${ref.email}</div>` : ''}
                                            ${ref.phone ? `<div class="creative-ref-contact">📱 ${ref.phone}</div>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}
