// Simple Node.js server to save CV data to JSON file
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files

// Paths
const CV_DATA_PATH = path.join(__dirname, 'data', 'cv-data.json');
const USERS_DATA_PATH = path.join(__dirname, 'data', 'users.json');

// Helper: Read JSON file
function readJSON(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', filePath, error);
        return null;
    }
}

// Helper: Write JSON file
function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing file:', filePath, error);
        return false;
    }
}

// ============ API ENDPOINTS ============

// GET: Load all CVs
app.get('/api/cvs', (req, res) => {
    const data = readJSON(CV_DATA_PATH);
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ error: 'Cannot read CV data' });
    }
});

// GET: Load CV by ID
app.get('/api/cvs/:cvId', (req, res) => {
    const data = readJSON(CV_DATA_PATH);
    if (data) {
        const cv = data.cvs.find(c => c.cvId == req.params.cvId);
        if (cv) {
            res.json(cv);
        } else {
            res.status(404).json({ error: 'CV not found' });
        }
    } else {
        res.status(500).json({ error: 'Cannot read CV data' });
    }
});

// POST: Save/Update CV
app.post('/api/cvs', (req, res) => {
    const cvData = req.body;
    const data = readJSON(CV_DATA_PATH);
    
    if (!data) {
        return res.status(500).json({ error: 'Cannot read CV data' });
    }
    
    // Check if CV exists (same userId + template)
    const existingIndex = data.cvs.findIndex(
        c => c.userId === cvData.userId && c.template === cvData.template
    );
    
    if (existingIndex !== -1) {
        // Update existing CV
        data.cvs[existingIndex] = {
            ...data.cvs[existingIndex],
            ...cvData,
            updatedAt: new Date().toISOString()
        };
        console.log(`✅ Updated CV ${cvData.cvId} for user ${cvData.userId}`);
    } else {
        // Add new CV
        cvData.cvId = cvData.cvId || Date.now();
        cvData.createdAt = cvData.createdAt || new Date().toISOString();
        cvData.updatedAt = new Date().toISOString();
        data.cvs.push(cvData);
        console.log(`✅ Created new CV ${cvData.cvId} for user ${cvData.userId}`);
    }
    
    // Write to file
    if (writeJSON(CV_DATA_PATH, data)) {
        res.json({ 
            success: true, 
            message: 'CV saved successfully',
            cvId: cvData.cvId
        });
    } else {
        res.status(500).json({ error: 'Cannot write CV data' });
    }
});

// DELETE: Delete CV
app.delete('/api/cvs/:cvId', (req, res) => {
    const data = readJSON(CV_DATA_PATH);
    
    if (!data) {
        return res.status(500).json({ error: 'Cannot read CV data' });
    }
    
    const originalLength = data.cvs.length;
    data.cvs = data.cvs.filter(c => c.cvId != req.params.cvId);
    
    if (data.cvs.length < originalLength) {
        if (writeJSON(CV_DATA_PATH, data)) {
            console.log(`✅ Deleted CV ${req.params.cvId}`);
            res.json({ success: true, message: 'CV deleted successfully' });
        } else {
            res.status(500).json({ error: 'Cannot write CV data' });
        }
    } else {
        res.status(404).json({ error: 'CV not found' });
    }
});

// GET: Load users
app.get('/api/users', (req, res) => {
    const data = readJSON(USERS_DATA_PATH);
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ error: 'Cannot read users data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║   🚀 CV Builder Server Running!          ║
╠═══════════════════════════════════════════╣
║   URL: http://localhost:${PORT}             ║
║   API: http://localhost:${PORT}/api/cvs     ║
╠═══════════════════════════════════════════╣
║   📝 Files:                               ║
║   - ${CV_DATA_PATH}  ║
║   - ${USERS_DATA_PATH} ║
╚═══════════════════════════════════════════╝
`);
});
