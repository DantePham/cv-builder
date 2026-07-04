// Vercel Serverless Function - Save CV
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const cvData = req.body;

        // Validate data
        if (!cvData.userId || !cvData.template) {
            return res.status(400).json({ error: 'Missing required fields: userId, template' });
        }

        // Path to cv-data.json
        const dataPath = path.join(process.cwd(), 'cv-builder', 'data', 'cv-data.json');

        // Read existing data
        let existingData = { cvs: [] };
        if (fs.existsSync(dataPath)) {
            const fileContent = fs.readFileSync(dataPath, 'utf-8');
            existingData = JSON.parse(fileContent);
        }

        // Find if CV already exists (same userId + template)
        const existingIndex = existingData.cvs.findIndex(
            cv => cv.userId === cvData.userId && cv.template === cvData.template
        );

        // Update or add CV
        if (existingIndex !== -1) {
            // Update existing CV
            existingData.cvs[existingIndex] = {
                ...cvData,
                updatedAt: new Date().toISOString()
            };
        } else {
            // Add new CV
            existingData.cvs.push({
                ...cvData,
                cvId: Date.now(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }

        // Write back to file
        fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2), 'utf-8');

        return res.status(200).json({
            success: true,
            message: 'CV saved successfully',
            cvId: existingIndex !== -1 ? existingData.cvs[existingIndex].cvId : existingData.cvs[existingData.cvs.length - 1].cvId
        });

    } catch (error) {
        console.error('Error saving CV:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};
