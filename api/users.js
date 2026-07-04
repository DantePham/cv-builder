// Vercel Serverless Function - Users Authentication
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

    try {
        // Path to users.json
        const usersPath = path.join(process.cwd(), 'cv-builder', 'data', 'users.json');

        // Read users data
        if (!fs.existsSync(usersPath)) {
            return res.status(500).json({ error: 'Users data not found' });
        }

        const fileContent = fs.readFileSync(usersPath, 'utf-8');
        const data = JSON.parse(fileContent);

        // GET - Get all users (without passwords for security)
        if (req.method === 'GET') {
            const safeUsers = data.users.map(u => ({
                id: u.id,
                username: u.username,
                email: u.email,
                fullName: u.fullName
            }));
            return res.status(200).json({ users: safeUsers });
        }

        // POST - Login
        if (req.method === 'POST') {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password required' });
            }

            const user = data.users.find(u => u.username === username && u.password === password);

            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Return user without password
            const { password: _, ...safeUser } = user;
            return res.status(200).json({
                success: true,
                user: safeUser
            });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Error in users API:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};
