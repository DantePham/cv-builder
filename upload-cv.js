// Global variables
let uploadedFile = null;
let extractedText = '';
let selectedTemplate = null;
let parsedData = {};

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Setup upload area
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');

uploadArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        uploadedFile = file;
        showFileInfo(file);
    } else {
        alert('Vui lòng chọn file PDF!');
    }
});

// Drag & Drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
        uploadedFile = file;
        fileInput.files = e.dataTransfer.files;
        showFileInfo(file);
    } else {
        alert('Vui lòng chọn file PDF!');
    }
});

// Show file info
function showFileInfo(file) {
    document.getElementById('fileName').textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    document.getElementById('fileInfo').classList.add('show');
}

// Process PDF file
async function processFile() {
    if (!uploadedFile) return;
    
    // Show processing
    document.getElementById('fileInfo').classList.remove('show');
    document.getElementById('processing').classList.add('show');
    
    try {
        // Extract text from PDF
        extractedText = await extractTextFromPDF(uploadedFile);
        
        // Parse CV data from text
        parsedData = parseCV(extractedText);
        
        // Save to localStorage
        localStorage.setItem('cvBuilderData', JSON.stringify(parsedData));
        
        // Show template selection
        document.getElementById('processing').classList.remove('show');
        document.getElementById('extractedData').classList.add('show');
        
    } catch (error) {
        console.error('Error processing PDF:', error);
        alert('Không thể xử lý file PDF. Vui lòng thử file khác hoặc nhập thông tin thủ công.');
        document.getElementById('processing').classList.remove('show');
    }
}

// Extract text from PDF using PDF.js
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
    }
    
    return fullText;
}

