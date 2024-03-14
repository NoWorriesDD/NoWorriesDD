const express = require('express');
const mysql = require('mysql');
const csv = require('csv-parser')
const fs = require('fs')

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bigdata'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(express.json());



// ------------CRUD----------------


app.post('/user/post', (req, res) => {
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

app.get('/user/get', (req, res) => {
    connection.query('SELECT * FROM user', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
            return;
        }
        res.json(results);
    });
});

app.get('/user/getByEmail', (req, res) => {
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

app.put('/user/update', (req, res) => {
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

app.delete('/user/delete', (req, res) => {
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



// -------------CSV File Reader------------



app.get('/business/get', (req, res) => {
    const results = [];

    fs.createReadStream('test.csv')
    .pipe(csv({}))
    .on('data', (data)=> results.push(data))
    .on('end', ()=> {
        res.json(results);
    });
});

app.get('/business/getByCity/:city', (req, res) => {
    const city  = req.params.city;
    console.log('Requested city:', city);
    const results = [];

    fs.createReadStream('test.csv')
    .pipe(csv({}))
    .on('data', (data)=> {
        if (data.Country == city) {
            results.push(data);
        }
    })
    .on('end', ()=> {
        res.json(results);
    });
});
