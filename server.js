const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// ================================
// MIDDLEWARE
// ================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve all static files from project root
app.use(express.static(__dirname));

// ================================
// MYSQL DATABASE CONNECTION
// ================================
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hostel_db',
    port: Number(process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ================================
// HTML PAGE ROUTES
// ================================

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Home page
app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Student page
app.get('/student.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'student.html'));
});

// Warden page
app.get('/warden.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'warden.html'));
});

// Index page
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ================================
// 1. SUBMIT ROOM APPLICATION
// ================================
app.post('/apply-room', (req, res) => {

    const {
        studentId,
        fullName,
        email,
        phone,
        gender,
        department,
        hostelBlock,
        roomType
    } = req.body;

    const sql = `
        INSERT INTO room_applications
        (
            student_id,
            full_name,
            email,
            phone,
            gender,
            department,
            hostel_block,
            room_type,
            application_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending Review')
    `;

    const values = [
        studentId,
        fullName,
        email,
        phone,
        gender,
        department,
        hostelBlock,
        roomType
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.error('Insert Error:', err.message);

            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true,
            insertId: result.insertId
        });
    });
});

// ================================
// 2. FETCH ALL APPLICATIONS
// ================================
app.get('/api/applications', (req, res) => {

    db.query(
        'SELECT * FROM room_applications ORDER BY id DESC',
        (err, results) => {

            if (err) {
                console.error('Fetch Error:', err.message);

                return res.status(500).json({
                    error: 'Database error'
                });
            }

            res.json(results);
        }
    );
});

// ================================
// 3. UPDATE APPLICATION STATUS
// ================================
app.post('/api/applications/status', (req, res) => {

    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({
            success: false,
            error: 'ID and status are required'
        });
    }

    db.query(
        'UPDATE room_applications SET application_status = ? WHERE id = ?',
        [status, id],
        (err) => {

            if (err) {
                console.error('Update Error:', err.message);

                return res.status(500).json({
                    success: false,
                    error: 'Update failed'
                });
            }

            res.json({
                success: true
            });
        }
    );
});

// ================================
// 4. STUDENT STATUS CHECKER
// ================================
app.get('/api/application-status/:rollNo', (req, res) => {

    const rollNo = req.params.rollNo;

    const sql = `
        SELECT
            student_id,
            full_name,
            hostel_block,
            room_type,
            application_status
        FROM room_applications
        WHERE student_id = ?
        ORDER BY id DESC
        LIMIT 1
    `;

    db.query(sql, [rollNo], (err, results) => {

        if (err) {
            console.error('Status Query Error:', err.message);

            return res.status(500).json({
                error: 'Database query error'
            });
        }

        if (results.length > 0) {

            res.json({
                found: true,
                studentId: results[0].student_id,
                fullName: results[0].full_name,
                hostelBlock: results[0].hostel_block,
                roomType: results[0].room_type,
                status: results[0].application_status
            });

        } else {

            res.json({
                found: false
            });
        }
    });
});

// ================================
// 404 HANDLER
// ================================
app.use((req, res) => {

    res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>404 - Page Not Found</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                }
                h1 {
                    color: #dc2626;
                }
            </style>
        </head>
        <body>
            <h1>404 - Page Not Found</h1>
            <p>The requested page could not be found.</p>
            <a href="/">Go to Home</a>
        </body>
        </html>
    `);
});

// ================================
// SERVER
// ================================
const PORT = process.env.PORT || 3000;

if (require.main === module) {

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}

// Export for Vercel
module.exports = app;