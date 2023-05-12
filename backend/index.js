const express = require('express');
const router = express.Router();

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/names', (req, res) => {
    res.send({ message: 'Start of  things' });
});
app.listen(8000, () => {
    console.log('Runnnning on port 8000');
});
