//---------------To Get Followings---------------

const con = require('./dbConnection');
const connection = con.getConnection();
connection.connect();
const express = require('express');

const router = express.Router();

router.post('/userFollowing/follow', (req, res) => {
    const { userEmail, userFollowingEmail} = req.body;
    const sql = 'INSERT INTO followers (userEmail, userFollowingEmail) VALUES (?, ?)';
    connection.query(sql, [userEmail, userFollowingEmail], (err, result) => {
        if (err) {
            console.error('Error following user:', err);
            res.status(500).json({ error: 'Error following user' });
            return;
        }
        res.status(201).json({ message: 'Following', userId: result.insertId });
    });
});

router.get('/userFollowing/get', (req, res) => {
    const { userEmail} = req.body;
    connection.query('SELECT userFollowingEmail FROM followers where userEmail= ?', [userEmail], (err, results) => {
        if (err) {
            console.error('Error fetching followers:', err);
            res.status(500).json({ error: 'Error fetching followers' });
            return;
        }
        const userFollowingEmails = results.map(row => row.userFollowingEmail);
        res.json(userFollowingEmails);
    });
});

router.delete('/userFollowing/unfollow', (req, res) => {
    const { userEmail, userFollowingEmail} = req.body;
    const sql = 'DELETE FROM followers WHERE userEmail = ? AND userFollowingEmail = ?';
    connection.query(sql, [userEmail, userFollowingEmail], (err, result) => {
        if (err) {
            console.error('Error unfollowing user:', err);
            res.status(500).json({ error: 'Error unfollowing user' });
            return;
        }
        res.json({ message: 'Unfollowed' });
    });
});

module.exports = router;