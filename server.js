const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

const crudRoutes = require('./user');
const csvFileReaderRoutes = require('./csvReader');
const followingsRoutes = require('./following');
const recommendationRoutes = require('./recommendation');

app.use('/', crudRoutes);
app.use('/', csvFileReaderRoutes);
app.use('/', followingsRoutes);
app.use('/', recommendationRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});