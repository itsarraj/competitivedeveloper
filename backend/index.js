const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { readdirSync } = require('fs');
app.use(cors());

const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/', (req, res) => {
    res.send({ message: 'Start of  things' });
});

//  We can use this or can create index.js inside /routes
readdirSync('./routes').map((r) => {
    app.use('/', require('./routes/' + r));
});

// app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