// Parse CV data from extracted text - Dựa theo format CV mẫu
function parseCV(text) {
    const data = {
        personal: {
            fullName: '',
            title: '',
            dateOfBirth: '',
            gender: '',
            email: '',
            phone: '',
            address: '',
            linkedin: '',
            website: '',
            github: ''
        },
        objective: '',
        profile: '',
        workSkills: '',
        technicalSkills: [],
        softSkills: [],
        interests: [],
        experience: [],
        education: [],
        certifications: [],
        languages: [],
        references: []
    };

    const lines = text.split('\n').map(l => l.trim()).filter(l => l);

    // Extract Name (thường ở dòng đầu, chữ IN HOA)
    if (lines.length > 0) {
        const firstLine = lines[0].trim();
        if (firstLine.length < 50 && firstLine.toUpperCase() === firstLine) {
            data.personal.fullName = firstLine;
        } else if (lines.length > 1 && lines[0].length < 50) {
            data.personal.fullName = lines[0];
        }
    }

    // Extract Job Title (thường ngay sau tên)
    if (lines.length > 1) {
        const secondLine = lines[1].trim();
        if (secondLine.length < 50 && secondLine.toUpperCase() === secondLine) {
            data.personal.title = secondLine;
        }
    }

    // Extract Email
    const emailMatch = text.match(/[\w\.-]+@[\w\.-]+\.\w+/);
    if (emailMatch) data.personal.email = emailMatch[0];

    // Extract Phone (Vietnamese + International format)
    const phoneMatch = text.match(/(\+84|0)[0-9]{9,10}|[0-9]{10}/);
    if (phoneMatch) data.personal.phone = phoneMatch[0];

    // Extract Date of Birth (DD/MM/YYYY format)
    const dobMatch = text.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
    if (dobMatch) {
        const [day, month, year] = dobMatch[0].split('/');
        data.personal.dateOfBirth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Extract Gender
    if (text.match(/\b(Female|Nữ|female)\b/i)) {
        data.personal.gender = 'Female';
    } else if (text.match(/\b(Male|Nam|male)\b/i)) {
        data.personal.gender = 'Male';
    }

    // Extract Address (tìm địa chỉ Việt Nam)
    const addressMatch = text.match(/(\d+[\/\d]*,?\s+[\w\s]+(?:Ward|District|Phường|Quận|Ward|District)[\w\s,]+(?:Ho Chi Minh City|Hanoi|Hà Nội|TP\.HCM|Thành phố Hồ Chí Minh))/i);
    if (addressMatch) {
        data.personal.address = addressMatch[0].trim();
    }

    // Extract LinkedIn
    const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
    if (linkedinMatch) data.personal.linkedin = 'https://' + linkedinMatch[0];

    // Extract Website/Portfolio
    const websiteMatch = text.match(/(?:https?:\/\/)?(?:www\.)?[\w-]+\.[\w]{2,}(?:\/[\w-]*)?/);
    if (websiteMatch && !websiteMatch[0].includes('linkedin')) {
        data.personal.website = websiteMatch[0];
    }

    // Extract Objective Section
    const objectiveMatch = text.match(/Objective[:\s]+([\s\S]*?)(?=\n\s*(?:Profile|Education|Experience|Skills|Work experience)|$)/i);
    if (objectiveMatch) {
        data.objective = objectiveMatch[1].trim().replace(/\s+/g, ' ').substring(0, 500);
    }

    // Extract Profile Section
    const profileMatch = text.match(/Profile[:\s]+([\s\S]*?)(?=\n\s*(?:Objective|Education|Experience|Skills|Work experience)|$)/i);
    if (profileMatch) {
        data.profile = profileMatch[1].trim().replace(/\s+/g, ' ').substring(0, 500);
    }

    // Extract Work Skills
    const workSkillsMatch = text.match(/Work skills?[:\s]+([\s\S]*?)(?=\n\s*(?:Technical|Interests|Education|Experience)|$)/i);
    if (workSkillsMatch) {
        data.workSkills = workSkillsMatch[1].trim().replace(/\s+/g, ' ').substring(0, 500);
    }

    // Extract Education Section
    const educationMatch = text.match(/Education[:\s]+([\s\S]*?)(?=\n\s*(?:Work experience|Experience|Skills|Certifications|Objective)|$)/i);
    if (educationMatch) {
        const eduText = educationMatch[1];
        const eduLines = eduText.split('\n').filter(l => l.trim());

        let currentEdu = null;
        eduLines.forEach(line => {
            line = line.trim();
            // Tìm tên trường (thường có từ "University", "College", "Institute")
            if (line.match(/University|College|Institute|Đại học|Cao đẳng/i)) {
                if (currentEdu) data.education.push(currentEdu);
                currentEdu = {
                    degree: '',
                    school: line,
                    period: '',
                    achievement: ''
                };
            }
            // Tìm chuyên ngành
            else if (currentEdu && line.match(/Technology|Engineering|Business|Science|Computer|Chemical/i)) {
                currentEdu.degree = line;
            }
            // Tìm thời gian (MM/YYYY - MM/YYYY)
            else if (currentEdu && line.match(/\d{1,2}\/\d{4}\s*[-–]\s*\d{1,2}\/\d{4}/)) {
                currentEdu.period = line;
            }
            // Tìm GPA hoặc thành tích
            else if (currentEdu && (line.match(/Graduated|GPA|Honor/i) || line.includes('with honors'))) {
                currentEdu.achievement = line;
            }
        });
        if (currentEdu) data.education.push(currentEdu);
    }

    // Extract Work Experience Section
    const experienceMatch = text.match(/Work experience[:\s]+([\s\S]*?)(?=\n\s*(?:Education|Skills|Certifications|Interests)|$)/i);
    if (experienceMatch) {
        const expText = experienceMatch[1];
        const expLines = expText.split('\n').filter(l => l.trim());

        let currentExp = null;
        let descLines = [];

        expLines.forEach(line => {
            line = line.trim();

            // Tìm vị trí (thường là QC staff, Lab, Manager, etc.)
            if (line.match(/\b(staff|Lab|QC|Manager|Developer|Engineer|Analyst|Specialist|Director|Coordinator)\b/i) && !line.match(/^\s*[-•·]/)) {
                if (currentExp) {
                    currentExp.description = descLines.join('\n');
                    data.experience.push(currentExp);
                    descLines = [];
                }
                currentExp = {
                    position: line,
                    company: '',
                    period: '',
                    location: '',
                    description: ''
                };
            }
            // Tìm tên công ty
            else if (currentExp && !currentExp.company && line.match(/(Co\.,?\s*Ltd|Company|Corporation|Inc\.|Vietnam|Production)/i)) {
                currentExp.company = line;
            }
            // Tìm thời gian (MM/YYYY - MM/YYYY hoặc MM/YYYY - Present)
            else if (currentExp && line.match(/\d{1,2}\/\d{4}\s*[-–]\s*(?:\d{1,2}\/\d{4}|Present|The present|Current)/i)) {
                currentExp.period = line;
            }
            // Mô tả công việc (thường bắt đầu bằng -, •, hoặc động từ)
            else if (currentExp && (line.match(/^[-•·]/) || line.match(/^(Perform|Monitor|Analyze|Check|Report|Manage|Develop|Create|Maintain|Coordinate)/i))) {
                descLines.push(line.replace(/^[-•·]\s*/, ''));
            }
        });

        if (currentExp) {
            currentExp.description = descLines.join('\n');
            data.experience.push(currentExp);
        }
    }

    // Extract Certifications Section
    const certificationsMatch = text.match(/Certifications?[:\s]+([\s\S]*?)(?=\n\s*(?:References|Languages|Interests)|$)/i);
    if (certificationsMatch) {
        const certText = certificationsMatch[1];
        const certLines = certText.split('\n').filter(l => l.trim());

        certLines.forEach(line => {
            line = line.trim();
            // Format: YYYY • Certificate Name
            const match = line.match(/(\d{4})\s*[•·-]\s*(.+?)(?:\s*[•·-]\s*(.+))?$/);
            if (match) {
                data.certifications.push({
                    year: match[1],
                    name: match[2].trim(),
                    organization: '',
                    level: match[3] ? match[3].trim() : ''
                });
            }
        });
    }

    // Extract Technical Skills
    const techSkills = ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular', 'Vue',
                       'HTML', 'CSS', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'TypeScript',
                       'C++', 'C#', 'PHP', 'Ruby', 'Excel', 'PowerPoint', 'Word'];

    techSkills.forEach(skill => {
        if (text.includes(skill)) {
            data.technicalSkills.push(skill);
        }
    });

    // Extract Interests
    const interestsMatch = text.match(/Interests?[:\s]+([\s\S]*?)(?=\n\s*(?:References|Languages|$)|$)/i);
    if (interestsMatch) {
        const interestsText = interestsMatch[1].trim();
        const interestsList = interestsText.split(/[,\n]/).map(i => i.trim()).filter(i => i && i.length < 50);
        data.interests = interestsList;
    }

    // Extract Languages
    const languageKeywords = ['English', 'Vietnamese', 'French', 'Chinese', 'Japanese', 'Korean', 'Spanish', 'German'];
    languageKeywords.forEach(lang => {
        if (text.includes(lang)) {
            // Tìm level (Beginner, Intermediate, Advanced, Native, Fluent)
            const levelMatch = text.match(new RegExp(`${lang}[:\\s-]+(Beginner|Intermediate|Advanced|Native|Fluent|Basic|Level [A-C][1-2])`, 'i'));
            data.languages.push({
                language: lang,
                proficiency: levelMatch ? levelMatch[1] : 'Intermediate'
            });
        }
    });

    return data;
}

// Select template
function selectTemplate(template) {
    selectedTemplate = template;
    
    // Update UI
    document.querySelectorAll('.template-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.querySelector(`[data-template="${template}"]`).classList.add('selected');
    
    // Enable convert button
    document.getElementById('convertBtn').disabled = false;
}

// Convert to selected template
function convertToTemplate() {
    if (!selectedTemplate) {
        alert('Vui lòng chọn template!');
        return;
    }
    
    // Update template in localStorage
    parsedData.template = selectedTemplate;
    localStorage.setItem('cvBuilderData', JSON.stringify(parsedData));
    localStorage.setItem('selectedTemplate', selectedTemplate);
    
    // Redirect to template page
    window.location.href = `template-${selectedTemplate}.html`;
}
