// Vercel Serverless Function - Load CV
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

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { userId, cvId } = req.query;

        // Path to cv-data.json
        const dataPath = path.join(process.cwd(), 'cv-builder', 'data', 'cv-data.json');

        // Read data
        if (!fs.existsSync(dataPath)) {
            return res.status(200).json({ cvs: [] });
        }

        const fileContent = fs.readFileSync(dataPath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Filter by userId if provided
        if (userId) {
            const userCVs = data.cvs.filter(cv => cv.userId == userId);
            return res.status(200).json({ cvs: userCVs });
        }

        // Get specific CV by cvId
        if (cvId) {
            const cv = data.cvs.find(cv => cv.cvId == cvId);
            if (!cv) {
                return res.status(404).json({ error: 'CV not found' });
            }
            return res.status(200).json({ cv });
        }

        // Return all CVs
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error loading CV:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};
