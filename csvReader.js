// -------------CSV File Reader------------

const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');

router.get('/business/get', (req, res) => {
    const results = [];

    fs.createReadStream('test.csv')
    .pipe(csv({}))
    .on('data', (data)=> results.push(data))
    .on('end', ()=> {
        res.json(results);
    });
});

router.get('/business/getByCity/:city', (req, res) => {
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

module.exports = router;