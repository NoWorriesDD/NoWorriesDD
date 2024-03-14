//---------------To Get Recommendation----------

const con = require('./dbConnection');
const connection = con.getConnection();
connection.connect();
const express = require('express');

const router = express.Router();

router.post('/userRecommendation/favourite', (req, res) => {
    const { userEmail, merchantId} = req.body;
    const sql = 'INSERT INTO recommend (userEmail, merchantId) VALUES (?, ?)';
    connection.query(sql, [userEmail, merchantId], (err, result) => {
        if (err) {
            console.error('Error making favourite:', err);
            res.status(500).json({ error: 'Error making favourite' });
            return;
        }
        res.status(201).json({ message: 'Add to favourite', userId: result.insertId });
    });
});

router.get('/userRecommendation/get', (req, res) => {
    const { userEmail} = req.body;
    connection.query('SELECT merchantId FROM recommend where userEmail= ?', [userEmail], (err, results) => {
        if (err) {
            console.error('Error fetching recommendations:', err);
            res.status(500).json({ error: 'Error fetching recommendations' });
            return;
        }
        const merchantIds = results.map(row => row.merchantId);
        res.json(merchantIds);
    });
});

router.get('/userFriendRecommendation/get', (req, res) => {
    const { userEmail} = req.body;
    connection.query('select merchantId from recommend JOIN followers ON recommend.userEmail = followers.userFollowingEmail where followers.userEmail= ?', [userEmail], (err, results) => {
        if (err) {
            console.error('Error fetching recommendations:', err);
            res.status(500).json({ error: 'Error fetching recommendations' });
            return;
        }
        const merchantIds = results.map(row => row.merchantId);
        res.json(merchantIds);
    });
});

router.delete('/userRecommendation/unfavourite', (req, res) => {
    const { userEmail, merchantId} = req.body;
    const sql = 'DELETE FROM recommend WHERE userEmail = ? AND merchantId = ?';
    connection.query(sql, [userEmail, merchantId], (err, result) => {
        if (err) {
            console.error('Error removing favourite:', err);
            res.status(500).json({ error: 'Error removing favourite' });
            return;
        }
        res.json({ message: 'Remove from favourites' });
    });
});

module.exports = router;