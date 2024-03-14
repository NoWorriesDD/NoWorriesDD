// ------------User CRUD----------------

const con = require('./dbConnection');
const connection = con.getConnection();
connection.connect();
const express = require('express');

const router = express.Router();

router.post('/user/post', (req, res) => {
    const { name, email, pass } = req.body;
    const sql = 'INSERT INTO user (userName, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, pass], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Error creating user' });
            return;
        }
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
});

router.get('/user/get', (req, res) => {
    connection.query('SELECT * FROM user', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
            return;
        }
        res.json(results);
    });
});

router.get('/user/getByEmail', (req, res) => {
    const {email} = req.body;
    connection.query('SELECT * FROM user where email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
            return;
        }
        res.json(results);
    });
});

router.put('/user/update', (req, res) => {
    // const userId = req.params.id;
    const { name, email, pass } = req.body;
    const sql = 'UPDATE user SET userName = ?, password = ? WHERE email = ?';
    connection.query(sql, [name, pass, email], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Error updating user' });
            return;
        }
        res.json({ message: 'User updated successfully' });
    });
});

router.delete('/user/delete', (req, res) => {
    // const userId = req.params.id;
    const {email} = req.body;
    const sql = 'DELETE FROM user WHERE email = ?';
    connection.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Error deleting user' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;