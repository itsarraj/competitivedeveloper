const express = require('express');
const router = express.Router();
const https = require('https');
const http = require('http');
const app = express();
const fs = require('fs');

const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/names', (req, res) => {
    res.send({ message: 'Start of  things' });
});

const options = {
    key: fs.readFileSync(path.join(__dirname, './ssl/private.key')),
    cert: fs.readFileSync(path.join(__dirname, './ssl/certificate.crt')),
    ca: fs.readFileSync(path.join(__dirname, './ssl/ca_bundle.crt')),
};

const PORT = 8000;
const server = https.createServer(options, app);
server.listen(PORT, function () {
    console.log(`server at port ${PORT}`);
});
